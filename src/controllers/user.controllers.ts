//pengelolaan user(crud user)
import { Request, Response } from "express";
import { encrypt } from "@/utils/encryption";
import {
  createUser,
  findUser,
  updateUserById,
} from "@/utils/queries/user.queries";
import {
  CreatedSuccessfully,
  InternalServerError,
  NotFound,
  Success,
} from "@/utils/apiResponse";

export const postCreateUser = async (req: Request, res: Response) => {
  try {
    const user = {
      email: req.body.email,
      name: req.body.name,
      password: encrypt(req.body.password),
    };

    const data = await createUser(user);

    res.status(201).json(CreatedSuccessfully("Success create data"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const data = await findUser({ id: parseInt(req.params.id) });

    if (!data) {
      return res.status(404).json(NotFound("Data not found"));
    }

    res.json(Success("Success load data", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = {
      email: req.body.email,
      name: req.body.name,
      password: encrypt(req.body.password),
    };

    await updateUserById(parseInt(req.params.id), user);

    res.status(201).json(Success("Success update data"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};
