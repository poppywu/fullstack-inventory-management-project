package cs6400.team82.jauntyjalopiesbackend.model;

import java.util.Date;

public class Sale {
    private String username;
    private String vin;
    private String customerID;
    private Date purchaseDate;
    private Double soldPrice;

    public Sale() {
    }

    public Sale(String username, String vin, String customerID, Date purchaseDate, Double soldPrice) {
        this.username = username;
        this.vin = vin;
        this.customerID = customerID;
        this.purchaseDate = purchaseDate;
        this.soldPrice = soldPrice;
    }

    public Sale(String username, String vin, String customerID, Double soldPrice) {
        this.username = username;
        this.vin = vin;
        this.customerID = customerID;
        this.soldPrice = soldPrice;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public Double getSoldPrice() {
        return soldPrice;
    }

    public void setSoldPrice(Double soldPrice) {
        this.soldPrice = soldPrice;
    }
}
