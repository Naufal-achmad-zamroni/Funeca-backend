//konfigurasi rute autentikasi dan pendaftaran admin 
import { Login, Logout } from "@/controllers/auth.controllers";
import { postCreateAdmin } from "@/controllers/admin.controllers";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// MAIN ROUTER
router.get("/logout", Logout);

var createAdminValidate = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
  check("name", "Password is required").notEmpty(),
  validateError,
];
router.post("/register", createAdminValidate, postCreateAdmin);

var loginValidate = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
  validateError,
];
router.post("/auth", loginValidate, Login);

export default router;