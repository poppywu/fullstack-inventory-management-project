CREATE TABLE IF NOT EXISTS `User`(
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);


CREATE TABLE IF NOT EXISTS Manufacturer(
    manufacturerID INT NOT NULL,
    manufacturer_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(manufacturerID)
);

CREATE TABLE IF NOT EXISTS Vehicle (
    vin VARCHAR(50) NOT NULL,
    model_year INT NOT NULL,
    model_name VARCHAR(50) NOT NULL,
    manufacturerID INT NOT NULL,
    invoice_price DECIMAL(10,2) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL,
    username VARCHAR(50) NOT NULL,
    add_date DATE NOT NULL,
    PRIMARY KEY (vin),
    FOREIGN KEY (manufacturerID) REFERENCES Manufacturer(manufacturerID)
);

CREATE TABLE IF NOT EXISTS ColorList(
    color VARCHAR(50) NOT NULL,
    PRIMARY KEY (color)
);

CREATE TABLE IF NOT EXISTS VehicleColor (
    vin VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    PRIMARY KEY(vin, color),
    FOREIGN KEY (vin) REFERENCES Vehicle(vin)
);


CREATE TABLE IF NOT EXISTS TypeList(
    vehicle_type varchar(50) NOT NULL,
    PRIMARY KEY(vehicle_type)
);

CREATE TABLE IF NOT EXISTS Car (
    vin VARCHAR(50) NOT NULL,
    num_doors INT NOT NULL,
    PRIMARY KEY (vin),
    FOREIGN KEY (vin) REFERENCES Vehicle (vin)
);

CREATE TABLE IF NOT EXISTS Van (
    vin VARCHAR(50) NOT NULL,
    has_driver_side_back_door BOOLEAN NOT NULL,
    PRIMARY KEY (vin),
    FOREIGN KEY (vin) REFERENCES Vehicle(vin)
);

CREATE TABLE IF NOT EXISTS Truck (
    vin VARCHAR(50) NOT NULL,
    cargo_cover_type VARCHAR(50) NULL,
    num_rear_axles INT NOT NULL,
    cargo_capacity INT NOT NULL,
    PRIMARY KEY (vin),
    FOREIGN KEY (vin) REFERENCES Vehicle (vin)
);

CREATE TABLE IF NOT EXISTS SUV (
    vin VARCHAR(50) NOT NULL,
    drivetrain_type VARCHAR(50) NOT NULL,
    num_cupholders INT NOT NULL,
    PRIMARY KEY (vin),
    FOREIGN KEY (vin) REFERENCES Vehicle (vin)
);

CREATE TABLE IF NOT EXISTS Convertible (
    vin VARCHAR(50) NOT NULL,
    roof_type VARCHAR(50) NOT NULL,
    back_seat_count INT NOT NULL,
    PRIMARY KEY (vin),
    FOREIGN KEY (vin) REFERENCES Vehicle (vin)
);

CREATE TABLE IF NOT EXISTS Customer (
    customerID VARCHAR(50) NOT NULL,
    email_address VARCHAR(50) NULL,
    phone_number VARCHAR(50) NOT NULL,
    street_address VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postcode VARCHAR(50) NOT NULL,
    PRIMARY KEY (customerID)
);

CREATE TABLE IF NOT EXISTS Individual (
    driver_license VARCHAR(50) NOT NULL,
    customerID VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (driver_license),
    FOREIGN KEY (customerID) REFERENCES Customer(customerID)
);

CREATE TABLE IF NOT EXISTS Business (
    tin VARCHAR(50) NOT NULL,
    customerID VARCHAR(50) NOT NULL,
    business_name VARCHAR(50) NOT NULL,
    primary_contact_name VARCHAR(50) NOT NULL,
    primary_contact_title VARCHAR(50) NOT NULL,
    PRIMARY KEY(tin),
    FOREIGN KEY (customerID) REFERENCES Customer(customerID)
);


CREATE TABLE IF NOT EXISTS Sale(
    username VARCHAR(50) NOT NULL,
    vin VARCHAR(50) NOT NULL,
    customerID VARCHAR(50) NOT NULL,
    purchase_date DATE NOT NULL,
    sold_price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (username, vin, customerID),
    FOREIGN KEY (customerID) REFERENCES Customer (customerID),
    FOREIGN KEY (vin) REFERENCES Vehicle (vin)
);

CREATE TABLE IF NOT EXISTS Repair(
    vin VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    username VARCHAR (50) NOT NULL,
    customerID VARCHAR (50) NOT NULL,
    finish_date DATE NULL,
    labor_charge DECIMAL(10,2) NOT NULL DEFAULT 0,
    odometer INT NOT NULL,
    description VARCHAR (255) NULL,
    PRIMARY KEY (vin, start_date),
    FOREIGN KEY (vin) REFERENCES Vehicle (vin),
    FOREIGN KEY (customerID) REFERENCES Customer (customerID)
);

CREATE TABLE IF NOT EXISTS Part (
    vin VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    part_number VARCHAR(50) NOT NULL,
    vendor_name VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (vin, start_date, part_number),
    FOREIGN KEY (vin, start_date) REFERENCES Repair(vin,start_date)  
);
