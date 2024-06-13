import {
  getById as getByIdRepository,
  createUser as createUserRepository,
  updateUser as updateUserRepository,
  deleteById as deleteByIdRepository,
} from "./repository";
import { userValidation } from "./validation";

export const getUserById = async (userId: number) => {
  try {
    const user = await getByIdRepository(userId);
    const response = {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      profile: user?.profile,
    };

    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const createUser = async (userData: any) => {
  try {
    const data = userValidation.parse(userData);
    const user = await createUserRepository(data);
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const updateUser = async (id: number, userData: any) => {
  try {
    const data = userValidation.parse(userData);
    const user = updateUserRepository(id, data);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserById = async (userId: number) => {
  try {
    const user = await deleteByIdRepository(userId);
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
