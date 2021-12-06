package cs6400.team82.jauntyjalopiesbackend.model;

import java.util.Date;

public class Part {
    private String vin;
    private Date startDate;
    private String partNumber;
    private String vendorName;
    private Integer quantity;
    private Double price;

    public Part() {
    }

    public Part(String vin, Date startDate, String partNumber, String vendorName, Integer quantity, Double price) {
        this.vin = vin;
        this.startDate = startDate;
        this.partNumber = partNumber;
        this.vendorName = vendorName;
        this.quantity = quantity;
        this.price = price;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getPartNumber() {
        return partNumber;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
