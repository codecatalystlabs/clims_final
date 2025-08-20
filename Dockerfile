# Use Node.js 18.20.0 LTS as base image for building the application
FROM node:18.20.0 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Build the application
RUN yarn build

# Use an Nginx base image to serve the build
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the production build from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5173


