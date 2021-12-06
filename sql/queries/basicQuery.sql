/*get login credentials from User, $username is the input from front end appliaction*/
SELECT password
FROM `User`
WHERE username = '$username';

/*search by customer*/

/*query unsold vehicle by vehicle type for customer*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.vehicle_type='$vehicle_type' AND V.vin NOT IN (SELECT vin FROM Sale)
ORDER BY V.vin ASC;

/*query unsold vehicle by manufacturerID for customer*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.manufacturerID='$manufacturerID' AND V.vin NOT IN (SELECT vin FROM Sale)
ORDER BY V.vin ASC;

/*query unsold vehicle by model year for customer*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.model_year='$model_year' AND V.vin NOT IN (SELECT vin FROM Sale)
ORDER BY V.vin ASC;

/*query unsold vehicle by color for customer*/  
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM VehicleColor AS VC INNER JOIN Vehicle AS V ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE VC.color='$color' AND V.vin NOT IN (SELECT vin FROM Sale)
ORDER BY V.vin ASC;

/*query unsold vehicle by max_list_price,upperbound*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.invoice_price*1.5<='$max_list_price' AND V.vin NOT IN (SELECT vin FROM Sale)
ORDER BY V.vin ASC;

/*query unsold vehicle by description for customer*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.description LIKE '%{$description}%' AND V.vin NOT IN (SELECT vin FROM Sale)
ORDER BY V.vin ASC;



/*search by user and return search result list*/

/*query all vehicle by vehicle type*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.vehicle_type='$vehicle_type'
ORDER BY V.vin ASC;

/*query all vehicle by manufacturerID*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.manufacturerID='$manufacturerID'
ORDER BY V.vin ASC;

/*query all vehicle by model year*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.model_year='$model_year'
ORDER BY V.vin ASC;

/*query all vehicle by color*/  
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM VehicleColor AS VC INNER JOIN Vehicle AS V ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE VC.color='$color'
ORDER BY V.vin ASC;

/*query all vehicle by max_list_price,upperbound*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.invoice_price*1.5<='$max_list_price'
ORDER BY V.vin ASC;

/*query vehicle by $vin*/
SELECT V.vin,M.manufacturer_name,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,VC.color,V.description
FROM Vehicle AS V INNER JOIN VehicleColor AS VC ON V.vin=VC.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID
WHERE V.vin='$vin';

/*display single vehicle details page by vin for different user*/

/*vehicle detail page for salesperson and service writer*/
/*1. first find the vehicle type of vin*/
SELECT vehicle_type
FROM Vehicle
WHERE vin='$vin';
/*2.query different table based on vehicle type*/
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,C.roof_type,C.back_seat_count,M.manufacturer_name,VC.color,V.description
From Convertible AS C INNER JOIN Vehicle AS V on C.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin
WHERE V.vin = '$vin';
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,C.num_doors,M.manufacturer_name,VC.color,V.description
FROM Car AS C INNER JOIN Vehicle AS V ON C.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin
WHERE V.vin = '$vin';
SELECT t2.vin,t2.model_year,t2.model_name,t2.invoice_price*1.5 AS list_price,t2.vehicle_type,t1.has_driver_side_back_door,M.manufacturer_name,VC.color,t2.description
FROM Van AS t1 INNER JOIN Vehicle AS t2 ON t1.vin = t2.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=t2.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=t2.vin
WHERE t2.vin = '$vin';
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,T.cargo_cover_type,T.num_rear_axles,T.cargo_capacity,M.manufacturer_name,VC.color,V.description
FROM Truck AS T INNER JOIN Vehicle AS V ON T.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin
WHERE V.vin = '$vin';
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.vehicle_type,S.drivetrain_type,S.num_cupholders,M.manufacturer_name,VC.color,V.description
FROM SUV AS S INNER JOIN Vehicle AS V ON S.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin
WHERE V.vin = '$vin';

/*vehicle detail page for inventory clerk*/
/*1. first find the vehicle type of vin*/
SELECT vehicle_type
FROM Vehicle
WHERE vin='$vin';
/*2.query different table based on vehicle type*/
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.invoice_price,V.vehicle_type,C.roof_type,C.back_seat_count,M.manufacturer_name,VC.color,V.description
From Convertible AS C INNER JOIN Vehicle AS V on C.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin
WHERE V.vin = '$vin';
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.invoice_price,V.vehicle_type,C.num_doors,M.manufacturer_name,VC.color,V.description
FROM Car AS C INNER JOIN Vehicle AS V ON C.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin
WHERE V.vin = '$vin';
SELECT t2.vin,t2.model_year,t2.model_name,t2.invoice_price*1.5 AS list_price,t2.invoice_price,t2.vehicle_type,t1.has_driver_side_back_door,M.manufacturer_name,VC.color,t2.description
FROM Van AS t1 INNER JOIN Vehicle AS t2 ON t1.vin = t2.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=t2.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=t2.vin
WHERE t2.vin = '$vin';
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.invoice_price,V.vehicle_type,T.cargo_cover_type,T.num_rear_axles,T.cargo_capacity,M.manufacturer_name,VC.color,V.description
FROM Truck AS T INNER JOIN Vehicle AS V ON T.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin
WHERE V.vin = '$vin';
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.invoice_price,V.vehicle_type,S.drivetrain_type,S.num_cupholders,M.manufacturer_name,VC.color,V.description
FROM SUV AS S INNER JOIN Vehicle AS V ON S.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin
WHERE V.vin = '$vin';

