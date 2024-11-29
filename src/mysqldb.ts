import mysql from 'mysql2/promise';

const createConnection = async () => {
  try {
    const conn = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'Modas',
      dateStrings: true,
    });
    return conn;
  } catch (error) {
    console.error('MySQL 연결 실패:', error);
    throw error;
  }
};

export default createConnection;
