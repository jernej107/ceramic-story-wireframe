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
│    Caddy (Docker Container)             │
│    Ports 80/443 - HTTPS + Auto SSL      │
└──────┬──────────────────────┬───────────┘
       │                      │
       │   Docker Network: proxy
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
- Reverse Proxy: Caddy 2 (Docker container - already running)
- Containers: Docker + Docker Compose
- Network: Shared `proxy` network for inter-container communication

---

## 📋 Prerequisites

- CentOS Linode server
- Docker and Docker Compose installed
- Caddy running in Docker container (already configured)
- Docker network `proxy` created and Caddy connected to it
- Domain pointed to server IP
- Git installed

---

## 🚀 React App Docker Setup

### 1. Create Project Directory

```bash
mkdir -p /srv/tfstudio
cd /srv/tfstudio
```

### 2. Clone Repository

```bash
git clone <YOUR_REPO_URL> app
cd app
```

### 3. Configure Environment

```bash
cat > .env << 'EOF'
VITE_STRAPI_URL=https://tfstudio.website
VITE_STRAPI_API_URL=https://tfstudio.website/api
EOF
```

### 4. Docker Configuration

The project includes `Dockerfile` and `docker-compose.yml` already configured. You just need to ensure they connect to the Caddy `proxy` network.

Update your `docker-compose.yml` to connect to Caddy's network:

```yaml
version: '3.8'

services:
  tfstudio-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: tfstudio
    restart: unless-stopped
    expose:
      - "80"
    environment:
      - NODE_ENV=production
    networks:
      - proxy

networks:
  proxy:
    external: true
```

### 5. Build and Start React App

```bash
# Build and start the container
docker-compose up -d --build

# Verify it's running
docker-compose ps
docker logs tfstudio
```

---

## 🗄️ Strapi CMS Installation

### 1. Create Strapi Directory

```bash
cd /srv/tfstudio
mkdir -p strapi
cd strapi
```

### 2. Generate Secure Secrets

Generate random secrets for Strapi configuration:

```bash
# Generate APP_KEYS (4 keys separated by commas)
APP_KEY1=$(openssl rand -base64 32)
APP_KEY2=$(openssl rand -base64 32)
APP_KEY3=$(openssl rand -base64 32)
APP_KEY4=$(openssl rand -base64 32)
echo "APP_KEYS=$APP_KEY1,$APP_KEY2,$APP_KEY3,$APP_KEY4"

# Generate API_TOKEN_SALT
echo "API_TOKEN_SALT=$(openssl rand -base64 32)"

# Generate ADMIN_JWT_SECRET
echo "ADMIN_JWT_SECRET=$(openssl rand -base64 32)"

# Generate TRANSFER_TOKEN_SALT
echo "TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)"

# Generate JWT_SECRET
echo "JWT_SECRET=$(openssl rand -base64 32)"

# Generate Database Password
echo "DATABASE_PASSWORD=$(openssl rand -base64 32 | tr -d '/+=')"
```

**Save these values securely - you'll need them in the next step!**

### 3. Create Strapi Environment File

Create `.env` file in `/srv/tfstudio/strapi/`:

```bash
nano .env
```

Paste the following (replace with your generated secrets from step 2):

```env
# Server Configuration
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_key_1,your_app_key_2,your_app_key_3,your_app_key_4
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret

# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_generated_db_password
DATABASE_SSL=false

# URLs (adjust to your domain)
URL=https://tfstudio.website
ADMIN_URL=https://tfstudio.website/admin
```

### 4. Create Strapi Docker Compose

Create `docker-compose.yml` in `/srv/tfstudio/strapi/`:

```bash
nano docker-compose.yml
```

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: tfstudio-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - strapi-network

  strapi:
    image: strapi/strapi:latest
    container_name: tfstudio-strapi
    restart: unless-stopped
    expose:
      - "1337"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    volumes:
      - ./app:/srv/app
      - strapi-uploads:/srv/app/public/uploads
    depends_on:
      - postgres
    networks:
      - strapi-network
      - proxy

