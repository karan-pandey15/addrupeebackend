import express from "express";
import {
  customerLoanApply,
  getCustomerLoanData,
  getCustomerData,
  logoutCustomer,
  loginCustomer,
  registerCustomer,
  verifyUser,
} from "../controllers/customerControllers.js";

const router = express.Router();

router.post("/cust_register", registerCustomer);
router.post("/cust_login", loginCustomer);
router.get("/cust_logout", logoutCustomer);
router.get("/get_customer_data", verifyUser, getCustomerData);

router.post("/cust_loan_apply", customerLoanApply);
router.get("/get_cust_loan_data", getCustomerLoanData);

export default router;