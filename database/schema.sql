set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."session" (
	"sessionId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	"durationInMinutes" int NOT NULL,
	"userId" int NOT NULL,
	CONSTRAINT "session_pk" PRIMARY KEY ("sessionId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."user" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."workouts" (
	"workoutId" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"muscleGroup" TEXT NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."sessionWorkouts" (
	"sessionId" int NOT NULL,
	"workoutId" int NOT NULL,
	"reps" int,
	"weight" int
) WITH (
  OIDS=FALSE
);



-- CREATE TABLE "public"."comments" (
-- 	"commentId" serial NOT NULL,
-- 	"userId" int NOT NULL,
-- 	"createdAt" timestamptz(6) NOT NULL default now(),
-- 	"sessionId" int NOT NULL,
-- 	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
-- ) WITH (
--   OIDS=FALSE
-- );



ALTER TABLE "session" ADD CONSTRAINT "session_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");



ALTER TABLE "sessionWorkouts" ADD CONSTRAINT "sessionWorkouts_fk0" FOREIGN KEY ("sessionId") REFERENCES "session"("sessionId");
ALTER TABLE "sessionWorkouts" ADD CONSTRAINT "sessionWorkouts_fk1" FOREIGN KEY ("workoutId") REFERENCES "workouts"("workoutId");

-- ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");
-- ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("sessionId") REFERENCES "session"("sessionId");
