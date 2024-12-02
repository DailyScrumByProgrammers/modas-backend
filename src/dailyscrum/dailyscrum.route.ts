import { Router } from "express";
import { getTodayScrums } from "./dailyscrum.controller";

const router = Router();

// 오늘 날짜의 같은 팀 스페이스 회원들의 데일리 스크럼 가져오기
router.get("/today/:id", getTodayScrums); // 경로를 API 명세에 맞게 수정

export default router;
