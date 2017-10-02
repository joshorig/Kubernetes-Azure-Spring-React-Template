FROM node:latest AS storefront

LABEL maintainer="Joshua Cassidy" \
      version="0.1.0"

WORKDIR /usr/src/greatapp/frontend

COPY ./src/main/frontend/package.json .
RUN npm install
COPY ./src/main/frontend/. /usr/src/greatapp/frontend
RUN ./node_modules/.bin/react-scripts build && npm run delete-source-maps

FROM maven:3.5.0-jdk-8 AS appserver

WORKDIR /usr/src/greatapp

ADD pom.xml pom.xml
ADD ./src/. /usr/src/greatapp/src/.

COPY --from=storefront /usr/src/greatapp/frontend/build /usr/src/greatapp/src/main/resources/static/

RUN mvn package -Dskip.npm

FROM java:8-jdk

ENV jdbcurl='jdbc:mysql://mysql:3306/greatapp' \
    jdbcuser='user' \
    jdbcpass='password' \
    jdbcdialect='org.hibernate.dialect.MySQL5Dialect' \
    logspath='/app/logs/application.log'

WORKDIR /app

ADD ./wait-for-it.sh .
RUN chmod +x wait-for-it.sh

COPY --from=appserver /usr/src/greatapp/target/spring-boot-and-react-app-0.1.0.jar .

EXPOSE 8080
