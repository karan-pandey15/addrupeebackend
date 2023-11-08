// models/Employee.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});

// All data Schema
const formalDataSchema = new mongoose.Schema({
  Status: String,
  Product_Loan: String,
  Bank_Name: String,
  Customer_Name: String,
  Father_Name: String,
  Mother_Name: String,
  Mobile: String,
  Personal_Email: String,
  Pan_Card: String,
  Customer_Location: String,
  Company_Name: String,
  Dob: Date,
  Login_Date: Date,
  Gender: String,
  Religion: String,
  Income_Source: String,
  Marital_Status: String,
  Spouse_Name: String,
  Qualification: String,
  Property_Status: String,
  Aadhar_Card_No: String,
  Current_Address_Line1: String,
  Current_Address_Line2: String,
  Current_City: String,
  Current_Landmark: String,
  Current_State: String,
  Current_Pin: String,
  Permanent_Address_Line1: String,
  Permanent_Address_Line2: String,
  Permanent_City: String,
  Permanent_Landmark: String,
  Permanent_State: String,
  Permanent_Pin: String,
  Designation: String,
  Current_Company_Work_Experience: String,
  Total_Work_Experience: String,
  Company_Type: String,
  Official_Mail: String,
  Company_Address: String,
  Company_City: String,
  Company_State: String,
  Company_Pin: String,
  Salary_Account_BankName: String,
  Annual_Ctc: String,
  Net_Salary: String,
  Obligations: String,
  Scheme_Offered: String,
  Loan_Amount_Applied: String,
  Tenure_Of_Loan: String,
  Credit_Card_Obligation: String,
  Reference1_FullName_Relative: String,
  Reference1_MobileNo: String,
  Reference1_Address1: String,
  Reference1_City: String,
  Reference1_State: String,
  Reference1_Pin: String,
  Reference2_FullName_Friend: String,
  Reference2_MobileNo: String,
  Reference2_Address1: String,
  Reference2_City: String,
  Reference2_State: String,
  Reference2_Pin: String,
  Caller_Name: String,
  TL_Name: String,
  Manager_Name: String,
  Disbursal_BankName: String,
  Loan_Application_No: String,
  Approved_Amount: String,
  Disbursal_Loan_Amount: String,
  Inhand_Disb_Account: String,
  Bt_Disb_Amount: String,
  Top_Up: String,
  Cibil: String,
  Tenure_Disbursal: String,
  Roi: String,
  Pf: String,
  Insurance: String,
  Emi: String,
  First_Emi_Date: Date,
  Disb_Status: String,
  Login_Bank: String,
  Disbursal_Date: Date,
  Dsa_Channel_Name: String,
  Not_Disburs_Reason: String,
  Not_Disburs_Remark: String,
  Rejection_Remark: String,
  Description: String,
});

const disbursedDataSchema = new mongoose.Schema({
  Customer_Name: String,
  Father_Name: String,
  Mother_Name: String,
  Mobile: String,
  Personal_Email: String,
  Pan_Card: String,
  Customer_Location: String,
  Company_Name: String,
  Dob: String,
  Login_Date: String,
  Disbursal_BankName: String,
  Loan_Application_No: String,
  Approved_Amount: String,
  Disbursal_Loan_Amount: String,
  Inhand_Disb_Account: String,
  Bt_Disb_Amount: String,
  Top_Up: String,
  Cibil: String,
  Tenure_Disbursal: String,
  Roi: String,
  Pf: String,
  Insurance: String,
  Emi: String,
  First_Emi_Date: String,
  Disb_Status: String,
  Login_Bank: String,
  Disbursal_Date: String,
  Dsa_Channel_Name: String,
});

// Define a schema for the "rejecteddata" collection
const rejectedDataSchema = new mongoose.Schema({
  Customer_Name: String,
  Father_Name: String,
  Mother_Name: String,
  Mobile: String,
  Personal_Email: String,
  Pan_Card: String,
  Customer_Location: String,
  Company_Name: String,
  Dob: String,
  Login_Date: String,
  Rejected_date: String,
  Rejected_reason: String,
});

// Hash the password before saving
employeeSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

const Employee = mongoose.model("Employee", employeeSchema);
const FormalData = mongoose.model("FormalData", formalDataSchema);
const DisbursedData = mongoose.model("DisbursedData", disbursedDataSchema);

// Create a model using the schema
const RejectedData = mongoose.model("rejecteddata", rejectedDataSchema);

export { Employee, FormalData, DisbursedData, RejectedData };
