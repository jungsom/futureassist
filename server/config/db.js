import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

// DB 불러오기
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// DB 연결
client
  .connect()
  .then(() => console.log("DB에 연결되었습니다."))
  .catch((err) => console.error("DB 연결 실패", err.stack));

export default client;
