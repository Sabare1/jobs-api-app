The application has been deployed using render.
Here's the link to the API incase if you want to test it: https://jobs-api-app-pvpw.onrender.com/
Steps to use and test API using postman:
1. First create an account by sending a request body to the route "https://jobs-api-app-pvpw.onrender.com/api/v1/auth", in which provide username(as gmail) and a password.
2. Then you will get a jwt token from the server and gets stored in your local storage, which is crucial for using the api from here on.
3. Now you have the token, you can create, get, update, delete jobs using their respective request in the route "https://jobs-api-app-pvpw.onrender.com/api/v1/jobs" and do the CRUD operations on the data.


That's all about this mini project.
