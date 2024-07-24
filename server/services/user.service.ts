import { registerInterface, loginInterface } from "../models/user.model";
import { User } from "../entities/User";
import { datasource } from "../config/database";

const createUser = async (data: registerInterface) : Promise<User> => {
    const userRepository = datasource.getRepository(User);
    const user = await userRepository.save(data);

    return user;
}


export { createUser };