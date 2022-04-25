insert into "user" (
  "username",
  "hashedPassword"
) values (
'damo',
'$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA'
);

insert into "workouts" (
  "name", "muscleGroup"
) values ('Bench Press', 'Chest'), ('Overhead Press', 'Shoulders'),('Incline Chest Press', 'Chest'), ('Chest Fly', 'Chest'), ('Tricep Extension', 'Arms'), ('Lateral Raise', 'Shoulders'), ('Chest Dip', 'Chest'), ('Tricep Pulldowns', 'Arms'),
('Deadlift', 'Back'), ('Lat Pulldown', 'Back'), ('Seated Row', 'Back'), ('Face Pull', 'Shoulders'), ('T Bar Row', 'Back'), ('Bicep Curl', 'Arms'), ('Hammer Curl', 'Arms'), ('Pull Up', 'Back'),
('Squat', 'Legs'),('Romanian Deadlift', 'Legs'), ('Leg Press', 'Legs'), ('Leg Extension', 'Legs'), ('Seated Leg Curl', 'Legs'), ('Seated Calf Raise', 'Legs');


insert into "session" (
  "name",
  "durationInMinutes",
  "userId"
) values (
  'test session1','2022-04-01T23:59:50.283844Z', 2, 1),
('test session2', '2022-04-02T23:59:50.283844Z', 50, 1 ),
('test session3', '2022-04-07T23:59:50.283844Z', 100,1 ),
('test session4', '2022-04-08T23:59:50.283844Z', 200, 1),
('test session5', '2022-04-10T23:59:50.283844Z', 220, 1),
('test session6', '2022-04-15T23:59:50.283844Z', 230, 1),
('test session7', '2022-04-20T23:59:50.283844Z', 50, 1),
('test session8', '2022-04-21T23:59:50.283844Z', 70, 1),
('test session9', '2022-04-22T23:59:50.283844Z', 80, 1),
('test session10', '2022-04-23T23:59:50.283844Z', 40,1);






insert into "sessionWorkouts" (
  "sessionId",
  "workoutId",
  "reps",
  "weight",
  "set"
) values
(1, 1, 8, 165, 1),
(1, 1, 12, 115, 2),
(1, 1, 12, 200, 3),
(1, 2, 10, 220, 1),
(1, 2, 10, 220, 2),
(1, 2, 10, 220, 3),
(2, 3, 8, 165, 1),
(2, 3, 12, 115, 2),
(2, 3, 12, 200, 3),
(2, 4, 10, 220, 1),
(2, 4, 10, 220, 2),
(2, 4, 10, 220, 3),
(3, 3, 8, 220, 1),
(3, 3, 12, 220, 2),
(3, 3, 12, 220, 3),
(3, 4, 10, 220, 1),
(3, 4, 10, 220, 2),
(3, 4, 10, 230, 3),
(4, 4, 8, 220, 1),
(4, 4, 12, 220, 2),
(4, 4, 12, 220, 3),
(4, 5, 10, 220, 1),
(4, 5, 10, 220, 2),
(4, 5, 10, 230, 3),
(5, 1, 8, 100, 1),
(5, 1, 12, 100, 2),
(5, 1, 12, 120, 3),
(5, 2, 10, 120, 1),
(5, 2, 10, 120, 2),
(5, 2, 10, 130, 3),
(6, 3, 8, 100, 1),
(6, 3, 12, 100, 2),
(6, 3, 12, 120, 3),
(6, 4, 10, 120, 1),
(6, 4, 10, 120, 2),
(6, 4, 10, 130, 3),
(7, 1, 8, 300, 1),
(7, 1, 12, 300, 2),
(7, 1, 12, 300, 3),
(7, 2, 10, 300, 1),
(7, 2, 10, 250, 2),
(7, 2, 10, 250, 3),
(8, 1, 8, 300, 1),
(8, 1, 12, 300, 2),
(8, 1, 12, 300, 3),
(8, 2, 10, 300, 1),
(8, 2, 10, 250, 2),
(8, 2, 10, 250, 3),
(9, 3, 8, 50, 1),
(9, 3, 12, 50, 2),
(9, 3, 12, 60, 3),
(9, 4, 10, 70, 1),
(9, 4, 10, 70, 2),
(9, 4, 10, 70, 3),
(10, 1, 8, 500, 1),
(10, 1, 12, 500, 2),
(10, 1, 12, 550, 3),
(10, 2, 10, 80, 1),
(10, 2, 10, 200, 2),
(10, 2, 10, 150, 3);
