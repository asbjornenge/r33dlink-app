FROM node:latest
RUN npm install -g node-static
ADD dist /app
CMD ["static","-p","8080","-a","0.0.0.0","/app"]
