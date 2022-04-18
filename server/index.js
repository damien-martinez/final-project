// import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.get('/api/get-workouts', (req, res, next) => {
  const sql = `
  select *
  from "workouts"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));

});

app.post('/api/add-session-and-session-workout-data', (req, res, next) => {
  // console.log(req.body);
  const { name, durationInMinutes, userId } = req.body.session;

  if (!name || !durationInMinutes || !userId) {
    throw new ClientError(401, 'missing info');
  }
  const sqlSession = `
  insert into "session" ("name", "durationInMinutes", "userId")
  values ($1,$2,$3)
  returning *
  `;
  const paramsSession = [name, durationInMinutes, userId];
  db.query(sqlSession, paramsSession)
    .then(result => {
      for (let i = 0; i < req.body.sessionWorkouts.length; i++) {
        const { sessionId, workoutId, reps, weight, set } = req.body.sessionWorkouts[i];
        if (!sessionId || !workoutId || !reps || !weight || !set) {
          throw new ClientError(401, 'missing info');
        }
        const sqlSessionWorkouts = `
        insert into "sessionWorkouts" ("sessionId", "workoutId", "reps", "weight", "set")
        values ($1,$2,$3,$4, $5)
        returning *
        `;
        const paramsSessionWorkouts = [sessionId, workoutId, reps, weight, set];
        db.query(sqlSessionWorkouts, paramsSessionWorkouts)
          .then(result => {

          })
          .catch(err => next(err));
      } res.status(201).json({ message: 'Successfully saved session and session info' });
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
