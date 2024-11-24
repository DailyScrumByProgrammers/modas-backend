import mysqldb from 'mysql2';

const connection = mysqldb.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'Modas',
  dateStrings: true,
});

module.exports = connection;
