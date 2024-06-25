//konfigurasi rute autentikasi dan pendaftaran item
import { auth } from "@/middleware/auth";
import { Router } from "express";
import fileUpload from "express-fileupload";
import {
  deleteItem,
  getItemByName,
  getItems,
  postCreateItem,
  updateItem,
} from "@/controllers/item.controllers";

const router = Router();

const file = fileUpload({
  useTempFiles: false,
  tempFileDir: "bulk_temp_file/",
  limits: { fileSize: 10 * 1024 * 1024 },
});

// MAIN ROUTER
router.get("/get/", getItems);
router.get("/:search", getItemByName);

// AUTHORIZATION
router.use(auth());
router.post("/", file, postCreateItem);
router.put("/:id", file, updateItem);
router.delete("/:id", deleteItem);

export default router;
