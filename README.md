Template for Dockerized Spring Boot + React App
------------------------------------------------

### Launching the project in Debug mode
1. Launch the Spring Boot project with debugger in any preferable way (using the IDE / etc)
2. Navigate to the `src/main/frontend`
3. Set the `proxy` value for `package.json` file with the correct http(s) path to your environment:
```
{
  "proxy": "http://localhost:8080"
}
```
4. Run `npm start` to launch the front-end watcher and find the development version of UI navigating to the link `http://localhost:3000`


Dockerized build for Spring Boot + React App
------------------------------------------------

This document contains how-to instraction to build and run app
using Docker and Docker Compose.

##### Build and run with development profile
```
docker-compose -f docker-compose.yml up -d
```

##### Build and run with production profile
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Deployment to Kubernetes on Azure 
------------------------------------------------

### Setup kubernetes, mysql server and container registry
Please pay attantion that local mysql is required to init db.

`./setup.sh --master-count 1 --agent-count 1 --location westus --db-admin-password Password@1`

### Build docker image
`./build.sh`

### Deploy app
`./deploy.sh`

Please see [how-to](how-to) for more details
