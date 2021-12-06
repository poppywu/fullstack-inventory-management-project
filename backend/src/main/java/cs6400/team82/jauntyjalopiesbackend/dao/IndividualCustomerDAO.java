package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.IndividualCustomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class IndividualCustomerDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public IndividualCustomerDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public IndividualCustomer getByDriverLicense(String id) {
        String sql = "SELECT I.driver_license,I.first_name,I.last_name,C.email_address,C.phone_number, C.street_address, C.city,C.state,C.postcode FROM Individual AS I INNER JOIN Customer AS C ON I.customerID = C.customerID WHERE I.driver_license=?";
        IndividualCustomer result = jdbcTemplate.queryForObject(sql, (rs, rowNumber) -> {
            IndividualCustomer individualCustomer = new IndividualCustomer();
            individualCustomer.setDriverLicense(rs.getString("driver_license"));
            individualCustomer.setFirstName(rs.getString("first_name"));
            individualCustomer.setLastName(rs.getString("last_name"));
            individualCustomer.setEmailAddress(rs.getString("email_address"));
            individualCustomer.setPhoneNumber(rs.getString("phone_number"));
            individualCustomer.setStreetAddress(rs.getString("street_address"));
            individualCustomer.setCity(rs.getString("city"));
            individualCustomer.setState(rs.getString("state"));
            individualCustomer.setPostcode(rs.getString("postcode"));
            return individualCustomer;
        }, id);
        return result;
    }


    public void createIndividualCustomer(IndividualCustomer individualCustomer) {
        String individualSql = "INSERT INTO Individual(driver_license,customerID,first_name,last_name) VALUES(?,?,?,?)";
        String customerSql = "INSERT INTO Customer(customerID, email_address, phone_number,street_address,city,state,postcode) VALUES(?, ?, ?,?,?,?,?)";
        jdbcTemplate.update(customerSql, individualCustomer.getDriverLicense(), individualCustomer.getEmailAddress(), individualCustomer.getPhoneNumber(), individualCustomer.getStreetAddress(), individualCustomer.getCity(), individualCustomer.getState(), individualCustomer.getPostcode());
        jdbcTemplate.update(individualSql, individualCustomer.getDriverLicense(), individualCustomer.getDriverLicense(), individualCustomer.getFirstName(), individualCustomer.getLastName());
    }
}
