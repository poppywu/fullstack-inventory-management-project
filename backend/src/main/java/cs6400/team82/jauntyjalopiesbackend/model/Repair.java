package cs6400.team82.jauntyjalopiesbackend.model;

import java.util.Date;

public class Repair {
    private String vin;
    private Date startDate;
    private String username;
    private String customerID;
    private Date finishDate = null;
    private Double laborCharge = 0.;
    private Integer odometer;
    private String description;

    public Repair() {
    }

    public Repair(String vin, Date startDate, String username, String customerID, Date finishDate, Double laborCharge, Integer odometer, String description) {
        this.vin = vin;
        this.startDate = startDate;
        this.username = username;
        this.customerID = customerID;
        this.finishDate = finishDate;
        this.laborCharge = laborCharge;
        this.odometer = odometer;
        this.description = description;
    }

    public Repair(String vin, String username, String customerID, Integer odometer, String description) {
        this.vin = vin;
        this.username = username;
        this.customerID = customerID;
        this.odometer = odometer;
        this.description = description;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public Double getLaborCharge() {
        return laborCharge;
    }

    public void setLaborCharge(Double laborCharge) {
        this.laborCharge = laborCharge;
    }

    public Integer getOdometer() {
        return odometer;
    }

    public void setOdometer(Integer odometer) {
        this.odometer = odometer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
