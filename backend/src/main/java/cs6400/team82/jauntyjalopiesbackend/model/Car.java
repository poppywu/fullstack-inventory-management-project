package cs6400.team82.jauntyjalopiesbackend.model;

import java.util.Date;
import java.util.List;

public class Car extends Vehicle {
    private Integer numDoors;

    public Car() {
        super();
    }

    public Car(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, Integer numDoors) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username);
        this.numDoors = numDoors;
    }

    public Car(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, Date addDate, Integer numDoors) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username, addDate);
        this.numDoors = numDoors;
    }

    public Integer getNumDoors() {
        return numDoors;
    }

    public void setNumDoors(Integer numDoors) {
        this.numDoors = numDoors;
    }

}
