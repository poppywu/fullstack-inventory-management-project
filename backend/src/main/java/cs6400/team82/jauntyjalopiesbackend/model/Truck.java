package cs6400.team82.jauntyjalopiesbackend.model;

import java.util.Date;
import java.util.List;

public class Truck extends Vehicle {
    private String cargoCoverType;
    private Integer numRearAxles;
    private Integer cargoCapacity;

    public Truck() {
    }

    public Truck(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, Date addDate, String cargoCoverType, Integer numRearAxles, Integer cargoCapacity) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username, addDate);
        this.cargoCoverType = cargoCoverType;
        this.numRearAxles = numRearAxles;
        this.cargoCapacity = cargoCapacity;
    }

    public Truck(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, String cargoCoverType, Integer numRearAxles, Integer cargoCapacity) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username);
        this.cargoCoverType = cargoCoverType;
        this.numRearAxles = numRearAxles;
        this.cargoCapacity = cargoCapacity;
    }

    public String getCargoCoverType() {
        return cargoCoverType;
    }

    public void setCargoCoverType(String cargoCoverType) {
        this.cargoCoverType = cargoCoverType;
    }

    public Integer getNumRearAxles() {
        return numRearAxles;
    }

    public void setNumRearAxles(Integer numRearAxles) {
        this.numRearAxles = numRearAxles;
    }

    public Integer getCargoCapacity() {
        return cargoCapacity;
    }

    public void setCargoCapacity(Integer cargoCapacity) {
        this.cargoCapacity = cargoCapacity;
    }


}
