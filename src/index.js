const express = require('express');
require('./db/mongoose');
const cors = require('cors')
const app = express();
app.use(cors())
const homeRouter = require('./routers/home');
const userRouter = require('./routers/user');

app.use(express.json());
app.use(homeRouter);
app.use(userRouter);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
