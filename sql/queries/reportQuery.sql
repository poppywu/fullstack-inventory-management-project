/*sales by color of different duration 30 day, 1 month and 1 year comparing to latest sale date*/
INSERT ColorList(color) VALUES("Multiple");
WITH VehicleColorMap AS(
    SELECT vin, "Multiple" AS color
    FROM VehicleColor
    GROUP BY vin
    HAVING COUNT(*)>1
    UNION
    SELECT vin, color
    FROM VehicleColor
    WHERE vin NOT IN (
        SELECT vin
        FROM VehicleColor
        GROUP BY vin
        HAVING COUNT(*)>1)),
LatestSaleDate AS (
    SELECT MAX(purchase_date) AS latest_sale_date FROM Sale
),
MonthlySale AS(
    SELECT color, COUNT(*) AS monthly_sales_count 
    FROM VehicleColorMap 
    WHERE vin in (
        SELECT SV.vin
        FROM Sale AS SV, LatestSaleDate AS LSD 
        WHERE DATEDIFF(LSD.latest_sale_date,SV.purchase_date) BETWEEN 0 AND 30)         
    GROUP BY color
),
YearSale AS (
    SELECT color, COUNT(*) AS year_sales_count 
    FROM VehicleColorMap
    WHERE vin in (
        SELECT SV.vin 
        FROM Sale AS SV, LatestSaleDate AS LSD 
        WHERE DATEDIFF(LSD.latest_sale_date,SV.purchase_date) BETWEEN 0 AND 365)
    GROUP BY color
),
AllTimeSale AS (
    SELECT color, COUNT(*) AS all_time_sales_count 
    FROM VehicleColorMap 
    WHERE vin in (SELECT vin FROM Sale)
    GROUP BY color
)
SELECT CL.color,IFNULL(MS.monthly_sales_count, 0) AS monthly_sales_count,IFNULL(YS.year_sales_count, 0) AS year_sales_count, IFNULL(ATS.all_time_sales_count, 0) AS all_time_sales_count
FROM ColorList AS CL LEFT OUTER JOIN MonthlySale AS MS ON MS.color=CL.color LEFT OUTER JOIN YearSale AS YS ON YS.color=CL.color LEFT OUTER JOIN AllTimeSale AS ATS ON ATS.color=CL.color;


/*sales by type of different duration 30 day, 1 month and 1 year comparing to latest sale date*/
WITH LatestSaleDate AS (
    SELECT MAX(purchase_date) AS latest_sale_date 
    FROM Sale
),
MonthlySale AS (
    SELECT vehicle_type,count(*) AS monthly_sales_count
     FROM Vehicle
     WHERE vin in (
        SELECT SV.vin
        FROM Sale AS SV, LatestSaleDate AS LSD
        WHERE DATEDIFF(LSD.latest_sale_date,SV.purchase_date) BETWEEN 0 AND 30)
    GROUP BY vehicle_type
),
YearSale AS (
   SELECT vehicle_type,count(*) AS year_sales_count
   FROM Vehicle
   WHERE vin in (
        SELECT SV.vin
        FROM Sale AS SV, LatestSaleDate AS LSD
        WHERE DATEDIFF(LSD.latest_sale_date,SV.purchase_date) BETWEEN 0 AND 365)
   GROUP BY vehicle_type 
),
AllTimeSale AS (
    SELECT vehicle_type,count(*) AS all_time_sales_count
     FROM Vehicle
     WHERE vin in (
        SELECT SV.vin
        FROM Sale AS SV)
    GROUP BY vehicle_type
)
SELECT TL.vehicle_type,IFNULL(MS.monthly_sales_count, 0) AS monthly_sales_count, IFNULL(YS.year_sales_count, 0) AS year_sales_count,IFNULL(ATS.all_time_sales_count, 0) AS all_time_sales_count
FROM TypeList AS TL LEFT OUTER JOIN MonthlySale AS MS ON TL.vehicle_type=MS.vehicle_type LEFT OUTER JOIN YearSale AS YS ON TL.vehicle_type=YS.vehicle_type LEFT OUTER JOIN AllTimeSale AS ATS ON TL.vehicle_type=ATS.vehicle_type

