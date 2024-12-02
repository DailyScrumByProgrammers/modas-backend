const connection = require("../mysqldb");

// 모든 팀원 가져오기
export const getAllTeamMembers = async () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id, nickName FROM users", (error: any, results: any) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};
