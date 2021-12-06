FROM openjdk:11

RUN apt-get update && apt-get install -y dos2unix

COPY . /home/backend
WORKDIR /home/backend

RUN dos2unix mvnw


#RUN ./mvnw spring-boot:run
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]
