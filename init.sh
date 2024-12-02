#! /bin/bash

# creating the env file

# bash bin/init/devEnv.sh

# setup file vault

bash bin/init/fileVault.sh

# setting up the hof-rds-api

# bash bin/init/hofRds.sh

# docker compose execution to bring up the environments

## if filevault is needed build file vault containers, and link them with the main app

## if hof-rds-api is needed build file vault containers, and link them with the main app

# docker compose up -d

# pipeline?? kub tokens s3 bucket access??

