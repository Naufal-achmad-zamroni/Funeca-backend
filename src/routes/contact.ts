////konfigurasi rute autentikasi dan pendaftaran contact
import { getContacts, postCreateContact } from "@/controllers/contact.controller";
import { auth } from "@/middleware/auth";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
var createMessageValidate = [
  check("name", "Name is required").notEmpty(),
  check("email", "Email is required").isEmail(),
  check("message", "Content is required").notEmpty(),
  validateError,
];

// MAIN ROUTER
router.use(auth())
router.get("/get/", getContacts);
router.post("/", createMessageValidate, postCreateContact);

export default router;
