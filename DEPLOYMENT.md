# TFstudio Docker Deployment Guide

This guide explains how to deploy the TFstudio React application using Docker and nginx.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at `http://localhost`

### Option 2: Using Docker directly

```bash
# Build the image
docker build -t tfstudio-website .

# Run the container
docker run -d -p 80:80 --name tfstudio-web tfstudio-website

# View logs
docker logs -f tfstudio-web

# Stop the container
docker stop tfstudio-web
docker rm tfstudio-web
```

## Custom Port

To run on a different port (e.g., 8080):

**Docker Compose:**
```yaml
# Edit docker-compose.yml
ports:
  - "8080:80"
```

**Docker:**
```bash
docker run -d -p 8080:80 --name tfstudio-web tfstudio-website
```

## Production Deployment

### Using a Custom Domain

1. **Update nginx.conf:**
   ```nginx
   server_name yourdomain.com www.yourdomain.com;
   ```

2. **Add SSL with Let's Encrypt:**
   ```yaml
   # docker-compose.yml with SSL
   version: '3.8'
   
   services:
     tfstudio-web:
       build: .
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./ssl:/etc/nginx/ssl
       restart: unless-stopped
   ```

### Environment Variables

If you need to pass environment variables at runtime:

```bash
docker run -d \
  -p 80:80 \
  -e VITE_API_URL=https://api.yourdomain.com \
  --name tfstudio-web \
  tfstudio-website
```

## Build Optimization

The Dockerfile uses multi-stage builds to keep the image small:
- **Build stage**: Compiles the React app
- **Production stage**: Serves static files with nginx

Final image size: ~25MB

## Nginx Configuration

The included `nginx.conf` provides:
- Gzip compression for faster loading
- Security headers
- Static asset caching (1 year)
- Client-side routing support
- Hidden file protection

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs tfstudio-web

# Verify build
docker build --no-cache -t tfstudio-website .
```

### Port already in use
```bash
# Find process using port 80
sudo lsof -i :80

# Use different port
docker run -d -p 8080:80 --name tfstudio-web tfstudio-website
```

### Changes not appearing
```bash
# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

## Updating the Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Performance Monitoring

```bash
# Container stats
docker stats tfstudio-web

# Resource usage
docker inspect tfstudio-web
```

## Cloud Deployment

### AWS ECS / Google Cloud Run / Azure Container Instances

1. Push image to registry:
   ```bash
   docker tag tfstudio-website your-registry/tfstudio-website:latest
   docker push your-registry/tfstudio-website:latest
   ```

2. Deploy using platform-specific commands

### DigitalOcean / Linode

1. Create Droplet/Instance
2. Install Docker
3. Clone repository
4. Run `docker-compose up -d`

## Security Best Practices

- Always use HTTPS in production
- Keep Docker and nginx updated
- Use environment variables for sensitive data
- Implement rate limiting for public deployments
- Regular security audits

## Support

For issues or questions, refer to:
- Docker documentation: https://docs.docker.com
- Nginx documentation: https://nginx.org/en/docs
