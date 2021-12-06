# Jaunty Jalopies

### Prerequisites
You need to have Docker installed.

### Run docker-compose

```
docker-compose up -d --build
docker ps
```

This should create 3 containers: one for Mysql, one for React, and one for Spring Boot.

If you had a previous build running and you want to test new changes, it is sometimes necessary to run:

```
docker-compose down
```

before re-running `docker-compose up` to clear stale persistent data between containers and ensure that any new scripts run. 

### Check local browser
Go to localhost:3000 in your local browser. Our app's frontend should appear.

Go to localhost:8080 in your local browser. Currently, there is an error page, but at least that means that Spring Boot is running. 

It may take a minute after building completes for these pages to load. 

