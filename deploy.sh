#!/bin/bash

sudo docker stop $(sudo docker ps -a -q)
sudo docker rm $(sudo docker ps -a -q)

# build frontend production
cd ./frontend
npm run build
cd ..

# then run ssl renewal manually =(