/*sale by manufacturer of different duration 30 day, 1 month and 1 year comparing to latest sale date*/
WITH LatestSaleDate AS (
    SELECT MAX(purchase_date) AS latest_sale_date FROM Sale
),
MonthlySale AS (
    SELECT manufacturerID,count(*) AS monthly_sales_count
    FROM Vehicle
    WHERE vin in (
        SELECT SV.vin
        FROM Sale AS SV, LatestSaleDate AS LSD
        WHERE DATEDIFF(LSD.latest_sale_date,SV.purchase_date) BETWEEN 0 AND 30)
    GROUP BY manufacturerID
),
YearSale AS (
    SELECT manufacturerID,count(*) AS year_sales_count
    FROM Vehicle
    WHERE vin in (
        SELECT SV.vin
        FROM Sale AS SV,LatestSaleDate AS LSD
        WHERE DATEDIFF(LSD.latest_sale_date,SV.purchase_date) BETWEEN 0 AND 365)
    GROUP BY manufacturerID
),
AllTimeSale AS (
    SELECT manufacturerID,count(*) AS all_time_sales_count
    FROM Vehicle
    WHERE vin in (SELECT vin FROM Sale)
    GROUP BY manufacturerID
)
SELECT M.manufacturer_name, IFNULL(MS.monthly_sales_count,0) AS monthly_sales_count, IFNULL(YS.year_sales_count,0) AS year_sales_count, IFNULL(ATS.all_time_sales_count,0) AS all_time_sales_count
FROM AllTimeSale AS ATS LEFT OUTER JOIN YearSale AS YS ON ATS.manufacturerID=YS.manufacturerID LEFT OUTER JOIN MonthlySale AS MS ON MS.manufacturerID=ATS.manufacturerID INNER JOIN Manufacturer AS M ON M.manufacturerID=ATS.manufacturerID;

/*gross customer income:*/
WITH SingleRepair AS(
    SELECT RV.customerID,RV.vin,RV.start_date,AVG(RV.labor_charge) + IFNULL(SUM(P.price * P.quantity),0) AS labor_and_parts_charge
    FROM Repair AS RV LEFT OUTER JOIN Part AS P ON RV.vin = P.vin AND RV.start_date = P.start_date
    GROUP BY vin,start_date
),
PurchaseAndRepair AS(
    SELECT SV.vin,SV.customerID AS purchase_customerID,SV.purchase_date,SV.sold_price,SR.customerID AS repair_customerID,SR.start_date,SR.labor_and_parts_charge
    FROM SingleRepair AS SR RIGHT OUTER JOIN Sale AS SV ON SR.vin = SV.vin
),
CustomerPurchase AS(
    SELECT customerID,MIN(purchase_date) AS first_sale,MAX(purchase_date) AS recent_sale,SUM(sold_price) AS gross_income,COUNT(*) AS num_of_sales
    FROM Sale
    GROUP BY customerID
),
CustomerRepair AS(
    SELECT repair_customerID AS customerID,MIN(start_date) AS first_repair_start_date,MAX(start_date) AS recent_repair_start_date,SUM(labor_and_parts_charge) AS gross_income,COUNT(*) AS num_of_repairs
    FROM PurchaseAndRepair
    WHERE repair_customerID IS NOT NULL
    GROUP BY repair_customerID
),
Result AS(
    SELECT CP.customerID,
        CASE
            WHEN CP.first_sale <= IFNULL(CR.first_repair_start_date, CP.first_sale) THEN CP.first_sale
            ELSE CR.first_repair_start_date
        END AS first_sale_or_repair_start_date,
        CASE
            WHEN CP.recent_sale >= IFNULL(CR.recent_repair_start_date, CP.recent_sale) THEN CP.recent_sale
            ELSE CR.recent_repair_start_date
        END AS recent_sale_or_repair_start_date,
        CP.gross_income+IFNULL(CR.gross_income,0) AS gross_income,
        CP.num_of_sales,
        IFNULL(CR.num_of_repairs, 0) AS num_of_repairs
    FROM CustomerPurchase AS CP LEFT OUTER JOIN CustomerRepair AS CR ON CP.customerID = CR.customerID
    UNION
    SELECT customerID,first_repair_start_date AS first_sale_or_repair_start_date,recent_repair_start_date AS recent_sale_or_repair_start_date,gross_income,0 AS num_of_sales,num_of_repairs
    FROM CustomerRepair
    WHERE customerID NOT IN (SELECT customerID FROM CustomerPurchase)
),
ReplaceCustomerID AS(
    SELECT (CONCAT(I.first_name,I.last_name)) AS customer_name, first_sale_or_repair_start_date,recent_sale_or_repair_start_date,gross_income,num_of_sales,num_of_repairs
    FROM Result AS R INNER JOIN Individual AS I ON R.customerID=I.customerID
    UNION
    SELECT B.business_name AS customer_name, first_sale_or_repair_start_date,recent_sale_or_repair_start_date,gross_income,num_of_sales,num_of_repairs
    FROM Result AS R INNER JOIN Business AS B ON R.customerID=B.customerID
)
SELECT customer_name,first_sale_or_repair_start_date,recent_sale_or_repair_start_date,gross_income,num_of_sales,num_of_repairs
FROM ReplaceCustomerID 
ORDER BY gross_income DESC, recent_sale_or_repair_start_date DESC
LIMIT 15;

