# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn

# Copy the entire project directory to the container
COPY . .

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the MongoDB server
RUN mkdir -p /data/db && \
    mongod --fork --logpath /var/log/mongodb.log && \
    mongoimport --db your-database-name --collection your-collection-name --type json --file /app/your-data.json --jsonArray && \
    mongod --shutdown

# Start the Next.js app
CMD ["yarn", "dev"]