/*vehicle detail page for manager and roland*/
/*1.find the vehicle type*/
SELECT vehicle_type
FROM Vehicle
WHERE vin='$vin';
/*2.query different table based on vehicle type*/
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.invoice_price,V.vehicle_type,C.roof_type,C.back_seat_count,M.manufacturer_name,VC.color,V.description, V.add_date, U.first_name, U.last_name
From Convertible AS C INNER JOIN Vehicle AS V on C.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin INNER JOIN `User` AS U ON U.username=V.username
WHERE V.vin = '$vin';
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.invoice_price,V.vehicle_type,C.num_doors,M.manufacturer_name,VC.color,V.description,V.add_date, U.first_name, U.last_name
FROM Car AS C INNER JOIN Vehicle AS V ON C.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin INNER JOIN `User` AS U ON U.username=V.username
WHERE V.vin = '$vin';
SELECT t2.vin,t2.model_year,t2.model_name,t2.invoice_price*1.5 AS list_price,t2.invoice_price,t2.vehicle_type,t1.has_driver_side_back_door,M.manufacturer_name,VC.color,t2.description,t2.add_date, U.first_name, U.last_name
FROM Van AS t1 INNER JOIN Vehicle AS t2 ON t1.vin = t2.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=t2.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=t2.vin INNER JOIN `User` AS U ON U.username=t2.username
WHERE t2.vin = '$vin';
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.invoice_price,V.vehicle_type,T.cargo_cover_type,T.num_rear_axles,T.cargo_capacity,M.manufacturer_name,VC.color,V.description,V.add_date, U.first_name, U.last_name
FROM Truck AS T INNER JOIN Vehicle AS V ON T.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin INNER JOIN `User` AS U ON U.username=V.username
WHERE V.vin = '$vin';
SELECT V.vin,V.model_year,V.model_name,V.invoice_price*1.5 AS list_price,V.invoice_price,V.vehicle_type,S.drivetrain_type,S.num_cupholders,M.manufacturer_name,VC.color,V.description,V.add_date, U.first_name, U.last_name
FROM SUV AS S INNER JOIN Vehicle AS V ON S.vin = V.vin INNER JOIN Manufacturer AS M ON M.manufacturerID=V.manufacturerID INNER JOIN VehicleColor AS VC ON VC.vin=V.vin INNER JOIN `User` AS U ON U.username=V.username
WHERE V.vin = '$vin';
/*4.find if the vehicle has been sold*/
SELECT vin FROM Sale WHERE vin='$vin';
/*5.for sold vehicle, query sale related info*/
SELECT SV.vin, CONCAT(U.first_name,U.last_name) AS salesperson_name, SV.purchase_date,SV.sold_price, V.invoice_price*1.5 AS list_price, C.email_address, C.phone_number, C.street_address,C.city, C.state, C.postcode, I.first_name, I.last_name, B.business_name,B.primary_contact_name,B.primary_contact_title
FROM Sale AS SV INNER JOIN Vehicle AS V ON SV.vin=V.vin INNER JOIN `User` AS U ON SV.username=U.username INNER JOIN Customer AS C ON C.customerID=SV.customerID LEFT OUTER JOIN Individual AS I ON I.customerID=SV.customerID LEFT OUTER JOIN Business AS B ON B.customerID=SV.customerID 
WHERE SV.vin='$vin';
/*6. find if the vehicle has been repaired*/
SELECT vin FROM Repair WHERE vin='$vin';
/*7.TODO: for sold vehicle has been repaired, query repair related info*/
SELECT RV.vin, RV.start_date, RV.finish_date,AVG(RV.labor_charge) AS labor_charge, CONCAT(U.first_name,last_name) AS service_writer_name, IFNULL(B.business_name,CONCAT(I.first_name,I.last_name)) AS customer_name, IFNULL(SUM(quantity*price),0) AS parts_cost, labor_charge+parts_cost AS total_cost
FROM Repair AS RV INNER JOIN `User` AS U ON U.username=RV.username LEFT OUTER JOIN Individual AS I ON I.customerID=SV.customerID LEFT OUTER JOIN Business AS B ON B.customerID=SV.customerID LEFT OUTER JOIN Part AS P ON P.start_date=SV.start_date AND P.vin=SV.vin
WHERE RV.vin='$vin'
GROUP BY RV.vin,RV.start_date;


