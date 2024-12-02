import { Request, Response } from "express";
const connection = require("../mysqldb");

export const getTodayScrums = async (req: Request, res: Response) => {
  const { teamSpaceId } = req.params;
  const today = new Date().toISOString().split("T")[0];

  connection.query(
    `SELECT ds.id, ds.userId, ds.teamSpaceId, ds.completion, ds.remembrance, u.nickName, u.profileImg
         FROM daliyScrum ds
         JOIN users u ON ds.userId = u.id
         WHERE ds.teamSpaceId = ? AND DATE(ds.createdAt) = ?`,
    [teamSpaceId, today],
    (error: any, results: any) => {
      if (error) return res.status(500).json({ error: "Failed to fetch scrums" });
      res.status(200).json(results);
    }
  );
};
