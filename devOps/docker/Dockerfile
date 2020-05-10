FROM node:10

# Create app directory
WORKDIR /app/

# COPY package*.json ./
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN yarn global add dotenv typescript

# RUN npm install --silent --no-cache
# If you are building your code for production
# Bundle app source
RUN yarn
RUN yarn run build
CMD [ "node", "build/app.js" ]