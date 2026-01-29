FROM node:lts-alpine
# FROM node:18.1.0

RUN apk add --no-cache bash



WORKDIR /app



COPY package.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .


# EXPOSE 5000

# CMD ["npm","run","dev"]