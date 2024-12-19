@echo off

del /Q /F db.sqlite ^
&& pnpm db:migrate ^
&& pnpm db:seed
