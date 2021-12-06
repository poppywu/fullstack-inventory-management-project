package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.Repair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public class RepairDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Repair getRepairByVinAndStartdate(String vin, Date startDate) {
        String sql = "SELECT vin,start_date,username,customerID,finish_date,labor_charge,odometer,description FROM Repair WHERE vin=? AND start_date=?";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            return new Repair(
                    rs.getString("vin"),
                    rs.getDate("start_date"),
                    rs.getString("username"),
                    rs.getString("customerID"),
                    rs.getDate("finish_date"),
                    rs.getDouble("labor_charge"),
                    rs.getInt("odometer"),
                    rs.getString("description")
            );
        }, vin, startDate);
    }

    public List<Map<String, Object>> getRepairsByVin(String vin) {
        String sql = "SELECT RD.vin, RD.start_date, RD.service_writer_fname, RD.service_writer_lname, RD.first_name, RD.last_name, RD.email_address, RD.phone_number, RD.street_address, RD.city, RD.state, RD.postcode, RD.finish_date, RD.labor_charge, RD.odometer, RD.description, PC.total_parts " +
                "FROM (SELECT R.vin,R.start_date,U.first_name AS service_writer_fname,U.last_name AS service_writer_lname,IFNULL(I.first_name,B.business_name) AS first_name,IFNULL(I.last_name,B.primary_contact_name) AS last_name,C.email_address,C.phone_number,C.street_address,C.city,C.state,C.postcode,R.finish_date,R.labor_charge,R.odometer,R.description FROM Repair AS R LEFT JOIN User U on R.username = U.username LEFT JOIN Customer C ON C.customerID=R.customerID LEFT JOIN Individual I on C.customerID = I.customerID LEFT JOIN Business B on C.customerID = B.customerID) AS RD " +
                "LEFT JOIN (SELECT R.vin,R.start_date,IFNULL(SUM(P.price * P.quantity),0) AS total_parts FROM Repair R LEFT JOIN Part P ON R.vin = P.vin AND R.start_date = P.start_date GROUP BY R.vin,R.start_date ) AS PC ON PC.vin=RD.vin AND PC.start_date=RD.start_date\n" +
                "WHERE PC.vin=?" +
                "ORDER BY PC.start_date DESC";
        return jdbcTemplate.queryForList(sql, vin);
    }

    public List<Repair> getActiveRepairs(String vin) {
        String sql = "SELECT vin,start_date,username,customerID,finish_date,labor_charge,odometer,description FROM Repair WHERE finish_date IS NULL AND vin=?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            return new Repair(rs.getString("vin"), rs.getDate("start_date"), rs.getString("username"), rs.getString("customerID"), rs.getDate("finish_date"), rs.getDouble("labor_charge"), rs.getInt("odometer"), rs.getString("description"));
        }, vin);
    }

    public void addRepair(Repair repair) {
        String sql = "INSERT INTO Repair(vin,start_date,username,customerID,finish_date,labor_charge,odometer,description)VALUES(?,CURRENT_DATE(),?,?,?,?,?,?)";
        jdbcTemplate.update(sql, repair.getVin(), repair.getUsername(), repair.getCustomerID(), null, 0., repair.getOdometer(), repair.getDescription());
    }

    public void updateLaborCharge(String vin, Date startDate, Double laborCharge) {
        String sql = "UPDATE Repair SET labor_charge=? WHERE vin=? AND start_date=?";
        jdbcTemplate.update(sql, laborCharge, vin, startDate);
    }

    public void finishRepair(String vin, Date startDate) {
        String sql = "UPDATE Repair SET finish_date=CURRENT_DATE() WHERE vin=? AND start_date=?";
        jdbcTemplate.update(sql, vin, startDate);
    }

    public List<Map<String, Object>> getRepairParts(Repair repair) {
        String sql = "SELECT vin, start_date, part_number, vendor_name, quantity, price " + 
            " FROM Part WHERE vin=? AND start_date=? ";
        return jdbcTemplate.queryForList(sql, repair.getVin(), repair.getStartDate());
    }

}
