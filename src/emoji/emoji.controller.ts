import { EmojiModel } from "./emoji.model";

const connection = require("../mysqldb");

// 특정 DailyScrum의 이모지 가져오기
export const getEmojisByDailyScrumId = (dailyScrumId: number): Promise<EmojiModel[]> => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM emoji WHERE dailyScrumId = ?",
      [dailyScrumId],
      (error: any, results: EmojiModel[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// 이모지 추가하기
export const addEmoji = (
  userId: number,
  dailyScrumId: number,
  content: string
): Promise<EmojiModel> => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO emoji (userId, dailyScrumId, content) VALUES (?, ?, ?)",
      [userId, dailyScrumId, content],
      (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            id: results.insertId,
            userId,
            dailyScrumId,
            content,
          });
        }
      }
    );
  });
};
