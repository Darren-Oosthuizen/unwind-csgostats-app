FROM node:16.13.0-alpine as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:1.17.10-alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
COPY --from=builder /app/dist/unwind-csgostats-app  /usr/share/nginx/html
