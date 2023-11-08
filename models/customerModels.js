import mongoose from "mongoose";
import bcrypt from "bcrypt";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});

const customerLoanDataSchema = new mongoose.Schema({
  loanType: String,
  bankName: String,
  customerName: String,
  fatherName: String,
  motherName: String,
  mobileNo: String,
  officialMail: String,
  panCardNo: String,
  customerLocation: String,
  companyName: String,
  dob: Date,
  gender: String,
  religion: String,
  applyDate: Date,
});

// Hash the password before saving
customerSchema.pre("save", function (next) {
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

const Customer = mongoose.model("Customer", customerSchema);

const CustomerLoanData = mongoose.model(
  "CustomerLoanData",
  customerLoanDataSchema
);

export { Customer, CustomerLoanData };
