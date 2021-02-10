FROM nginx:1.15-alpine
ADD docker/nginx.conf /etc/nginx/nginx.conf
ADD docker/default.conf /etc/nginx/conf.d/default.conf
ADD docker/log.conf /etc/nginx/conf.d/log.conf
COPY build /usr/share/nginx/html/companytool
EXPOSE 80
