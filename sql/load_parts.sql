LOAD DATA INFILE '/docker-entrypoint-initdb.d/data/parts.csv' 
INTO TABLE Part 
FIELDS TERMINATED BY ',' 
IGNORE 1 LINES 
(@c1, @start_date, @c3, @c4, @c5, @c6) 
SET 
vin = @c1, 
part_number = @c3,
vendor_name = @c4,
quantity = @c5,
price = @c6,
start_date = STR_TO_DATE(@start_date, '%m/%d/%Y');
