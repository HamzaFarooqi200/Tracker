# # Use Node.js as the base image
# FROM node:18-alpine

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the app
# COPY . .

# # Build the React app
# RUN npm run build

# # Expose port 3000
# EXPOSE 3000

# # Start the application
# CMD ["npx", "serve", "-s", "build"]
# Use Node.js Alpine for lightweight builds
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json & install dependencies
COPY package*.json ./

# Ensure latest dependencies
RUN npm install && npm cache clean --force

# Copy only necessary files (avoid sending .git, node_modules, etc.)
COPY . .

# Set environment variable to speed up React builds
ENV GENERATE_SOURCEMAP=false

# Build the React app
RUN npm run build

# Expose port and start the server
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
