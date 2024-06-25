// autentikasi untuk Express.js yang menggunakan JSON Web Token (beri akses keroute)
import { Request, Response, NextFunction } from "express";
import { RequestWithSession, Token } from "@/types/middleware";
import { Unauthorize } from "@/utils/apiResponse";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      token?: Token;
    }
  }
}

export const auth = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json(Unauthorize("Unauthorized"));
    }

    const JWTSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, JWTSecret) as unknown as Token;

    (req as RequestWithSession).token = decoded;
    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json(Unauthorize("Token Has Been Expired"));
    } else {
      return res.status(401).json(Unauthorize("Unauthorized"));
    }
  }
};
