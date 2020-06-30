#!/bin/bash
docker exec mongo-cnf-1 bash -c 'mongo < /scripts/config.js';
docker exec mongo-cnf-1 bash -c 'mongo < /scripts/create-user.js';
docker exec mongo-1-1 bash -c 'mongo < /scripts/rs1-config.js';
docker exec mongo-1-1 bash -c 'mongo < /scripts/create-user.js';
docker exec mongo-2-1 bash -c 'mongo < /scripts/rs2-config.js';
docker exec mongo-2-1 bash -c 'mongo < /scripts/create-user.js';
docker exec mongo-router bash -c 'mongo < /scripts/shard-config.js';