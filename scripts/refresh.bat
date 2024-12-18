@echo off

del /Q /F db.sqlite
call npx sequelize db:migrate
call npx sequelize db:seed:all
