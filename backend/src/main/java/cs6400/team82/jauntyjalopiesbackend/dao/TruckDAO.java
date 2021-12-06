package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.Truck;
import cs6400.team82.jauntyjalopiesbackend.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TruckDAO extends VehicleDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public TruckDAO(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
        this.jdbcTemplate = jdbcTemplate;
    }

    public Truck getByTruckId(String id) {
        Vehicle vehicle = getByVin(id);
        String sql = "SELECT cargo_cover_type,num_rear_axles,cargo_capacity FROM Truck WHERE vin = ?";
        Truck result = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            Truck truck = new Truck();
            truck.setCargoCapacity(rs.getInt("cargo_capacity"));
            truck.setCargoCoverType(rs.getString("cargo_cover_type"));
            truck.setNumRearAxles(rs.getInt("num_rear_axles"));
            return truck;
        }, id);
        result.setVin(vehicle.getVin());
        result.setModelYear(vehicle.getModelYear());
        result.setModelName(vehicle.getModelName());
        result.setColor(vehicle.getColor());
        result.setManufacturerName(vehicle.getManufacturerName());
        result.setInvoicePrice(vehicle.getInvoicePrice());
        result.setVehicleType(vehicle.getVehicleType());
        result.setDescription(vehicle.getDescription());
        result.setUsername(vehicle.getUsername());
        result.setAddDate(vehicle.getAddDate());
        return result;
    }

    public void createTruck(Truck truck) {
        Vehicle vehicle = new Vehicle(truck.getVin(), truck.getModelYear(), truck.getModelName(), truck.getManufacturerName(), truck.getColor(), truck.getInvoicePrice(), truck.getVehicleType(), truck.getDescription(), truck.getUsername(), truck.getAddDate());
        createVehicle(vehicle);
        String truckSql = "INSERT INTO Truck(vin,cargo_cover_type,cargo_capacity,num_rear_axles) VALUES(?,?,?,?)";
        jdbcTemplate.update(truckSql, truck.getVin(), truck.getCargoCoverType(), truck.getCargoCapacity(), truck.getNumRearAxles());

    }
}
