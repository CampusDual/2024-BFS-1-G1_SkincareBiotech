## DESCRIPTION

Application template based in Ontimize Web and Ontimize Boot (java 11).

Use this template to generate an application with a standard structure and a predefined Ontimize configuration for Ontimize authentication and a unique database, using PostgreSQL.

Take a look at application.yml and [Ontimize Boot](https://ontimize.github.io/docs/) documentation to customize as needed.

Several Spring Boot configuration files are provided. It is recommended to use environment variables in Spring configuration files for configuration values that depend on the environment.

For K8s environment it is recommended that Spring actuator is configured in a different port than the application. (see application-staging.yml)

### CLOUD DEPLOYMENT

This application is ready to be deployed in a Kubernetes Cluster, using provided Helm charts (in ./charts folder).

Other files provided:

		./Dockerfile: Provided as is. Adapt as needed.

		./.git/workflows/maven-build-docker-ecr.yaml: Adapt as needed. Provided setup is:

			- Fires on push in develop branch
			- Performs maven verify
			- Builds docker image
			- Extracts project version from pom.xml
			- Updates version in ./charts/xxx/Chart.yaml
			- Pushes docker image to Amazon AWS ECR (login, repository, etc. are automatically done. Credentials are not needed if repository organization is imatia-innovation).

		Note: Amazon AWS ECR can be customized depending on infrastructure needs and setup. Provided configuration is standard and should work in most cases.

### DOCKER-COMPOSE DEPLOYMENT

This application is ready to be deployed on a local machine, using provided docker compose files (in ./ folder):

		./docker-compose.yaml: Adapt as needed. Provided setup is:

			- Builds docker image
			- Runs database (Defined in docker-compose-services.yaml)
			- Runs application

		./docker-compose-services.yaml: Adapt as needed. Provided setup is:

			- Runs database

The services required to run the application, such as the database, are provided in a separate file to allow to run the services only and to be able to launch the application from an IDE.

 - Go to the application folder

		cd cd2024bfs1g1

 - With docker privileges run the following command to start the deployment:

		docker compose up

The application is deployed as a docker container in the url: [http://localhost:8080](http://localhost:8080)

 - List the pods:

		docker ps

 - Show the logs of each container:

		docker logs -f id_container

 - Access the console of the container:

		docker exec -it id_container sh

 - Stop the deployment:

		docker compose down
		docker volume prune

### LOCAL DEPLOYMENT

The parameters in the application-local.yaml file must match the values of the development services, such as the database. By default, the parameters match the values in the docker files.

 - Go to the application folder

		cd cd2024bfs1g1

 - If a deployment of a development services are not available, run the provided docker compose file to start the services:

		docker compose -f docker-compose-services.yaml up

 - Compile and deploy the application with the following commands:

		mvn clean install -Plocal
		java -jar cd2024bfs1g1-boot/target/cd2024bfs1g1-boot.jar --spring.profiles.active=local

 - The application is accessible using the url: [http://localhost:8080](http://localhost:8080)

## ADDITIONAL INFORMATION

## Default application users

By default the application provides two users. Adapt as needed:

 - Admin:
    - Role: `Administrator`
    - Username: `admin`
    - Password: `adminuser`

 - Demo:
    - Role: `User`
    - Username: `demo`
    - Password: `demouser`

## Ontimize Boot

- Go to the application folder and run an install:

		mvn clean install -Plocal

### Start only the server:

 - Go to the `cd2024bfs1g1-boot` folder and run the command

		mvn spring-boot:run -Dspring-boot.run.profiles=local

### Run the client alone, outside the spring-boot server

 - Go to the `frontend/src/main/ngx` folder, if you have node and npm installed on your system run the following commands:

		npm install
		npm run start-local

Use the following URL to access the application: [http://localhost:4299](http://localhost:4299)

### Deploy and run client and server together

 - Go to the `cd2024bfs1g1-boot/target` folder and run the command

		java -jar cd2024bfs1g1-boot/target/cd2024bfs1g1-boot.jar --spring.profiles.active=local

Use the following URL to access the application: [http://localhost:8080](http://localhost:8080)

## API-First and Swagger UI

The application adopts the API-first approach using the [OpenAPI](http://www.openapis.org/what-is-openapi) specification.

The REST API is defined using yaml files and, in compile time, the [Ontimize OpenAPI](http://www.ontimize.com/xwiki/bin/view/Ontimize+Boot/OpenAPI+plugin) plugin generates the models and the controller interfaces that must be implemented on the application.

The Ontimize OpenAPI plugin also provides the Swagger user interface and it will be available for local and compose environments at [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html).

