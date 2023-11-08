// controllers/employeeControllers.js
import {
  DisbursedData,
  Employee,
  FormalData,
  RejectedData,
} from "../models/employeeModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

export const getUserData = (req, res) => {
  return res.json({
    Status: "Success",
    name: req.name,
  });
};

export const registerEmployee = async (req, res) => {
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
  const existingUser = await Employee.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });

  if (existingUser) {
    return res.json({
      Error:
        "User already exists. Please use a different email or phone number.",
    });
  }

  // Create new employee
  const newEmployee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });

  // Save new employee
  await newEmployee.save();

  // Return success response
  return res.json({ Status: "Success" });
};

export const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await Employee.findOne({ email });

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

export const logoutEmployee = (req, res) => {
  // Clear the cookie
  res.clearCookie("token");
  res.json({ Status: "Success" });
};
// *********** AddLeads all data send to database with this API *************
export const employeeFormAllData = async (req, res) => {
  const data = req.body; // Assuming data is sent in the request body

  // Create a new instance of the FormalData model using the request data
  const formalData = new FormalData(data);

  // Save the new data to the database
  await formalData.save();

  console.log("Data inserted successfully");
  res.status(200).send("Data inserted successfully");
};

// fetch all the data with this API
export const AddleadsAlldata = async (req, res) => {
  // Use the FormalData model to fetch all data
  const data = await FormalData.find({});

  console.log("Data retrieved");
  res.status(200).json(data);
};

export const sendApprovedData = async (req, res) => {
  const {
    Customer_Name,
    Father_Name,
    Mother_Name,
    Mobile,
    Personal_Email,
    Pan_Card,
    Customer_Location,
    Company_Name,
    Dob,
    Login_Date,
    Disbursal_BankName,
    Loan_Application_No,
    Approved_Amount,
    Disbursal_Loan_Amount,
    Inhand_Disb_Account,
    Bt_Disb_Amount,
    Top_Up,
    Cibil,
    Tenure_Disbursal,
    Roi,
    Pf,
    Insurance,
    Emi,
    First_Emi_Date,
    Disb_Status,
    Login_Bank,
    Disbursal_Date,
    Dsa_Channel_Name,
    // Add other fields as needed
  } = req.body;

  // Create a new instance of the DisbursedData model
  const disbursedData = new DisbursedData({
    Customer_Name,
    Father_Name,
    Mother_Name,
    Mobile,
    Personal_Email,
    Pan_Card,
    Customer_Location,
    Company_Name,
    Dob,
    Login_Date,
    Disbursal_BankName,
    Loan_Application_No,
    Approved_Amount,
    Disbursal_Loan_Amount,
    Inhand_Disb_Account,
    Bt_Disb_Amount,
    Top_Up,
    Cibil,
    Tenure_Disbursal,
    Roi,
    Pf,
    Insurance,
    Emi,
    First_Emi_Date,
    Disb_Status,
    Login_Bank,
    Disbursal_Date,
    Dsa_Channel_Name,
    // Add other fields here
  });

  // Save the new data to the database
  try {
    await disbursedData.save();
    console.log("Data inserted successfully");
    res.status(200).json({ message: "Data submitted successfully" });
  } catch (err) {
    console.error("Error inserting data: " + err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchApprovedData = async (req, res) => {
  try {
    const data = await DisbursedData.find({});
    console.log("Customer data retrieved");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendRejectedData = async (req, res) => {
  const {
    Customer_Name,
    Father_Name,
    Mother_Name,
    Mobile,
    Personal_Email,
    Pan_Card,
    Customer_Location,
    Company_Name,
    Dob,
    Login_Date,
    Rejected_date,
    Rejected_reason,
  } = req.body;

  // Create a new instance of the DisbursedData model
  const rejectedData = new RejectedData({
    Customer_Name,
    Father_Name,
    Mother_Name,
    Mobile,
    Personal_Email,
    Pan_Card,
    Customer_Location,
    Company_Name,
    Dob,
    Login_Date,
    Rejected_date,
    Rejected_reason,
  });

  // Save the new data to the database
  try {
    await rejectedData.save();
    console.log("Data inserted successfully");
    res.status(200).json({ message: "Data submitted successfully" });
  } catch (err) {
    console.error("Error inserting data: " + err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// **********Fetch Rejected data from rejected_data table with this API************

export const fetchRejectedData = async (req, res) => {
  try {
    const data = await RejectedData.find({});
    console.log("Customer data retrieved");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
