package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class PartDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Part getPartByVinStartDateAndPartNumber(String vin, Date startDate, String partNumber) {
        String sql = "SELECT vin,start_date,part_number,vendor_name,quantity,price FROM Part WHERE vin=? AND start_date=? AND part_number=?";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            return new Part(vin, startDate, partNumber, rs.getString("vendor_name"), rs.getInt("quantity"), rs.getDouble("price"));
        }, vin, startDate, partNumber);
    }

    public List<Part> getPartsByVinAndStartDate(String vin, Date startDate) {
        String sql = "SELECT vin,start_date,part_number,vendor_name,quantity,price FROM Part WHERE vin=? AND start_date=?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Part part = new Part();
            part.setVin(rs.getString("vin"));
            part.setStartDate(rs.getDate("start_date"));
            part.setPartNumber(rs.getString("part_number"));
            part.setVendorName(rs.getString("vendor_name"));
            part.setQuantity(rs.getInt("quantity"));
            part.setPrice(rs.getDouble("price"));
            return part;
        }, vin, startDate);
    }

    public void createPart(Part part) {
        String sql = "INSERT INTO Part(vin,start_date,part_number,vendor_name,quantity,price) VALUES (?,?,?,?,?,?)";
        jdbcTemplate.update(sql, part.getVin(), part.getStartDate(), part.getPartNumber(), part.getVendorName(), part.getQuantity(), part.getPrice());
    }
}
