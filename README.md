# My-App
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
For easy use I have attached the .env file.API path and port can find in this file.
# My-App-Api
In the project directory, you can run:

node staging_app.js

For easy use I have attached the .env file.Please config AWS and DB related details in this file.
Here PostgreSql is used .Queries which are used listed below
CREATE TABLE registered_users
(
 user_id serial primary key NOT NULL,
 name character varying(255),
 password character varying(255),
 email character varying(255),
 delete_status integer
)
CREATE TABLE user_post
(
 post_id serial primary key NOT NULL,
 title character varying(255),
 description character varying(255),
 image character varying(255),
 delete_status integer,
 user_id integer,
 public_post integer,
 date timestamp without time zone
)
