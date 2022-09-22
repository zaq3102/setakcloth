FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/setakcloth/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/setakcloth/frontend/dist/index.html /usr/share/nginx/html/index.html
COPY --from=build-stage /var/jenkins_home/workspace/setakcloth/frontend/dist/main.js /usr/share/nginx/html/main.js
COPY --from=build-stage /var/jenkins_home/workspace/setakcloth/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /var/jenkins_home/workspace/setakcloth/frontend/deploy_conf/fullchain.pem /etc/nginx/ssl/live/j7a706.p.ssafy.io/fullchain.pem
COPY --from=build-stage /var/jenkins_home/workspace/setakcloth/frontend/deploy_conf/privkey.pem /etc/nginx/ssl/live/j7a706.p.ssafy.io/privkey.pem

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g","daemon off;"]