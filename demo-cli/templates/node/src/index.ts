import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件配置
app.use(cors());
app.use(express.json());

// 路由配置
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node.js Template' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});