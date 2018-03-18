FROM node:latest
MAINTAINER rainboy "597872644@qq.com"

RUN mkdir /server
COPY . /server
RUN cd /server && npm i
WORKDIR /server
EXPOSE 3000

CMD ["/usr/local/bin/npm","run","start"]


