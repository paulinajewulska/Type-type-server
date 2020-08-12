require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
import 'ts-mongoose/plugin';

const connectionString = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
mongoose.set('useCreateIndex', true);

app.use(authRoutes);

mongoose
    .connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result: any) => {
        app.listen(port, () => console.log(`Server listening at port ${port}`));
    })
    .catch((err: Error) => {
        console.log(err);
    });
