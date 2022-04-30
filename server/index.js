// import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv/config');
const format = require('pg-format');
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

app.get('/api/get-sessions', (req, res, next) => {
  const sql = `
  select "createdAt"
  from "session"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));

});

app.post('/api/add-session-and-session-workout-data', (req, res, next) => {
  const { name, durationInMinutes, userId } = req.body.session;

  if (!name || !userId) {
    throw new ClientError(400, 'Missing required info. please check to if there is data for name or userId');
  }
  const sqlSession = `
  insert into "session" ("name", "durationInMinutes", "userId")
  values ($1,$2,$3)
  returning *
  `;

  const paramsSession = [name, durationInMinutes, userId];
  db.query(sqlSession, paramsSession)
    .then(result => {
      const myNestedArray = [];
      let set = 1;

      for (let i = 0; req.body.sessionWorkouts[i]; i++) {

        const { workoutId } = req.body.sessionWorkouts[i];
        if (!workoutId) {
          throw new ClientError(400, 'Missing workoutId, please check to see if there is data');
        }
        let array = [];
        array.push(result.rows[0].sessionId);

        for (const property in req.body.sessionWorkouts[i]) {

          array.push(req.body.sessionWorkouts[i][property]);

        }

        if (i !== 0) {
          if (req.body.sessionWorkouts[i].workoutId !== req.body.sessionWorkouts[i - 1].workoutId) {
            set = 1;
          }
        }

        array.push(set);
        myNestedArray.push(array);
        array = [];
        set++;

      }
      const sqlSessionWorkouts = format(`
      insert into "sessionWorkouts" ("sessionId", "reps", "weight", "workoutId", "set")
      values %L
      `, myNestedArray);

      db.query(sqlSessionWorkouts)
        .then(result => {
          res.status(201).json({ message: 'Successfully saved session and session info' });

        })
        .catch(err => next(err));

    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
