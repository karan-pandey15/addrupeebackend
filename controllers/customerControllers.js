import db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Customer, CustomerLoanData } from "../models/customerModels.js";

const salt = 10;

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      Error: "You are not authenticated",
    });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({
          Error: "Token is not Okay",
        });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

export const getCustomerData = (req, res) => {
  return res.json({
    Status: "Success",
    name: req.name,
  });
};

export const registerCustomer = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.password
  ) {
    return res.json({
      Error: "All fields are required. Please fill in all the fields.",
    });
  }

  if (req.body.password.length < 6 || !/^\d+$/.test(req.body.password)) {
    return res.json({
      Error: "Password must be at least 6 characters or digits.",
    });
  }

  // Check if email or phone already exist
  const existingUser = await Customer.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });

  if (existingUser) {
    return res.json({
      Error:
        "User already exists. Please use a different email or phone number.",
    });
  }

  // Create new employee
  const newCustomer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });

  // Save new employee
  await newCustomer.save();

  // Return success response
  return res.json({ Status: "Success" });
};

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await Customer.findOne({ email });

  if (!user) {
    return res.json({ Error: "No Such Email Existed" });
  }

  // Compare the provided password with the stored hash
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const name = user.name;
    try {
      const token = jwt.sign({ name }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      console.log("Generated Token:", token);
      res.cookie("token", token);
    } catch (error) {
      console.error("JWT Token Generation Error:", error);
      return res.json({
        Error: "JWT Token Generation Error",
      });
    }

    return res.json({ Status: "Success" });
  } else {
    return res.json({ Error: "Password not Matched" });
  }
};

export const logoutCustomer = (req, res) => {
  // Clear the cookie
  res.clearCookie("token");
  res.json({ Status: "Success" });
};

export const customerLoanApply = async (req, res) => {
  const formData = req.body;

  try {
    const customerLoanData = new CustomerLoanData(formData);
    await customerLoanData.save();

    console.log("Form data submitted successfully");
    res.status(200).json({ message: "Form data submitted successfully" });
  } catch (err) {
    console.error("Error inserting data: " + err.message);
    res
      .status(500)
      .json({ error: "Failed to submit the form", details: err.message });
  }
};

export const getCustomerLoanData = async (req, res) => {
  try {
    const data = await CustomerLoanData.find({});
    console.log("Customer data retrieved");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
