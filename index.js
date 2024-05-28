const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3000;

app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'dush_cust_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/api/customers', [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('mobileNumber').matches(/^\+\d{1,3}\d{10}$/).withMessage('Valid mobile number with country code is required'),
    check('address').notEmpty().withMessage('Address is required'),
    check('pincode').isPostalCode('any').withMessage('Valid pin code is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, mobileNumber, address, pincode } = req.body;

    const query = 'CALL AddCustomer(?, ?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, mobileNumber, address, pincode], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting data', error: err });
        }
        res.status(201).json({ message: 'Customer added successfully', customerID: results.insertId });
    });
});

app.get('/api/customers', (req, res) => {
    const query = 'SELECT * FROM CustomerDetails';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching data', error: err });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
