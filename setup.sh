#!/bin/bash

docker run -p 5984:5984 -d couchdb:2.3.1
rm -rf node_modules/
npm i
nodemon app.js
