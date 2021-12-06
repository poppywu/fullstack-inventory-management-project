package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.Sale;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class SaleDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createSale(Sale sale) {
        String sql = "INSERT INTO Sale(username,vin,customerID,purchase_date,sold_price) VALUES(?,?,?,CURDATE(),?)";
        jdbcTemplate.update(sql, sale.getUsername(), sale.getVin(), sale.getCustomerID(), sale.getSoldPrice());
    }

    public List<Map<String, Object>> getSaleDetailByVin(String vin) {
        String sql = "SELECT U.first_name AS salesperson_fname,U.last_name AS salesperson_lname,S.vin,IFNULL(I.first_name,B.business_name) AS first_name,IFNULL(I.last_name,B.primary_contact_name) AS last_name,C.email_address,C.phone_number,C.street_address,C.city,C.state,C.postcode,S.purchase_date,S.sold_price FROM Sale AS S INNER JOIN User AS U ON U.username=S.username INNER JOIN Customer C on S.customerID = C.customerID LEFT JOIN Business B on C.customerID = B.customerID LEFT JOIN Individual I on C.customerID = I.customerID WHERE vin=?";
        return jdbcTemplate.queryForList(sql, vin);
    }
}
