import { inject, injectable } from "tsyringe";
import { PermissionRepository } from "../repositories/permisions.repository";
import { EntityRepository } from "../repositories/entity.repository";

@injectable()
export class PermissionService {
  constructor(
    @inject(PermissionRepository)
    private permissionRepository: PermissionRepository,
    @inject(EntityRepository)
    private entityRepository: EntityRepository
  ) {}
  async canPerformAction(
    roleId: number,
    entityName: string,
    action: "create" | "update" | "delete" | "get"
  ): Promise<boolean | undefined> {
    const entityId = await this.entityRepository.getEntityIdByName(entityName);
    if (entityId === null) {
      throw new Error("not valid entity");
    }
    const permission = await this.permissionRepository.findPermision(
      roleId,
      entityId
    );
    if (!permission) return false;
    if (permission) {
      switch (action) {
        case "create":
          return permission.canCreate;
        case "update":
          return permission.canUpdate;
        case "delete":
          return permission.canDelete;
        case "get":
          return permission.canGet;
        default:
          return false;
      }
    }
  }
}
