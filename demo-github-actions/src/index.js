const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello GitHub Actions!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});

module.exports = app;