//pengelolaan item
import { Request, Response } from "express";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import { type UploadedFile } from "express-fileupload";
import {
  createItem,
  deleteItemById,
  findAllItem,
  findItem,
  findItemById,
  updateItemById,
} from "@/utils/queries/item.queries";
import {
  CreatedSuccessfully,
  InternalServerError,
  NotFound,
  Success,
} from "@/utils/apiResponse";

export const getItems = async (_: Request, res: Response) => {
  try {
    const data = await findAllItem();

    res.json(Success("Item has retrieved", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const getItemByName = async (req: Request, res: Response) => {
  try {
    const data = await findItem({
      name: { contains: req.params?.search?.toLowerCase() || undefined },
    });

    if (data.length == 0)
      return res.status(404).json(NotFound("Item Not Found"));

    res.json(Success("Item has retrieved", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    // mengambil id dari params
    const id = parseInt(req.params.id);

    // validasi apakah item ada
    const existingItem = await findItemById({ id: id });

    // jika tidak ada
    if (!existingItem) return res.status(404).json(NotFound("Item Not Found"));

    // proses penghapusan image
    const filePath = "./public/" + existingItem.image;
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    const data = await deleteItemById(id);
    res.json(Success("Item has deleted", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const postCreateItem = async (req: Request, res: Response) => {
  try {
    const image = req.files?.image as UploadedFile;
    const fileName = Date.now() + "_" + image.name;
    writeFileSync("./public/" + fileName, image.data);
    const newItem = {
      name: req.body.name,
      stock: parseInt(req.body.stock),
      price: parseFloat(req.body.price),
      image: fileName,
    };

    const data = await createItem(newItem);

    res.status(201).json(Success("Item has created", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const existingItem = await findItemById({ id: id });

    if (!existingItem) return res.status(404).json(NotFound("Item Not Found"));

    const image = req.files?.image as UploadedFile;
    let fileName = image ? existingItem.image : undefined;

    if (image) {
      const filePath = "./public/" + fileName;
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
      fileName = Date.now() + "-" + image.name;
      writeFileSync("./public/" + fileName, image.data);
    }

    const newItem = {
      name: req.body.name,
      stock: parseInt(req.body.stock),
      price: parseFloat(req.body.price),
      image: fileName,
    };

    const data = await updateItemById(id, newItem);

    res.status(201).json(CreatedSuccessfully("Item has created", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};
