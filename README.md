# User-Authentication-with-jwt

<!-- api endpoints -->

<!-- body: username, email, password -->
http://localhost:8080/api/auth/signup 

<!-- body: username, password -->
http://localhost:8080/api/auth/signin 

<!-- body: username, password, newPassword, confirmPassword -->
http://localhost:8080/api/auth/reset_password 

<!-- Everyone can access this -->
http://localhost:8080/api/test/all 

<!-- Only logged in users can access this -->
http://localhost:8080/api/test/user 
