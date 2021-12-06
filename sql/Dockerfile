FROM mysql:8.0

COPY *.sql /docker-entrypoint-initdb.d
RUN mkdir /docker-entrypoint-initdb.d/data
COPY data/* /docker-entrypoint-initdb.d/data

#WORKDIR /home/sql
#RUN ./setup.sh
