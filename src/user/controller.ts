import express from "express";
import * as service from "./service";

export const get = async (req: express.Request, res: express.Response) => {
  try {
    const user = await service.getUserById(parseInt(req.params.id));
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Could not get user", error: error });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    console.log(data);
    console.log(id);
    const user = await service.updateUser(id, data);

    console.log("Updated user: ", user);

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Could not update user", error: error });
  }
};

export const deleteById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await service.deleteUserById(parseInt(req.params.id));
    console.log("Deleted user: ", user);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Could not delete user", error: error });
  }
};
