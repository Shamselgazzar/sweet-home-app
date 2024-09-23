# Dockerfile for Next.js Frontend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port and define the start command
EXPOSE 3000
CMD ["npm", "start"]
