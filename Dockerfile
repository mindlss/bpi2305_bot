FROM node:20.11-alpine AS build-frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

RUN npm run build

FROM node:20.11-alpine

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

RUN npm install pm2 -g

COPY backend/ ./

COPY --from=build-frontend /app/frontend/dist ./public

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
