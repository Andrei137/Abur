#!/bin/bash
rm -f ./db.sqlite
pnpm db:migrate
pnpm db:seed
