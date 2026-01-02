import { countUsers, getAllUsers } from "../models/user.model.js";


export const listUsersService = async () => {
  const [rows] = await getAllUsers();
  return rows;
};

export const userCountService = async () => {
  const [[row]] = await countUsers();
  return row.total;
};