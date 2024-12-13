#!/bin/bash

cd ..
rm -f ./db.sqlite
npx sequelize db:migrate
npx sequelize db:seed:all
cd scripts
