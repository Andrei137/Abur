@echo off

del /Q /F db.test.sqlite ^
&& pnpm test:db:migrate ^
&& pnpm test:db:seed
