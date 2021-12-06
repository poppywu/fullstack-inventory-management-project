package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.SUV;
import cs6400.team82.jauntyjalopiesbackend.model.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class SUVDAO extends VehicleDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public SUVDAO(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
        this.jdbcTemplate = jdbcTemplate;
    }

    public SUV getBySUVId(String id) {
        Vehicle vehicle = getByVin(id);
        String sql = "SELECT drivetrain_type,num_cupholders FROM SUV WHERE vin = ?";
        SUV result = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            SUV suv = new SUV();
            suv.setDrivetrainType(rs.getString("drivetrain_type"));
            suv.setNumCupholders(rs.getInt("num_cupholders"));
            return suv;
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

    public void createSUV(SUV suv) {
        Vehicle vehicle = new Vehicle(suv.getVin(), suv.getModelYear(), suv.getModelName(), suv.getManufacturerName(), suv.getColor(), suv.getInvoicePrice(), suv.getVehicleType(), suv.getDescription(), suv.getUsername(), suv.getAddDate());
        createVehicle(vehicle);
        String SUVSql = "INSERT INTO SUV(vin, drivetrain_type, num_cupholders) VALUES(?,?,?)";
        jdbcTemplate.update(SUVSql, suv.getVin(), suv.getDrivetrainType(), suv.getNumCupholders());

    }
}
