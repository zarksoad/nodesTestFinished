import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { PermissionService } from "../services/permission.services";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config/jwt";
const permissionService = container.resolve(PermissionService);

export const authorizationMiddleware = (
  action: "create" | "update" | "delete" | "get",
  entity: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers.authorization?.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    console.log("Desde autorizacion", decoded);

    const roleId = decoded.roleId;
    console.log(roleId);
    try {
      const hasPermission = await permissionService.canPerformAction(
        roleId,
        entity,
        action
      );
      if (hasPermission) {
        return next();
      } else {
        return res.status(403).json({
          message: "Not authorized",
        });
      }
    } catch (error) {
      next(error);
    }
  };
};
