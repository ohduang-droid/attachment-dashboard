# Multi-stage build for optimized production image
# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies with legacy peer deps for backward compatibility
# Using --legacy-peer-deps ensures compatibility with older dependency versions
RUN npm ci --legacy-peer-deps

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy server script
COPY server.js ./

# Expose port 3000
EXPOSE 3000

# Start the application using simple Node.js server
CMD ["node", "server.js"]

# Stage 3: Development stage (optional)
FROM node:18-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Expose port 5173 (Vite default)
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
