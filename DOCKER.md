# Docker Setup for Attachment Dashboard

This document explains how to run the Attachment Dashboard using Docker.

## Quick Start

### Development Mode

Run the application in development mode with hot-reload:

```bash
# Using docker-compose (recommended)
docker-compose up app-dev

# Or using Docker directly
docker build --target development -t attachment-dashboard:dev .
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules attachment-dashboard:dev
```

The application will be available at `http://localhost:5173`

### Production Mode

Run the optimized production build:

```bash
# Using docker-compose (recommended)
docker-compose up app-prod

# Or using Docker directly
docker build --target production -t attachment-dashboard:prod .
docker run -p 3000:3000 attachment-dashboard:prod
```

The application will be available at `http://localhost:3000`

## Dockerfile Features

### Multi-Stage Build
The Dockerfile uses a multi-stage build approach with three stages:

1. **Builder Stage**: Compiles the application
2. **Production Stage**: Serves the optimized build
3. **Development Stage**: Runs the dev server with hot-reload

### Backward Compatibility
Dependencies are installed using the `--legacy-peer-deps` flag to ensure backward compatibility with older package versions. This prevents peer dependency conflicts.

### Optimizations
- Uses Alpine Linux for smaller image size
- Separates build and runtime dependencies
- Leverages Docker layer caching for faster builds

## Docker Compose Services

### app-dev
- **Purpose**: Development environment with hot-reload
- **Port**: 5173
- **Features**: 
  - Volume mounting for live code updates
  - Interactive terminal support
  - Development dependencies included

### app-prod
- **Purpose**: Production-ready deployment
- **Port**: 3000
- **Features**:
  - Optimized build served with `serve`
  - Automatic restart on failure
  - Minimal image size

## Common Commands

```bash
# Start development server
docker-compose up app-dev

# Start production server
docker-compose up app-prod

# Build images without starting
docker-compose build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f app-dev

# Rebuild and start
docker-compose up --build app-dev
```

## Environment Variables

You can customize the application by creating a `.env` file in the project root. The Docker setup will automatically load these variables.

## Troubleshooting

### Port Already in Use
If you get a port conflict error, either:
- Stop the local dev server running on that port
- Change the port mapping in `docker-compose.yml`

### Dependency Issues
If you encounter dependency conflicts:
- The `--legacy-peer-deps` flag should handle most cases
- Try rebuilding with `docker-compose build --no-cache`

### Volume Mounting Issues
On some systems, you may need to adjust volume permissions:
```bash
docker-compose run --rm app-dev chown -R node:node /app/node_modules
```
