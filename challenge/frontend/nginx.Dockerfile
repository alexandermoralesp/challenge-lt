# Dockerfile for nginx to serve react app
FROM nginx:1.23.1-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
