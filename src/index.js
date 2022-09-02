const express = require('express');
const app = express();
const employeeRouter = require('./routers/employee')
require('./db/mongoose');

app.use(express.json());
app.use(employeeRouter);

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
