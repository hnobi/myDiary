import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoute from './routes/router';


const app = express();
const port = parseInt((process.env.PORT), 10) || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.status(200)
    .json({
      message: 'Welcome to My Diary application',
    });
});
app.use('/api/v1', apiRoute);
app.use('*', (req, res) => {
  res.status(404);
  res.json({
    status: 'Failed',
    message: 'Page not found'
  });
});
app.listen(port, () => { console.log(`Application listening  on port ${port}`); });
export default app;
