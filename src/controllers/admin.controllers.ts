//menyediakan proses crud admin
import { Request, Response } from "express";
import { encrypt } from "@/utils/encryption";
import {
  createAdmin,
  findAdmin,
  updateAdminById,
} from "@/utils/queries/admin.queries";
import {
  CreatedSuccessfully,
  InternalServerError,
  NotFound,
  Success,
} from "@/utils/apiResponse";

export const postCreateAdmin = async (req: Request, res: Response) => {
  try {
    const Admin = {
      email: req.body.email,
      name: req.body.name,
      password: encrypt(req.body.password),
    };

    const data = await createAdmin(Admin);

    res.status(201).json(CreatedSuccessfully("Success create data"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const data = await findAdmin({ id: parseInt(req.params.id) });

    if (!data) {
      return res.status(404).json(NotFound("Data not found"));
    }

    res.json(Success("Success load data", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const Admin = {
      email: req.body.email,
      name: req.body.name,
      password: encrypt(req.body.password),
    };

    await updateAdminById(parseInt(req.params.id), Admin);

    res.status(201).json(Success("Success update data"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};
