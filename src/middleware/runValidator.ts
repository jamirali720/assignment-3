import { AnyZodObject } from "zod";
import catchAsync from "../helper/higherOrderFunction";
import { request, NextFunction, Request, Response } from "express";

export const runValidator = (Schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    Schema.parseAsync({
      body: request.body,
      // query: request.query,
      // params: request.params,
      // headers: request.headers,
    //   cookies: request.cookies,
    });
    next();
  });
};


