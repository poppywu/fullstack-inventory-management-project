package cs6400.team82.jauntyjalopiesbackend.model;

import java.util.Date;
import java.util.List;

public class Van extends Vehicle {
    private Boolean hasDriversideBackdoor;

    public Van() {
        super();
    }

    public Van(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, Date addDate, Boolean hasDriversideBackdoor) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username, addDate);
        this.hasDriversideBackdoor = hasDriversideBackdoor;
    }

    public Van(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, Boolean hasDriversideBackdoor) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username);
        this.hasDriversideBackdoor = hasDriversideBackdoor;
    }

    public Boolean getHasDriversideBackdoor() {
        return hasDriversideBackdoor;
    }

    public void setHasDriversideBackdoor(Boolean hasDriversideBackdoor) {
        this.hasDriversideBackdoor = hasDriversideBackdoor;
    }

}
