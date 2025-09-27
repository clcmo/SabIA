# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g firebase-tools

EXPOSE 5000

CMD ["firebase", "serve", "--only", "hosting", "--port", "5000"]
