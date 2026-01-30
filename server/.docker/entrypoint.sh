#!/bin/bash

# if [ ! -f ".env"]; then
#     cp .env.example .env
# fi

npm install
npx prisma generate
npx prisma migrate dev
tail -f /dev/null