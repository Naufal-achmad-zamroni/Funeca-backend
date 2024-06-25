////konfigurasi rute autentikasi dan pendaftaran user
import { Login, Logout } from "@/controllers/auth.controllers";
import { postCreateUser } from "@/controllers/user.controllers";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
var createUserValidate = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
  check("name", "Password is required").notEmpty(),
  validateError,
];

var loginValidate = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
  validateError,
];

// MAIN ROUTER
router.post("/register", createUserValidate, postCreateUser);
router.post("/auth", loginValidate, Login);
router.delete("/logout", Logout);

export default router;
