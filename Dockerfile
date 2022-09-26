
FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build

# nginx state for serving content
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]