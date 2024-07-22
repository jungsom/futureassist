import express from "express";
import dotenv from "dotenv";
import client from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 경로 설정
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// 예제 쿼리 실행 (users 테이블 조회)
app.get("/users", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("에러 발생", err.stack);
    res.status(500).send("에러 발생");
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
