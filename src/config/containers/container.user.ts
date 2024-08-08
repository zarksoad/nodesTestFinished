import { container } from "tsyringe";
import { UserService } from "../../services/user.services";
import { UserController } from "../../controllers/user.controller";
import { UserReppository } from "../../repositories/user.repository";

container.register(UserService, { useClass: UserService });
container.register(UserController, { useClass: UserController });
container.register(UserReppository, { useClass: UserReppository });

