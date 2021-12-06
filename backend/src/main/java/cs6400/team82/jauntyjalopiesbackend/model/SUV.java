package cs6400.team82.jauntyjalopiesbackend.model;

import java.util.Date;
import java.util.List;

public class SUV extends Vehicle {
    private String drivetrainType;
    private Integer numCupholders;

    public SUV() {
        super();
    }

    public SUV(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, String drivetrainType, Integer numCupholders) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username);
        this.drivetrainType = drivetrainType;
        this.numCupholders = numCupholders;
    }

    public SUV(String vin, Integer modelYear, String modelName, String manufacturerName, List<String> color, Double invoicePrice, String vehicleType, String description, String username, Date addDate, String drivetrainType, Integer numCupholders) {
        super(vin, modelYear, modelName, manufacturerName, color, invoicePrice, vehicleType, description, username, addDate);
        this.drivetrainType = drivetrainType;
        this.numCupholders = numCupholders;
    }

    public String getDrivetrainType() {
        return drivetrainType;
    }

    public void setDrivetrainType(String drivetrainType) {
        this.drivetrainType = drivetrainType;
    }

    public Integer getNumCupholders() {
        return numCupholders;
    }

    public void setNumCupholders(Integer numCupholders) {
        this.numCupholders = numCupholders;
    }

}
