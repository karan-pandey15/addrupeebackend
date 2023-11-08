import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// import mysql from "mysql";
import multer from "multer";
import csv from "fast-csv";
import fs from "fs";
import db from "../database/db.js";

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "addrupee",
// });

const csv_route = express();

csv_route.use(bodyParser.urlencoded({ extended: false }));
csv_route.use(bodyParser.json());

// multer config
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });



csv_route.post("/import-csv", upload.single("csvFile"), (req, res) => {
  console.log(req.file.path);
  uploadCsv(req.file.path, __dirname); // Pass the uploaded file path and __dirname
  res.send("Records Imported Successfully!");
});

const uploadCsv = (filePath, appDir) => {
  let correctedFilePath = filePath.replace(/\\/g, '/');
  let stream = fs.createReadStream(correctedFilePath);
  let csvDataColl = [];
  let fileStream = csv
    .parse()
    .on("data", (data) => {
      csvDataColl.push(data);
    })
    .on("end", () => {
      // Remove the header row from CSV data
      csvDataColl.shift();

      db.getConnection((err, connection) => {
        if (err) {
          console.log(err);
        } else {
          let query = "INSERT INTO getformalldata (Status,Product_Loan,Bank_Name,Customer_Name,Father_Name,Mother_Name,Mobile,Personal_Email,Pan_Card,Customer_Location,Company_Name,Dob,Login_Date,Gender,Religion,Income_Source,Marital_Status,Spouse_Name,Qualification,Property_Status,Aadhar_Card_No,Current_Address_Line1,Current_Address_Line2,Current_City,Current_Landmark,Current_State,Current_Pin,Permanent_Address_Line1,Permanent_Address_Line2,Permanent_City,Permanent_Landmark,Permanent_State,Permanent_Pin,Designation,Current_Company_Work_Experience,Total_Work_Experience,Company_Type,Official_Mail,Company_Address,Company_City,Company_State,Company_Pin,Salary_Account_BankName,Annual_Ctc,Net_Salary,Obligations,Scheme_Offered,Loan_Amount_Applied,Tenure_Of_Loan,Credit_Card_Obligation,Reference1_FullName_Relative,Reference1_MobileNo,Reference1_Address1,Reference1_City,Reference1_State,Reference1_Pin,Reference2_FullName_Friend,Reference2_MobileNo,Reference2_Address1,Reference2_City,Reference2_State,Reference2_Pin,Caller_Name,TL_Name,Manager_Name,Disbursal_BankName,Loan_Application_No,Approved_Amount,Disbursal_Loan_Amount,Inhand_Disb_Account,Bt_Disb_Amount,Top_Up,Cibil,Tenure_Disbursal,Roi,Pf,Insurance,Emi,First_Emi_Date,Disb_Status,Login_Bank,Disbursal_Date,Dsa_Channel_Name,Not_Disburs_Reason,Not_Disburs_Remark,Rejection_Remark,Description) VALUES ?";

          connection.query(query, [csvDataColl], (error, result) => {
            if (error) {
              console.error(error);
            } else {
              console.log("Records inserted successfully.");
            }
          });
        }
      });
    });
  stream.pipe(fileStream);
};





export default csv_route

// app.listen(5000, () => {
//   console.log("App is listening on port 5000");
// });