#!/bin/bash
rm -f ./db.test.sqlite
pnpm test:db:migrate
pnpm test:db:seed
