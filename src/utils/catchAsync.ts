import { RequestHandler } from 'express';

export const catchAsync = (cb: RequestHandler) => (
  (
    (req, res, next) => 
      (cb(req, res, next) as any).catch((er: any) => next(er))
  ) as RequestHandler
);