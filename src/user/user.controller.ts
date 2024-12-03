import createConnection from '../mysqldb';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY || 'default-secret-key';

export const checkedEmail = async (req: Request, res: Response) => {
  const conn = await createConnection();

  const { email } = req.body;

  const emailCheckQuery = `SELECT * FROM users WHERE email = ?`;
  const [emailUser] = await conn.query<RowDataPacket[]>(emailCheckQuery, [email]);

  if (emailUser[0]) {
    res.status(400).send({ message: '이메일이 중복됩니다.' });
    return;
  }

  res.status(200).send({ success: true });
  return;
};

export const checkedNickName = async (req: Request, res: Response) => {
  const conn = await createConnection();

  const { nickName } = req.body;

  const nickNameCheckQuery = `SELECT * FROM users WHERE nickName = ?`;
  const [nickNameUser] = await conn.query<RowDataPacket[]>(nickNameCheckQuery, [nickName]);
  if (nickNameUser[0]) {
    res.status(400).send({ message: '닉네임이 중복됩니다.' });
    return;
  }

  res.status(200).send({ success: true });
  return;
};

export const join = async (req: Request, res: Response) => {
  const conn = await createConnection();

  const { email, nickName, password } = req.body;

  // 비밀번호 해싱
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // 사용자 정보 저장
  const sql = `INSERT INTO users (email, nickName, password) VALUES (?, ?, ?)`;
  await conn.query(sql, [email, nickName, hashedPassword]);

  res.status(201).send({ message: '회원 가입에 성공했습니다.' });
  return;
};

export const login = async (req: Request, res: Response) => {
  const conn = await createConnection();

  const { email, password } = req.body;

  const findUserQuery = `SELECT * FROM users WHERE email = ?`;
  const [user] = await conn.query<RowDataPacket[]>(findUserQuery, [email]);
  if (!user[0]) {
    res.status(403).send({ message: '존재하지 않는 회원입니다.' });
    return;
  }

  // 비밀번호 비교
  const match = await bcrypt.compare(password, user[0].password);
  if (!match) {
    res.status(400).send({ message: '비밀번호가 틀렸습니다.' });
    return;
  }

  const token = jwt.sign({ id: user[0].id, email: user[0].email }, privateKey, {
    expiresIn: '30m',
  });

  res.status(200).send({ token: token });
  return;
};
