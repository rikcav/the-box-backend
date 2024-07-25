import {
  getById as getByIdRepository,
  createUser as createUserRepository,
  updateUser as updateUserRepository,
  deleteById as deleteByIdRepository,
} from "./repository";
import { updateUserValidation, userValidation } from "./validation";

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

interface UpdateData {
  name: string;
  email: string;
  phone: string;
}

const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const updateUser = async (id: number, updateData: UpdateData) => {
  try {
    const data = updateUserValidation.parse(updateData);

    if (data) {
      const storedUser = await getByIdRepository(id);

      const userData = {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        profile: storedUser.profile,
        password: storedUser.password,
      };

      const validatedUserData = userValidation.parse(userData);
      const user = updateUserRepository(id, validatedUserData);

      return user;
    }

    throw "The input data is not valid";
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
