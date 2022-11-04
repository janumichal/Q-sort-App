#!/bin/bash

cd docker
docker-compose up -d

if [ "$1" == "-t" ]
then 
    docker exec -it Ubuntu-Vue3-Q-sort-frontend bash
fi