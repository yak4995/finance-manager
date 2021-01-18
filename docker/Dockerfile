FROM node:14
ARG exposed_http_port
ARG exposed_grpc_port
WORKDIR /app
COPY . /app
RUN npm install -g typescript && \
     npm install -g @nestjs/cli && \
     npm i && \
     npm rebuild grpc --force
EXPOSE $exposed_http_port
EXPOSE $exposed_grpc_port

ENTRYPOINT ["./docker/entrypoint.sh"]