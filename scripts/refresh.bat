@echo off

del /Q db.sqlite
npx sequelize db:migrate
npx sequelize db:seed:all
cd scripts
