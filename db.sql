SHOW DATABASES;

CREATE DATABASE dush_cust_db;

USE dush_cust_db;

CREATE TABLE CustomerDetails (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    MobileNumber VARCHAR(20) NOT NULL UNIQUE,
    Address TEXT NOT NULL,
    Pincode VARCHAR(10) NOT NULL
);

SHOW TABLES;

CREATE PROCEDURE AddCustomer(
    IN firstName VARCHAR(255),
    IN lastName VARCHAR(255),
    IN email VARCHAR(255),
    IN mobileNumber VARCHAR(20),
    IN address TEXT,
    IN pincode VARCHAR(10)
)
BEGIN
    INSERT INTO CustomerDetails (FirstName, LastName, Email, MobileNumber, Address, Pincode)
    VALUES (firstName, lastName, email, mobileNumber, address, pincode);
END

SELECT * from CustomerDetails;