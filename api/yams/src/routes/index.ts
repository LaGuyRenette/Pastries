import express, { Router } from "express";

import ingredient from "./ingredient";
import user from "./user";
import pastrie from "./pastrie";


const router: Router = express.Router();

router.use("/api", [ingredient, user, pastrie]);

export default router;