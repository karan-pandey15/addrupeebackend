// import express from "express";
// import employeeRoutes from "./employeeRoutes.js";

// const router = express.Router();

// router.use("/", employeeRoutes);

// export default router;


import express from "express";
import employeeRoutes from "./employeeRoutes.js";
import customerRoutes from "./customerRoutes.js";

const router = express.Router();

router.use("/", employeeRoutes);
router.use("/", customerRoutes);

export default router;