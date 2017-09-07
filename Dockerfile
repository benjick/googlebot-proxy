FROM mhart/alpine-node:8.4.0

WORKDIR /app
COPY . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

RUN npm install --production

EXPOSE 3000
CMD ["node", "src/index.js"]