volumes:
  postgres-data:
  strapi-uploads:

networks:
  strapi-network:
  proxy:
    external: true
```

### 5. Launch Strapi Services

```bash
cd /srv/tfstudio/strapi
docker compose up -d
```

Watch the logs to ensure Strapi starts successfully:

```bash
docker logs -f tfstudio-strapi
```

Wait until you see: `Server started on port 1337`

### 6. Initialize Strapi Admin

1. Access Strapi admin panel: `https://tfstudio.website/admin`
2. Create your admin account (first user becomes super admin)
3. Complete the registration form

### 7. Create Content Types

In the Strapi admin panel, create the following content types:

#### A. Studio Info (Single Type)

1. Go to **Content-Type Builder** → **Create new single type**
2. Name it: `Studio Info`
3. Add these fields:

| Field Name | Type | Options |
|------------|------|---------|
| hero_title | Text | Required |
| hero_subtitle | Text | Optional |
| hero_description | Rich Text (Markdown) | Required |
| hero_image | Media (Single) | Required |
| about_title | Text | Required |
| about_description | Rich Text (Markdown) | Required |
| about_image | Media (Single) | Required |
| years_experience | Text | Required |
| pieces_created | Text | Required |
| shop_url | Text | Required |

4. Click **Save** and wait for server restart

#### B. Categories (Collection Type)

1. Create new collection type: `Category`
2. Add fields:

| Field Name | Type | Options |
|------------|------|---------|
| name | Text | Required, Unique |
| slug | UID (attached to name) | Required |
| type | Enumeration | Values: blog, product; Default: blog |

3. Click **Save**

#### C. Collections (Collection Type)

1. Create new collection type: `Collection`
2. Add fields:

| Field Name | Type | Options |
|------------|------|---------|
| name | Text | Required |
| description | Rich Text (Markdown) | Optional |
| featured_image | Media (Single) | Required |
| gallery_images | Media (Multiple) | Optional |
| display_order | Number (integer) | Default: 0 |
| is_featured | Boolean | Default: false |

3. Click **Save**

#### D. Blog Posts (Collection Type)

1. Create new collection type: `Blog Post`
2. Add fields:

| Field Name | Type | Options |
|------------|------|---------|
| title | Text | Required |
| slug | UID (attached to title) | Required |
| excerpt | Text (Long text) | Required |
| content | Rich Text (Markdown) | Required |
| category | Relation | Blog Post (many) to Category (one) |
| featured_image | Media (Single) | Required |
| author | Text | Required |
| published_at | DateTime | Default: now |
| read_time | Number (integer) | Default: 5 |

3. Click **Save**

#### E. Products (Collection Type) - Optional

1. Create new collection type: `Product`
2. Add fields:

| Field Name | Type | Options |
|------------|------|---------|
| name | Text | Required |
| slug | UID (attached to name) | Required |
| description | Rich Text (Markdown) | Required |
| price | Decimal | Required |
| images | Media (Multiple) | Required |
| category | Relation | Product (many) to Category (one) |
| collection | Relation | Product (many) to Collection (one) |
| is_available | Boolean | Default: true |
| is_second_chance | Boolean | Default: false |
| stock_quantity | Number (integer) | Default: 0 |

3. Click **Save**

### 8. Configure Public Permissions

**Important:** Make content publicly accessible:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. For each content type, enable:
   - ✅ `find` (list all entries)
   - ✅ `findOne` (get single entry)
4. Click **Save**

### 9. Add Your Content

Now populate Strapi with your content:

1. **Upload Images**: Go to Media Library and upload your ceramic images
2. **Create Categories**: Add categories like "Process", "Inspiration", "Techniques" (blog) and "Bowls", "Plates", "Vases" (product)
3. **Studio Info**: Fill in your studio information (hero section, about section, stats)
4. **Collections**: Add your ceramic collections with featured images
5. **Blog Posts**: Write and publish blog posts about your process
6. **Products**: Add products with images, prices, and descriptions (optional)