/*top 15 customer sales drill down by $customerID*/
SELECT SV.vin,SV.purchase_date,SV.sold_price,V.model_year,M.manufacturer_name,V.model_name,CONCAT(SU.first_name,SU.last_name) AS salesperson_name
FROM Sale AS SV
     INNER JOIN `User` AS SU ON SV.username=SU.username
     INNER JOIN Vehicle AS V ON SV.vin=V.vin
     INNER JOIN Manufacturer AS M ON V.manufacturerID=M.manufacturerID
WHERE customerID='$customerID'
ORDER BY SV.purchase_date DESC, SV.vin ASC;

/*top 15 customer repairs drill down by $customerID*/
SELECT RV.vin,RV.start_date,RV.finish_date,RV.odometer,IFNULL(SUM(P.quantity*P.price),0) AS parts_cost,AVG(RV.labor_charge) AS labor_charge, SUM(P.quantity*P.price)+RV.labor_charge AS total_cost, CONCAT(SU.first_name,SU.last_name) AS service_writer_name
FROM Repair AS RV LEFT OUTER JOIN Part AS P ON RV.vin=P.vin AND RV.start_date=P.start_date INNER JOIN `User` AS SU ON RV.username=SU.username
WHERE customerID='$customerID'
GROUP BY vin,start_date
ORDER BY RV.start_date DESC, RV.finish_date IS NULL, RV.finish_date DESC,  RV.vin ASC;

/*repairs by manufacturer*/
SELECT M.manufacturerID,M.manufacturer_name, IFNULL(N.num_of_repairs,0) AS num_of_repairs,IFNULL(N.labor_cost,0) AS labor_cost, IFNULL(N.parts_cost,0) AS parts_cost, IFNULL(N.total_cost,0) AS total_cost
FROM Manufacturer AS M LEFT OUTER JOIN (
    SELECT V.manufacturerID, SUM(t2.num_of_repairs_by_vin) AS num_of_repairs, SUM(t2.labor_charge_by_vin) AS labor_cost, SUM(t2.parts_charge_by_vin) AS parts_cost, SUM(t2.labor_charge_by_vin)+SUM(t2.parts_charge_by_vin) AS total_cost
    FROM (
        SELECT t1.vin, COUNT(*) AS num_of_repairs_by_vin,SUM(t1.labor_charge) AS labor_charge_by_vin, SUM(t1.parts_charge_by_one_repair) AS parts_charge_by_vin
        FROM(SELECT RV.vin, RV.start_date,AVG(RV.labor_charge) AS labor_charge,IFNULL(SUM(P.quantity*P.price),0) AS parts_charge_by_one_repair
        FROM Repair AS RV LEFT OUTER JOIN Part AS P ON RV.vin=P.vin AND RV.start_date=P.start_date
        GROUP BY RV.vin, RV.start_date) AS t1
        GROUP BY t1.vin) AS t2 INNER JOIN Vehicle AS V ON t2.vin=V.vin 
    GROUP BY V.manufacturerID) AS N ON M.manufacturerID=N.manufacturerID
ORDER BY M.manufacturer_name ASC;

/*repairs by type and model of $manufacturerID*/
SELECT V.manufacturerID,V.vehicle_type, SUM(t2.num_of_repairs_by_vin) AS num_of_repairs, SUM(t2.labor_charge_by_vin) AS labor_cost, SUM(t2.parts_charge_by_vin) AS parts_cost, SUM(t2.labor_charge_by_vin)+SUM(t2.parts_charge_by_vin) AS total_cost
FROM (
        SELECT t1.vin, COUNT(*) AS num_of_repairs_by_vin,SUM(t1.labor_charge) AS labor_charge_by_vin, SUM(t1.parts_charge_by_one_repair) AS parts_charge_by_vin
        FROM(SELECT RV.vin, RV.start_date,AVG(RV.labor_charge) AS labor_charge,IFNULL(SUM(P.quantity*P.price),0) AS parts_charge_by_one_repair
        FROM Repair AS RV LEFT OUTER JOIN Part AS P ON RV.vin=P.vin AND RV.start_date=P.start_date
        GROUP BY RV.vin, RV.start_date) AS t1
        GROUP BY t1.vin) AS t2 INNER JOIN Vehicle AS V ON t2.vin=V.vin 
