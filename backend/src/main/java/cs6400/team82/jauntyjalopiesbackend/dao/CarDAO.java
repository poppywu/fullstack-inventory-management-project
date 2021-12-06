package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.Car;
import cs6400.team82.jauntyjalopiesbackend.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CarDAO extends VehicleDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public CarDAO(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
        this.jdbcTemplate = jdbcTemplate;
    }

    public Car getByCarId(String id) {
        Vehicle vehicle = getByVin(id);
        String sql = "SELECT num_doors FROM Car WHERE vin = ?";
        Car result = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            Car car = new Car();
            car.setNumDoors(rs.getInt("num_doors"));
            return car;
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

    public void createCar(Car car) {
        Vehicle vehicle = new Vehicle(car.getVin(), car.getModelYear(), car.getModelName(), car.getManufacturerName(), car.getColor(), car.getInvoicePrice(), car.getVehicleType(), car.getDescription(), car.getUsername(), car.getAddDate());
        createVehicle(vehicle);
        String carSql = "INSERT INTO Car(vin, num_doors) VALUES(?,?)";
        jdbcTemplate.update(carSql, car.getVin(), car.getNumDoors());
    }
}
