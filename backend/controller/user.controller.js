import { listUsersService, userCountService } from "../services/user.service.js";

export const listUsers = async (req, res) => {
  const users = await listUsersService();
  res.json(users);
};

export const userCount = async (req, res) => {
  const total = await userCountService();
  res.json({ total });
};
