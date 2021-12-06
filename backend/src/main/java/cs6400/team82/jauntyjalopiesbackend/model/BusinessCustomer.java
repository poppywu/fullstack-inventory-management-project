package cs6400.team82.jauntyjalopiesbackend.model;

public class BusinessCustomer {
    private String tin;
    private String businessName;
    private String primaryContactName;
    private String primaryContactTitle;
    private String emailAddress;
    private String phoneNumber;
    private String streetAddress;
    private String city;
    private String state;
    private String postcode;

    public BusinessCustomer() {
    }


    public BusinessCustomer(String tin, String businessName, String primaryContactName, String primaryContactTitle, String emailAddress, String phoneNumber, String streetAddress, String city, String state, String postcode) {
        this.tin = tin;
        this.businessName = businessName;
        this.primaryContactName = primaryContactName;
        this.primaryContactTitle = primaryContactTitle;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.postcode = postcode;
    }


    public String getTin() {
        return tin;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getPrimaryContactName() {
        return primaryContactName;
    }

    public void setPrimaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
    }

    public String getPrimaryContactTitle() {
        return primaryContactTitle;
    }

    public void setPrimaryContactTitle(String primaryContactTitle) {
        this.primaryContactTitle = primaryContactTitle;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }
}