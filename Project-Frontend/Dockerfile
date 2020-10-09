FROM node:12.4.0-alpine as build
WORKDIR /app
COPY . ./

RUN npm install && npm run build

FROM nginx:1.17.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]