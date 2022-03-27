#!/bin/sh

sudo systemctl start docker
docker run -p 5984:5984 -d couchdb:2.3.1
