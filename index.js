const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db/db');
const userRouter = require('./routes/userRoutes');
const recordRouter = require('./routes/recordRoutes');
const { VerifyEmail } = require('./middleware/VerifyEmail');
const { protect } = require('./middleware/protect');


app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/record',protect, recordRouter);
app.use('/api/auth/verify', VerifyEmail);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    connectToDatabase();
});