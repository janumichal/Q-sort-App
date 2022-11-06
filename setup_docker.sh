#!/bin/bash

cd docker
docker-compose build --no-cache
docker-compose -p q-sort-app up --force-recreate -d

if [ "$1" == "-t" ]
then 
    docker exec -it Ubuntu-Vue3-Q-sort-frontend bash
fi