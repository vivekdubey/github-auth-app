FROM node:8.14.1-alpine
ADD . /app
RUN cd /app && npm install
EXPOSE 3000
WORKDIR /app
ENTRYPOINT ["npm", "start"]
