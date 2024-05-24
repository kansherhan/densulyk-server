FROM node:20-alpine

WORKDIR /truffle

VOLUME ["/truffle/db"]

RUN npm install -g ganache-cli

EXPOSE 6398

CMD ["ganache-cli", "--host=0.0.0.0", "--db=/truffle/db", "--port=6398", "--networkId=5777"]
