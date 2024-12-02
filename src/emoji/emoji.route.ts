import { Router } from "express";
import { getEmojisByDailyScrumId, addEmoji } from "./emoji.controller";

const router = Router();

// 특정 DailyScrum에 대한 이모지 가져오기
router.get("/:dailyScrumId", async (req, res) => {
  try {
    const dailyScrumId = parseInt(req.params.dailyScrumId, 10);
    const emojis = await getEmojisByDailyScrumId(dailyScrumId);
    res.status(200).json(emojis);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch emojis" });
  }
});

// 새로운 이모지 추가
router.post("/", async (req, res) => {
  try {
    const { userId, dailyScrumId, content } = req.body;
    const newEmoji = await addEmoji(userId, dailyScrumId, content);
    res.status(201).json(newEmoji);
  } catch (error) {
    res.status(500).json({ error: "Failed to add emoji" });
  }
});

export default router;
