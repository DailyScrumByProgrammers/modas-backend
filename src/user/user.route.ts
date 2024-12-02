import { Router } from "express";
import { getAllTeamMembers } from "./user.controller";

const router = Router();

// 모든 팀원 가져오기
router.get("/", async (req, res) => {
  try {
    const teamMembers = await getAllTeamMembers();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

export default router;
