package cs6400.team82.jauntyjalopiesbackend.model;

import java.util.Date;
import java.util.List;

public class Convertible extends Vehicle {
    private String roofType;
    private Integer backseatCount;

    public Convertible() {
        super();
    }

    public Convertible(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, String roofType, Integer backseatCount) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username);
        this.roofType = roofType;
        this.backseatCount = backseatCount;
    }

    public Convertible(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, Date addDate, String roofType, Integer backseatCount) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username, addDate);
        this.roofType = roofType;
        this.backseatCount = backseatCount;
    }

    public String getRoofType() {
        return roofType;
    }

    public void setRoofType(String roofType) {
        this.roofType = roofType;
    }

    public Integer getBackseatCount() {
        return backseatCount;
    }

    public void setBackseatCount(Integer backseatCount) {
        this.backseatCount = backseatCount;
    }

}
