import createConnection from '../mysqldb';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const join = async (req: Request, res: Response) => {
  const conn = await createConnection();

  const { email, nickName, password } = req.body;

  const emailCheckQuery = `SELECT * FROM users WHERE email = ?`;
  const [emailUser] = await conn.query<RowDataPacket[]>(emailCheckQuery, [email]);

  if (emailUser[0]) {
    res.status(400).send({ message: '이메일이 중복됩니다.' });
    return;
  }

  const nickNameCheckQuery = `SELECT * FROM users WHERE nickName = ?`;
  const [nickNameUser] = await conn.query<RowDataPacket[]>(nickNameCheckQuery, [nickName]);
  if (nickNameUser[0]) {
    res.status(400).send({ message: '닉네임이 중복됩니다.' });
    return;
  }

  // 비밀번호 해싱
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // 사용자 정보 저장
  const sql = `INSERT INTO users (email, nickName, password) VALUES (?, ?, ?)`;
  await conn.query(sql, [email, nickName, hashedPassword]);

  res.status(201).send({ message: '회원 가입에 성공했습니다.' });
  return;
};
