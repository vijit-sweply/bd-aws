# Builder stage
FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm --version
RUN npm install
COPY . .

# Final stage
FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "start"]
