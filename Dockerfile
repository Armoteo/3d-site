FROM node:18.7

ENV PORT 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json /usr/src/app/
RUN npm install --legacy-peer-deps

# add app
COPY . /usr/src/app

ARG SRC_PATH

# Env variables
ENV SRC_PATH=$SRC_PATH

RUN npm run build 

EXPOSE 3000

# start app
CMD ["npm", "start"]
