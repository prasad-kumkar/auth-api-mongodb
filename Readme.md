## Register User
POST http://0.0.0.0:3000/api/user/register

INPUT: {
    name:
    email:
    password:
}

min-length = 6

OUTPUT: Error (or) User info

## Login 
POST http://0.0.0.0:3000/api/user/login

INPUT: {
    email:
    password:
}

OUTPUT: Error (or) auth-token

## Get Posts
GET http://0.0.0.0:3000/api/posts
auth-token: ****