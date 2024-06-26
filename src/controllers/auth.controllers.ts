//autentifikasi dan pengelolaan sesi pengguna
import { InternalServerError, Success, Unauthorize } from "@/utils/apiResponse";
import { compareHash } from "@/utils/encryption";
import { findAdmin } from "@/utils/queries/admin.queries";
import { findUser } from "@/utils/queries/user.queries";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export const Logout = (_: Request, res: Response) => {
  res.clearCookie("token").end();
};

export const CurrentSession = (req: Request, res: Response) => {
  res.json(Success("Success load current user", { data: req.token }));
};

// Fungsi login
export const Login = async (req: Request, res: Response) => {
  try {
    const user = await findUser({ email: req.body.email });
    
    if (!user) {
      return res.status(401).json(Unauthorize("Email atau Password salah!"));
    }


    // Cek ke cocokan password yang di request dengan yg di database
    const match = compareHash(req.body.password, user?.password);

    //Jika password dan confirm password tidak cocok
    if (!match) {
      return res.status(401).json(Unauthorize("Email atau Password salah!"));
    }

    const id = user?.id;
    const email = user?.email;
    const name = user?.name;
    // const role = user?.role;

    // Membuat refresh token
    const token = jwt.sign({ id, name, email  }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    // Membuat http cookie yang dikirimkan ke sisi client
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, //expired dalam 15 hari
      secure: true,
      sameSite: "none",
    });
    
    res.json(
      Success("Login success", {
        logged: true,
        token,
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(InternalServerError("Email atau Password salah!"));
  }
};
