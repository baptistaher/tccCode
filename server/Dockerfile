# FROM node:lts-alpine
# FROM node:18.1.0
FROM node:18-alpine3.18

RUN apk add --no-cache bash



WORKDIR /app



COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .


# EXPOSE 5000

# CMD ["npm","run","dev"]