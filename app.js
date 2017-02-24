import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import authorization from './auth';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

const auth = authorization(app);
app.auth = auth;
app.use(auth.initialize());

booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;
