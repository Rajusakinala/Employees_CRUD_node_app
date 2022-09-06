const express = require('express');
require('./db/mongoose');
const app = express();
const homeRouter = require('./routers/home');
const employeeRouter = require('./routers/employee');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

app.use(express.json());
app.use(homeRouter);
app.use(employeeRouter);
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
