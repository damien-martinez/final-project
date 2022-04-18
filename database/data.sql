insert into "user" (
  "username",
  "hashedPassword"
) values (
'damo',
'$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA'
);

insert into "session" (
  "name",
  "durationInMinutes",
  "userId"
) values (
  'test session',
  2,
  1
);




insert into "workouts" (
  "name", "muscleGroup"
) values ('Bench Press', 'Chest'), ('Overhead Press', 'Shoulders'),('Incline Chest Press', 'Chest'), ('Chest Fly', 'Chest'), ('Tricep Extension', 'Arms'), ('Lateral Raise', 'Shoulders'), ('Chest Dip', 'Chest'), ('Tricep Pulldowns', 'Arms'),
('Deadlift', 'Back'), ('Lat Pulldown', 'Back'), ('Seated Row', 'Back'), ('Face Pull', 'Shoulders'), ('T Bar Row', 'Back'), ('Bicep Curl', 'Arms'), ('Hammer Curl', 'Arms'), ('Pull Up', 'Back'),
('Squat', 'Legs'),('Romanian Deadlift', 'Legs'), ('Leg Press', 'Legs'), ('Leg Extension', 'Legs'), ('Seated Leg Curl', 'Legs'), ('Seated Calf Raise', 'Legs');

insert into "sessionWorkouts" (
  "sessionId",
  "workoutId",
  "reps",
  "weight"
) values (
  1,
  1,
  8,
  165),
  (1,
  2,
  12,
  115
  );
