# Step 1: Use Node.js 20 as the builder base image
FROM node:20.10.0 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install all dependencies including papaparse
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the Next.js project for production
RUN npm run build

# Step 2: Create a lightweight final image
FROM node:20.10.0-alpine AS production

# Set the working directory in the final container
WORKDIR /app

# Copy only essential files and the build from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port your app will run on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
