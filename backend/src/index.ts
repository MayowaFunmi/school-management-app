import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import rolesRoutes from './routes/rolesRoutes';
import usersRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());
app.use('/api/roles', rolesRoutes)
app.use('/api/users', usersRoutes)

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.DATABASE_URL || 'mongodb+srv://akinademayowa:typescript@cluster0.elu9orm.mongodb.net/';
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(() => console.log("connected to database successfully"))
    .catch((error) => console.log(error.message));