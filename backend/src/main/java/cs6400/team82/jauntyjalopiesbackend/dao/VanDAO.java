package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.Van;
import cs6400.team82.jauntyjalopiesbackend.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class VanDAO extends VehicleDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public VanDAO(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
        this.jdbcTemplate = jdbcTemplate;
    }

    public Van getByVanId(String id) {
        Vehicle vehicle = getByVin(id);
        String sql = "SELECT has_driver_side_back_door FROM Van WHERE vin = ?";

        Van result = jdbcTemplate.queryForObject(sql, (rs, rowNUmber) -> {
            Van van = new Van();
            van.setHasDriversideBackdoor(rs.getBoolean("has_driver_side_back_door"));
            return van;
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

    public void createVan(Van van) {
        Vehicle vehicle = new Vehicle(van.getVin(), van.getModelYear(), van.getModelName(), van.getManufacturerName(), van.getColor(), van.getInvoicePrice(), van.getVehicleType(), van.getDescription(), van.getUsername(), van.getAddDate());
        createVehicle(vehicle);
        String vanSql = "INSERT INTO Van(vin, has_driver_side_back_door)VALUES(?,?)";
        jdbcTemplate.update(vanSql, van.getVin(), van.getHasDriversideBackdoor());
    }
}
