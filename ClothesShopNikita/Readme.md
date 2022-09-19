
1) Run docker build .
2) Run docker image ls and copy the id of the latest image 
3) Run docker tag backend
4) Run docker run -p 8080:8080 --name backend backend
5) Open another terminal and change directory to client (cd client)
6) Run docker build .
7) Run docker -p 3000:3000 --name frontend frontend
8) Open browser and run http://localhost:3000
