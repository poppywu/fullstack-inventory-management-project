package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.Convertible;
import cs6400.team82.jauntyjalopiesbackend.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ConvertibleDAO extends VehicleDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public ConvertibleDAO(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
        this.jdbcTemplate = jdbcTemplate;
    }

    public Convertible getByConvertibleId(String id) {
        Vehicle vehicle = getByVin(id);
        String sql = "SELECT roof_type,back_seat_count FROM Convertible WHERE vin = ?";
        Convertible result = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            Convertible convertible = new Convertible();
            convertible.setRoofType(rs.getString("roof_type"));
            convertible.setBackseatCount(rs.getInt("back_seat_count"));
            return convertible;
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

    public void createConvertible(Convertible convertible) {
        Vehicle vehicle = new Vehicle(convertible.getVin(), convertible.getModelYear(), convertible.getModelName(), convertible.getManufacturerName(), convertible.getColor(), convertible.getInvoicePrice(), convertible.getVehicleType(), convertible.getDescription(), convertible.getUsername(), convertible.getAddDate());
        createVehicle(vehicle);
        String convertibleSql = "INSERT INTO Convertible(vin, roof_type, back_seat_count) VALUES(?,?,?)";
        jdbcTemplate.update(convertibleSql, convertible.getVin(), convertible.getRoofType(), convertible.getBackseatCount());
    }
}
