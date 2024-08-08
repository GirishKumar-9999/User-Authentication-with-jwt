# User-Authentication-with-jwt

api endpoints

api to signup: http://localhost:8080/api/auth/signup 
body: { username, email, password }

api to signin: http://localhost:8080/api/auth/signin 
body: { username, password }

api to reset_password: http://localhost:8080/api/auth/reset_password 
body: { username, password, newPassword, confirmPassword }

Everyone can access this api:
http://localhost:8080/api/test/all 

Only logged in users can access this api: 
http://localhost:8080/api/test/user 

