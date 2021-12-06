package cs6400.team82.jauntyjalopiesbackend.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Vehicle {
    private String vin;
    private Integer modelYear;
    private String modelName;
    private String manufacturerName;
    private List<String> color = new ArrayList<String>();
    private Double invoicePrice;
    private String vehicleType;
    private String description;
    private String username;
    private Date addDate;

    public Vehicle() {
    }

    public Vehicle(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username) {
        this.vin = vin;
        this.modelYear = modelYear;
        this.modelName = modelName;
        this.manufacturerName = manufacturerName;
        this.color = color;
        this.invoicePrice = invoicePrice;
        this.vehicleType = vehicleType;
        this.description = description;
        this.username = username;
    }

    public Vehicle(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, Date addDate) {
        this.vin = vin;
        this.modelYear = modelYear;
        this.modelName = modelName;
        this.manufacturerName = manufacturerName;
        this.color = color;
        this.invoicePrice = invoicePrice;
        this.vehicleType = vehicleType;
        this.description = description;
        this.username = username;
        this.addDate = addDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public Integer getModelYear() {
        return modelYear;
    }

    public void setModelYear(Integer modelYear) {
        this.modelYear = modelYear;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName;
    }

    public Double getInvoicePrice() {
        return invoicePrice;
    }

    public void setInvoicePrice(Double invoicePrice) {
        this.invoicePrice = invoicePrice;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public List<String> getColor() {
        return color;
    }

    public void setColor(List<String> color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
