import { NextFunction, Request, Response, Router } from "express";
import { IMiddleware } from "./middleware.interface.js";

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "delete" | "put" | "patch">;
  middlewares?: IMiddleware[];
}
