package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.BusinessCustomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class BusinessCustomerDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public BusinessCustomerDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public BusinessCustomer getByTin(String id) {
        String sql = "SELECT B.tin,B.business_name,B.primary_contact_name,B.primary_contact_title,C.email_address,C.phone_number, C.street_address,C.city,C.state,C.postcode  FROM Business AS B INNER JOIN Customer AS C ON B.customerID = C.customerID WHERE B.tin=?";
        BusinessCustomer result = jdbcTemplate.queryForObject(sql, (rs, rowNumber) -> {
            BusinessCustomer businessCustomer = new BusinessCustomer();
            businessCustomer.setTin(rs.getString("tin"));
            businessCustomer.setBusinessName(rs.getString("business_name"));
            businessCustomer.setPrimaryContactName(rs.getString("primary_contact_name"));
            businessCustomer.setPrimaryContactTitle(rs.getString("primary_contact_title"));
            businessCustomer.setEmailAddress(rs.getString("email_address"));
            businessCustomer.setPhoneNumber(rs.getString("phone_number"));
            businessCustomer.setStreetAddress(rs.getString("street_address"));
            businessCustomer.setCity(rs.getString("city"));
            businessCustomer.setState(rs.getString("state"));
            businessCustomer.setPostcode(rs.getString("postcode"));
            return businessCustomer;
        }, id);
        return result;
    }

    public void createBusinessCustomer(BusinessCustomer businessCustomer) {
        String customerSql = "INSERT INTO Customer(customerID,email_address,phone_number,street_address,city,state,postcode)VALUES(?,?,?,?,?,?,?)";
        String businessSql = "INSERT INTO Business(tin,customerID,business_name,primary_contact_name,primary_contact_title) VALUES(?,?,?,?,?);";
        jdbcTemplate.update(customerSql, businessCustomer.getTin(), businessCustomer.getEmailAddress(), businessCustomer.getPhoneNumber(), businessCustomer.getStreetAddress(), businessCustomer.getCity(), businessCustomer.getState(), businessCustomer.getPostcode());
        jdbcTemplate.update(businessSql, businessCustomer.getTin(), businessCustomer.getTin(), businessCustomer.getBusinessName(), businessCustomer.getPrimaryContactName(), businessCustomer.getPrimaryContactTitle());
    }
}