WHERE V.manufacturerID='$manufacturerID'
GROUP BY V.vehicle_type
ORDER BY V.vehicle_type, num_of_repairs DESC;

SELECT V.manufacturerID,V.vehicle_type, V.model_name,SUM(t2.num_of_repairs_by_vin) AS num_of_repairs, SUM(t2.labor_charge_by_vin) AS labor_cost, SUM(t2.parts_charge_by_vin) AS parts_cost, SUM(t2.labor_charge_by_vin)+SUM(t2.parts_charge_by_vin) AS total_cost
FROM (
        SELECT t1.vin, COUNT(*) AS num_of_repairs_by_vin,SUM(t1.labor_charge) AS labor_charge_by_vin, SUM(t1.parts_charge_by_one_repair) AS parts_charge_by_vin
        FROM(SELECT RV.vin, RV.start_date,AVG(RV.labor_charge) AS labor_charge,IFNULL(SUM(P.quantity*P.price),0) AS parts_charge_by_one_repair
        FROM Repair AS RV LEFT JOIN Part AS P ON RV.vin=P.vin AND RV.start_date=P.start_date
        GROUP BY RV.vin, RV.start_date) AS t1
        GROUP BY t1.vin) AS t2 INNER JOIN Vehicle AS V ON t2.vin=V.vin 
WHERE V.manufacturerID='$manufacturerID' AND V.vehicle_type='$vehicle_type'
GROUP BY V.model_name;

/*below cost sales*/
WITH Saleform AS(
SELECT CONCAT(SU.first_name,SU.last_name) AS salesperson_name,CONCAT(I.first_name,I.last_name) AS customer_name,SV.vin,SV.purchase_date,V.invoice_price,SV.sold_price
FROM Sale AS SV INNER JOIN Vehicle AS V ON SV.vin=V.vin INNER JOIN `User` AS SU ON SV.username = SU.username INNER JOIN Individual AS I ON SV.customerID = I.customerID
UNION
SELECT CONCAT(SU.first_name,SU.last_name) AS salesperson_name,B.business_name AS customer_name,SV.vin,SV.purchase_date,V.invoice_price,SV.sold_price
FROM Sale AS SV INNER JOIN Vehicle AS V ON SV.vin=V.vin INNER JOIN `User` AS SU ON SV.username = SU.username INNER JOIN Business AS B ON SV.customerID = B.customerID
)
SELECT salesperson_name,customer_name,vin,purchase_date,invoice_price,sold_price
FROM Saleform
WHERE sold_price/invoice_price<=0.95;


/*average time in inventory*/
SELECT TL.vehicle_type,R.average_days_in_inventory
FROM TypeList AS TL LEFT OUTER JOIN (
     SELECT AVG(DATEDIFF(SV.purchase_date, V.add_date)) AS average_days_in_inventory,V.vehicle_type
     FROM Sale AS SV INNER JOIN Vehicle AS V ON SV.vin = V.vin
     GROUP BY V.vehicle_type
    ) AS R ON TL.vehicle_type = R.vehicle_type;

/*parts statistics*/
SELECT vendor_name,SUM(quantity * price) AS total_spending
FROM Part
GROUP BY vendor_name;

/*monthly sales: TBD*/
/*part 1*/
SELECT DATE_FORMAT(purchase_date, "%Y-%m") AS month, COUNT(*) AS total_num_sold, SUM(sold_price) AS total_sales_income, SUM(s.sold_price - v.invoice_price) AS total_net_income, SUM(s.sold_price) / SUM(v.invoice_price) * 100 AS sold_invoice_ratio
FROM Sale s
INNER JOIN Vehicle v ON s.vin=v.vin
GROUP BY month
ORDER BY month DESC;
/*part 2*/
SELECT sp.first_name, sp.last_name, COUNT(*) AS num_sold, SUM(sold_price) AS total_sales_income
FROM Sale sv 
INNER JOIN `User` sp on sv.username=sp.username
WHERE DATE_FORMAT(purchase_date, "%Y-%m")='$month'
GROUP BY sp.username
ORDER BY num_sold DESC, total_sales_income DESC;