/*query number of unsold vehicles*/
SELECT COUNT(vin) AS num_of_unsold_vehicle
FROM Vehicle
WHERE vin NOT IN (SELECT vin FROM Sale);

/*query number of sold vehicles*/
SELECT COUNT(*) AS num_of_unsold_vehicle
FROM Sale;



/*look up individual customer by $driver_license*/
SELECT I.driver_license,I.first_name,I.last_name,C.email_address,C.phone_number
FROM Individual AS I INNER JOIN Customer AS C ON I.customerID = C.customerID
WHERE I.driver_license='$driver_license';

/*look up business customer by $tin*/
SELECT B.tin,B.business_name,B.primary_contact_name,B.primary_contact_title,C.email_address,C.phone_number
FROM Business AS B INNER JOIN Customer AS C ON B.customerID = C.customerID
WHERE B.tin='$tin';

/*add an individual customer*/
INSERT INTO Individual(driver_license,customerID,first_name,last_name)
VALUES('$driver_license','$customerID','$first_name','$last_name');
INSERT INTO Customer(customerID, email_address, phone_number)
VALUES('$customerID', '$email_address', '$phone_number');

/*add a business customer*/
INSERT INTO Business(tin,customerID,business_name,primary_contact_name,primary_contact_title)
VALUES('$tin','$customerID','$business_name','$primary_contact_name','$primary_contact_title');
INSERT INTO Customer(customerID, email_address, phone_number)
VALUES('$customerID', '$email_address', '$phone_number');

/*add vehicle*/
INSERT INTO Vehicle(vin,model_year,model_name,manufacturerID,invoice_price,vehicle_type,description)
VALUES('$vin','$model_year','$model_name','$manufacturerID','$invoice_price','$vehicle_type','$description','$username','$add_date');

/*add vehicle car type*/
INSERT INTO Car(vin, num_doors)
VALUES('$vin', '$num_doors');

/*add vehicle Convertible type*/
INSERT INTO Convertible(vin, roof_type, back_seat_count)
VALUES('$vin', '$roof_type', '$back_seat_count');

/*add vehicle SUV type*/
INSERT INTO SUV(vin, drivetrain_type, num_cupholders)
VALUES('$vin', '$drivetrain_type', '$num_cupholders');

/*add vehicle Truck type*/
INSERT INTO Truck(vin,cargo_cover_type,cargo_capacity,num_rear_axles)
VALUES('$vin','$cargo_cover_type','$cargo_capacity','$num_rear_axles');

/*add vehicle Van type*/
INSERT INTO Van(vin, has_driver_side_back_door)
VALUES('$vin', '$has_driver_side_back_door');

/*create procedure for insert color values of $length input*/
INSERT INTO VehicleColor(vin, color)
VALUES('$vin', '$color');


/*create sale order*/
INSERT INTO Sale(username,vin,customerID,purchase_date,sold_price)
VALUES('$username','$vin','$customerID','$purchase_date','$sold_price');

/*view last 30 days sale orders*/
SELECT username,vin,customerID,purchase_date,sold_price
FROM Sale
WHERE DATEDIFF(CURRENT_DATE(),purchase_date) BETWEEN 0 AND 30;

/*view last year sale orders*/
SELECT username,vin,customerID,purchase_date,sold_price
FROM Sale
WHERE DATEDIFF(CURRENT_DATE(),purchase_date) BETWEEN 0 AND 365;

/*all time sale orders*/
SELECT username,vin,customerID,purchase_date,sold_price
FROM Sale;

/*create repair form*/
INSERT INTO Repair(vin,start_date,username,customerID,finish_date,labor_charge,odometer,description)
VALUES('$vin','$start_date','$username','$customerID','$finish_date','$labor_charge','$odometer','$description');

/*update labor_charge*/
UPDATE Repair
SET labor_charge=$labor_charge
WHERE vin='$vin' AND start_date='$start_date';

/*update finish_date*/
UPDATE Repair
SET finish_date='$finish_date'
WHERE vin='$vin' AND start_date='$start_date';

/*add parts for repair $vin and $start_date*/
INSERT INTO Part(vin,start_date,part_number,vendor_name,quantity,price)
VALUES ('$vin','$start_date','$part_number','$vendor_name','$quantity','$price');

/*view price and quantity of all parts one single repair identified by $vin and $start_date*/
SELECT vin, start_date, part_number, quantity, price
FROM Part
WHERE vin='$vin' AND start_date='$start_date';

/*total part costs for repairs identified by single $vin*/
SELECT vin, SUM(quantity*price) AS total_part_cost
FROM Part
GROUP BY vin;