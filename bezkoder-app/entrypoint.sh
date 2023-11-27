#!/usr/bin/env bash

dockerize -wait tcp://mysqldb:3306 -timeout 3600s
source /usr/local/bin/docker-entrypoint.sh
