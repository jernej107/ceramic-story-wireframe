# TFStudio - React + Strapi CMS with Docker

Production-ready ceramic studio website with headless CMS. Designed for deployment with Docker on CentOS servers using Caddy as reverse proxy.

---

## 📋 Table of Contents

1. [Architecture](#-architecture)
2. [Prerequisites](#-prerequisites)
3. [React App Docker Setup](#-react-app-docker-setup)
4. [Strapi CMS Installation](#-strapi-cms-installation)
5. [Caddy Integration](#-caddy-integration)
6. [Content Management](#-content-management)
7. [Maintenance](#-maintenance)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Caddy Reverse Proxy             │
│         (Port 80/443 - HTTPS)           │
└──────┬──────────────────────┬───────────┘
       │                      │
┌──────▼──────────┐   ┌───────▼──────────┐
│  React App      │   │  Strapi CMS      │
│  (Port 3000)    │   │  (Port 1337)     │
│  - Docker       │   │  - Admin Panel   │
│  - Nginx        │   │  - REST API      │
└─────────────────┘   └────────┬─────────┘
                               │
                      ┌────────▼─────────┐
                      │  PostgreSQL      │
                      │  (Port 5432)     │
                      └──────────────────┘
```

**Stack:**
- Frontend: React 18 + TypeScript + Vite + Tailwind
- CMS: Strapi 4.x
- Database: PostgreSQL 15
- Reverse Proxy: Caddy (already configured)
- Containers: Docker + Docker Compose

---

## 📋 Prerequisites

- CentOS Linode server with Caddy already installed and running
- Docker and Docker Compose installed
- Domain pointed to server IP
- Git installed

---

## 🚀 React App Docker Setup

### 1. Clone Repository

```bash
cd /var/www
git clone <YOUR_REPO_URL> tfstudio
cd tfstudio
```

### 2. Configure Environment

```bash
cat > .env << 'EOF'
VITE_STRAPI_URL=https://yourdomain.com
VITE_STRAPI_API_URL=https://yourdomain.com/api
EOF
```

### 3. Docker Configuration

**Dockerfile** (already in project):
```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 4. Build and Run React App

```bash
# Build the image
docker build -t tfstudio-frontend .

# Run the container
docker run -d \
  --name tfstudio-frontend \
  --restart unless-stopped \
  -p 3000:80 \
  tfstudio-frontend

# Verify it's running
docker ps
curl http://localhost:3000
```

---

## 🗄️ Strapi CMS Installation

### 1. Create Strapi Directory

```bash
cd /var/www/tfstudio
mkdir -p strapi
```

### 2. Generate Secure Secrets

```bash
APP_KEYS=$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 64)
JWT_SECRET=$(openssl rand -base64 64)
DB_PASSWORD=$(openssl rand -base64 32)
```

### 3. Create Strapi Environment File

```bash
cat > strapi/.env << EOF
HOST=0.0.0.0
PORT=1337
APP_KEYS=$APP_KEYS
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
JWT_SECRET=$JWT_SECRET

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=$DB_PASSWORD
DATABASE_SSL=false

NODE_ENV=production
EOF
```

### 4. Create Strapi Dockerfile

```bash
cat > Dockerfile.strapi << 'EOF'
FROM node:18-alpine

WORKDIR /app

# Install Strapi
RUN npm install -g @strapi/strapi@latest

# Create Strapi project
RUN strapi new . --quickstart --no-run

# Copy configuration
COPY strapi/.env .env

EXPOSE 1337

CMD ["npm", "run", "develop"]
EOF
```

### 5. Create Docker Compose File

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: tfstudio-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - tfstudio-network

  strapi:
    build:
      context: .
      dockerfile: Dockerfile.strapi
    container_name: tfstudio-strapi
    restart: unless-stopped
    env_file:
      - ./strapi/.env
    ports:
      - "1337:1337"
    volumes:
      - strapi_data:/app
      - strapi_uploads:/app/public/uploads
    depends_on:
      - postgres
    networks:
      - tfstudio-network

  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: tfstudio-frontend
    restart: unless-stopped
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    networks:
      - tfstudio-network

volumes:
  postgres_data:
  strapi_data:
  strapi_uploads:

networks:
  tfstudio-network:
    driver: bridge
EOF
```

### 6. Launch All Services

```bash
# Start everything
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f strapi
```

### 7. Initialize Strapi Admin

1. Visit `http://YOUR_SERVER_IP:1337/admin`
2. Create admin account
3. Start adding content

---

## 🔀 Caddy Integration

### Add to Your Existing Caddyfile

Add this configuration to your existing Caddyfile (typically at `/etc/caddy/Caddyfile`):

```caddyfile
# React Frontend
yourdomain.com {
    reverse_proxy localhost:3000
    
    encode gzip
    
    # Security headers
    header {
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        X-XSS-Protection "1; mode=block"
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
    }
}

# Strapi CMS
yourdomain.com {
    # API endpoints
    reverse_proxy /api/* localhost:1337
    
    # Admin panel
    reverse_proxy /admin* localhost:1337
    
    # Uploaded media
    reverse_proxy /uploads/* localhost:1337
    
    # GraphQL (if enabled)
    reverse_proxy /graphql localhost:1337
}
```

### Reload Caddy

```bash
# Test configuration
caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy
systemctl reload caddy

# Check status
systemctl status caddy
```

### Alternative: Simplified Single Block

If you prefer a simpler approach:

```caddyfile
yourdomain.com {
    # Frontend (default)
    reverse_proxy localhost:3000
    
    # Strapi paths
    reverse_proxy /api/* localhost:1337
    reverse_proxy /admin* localhost:1337
    reverse_proxy /uploads/* localhost:1337
    reverse_proxy /graphql localhost:1337
    
    encode gzip
    
    header {
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        Strict-Transport-Security "max-age=31536000"
    }
}
```

---

## 📝 Content Management

### Content Types in Strapi

Your Strapi CMS includes these content types:

#### 1. Studio Info (Single Type)
Global information for homepage and about page.

**Fields:**
- `hero_title`, `hero_subtitle`, `hero_description`
- `hero_image`, `about_image`
- `about_title`, `about_description`
- `years_experience`, `pieces_created`
- `shop_url`

#### 2. Collections
Ceramic collections featured on homepage.

**Fields:**
- `name`, `description`
- `featured_image`, `gallery_images`
- `display_order`, `is_featured`

#### 3. Blog Posts
Journal entries and articles.

**Fields:**
- `title`, `slug`, `excerpt`, `content`
- `category`, `featured_image`
- `author`, `published_at`, `read_time`

#### 4. Products
Individual ceramic pieces.

**Fields:**
- `name`, `description`, `price`
- `images`, `collection`
- `is_second_chance`, `is_available`

#### 5. Categories
Organize blog posts and products.

**Fields:**
- `name`, `slug`, `type` (blog/product)

### Adding Content

1. Go to `https://yourdomain.com/admin`
2. Navigate to **Content Manager**
3. Select content type
4. Click **Create new entry**
5. Fill fields, upload images
6. **Save** and **Publish**

### Media Management

- Upload via Media Library or directly in entries
- Formats: JPG, PNG, GIF, SVG, WebP
- Auto-generated thumbnails
- Stored in Docker volume `strapi_uploads`

---

## 🔧 Maintenance

### View Logs

```bash
cd /var/www/tfstudio

# All services
docker-compose logs -f

# Specific service
docker-compose logs -f strapi
docker-compose logs -f frontend
docker-compose logs -f postgres

# Last 100 lines
docker-compose logs --tail=100 strapi
```

### Database Backup

```bash
# Create backup script
cat > /usr/local/bin/backup-tfstudio.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/tfstudio"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

cd /var/www/tfstudio
docker-compose exec -T postgres \
  pg_dump -U strapi strapi | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Keep last 7 days
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +7 -delete

echo "Backup: $BACKUP_DIR/db_$DATE.sql.gz"
EOF

chmod +x /usr/local/bin/backup-tfstudio.sh

# Add daily cron (2 AM)
echo "0 2 * * * root /usr/local/bin/backup-tfstudio.sh" >> /etc/crontab

# Run manual backup
/usr/local/bin/backup-tfstudio.sh
```

### Restore Database

```bash
cd /var/www/tfstudio

gunzip -c /var/backups/tfstudio/db_20240101_020000.sql.gz | \
  docker-compose exec -T postgres psql -U strapi strapi
```

### Backup Media Files

```bash
BACKUP_DIR="/var/backups/tfstudio"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup
docker run --rm \
  --volumes-from tfstudio-strapi \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/uploads_$DATE.tar.gz -C /app/public uploads

# Restore
docker run --rm \
  --volumes-from tfstudio-strapi \
  -v $BACKUP_DIR:/backup \
  alpine tar xzf /backup/uploads_20240101.tar.gz -C /app/public
```

### Update Application

```bash
cd /var/www/tfstudio

# Pull changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build --no-deps frontend
docker-compose up -d --build --no-deps strapi

# Clean old images
docker image prune -f
```

### Monitor Resources

```bash
# Container stats
docker stats

# Disk usage
docker system df

# Server resources
htop

# Disk space
df -h
```

### Restart Services

```bash
cd /var/www/tfstudio

# Restart specific service
docker-compose restart strapi
docker-compose restart frontend

# Restart all
docker-compose restart

# Stop all
docker-compose down

# Start all
docker-compose up -d
```

---

## 🐛 Troubleshooting

### Frontend Not Loading

```bash
# Check logs
docker-compose logs frontend

# Check if running
docker ps | grep frontend

# Rebuild
docker-compose up -d --build --no-cache frontend

# Test internally
curl http://localhost:3000
```

### Strapi Not Accessible

```bash
# Check logs
docker-compose logs strapi

# Check database connection
docker-compose logs postgres

# Restart Strapi
docker-compose restart strapi

# Check port
netstat -tulpn | grep 1337
```

### Database Connection Issues

```bash
# Check postgres is running
docker-compose ps postgres

# Check logs
docker-compose logs postgres

# Connect to database manually
docker-compose exec postgres psql -U strapi -d strapi

# Reset database (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d
```

### Caddy Not Proxying Correctly

```bash
# Check Caddy logs
journalctl -u caddy -f

# Validate config
caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy
systemctl reload caddy

# Test locally
curl http://localhost:3000  # Should return React app
curl http://localhost:1337/admin  # Should return Strapi
```

### Firewall Issues on CentOS

```bash
# Check firewall status
firewall-cmd --list-all

# Open ports if needed
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

# Test port accessibility
curl -I http://localhost:3000
curl -I http://localhost:1337
```

### SELinux Blocking Docker

```bash
# Check SELinux status
getenforce

# Set permissive (temporary)
setenforce 0

# Configure policies (recommended)
setsebool -P httpd_can_network_connect 1
setsebool -P httpd_can_network_relay 1
```

### High Memory Usage

```bash
# Check usage
docker stats

# Limit container resources (add to docker-compose.yml)
services:
  strapi:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          memory: 1G
```

### SSL Certificate Issues

Caddy handles SSL automatically. If issues occur:

```bash
# Check Caddy logs for certificate errors
journalctl -u caddy -n 100

# Force certificate renewal
caddy reload

# Verify domain DNS
dig yourdomain.com

# Check ports are accessible externally
telnet yourdomain.com 443
```

---

## 📚 Additional Resources

- **React Query**: Data fetching hooks in `src/lib/hooks/`
- **Strapi Docs**: https://docs.strapi.io
- **Caddy Docs**: https://caddyserver.com/docs
- **Docker Compose**: https://docs.docker.com/compose/

---

## 🚀 Quick Commands Reference

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Restart service
docker-compose restart strapi

# Rebuild frontend
docker-compose up -d --build frontend

# Check status
docker-compose ps

# Clean up
docker system prune -a

# Backup database
/usr/local/bin/backup-tfstudio.sh

# Update app
git pull && docker-compose up -d --build
```

---

**Your site will be available at:**
- 🌐 Frontend: `https://yourdomain.com`
- 🎨 Strapi Admin: `https://yourdomain.com/admin`
- 🔌 API: `https://yourdomain.com/api`

Caddy automatically handles HTTPS with Let's Encrypt certificates!
