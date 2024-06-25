//pengelolaan contact
import { Request, Response } from "express";
import { InternalServerError, Success } from "@/utils/apiResponse";
import { createContact, findAllContact } from "@/utils/queries/contact.queries";

export const getContacts = async (_: Request, res: Response) => {
  try {
    const data = await findAllContact();
    //menampilkan message contact
    res.json(Success("Message has retrieved", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};

export const postCreateContact = async (req: Request, res: Response) => {
  try {
    const contact = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    };

    const data = await createContact(contact);

    res.status(201).json(Success("Message has ben sent", { data }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(InternalServerError("Something Went Wrong"));
  }
};