---

## 🔀 Caddy Integration

Since you already have Caddy running in Docker, update your Caddyfile at `/srv/tfstudio/caddy/Caddyfile`:

### Updated Caddyfile Configuration

```caddyfile
# Redirect www → apex
www.tfstudio.website {
    redir https://tfstudio.website{uri} permanent
}

tfstudio.website {
    # Strapi CMS routes (must come first for specific matching)
    reverse_proxy /api/* tfstudio-strapi:1337
    reverse_proxy /admin* tfstudio-strapi:1337
    reverse_proxy /uploads/* tfstudio-strapi:1337
    reverse_proxy /graphql tfstudio-strapi:1337
    
    # React Frontend (default/fallback)
    reverse_proxy tfstudio:80
    
    encode zstd gzip
    
    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "no-referrer-when-downgrade"
    }
}
```

### Reload Caddy Container

```bash
# Reload Caddy configuration
docker exec caddy caddy reload --config /etc/caddy/Caddyfile

# Or restart the container
docker restart caddy

# Check logs
docker logs caddy
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
# React app logs
docker logs tfstudio

# Strapi logs
cd /srv/tfstudio/strapi
docker-compose logs -f strapi

# PostgreSQL logs
docker-compose logs -f postgres

# Caddy logs
docker logs caddy

# Last 100 lines
docker logs --tail=100 tfstudio
```

### Database Backup

```bash
# Create backup script
cat > /usr/local/bin/backup-tfstudio.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/tfstudio"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

cd /srv/tfstudio/strapi
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
cd /srv/tfstudio/strapi

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
# Update React app
cd /srv/tfstudio/app
git pull origin main
docker-compose up -d --build

# Update Strapi
cd /srv/tfstudio/strapi
docker-compose pull strapi
docker-compose up -d

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
# Restart React app
cd /srv/tfstudio/app
docker-compose restart

# Restart Strapi
cd /srv/tfstudio/strapi
docker-compose restart strapi

# Restart Caddy
docker restart caddy

# Stop all
docker stop tfstudio caddy
cd /srv/tfstudio/strapi
docker-compose down

# Start all
docker start tfstudio caddy
cd /srv/tfstudio/strapi
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
docker logs caddy

# Validate config inside container
docker exec caddy caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy
docker exec caddy caddy reload --config /etc/caddy/Caddyfile

# Or restart
docker restart caddy

# Test connectivity from Caddy to app containers
docker exec caddy wget -O- http://tfstudio:80
docker exec caddy wget -O- http://tfstudio-strapi:1337
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
docker logs caddy | grep -i certificate

# Force certificate renewal by restarting
docker restart caddy

# Verify domain DNS
dig tfstudio.website

# Check ports are accessible externally
telnet tfstudio.website 443

# Ensure Caddy data volume persists certificates
docker volume inspect caddy_data
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
# Start React app
cd /srv/tfstudio/app && docker-compose up -d

# Start Strapi
cd /srv/tfstudio/strapi && docker-compose up -d

# Start Caddy
docker start caddy

# View logs
docker logs tfstudio
docker logs caddy
cd /srv/tfstudio/strapi && docker-compose logs -f

# Restart services
docker restart tfstudio
docker restart caddy
cd /srv/tfstudio/strapi && docker-compose restart

# Check status
docker ps

# Update React app
cd /srv/tfstudio/app && git pull && docker-compose up -d --build

# Backup database
/usr/local/bin/backup-tfstudio.sh

# Clean up
docker system prune -a
```

---

**Your site will be available at:**
- 🌐 Frontend: `https://tfstudio.website`
- 🎨 Strapi Admin: `https://tfstudio.website/admin`
- 🔌 API: `https://tfstudio.website/api`

Caddy Docker container automatically handles HTTPS with Let's Encrypt certificates!
