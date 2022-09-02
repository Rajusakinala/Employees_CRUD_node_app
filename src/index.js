const express = require('express');
require('./db/mongoose');
const app = express();
const employeeRouter = require('./routers/employee')
const taskRouter = require('./routers/task')

app.use(express.json());
app.use(employeeRouter);
app.use(taskRouter);

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
