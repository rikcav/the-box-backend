import {
  getById as getByIdRepository,
  createUser as createUserRepository,
  deleteById as deleteByIdRepository,
} from "./repository";

import { userValidation } from "./validation";

export const getUserById = async (userId: number) => {
  try {
    const user = await getByIdRepository(userId);
    return user;
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

export const deleteUserById = async (userId: number) => {
  try {
    const user = await deleteByIdRepository(userId);
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
