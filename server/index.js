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

// app.post('/api/add-session', (req,res,next) => {
//   const {name, durationInMinutes, userId} = req.body
//   if (!name || !durationInMinutes || !userId){
//     throw new ClientError(401, 'missing info')
//   }
//   const sql = `
//   insert into "session" ("name", "durationInMinutes", "userId")
//   values ($1,$2,$3)
//   returning *
//   `
//   const params = [name, durationInMinutes, userId]
//   db.query(sql, params)
//     .then(result => {
//       console.log(result)
//       const [name] = result.rows;
//       res.status(201).json(name)
//     })
//     .catch(err => next(err))

// })

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

app.post('/api/add-session-and-session-workouts', (req, res, next) => {
  // console.log(req.body);
  const { name, durationInMinutes, userId } = req.body.session;
  const { sessionId, workoutId, reps, weight } = req.body.sessionWorkouts;

  if (!name || !durationInMinutes || !userId || !sessionId || !workoutId || !reps || !weight) {
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
      const sqlSessionWorkouts = `
  insert into "sessionWorkouts" ("sessionId", "workoutId", "reps", "weight")
  values ($1,$2,$3,$4)
  returning *
  `;
      const paramsSessionWorkouts = [sessionId, workoutId, reps, weight];
      db.query(sqlSessionWorkouts, paramsSessionWorkouts)
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
