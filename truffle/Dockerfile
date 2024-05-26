FROM node:20-alpine

WORKDIR /truffle

VOLUME ["/truffle/db"]

RUN npm install ganache --global

EXPOSE 6398

CMD ["ganache", "--server.host=0.0.0.0", "--database.dbPath=/truffle/db", "--server.port=6398", "--chain.networkId=5777", "--wallet.deterministic=true"]
