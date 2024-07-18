# Use the official Node.js image
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to container
COPY . .

# Expose port 3000 (change this if your application uses a different port)
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
