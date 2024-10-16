FROM node:20.11-alpine AS build-frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

ARG VITE_API_URL=https://mindes.ru/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build -- --mode production

FROM node:20.11-alpine

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

RUN npm install pm2 -g

COPY backend/ ./

COPY --from=build-frontend /app/frontend/dist ./public

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
