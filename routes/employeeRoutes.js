import express from "express";

import {
  registerEmployee,
  loginEmployee,
  verifyUser,
  getUserData,
  logoutEmployee,
  employeeFormAllData,
  AddleadsAlldata,
  sendApprovedData,
  fetchApprovedData,
  sendRejectedData,
  fetchRejectedData,
} from "../controllers/employeeControllers.js";

const router = express.Router();

router.post("/emp_register", registerEmployee);
router.post("/emp_login", loginEmployee);
router.get("/emp_logout", logoutEmployee);
router.get("/get_user_data", verifyUser, getUserData);

router.post("/all_data", employeeFormAllData);

// Fetch data to pending with this API

router.get("/pendingdata", AddleadsAlldata);

// // Send Approved data to database With this API
router.post("/submit-approved-data", sendApprovedData);

// // Fetch Approved data to disbursed_data table with this API
router.get("/approved-data", fetchApprovedData);

// // Send Rejected data to database With this API
router.post("/submit-rejct-data", sendRejectedData);

// // Fetch Rejected data to rejected_data table with this API
router.get("/rejected-data", fetchRejectedData);

export default router;
