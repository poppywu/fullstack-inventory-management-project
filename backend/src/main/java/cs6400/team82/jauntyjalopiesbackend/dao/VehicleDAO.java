package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class VehicleDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public VehicleDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Vehicle> getAllVehicles() {
        String sql = "SELECT V.vin,V.model_year,V.model_name,M.manufacturer_name,V.invoice_price, VC.color, V.vehicle_type,V.description,V.username,V.add_date FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID ORDER BY V.vin ASC";
        return getVehicles(sql);
    }

    public List<Vehicle> getAllSoldVehicles() {
        String sql = "SELECT V.vin,V.model_year,V.model_name,M.manufacturer_name,V.invoice_price, VC.color, V.vehicle_type,V.description,V.username,V.add_date FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID WHERE V.vin IN (SELECT vin FROM Sale) ORDER BY V.vin ASC";
        return getVehicles(sql);
    }

    public Integer getNumOfUnsoldVehicles() {
        String sql = "SELECT Count(V.vin) AS unsold_count FROM Vehicle AS V WHERE V.vin NOT IN (SELECT vin FROM Sale)";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public List<Vehicle> getByCriteria(Integer modelYear, String modelName, String manufacturerName, String color, Double maxPrice, String vehicleType, String description, Boolean sold, String vin) {
        String sql = "";
        //List<Object> argList = new ArrayList<>();
        if (description == null) {
            description = "%";
        }
        else {
            description = "%" + description + "%";
        }
        Object[] argList = {
            vin, vin,
            modelYear, modelYear,
            modelName, modelName,
            manufacturerName, manufacturerName,
            color, color,
            maxPrice, maxPrice,
            vehicleType, vehicleType,
            description 
        };
        System.out.println("argList length " + argList.length);
        sql = "SELECT V.vin,V.model_year,V.model_name,M.manufacturer_name,V.invoice_price, VC.color, V.vehicle_type,V.description,V.username,V.add_date " +
            " FROM Vehicle AS V " + 
            " INNER JOIN VehicleColor AS VC ON V.vin=VC.vin " + 
            " INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID " +
            " WHERE " +
            " (V.vin=? OR ? IS NULL) AND " +
            " (V.model_year=? OR ? IS NULL) AND " +
            " (V.model_name=? OR ? IS NULL) AND " + 
            " (M.manufacturer_name=? OR ? IS NULL) AND " +
            " (VC.color=? OR ? IS NULL) AND " +
            " (V.invoice_price*1.5<=? OR ? IS NULL) AND " +
            " (V.vehicle_type=? OR ? IS NULL) AND " + 
            " (V.description LIKE ?) ";
        if (sold != null) {
            if (sold == true) {
                sql += " AND V.vin IN (SELECT vin From Sale) ";
            } else if (sold == false) {
                sql += " AND V.vin NOT IN (SELECT vin From Sale) ";
            } 
        } // else if sold == null -> don't need to filter on sold
        sql += "Order By V.vin ASC ";
        return getVehiclesByArgs(sql, argList);
    }


    public String getVehicleTypeByVin(String vin) {
        String sql = "SELECT vehicle_type FROM Vehicle WHERE vin=?";
        return jdbcTemplate.queryForObject(sql, String.class, vin);
    }


    public Vehicle getByVin(String vin) {
        String sql = "SELECT V.vin,V.model_year,V.model_name,M.manufacturer_name,V.invoice_price, VC.color, V.vehicle_type,V.description,V.username,V.add_date FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID WHERE V.vin=?";
        return jdbcTemplate.query(sql, rs -> {
            Vehicle vehicle = null;
            while (rs.next()) {
                if (vehicle == null) {
                    vehicle = new Vehicle();
                    vehicleVariableSetter(rs, vehicle);
                }
                vehicle.getColor().add(rs.getString("color"));
            }
            return vehicle;
        }, vin);
    }

    public void createVehicle(Vehicle vehicle) {
        String manufacturerSql = "SELECT manufacturerID FROM Manufacturer WHERE manufacturer_name=?";
        Integer manufacturerID = jdbcTemplate.queryForObject(manufacturerSql, new Object[]{vehicle.getManufacturerName()}, Integer.class);
        String vehicleSql = "INSERT INTO Vehicle(vin,model_year,model_name,manufacturerID,invoice_price,vehicle_type,description,username,add_date) VALUES(?,?,?,?,?,?,?,?,CURDATE())";
        String colorSql = "INSERT INTO VehicleColor(vin,color) VALUES (?,?)";
        jdbcTemplate.update(vehicleSql, vehicle.getVin(), vehicle.getModelYear(), vehicle.getModelName(), manufacturerID, vehicle.getInvoicePrice(), vehicle.getVehicleType(), vehicle.getDescription(), vehicle.getUsername());
        jdbcTemplate.batchUpdate(colorSql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                String color = vehicle.getColor().get(i);
                ps.setString(1, vehicle.getVin());
                ps.setString(2, color);
            }

            @Override
            public int getBatchSize() {
                return vehicle.getColor().size();
            }
        });
    }


    private List<Vehicle> getVehicles(String sql) {
        return jdbcTemplate.query(sql, rs -> {
            Map<String, Vehicle> vehicleMap = new HashMap<String, Vehicle>();
            while (rs.next()) {
                Vehicle v = null;
                v = vehicleMap.get(rs.getString("vin"));
                if (v == null) {
                    Vehicle vehicle = new Vehicle();
                    vehicleVariableSetter(rs, vehicle);
                    vehicle.getColor().add(rs.getString("color"));
                    vehicleMap.put(rs.getString("vin"), vehicle);
                } else {
                    v.getColor().add(rs.getString("color"));
                }
            }
            return vehicleMap.values().stream().collect(Collectors.toList());
        });
    }

    private List<Vehicle> getVehiclesByArgs(String sql, Object[] args) {
        return jdbcTemplate.query(sql, rs -> {
            Map<String, Vehicle> vehicleMap = new HashMap<String, Vehicle>();
            while (rs.next()) {
                Vehicle v = null;
                v = vehicleMap.get(rs.getString("vin"));
                if (v == null) {
                    Vehicle vehicle = new Vehicle();
                    vehicleVariableSetter(rs, vehicle);
                    vehicle.getColor().add(rs.getString("color"));
                    vehicleMap.put(rs.getString("vin"), vehicle);
                } else {
                    v.getColor().add(rs.getString("color"));
                }
            }
            return vehicleMap.values().stream().collect(Collectors.toList());
        }, args);
    }

    private void vehicleVariableSetter(ResultSet rs, Vehicle vehicle) throws SQLException {
        vehicle.setVin(rs.getString("vin"));
        vehicle.setModelYear(rs.getInt("model_year"));
        vehicle.setModelName(rs.getString("model_name"));
        vehicle.setManufacturerName(rs.getString("manufacturer_name"));
        vehicle.setInvoicePrice(rs.getDouble("invoice_price"));
        vehicle.setVehicleType(rs.getString("vehicle_type"));
        vehicle.setDescription(rs.getString("description"));
        vehicle.setUsername(rs.getString("username"));
        vehicle.setAddDate(rs.getDate("add_date"));
    }
}
