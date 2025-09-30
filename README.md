# Ceramic Studio - Self-Hosted React + Strapi CMS

A modern, production-ready ceramic studio website with a headless CMS powered by Strapi. Fully containerized with Docker for easy deployment on any server.

---

## 📋 Table of Contents

1. [Architecture Overview](#-architecture-overview)
2. [Prerequisites](#-prerequisites)
3. [Quick Start - Local Development](#-quick-start---local-development)
4. [Reverse Proxy Options](#-reverse-proxy-options-nginx-vs-traefik-vs-caddy)
5. [Production Deployment on CentOS Linode](#-production-deployment-on-centos-linode)
6. [Content Management](#-content-management-with-strapi)
7. [Maintenance & Operations](#-maintenance--operations)
8. [Troubleshooting](#-troubleshooting)

---

## 🏗️ Architecture Overview

This application consists of four Docker services:

```
┌─────────────────────────────────────────────────────────┐
│                 Reverse Proxy Layer                     │
│          (NGINX/Traefik/Caddy - Port 80/443)           │
└────────────┬──────────────────────────┬─────────────────┘
             │                          │
             │                          │
    ┌────────▼────────┐        ┌───────▼──────────┐
    │  React Frontend │        │  Strapi CMS      │
    │  (Port 5173)    │        │  (Port 1337)     │
    │  - Vite Build   │        │  - Admin Panel   │
    │  - TypeScript   │        │  - REST API      │
    │  - Tailwind CSS │        │  - Media Upload  │
    └─────────────────┘        └───────┬──────────┘
                                       │
                               ┌───────▼──────────┐
                               │  PostgreSQL      │
                               │  (Port 5432)     │
                               │  - Persistent DB │
                               └──────────────────┘
```

**Technology Stack:**
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + React Query
- **CMS**: Strapi 4.x (Headless CMS)
- **Database**: PostgreSQL 15
- **Reverse Proxy**: NGINX (recommended), Traefik, or Caddy
- **Containerization**: Docker + Docker Compose

---

## 📋 Prerequisites

### Local Development
- **Docker** v20.10+ ([Install Docker](https://docs.docker.com/get-docker/))
- **Docker Compose** v2.0+ ([Install Docker Compose](https://docs.docker.com/compose/install/))
- **Node.js** v18+ & npm ([Install Node.js](https://nodejs.org/))
- **Git** ([Install Git](https://git-scm.com/downloads))

### Production Deployment (CentOS Linode)
- **Linode Server**: CentOS 8/9 (minimum 2GB RAM, 2 CPU cores recommended)
- **Domain Name**: Configured with DNS A records
- **SSH Access**: Root or sudo privileges
- **Firewall**: Ports 22 (SSH), 80 (HTTP), 443 (HTTPS) open

---

## 🚀 Quick Start - Local Development

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd ceramic-studio
```

### 2. Create Environment Files

**Frontend Environment (.env)**
```bash
cat > .env << EOF
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_URL=http://localhost:1337/api
EOF
```

**Strapi Environment (strapi/.env)**
```bash
# Create strapi directory if it doesn't exist
mkdir -p strapi

# Generate secure secrets
APP_KEYS=$(node -e "console.log(require('crypto').randomBytes(16).toString('base64'))")
API_TOKEN_SALT=$(node -e "console.log(require('crypto').randomBytes(16).toString('base64'))")
ADMIN_JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")

cat > strapi/.env << EOF
HOST=0.0.0.0
PORT=1337
APP_KEYS=$APP_KEYS
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
JWT_SECRET=$JWT_SECRET

# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_secure_password_123
DATABASE_SSL=false
EOF
```

### 3. Start All Services with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# Watch logs (optional)
docker-compose logs -f

# Check service status
docker-compose ps
```

**Services will be available at:**
- 🌐 **Frontend**: http://localhost
- 🎨 **Strapi Admin**: http://localhost:1337/admin
- 🔌 **Strapi API**: http://localhost:1337/api

### 4. Initialize Strapi Admin Account

1. Visit http://localhost:1337/admin
2. Create your first admin account:
   - **Email**: your-email@example.com
   - **Password**: Strong password (8+ characters)
   - **First Name**: Your name
   - **Last Name**: Your surname

### 5. Start Adding Content

Navigate to **Content Manager** in Strapi admin panel and start creating:
- Studio Info (hero section, about content)
- Collections (ceramic collections)
- Blog Posts (journal entries)
- Products (ceramic pieces)

---

## 🚦 Reverse Proxy Options: NGINX vs Traefik vs Caddy

### Option 1: NGINX (Recommended) ✅

**Pros:**
- ✅ Battle-tested, industry standard
- ✅ Excellent performance and low resource usage
- ✅ Extensive documentation and community support
- ✅ Simple configuration for most use cases
- ✅ Manual but explicit SSL setup with Let's Encrypt

**Cons:**
- ❌ Manual SSL certificate renewal configuration
- ❌ Configuration syntax can be verbose

**Use Case**: Best for traditional deployments where you want full control and predictability.

**Current Implementation**: This project uses NGINX by default (see `nginx-proxy.conf`).

---

### Option 2: Traefik

**Pros:**
- ✅ Automatic service discovery with Docker labels
- ✅ Built-in Let's Encrypt integration (automatic SSL)
- ✅ Dynamic configuration updates without restarts
- ✅ Great for microservices and dynamic environments

**Cons:**
- ❌ More complex configuration for simple use cases
- ❌ Steeper learning curve
- ❌ Higher resource usage than NGINX

**Use Case**: Best for dynamic environments with multiple services or microservices architecture.

**Example docker-compose.yml snippet:**
```yaml
services:
  traefik:
    image: traefik:v2.10
    command:
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
      - "--certificatesresolvers.myresolver.acme.email=your-email@example.com"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./letsencrypt:/letsencrypt

  frontend:
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(`yourdomain.com`)"
      - "traefik.http.routers.frontend.entrypoints=websecure"
      - "traefik.http.routers.frontend.tls.certresolver=myresolver"
```

---

### Option 3: Caddy

**Pros:**
- ✅ Automatic HTTPS by default (zero configuration SSL)
- ✅ Simple, modern configuration syntax
- ✅ Built-in reverse proxy and file server
- ✅ Automatic certificate renewal

**Cons:**
- ❌ Smaller community compared to NGINX
- ❌ Less suitable for complex enterprise scenarios

**Use Case**: Best for simple deployments where you want HTTPS with minimal configuration.

**Example Caddyfile:**
```
yourdomain.com {
    reverse_proxy frontend:80
}

yourdomain.com/api/* {
    reverse_proxy strapi:1337
}

yourdomain.com/admin* {
    reverse_proxy strapi:1337
}

yourdomain.com/uploads/* {
    reverse_proxy strapi:1337
}
```

**Example docker-compose.yml snippet:**
```yaml
services:
  caddy:
    image: caddy:2.7-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config

volumes:
  caddy_data:
  caddy_config:
```

---

### Recommendation

| Scenario | Recommended Proxy |
|----------|------------------|
| Production deployment with manual SSL control | **NGINX** |
| Simple deployment, automatic SSL | **Caddy** |
| Microservices, dynamic environment | **Traefik** |
| High traffic, enterprise | **NGINX** |

**This project uses NGINX** for production reliability and explicit control.

---

## 🚀 Production Deployment on CentOS Linode

### Step 1: Provision Linode Server

1. **Create Linode Instance**:
   - Log in to [Linode Cloud Manager](https://cloud.linode.com/)
   - Click **Create** → **Linode**
   - Select **CentOS Stream 9** (or CentOS 8)
   - Choose plan: **Shared CPU - 4GB** minimum (for production)
   - Select region closest to your users
   - Set root password or add SSH key
   - Click **Create Linode**

2. **Configure DNS**:
   - In your domain registrar (Namecheap, GoDaddy, etc.)
   - Add **A Record**: `@` → `[Your Linode IP]`
   - Add **A Record**: `www` → `[Your Linode IP]`
   - Wait 5-30 minutes for DNS propagation

---

### Step 2: Initial Server Setup

**Connect to your server:**
```bash
ssh root@YOUR_SERVER_IP
```

**Update system:**
```bash
dnf update -y
dnf upgrade -y
```

**Install required packages:**
```bash
# Install development tools
dnf groupinstall "Development Tools" -y

# Install Git
dnf install git -y

# Install firewalld
dnf install firewalld -y
systemctl start firewalld
systemctl enable firewalld

# Open required ports
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-service=ssh
firewall-cmd --reload
```

---

### Step 3: Install Docker & Docker Compose

**Install Docker:**
```bash
# Remove old versions (if any)
dnf remove docker docker-client docker-client-latest \
  docker-common docker-latest docker-latest-logrotate \
  docker-logrotate docker-engine

# Add Docker repository
dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker
dnf install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

# Start Docker service
systemctl start docker
systemctl enable docker

# Verify installation
docker --version
docker compose version
```

**Test Docker:**
```bash
docker run hello-world
```

---

### Step 4: Clone and Configure Project

**Create application directory:**
```bash
mkdir -p /var/www
cd /var/www
```

**Clone repository:**
```bash
git clone <YOUR_REPOSITORY_URL> ceramic-studio
cd ceramic-studio
```

**Create production environment files:**

**Frontend .env:**
```bash
cat > .env << EOF
VITE_STRAPI_URL=https://yourdomain.com
VITE_STRAPI_API_URL=https://yourdomain.com/api
EOF
```

**Strapi .env:**
```bash
# Generate secure secrets
APP_KEYS=$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 64)
JWT_SECRET=$(openssl rand -base64 64)
DB_PASSWORD=$(openssl rand -base64 32)

mkdir -p strapi

cat > strapi/.env << EOF
HOST=0.0.0.0
PORT=1337
APP_KEYS=$APP_KEYS
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
JWT_SECRET=$JWT_SECRET

# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=$DB_PASSWORD
DATABASE_SSL=false

# Production settings
NODE_ENV=production
EOF
```

**Update docker-compose.yml for production:**
```bash
cat > docker-compose.production.yml << 'EOF'
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
      - postgres_data:/var/lib/postgresql/data
    networks:
      - tfstudio-network

  strapi:
    build:
      context: ./strapi
      dockerfile: ../Dockerfile.strapi
    container_name: tfstudio-strapi
    restart: unless-stopped
    env_file:
      - ./strapi/.env
    volumes:
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
    environment:
      - NODE_ENV=production
    networks:
      - tfstudio-network

  nginx-proxy:
    image: nginx:alpine
    container_name: tfstudio-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx-proxy.conf:/etc/nginx/conf.d/default.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - frontend
      - strapi
    networks:
      - tfstudio-network

volumes:
  postgres_data:
  strapi_uploads:

networks:
  tfstudio-network:
    driver: bridge
EOF
```

---

### Step 5: SSL Certificate with Let's Encrypt

**Install Certbot:**
```bash
dnf install certbot -y
```

**Stop nginx temporarily:**
```bash
docker-compose -f docker-compose.production.yml down nginx-proxy 2>/dev/null || true
```

**Obtain SSL certificate:**
```bash
certbot certonly --standalone \
  -d yourdomain.com \
  -d www.yourdomain.com \
  --non-interactive \
  --agree-tos \
  --email your-email@example.com
```

**Update nginx-proxy.conf for SSL:**
```bash
cat > nginx-proxy.conf << 'EOF'
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Frontend (React app)
    location / {
        proxy_pass http://frontend:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Strapi API
    location /api {
        proxy_pass http://strapi:1337;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Strapi Admin Panel
    location /admin {
        proxy_pass http://strapi:1337;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Strapi Uploads
    location /uploads {
        proxy_pass http://strapi:1337;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
EOF

# Replace yourdomain.com with your actual domain
sed -i 's/yourdomain.com/YOURDOMAIN.COM/g' nginx-proxy.conf
```

**Set up automatic renewal:**
```bash
# Test renewal
certbot renew --dry-run

# Add cron job for automatic renewal
echo "0 0,12 * * * root certbot renew --quiet && docker-compose -f /var/www/ceramic-studio/docker-compose.production.yml restart nginx-proxy" | tee -a /etc/crontab
```

---

### Step 6: Build and Launch Application

**Build Docker images:**
```bash
cd /var/www/ceramic-studio

# Build all services
docker compose -f docker-compose.production.yml build --no-cache
```

**Start all services:**
```bash
docker compose -f docker-compose.production.yml up -d
```

**Check service status:**
```bash
docker compose -f docker-compose.production.yml ps
docker compose -f docker-compose.production.yml logs -f
```

---

### Step 7: Initialize Strapi

1. Visit `https://yourdomain.com/admin`
2. Create your admin account
3. Start adding content via Content Manager

---

### Step 8: Security Hardening (Recommended)

**Disable root SSH login:**
```bash
# Create new sudo user
adduser deployer
passwd deployer
usermod -aG wheel deployer

# Disable root SSH
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart sshd
```

**Install fail2ban:**
```bash
dnf install epel-release -y
dnf install fail2ban -y
systemctl start fail2ban
systemctl enable fail2ban
```

**Set up monitoring:**
```bash
# Install htop for resource monitoring
dnf install htop -y
```

---

## 📝 Content Management with Strapi

### Content Types Overview

Strapi includes 7 pre-configured content types:

#### 1. **Studio Info** (Single Type)
Global studio information displayed on homepage and about page.

**Fields:**
- `hero_title`: Main headline (e.g., "Handcrafted Ceramics")
- `hero_subtitle`: Subheading
- `hero_description`: Hero section text
- `hero_image`: Hero background image
- `about_title`: About section title
- `about_description`: About section content
- `about_image`: About section image
- `years_experience`: Years in business (e.g., "15+")
- `pieces_created`: Total pieces made (e.g., "1,000+")
- `shop_url`: External shop link

#### 2. **Collections**
Featured ceramic collections displayed on homepage.

**Fields:**
- `name`: Collection name
- `description`: Collection description
- `featured_image`: Main collection image
- `gallery_images`: Additional images
- `display_order`: Sort order (lower = first)
- `is_featured`: Show on homepage

#### 3. **Blog Posts**
Journal entries and articles.

**Fields:**
- `title`: Post title
- `slug`: URL-friendly identifier (auto-generated)
- `excerpt`: Short preview text
- `content`: Full article content (rich text)
- `category`: Related category (relation)
- `featured_image`: Post header image
- `author`: Author name
- `published_at`: Publication date
- `read_time`: Estimated reading time (minutes)

#### 4. **Products**
Individual ceramic pieces, including Second Chance items.

**Fields:**
- `name`: Product name
- `description`: Product details
- `price`: Product price
- `images`: Product photos (multiple)
- `collection`: Related collection (relation)
- `is_second_chance`: Mark as discounted/imperfect
- `is_available`: Currently in stock

#### 5. **Categories**
Categories for organizing blog posts and products.

**Fields:**
- `name`: Category name
- `slug`: URL-friendly identifier
- `type`: Category type (`blog` or `product`)

#### 6. **Newsletter Subscribers**
Email list for newsletter signups.

**Fields:**
- `email`: Subscriber email
- `name`: Subscriber name (optional)
- `subscribed_at`: Subscription date

#### 7. **Contact Inquiries**
Contact form submissions.

**Fields:**
- `name`: Sender name
- `email`: Sender email
- `message`: Inquiry message
- `status`: Inquiry status (`new`, `read`, `responded`)

### Adding Content via Strapi Admin

1. **Access Admin Panel**: http://localhost/admin
2. **Navigate to Content Manager** in left sidebar
3. **Select a Content Type** (e.g., Collections)
4. **Click "Create new entry"**
5. **Fill in fields** and upload media
6. **Click "Save"** then **"Publish"** to make live

### Managing Media

- Upload images via Media Library or directly in content entries
- Supported formats: JPG, PNG, GIF, SVG, WebP
- Images are stored in `strapi/public/uploads/`
- Strapi automatically generates thumbnails

## 🎨 Frontend Development

### Project Structure

```
src/
├── components/           # React components
│   ├── HeroSection.tsx
│   ├── FeaturedCeramics.tsx
│   ├── AboutSection.tsx
│   ├── SecondChanceCeramics.tsx
│   ├── JournalSection.tsx
│   ├── Navigation.tsx
│   └── Footer.tsx
├── pages/               # Route pages
│   ├── Index.tsx       # Homepage
│   ├── About.tsx       # About page
│   ├── Journal.tsx     # Blog listing
│   └── SecondChance.tsx # Second Chance products
├── lib/
│   ├── strapi.ts       # Strapi API client
│   ├── utils.ts        # Utilities
│   └── hooks/          # React Query hooks
│       ├── useStudioInfo.ts
│       ├── useCollections.ts
│       ├── useBlogPosts.ts
│       ├── useProducts.ts
│       └── useCategories.ts
└── index.css           # Global styles & design tokens
```

### Data Fetching with React Query

All components use React Query hooks for data fetching:

```typescript
import { useStudioInfo } from '@/lib/hooks/useStudioInfo';

function HeroSection() {
  const { data: studioInfo, isLoading, error } = useStudioInfo();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading content</div>;
  
  return (
    <section>
      <h1>{studioInfo?.hero_title}</h1>
      {/* ... */}
    </section>
  );
}
```

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Create corresponding content type in Strapi (if needed)
4. Create React Query hook for data fetching

### Styling Guidelines

- Use Tailwind CSS utility classes
- Semantic color tokens from `src/index.css`
- Use shadcn/ui components from `src/components/ui/`
- Responsive design: mobile-first approach

## 🚢 Production Deployment

### Preparation

1. **Configure Environment Variables**

Edit `.env` and `strapi/.env` for production:

```bash
# Frontend .env
VITE_STRAPI_URL=https://yourdomain.com
VITE_STRAPI_API_URL=https://yourdomain.com/api

# Strapi .env
HOST=0.0.0.0
PORT=1337
APP_KEYS=<generated-secret>
API_TOKEN_SALT=<generated-secret>
ADMIN_JWT_SECRET=<generated-secret>
JWT_SECRET=<generated-secret>
DATABASE_PASSWORD=<strong-password>
```

2. **Update Docker Compose for Production**

Use `docker-compose.production.yml` which includes:
- Volume persistence for database and uploads
- Production-optimized settings
- SSL-ready nginx configuration

### Deployment on VPS/Dedicated Server

#### Option 1: Using the Deployment Script

```bash
# Make script executable
chmod +x deploy-strapi.sh

# Run deployment
./deploy-strapi.sh
```

#### Option 2: Manual Deployment

```bash
# 1. Build images
docker-compose -f docker-compose.production.yml build

# 2. Start services
docker-compose -f docker-compose.production.yml up -d

# 3. Check logs
docker-compose -f docker-compose.production.yml logs -f

# 4. Verify services
docker-compose -f docker-compose.production.yml ps
```

### SSL/HTTPS Setup with Let's Encrypt

1. **Install Certbot** on your server:
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

2. **Obtain SSL Certificate**:
```bash
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

3. **Update `nginx-proxy.conf`** to use certificates:
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # ... rest of config
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

4. **Mount certificates in docker-compose**:
```yaml
nginx-proxy:
  volumes:
    - /etc/letsencrypt:/etc/letsencrypt:ro
```

5. **Set up auto-renewal**:
```bash
sudo certbot renew --dry-run
```

### Domain Configuration

1. Point your domain's DNS A record to your server's IP address
2. Wait for DNS propagation (5-30 minutes)
3. Access your site at https://yourdomain.com

## 🔧 Maintenance & Operations

### Viewing Logs

**On CentOS Production Server:**
```bash
cd /var/www/ceramic-studio

# All services
docker compose -f docker-compose.production.yml logs -f

# Specific service
docker compose -f docker-compose.production.yml logs -f strapi
docker compose -f docker-compose.production.yml logs -f frontend
docker compose -f docker-compose.production.yml logs -f postgres

# Last 100 lines
docker compose -f docker-compose.production.yml logs --tail=100 strapi

# Follow specific service logs
docker compose -f docker-compose.production.yml logs -f --tail=50 nginx-proxy
```

### Backing Up Data

#### PostgreSQL Database Backup (Automated Script)

```bash
# Create backup script
cat > /usr/local/bin/backup-ceramic-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/ceramic-studio"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

cd /var/www/ceramic-studio
docker compose -f docker-compose.production.yml exec -T postgres \
  pg_dump -U strapi strapi | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Keep only last 7 days of backups
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/db_backup_$DATE.sql.gz"
EOF

chmod +x /usr/local/bin/backup-ceramic-db.sh

# Add daily backup cron job (runs at 2 AM)
echo "0 2 * * * root /usr/local/bin/backup-ceramic-db.sh" >> /etc/crontab

# Manual backup
/usr/local/bin/backup-ceramic-db.sh
```

#### Restore Database from Backup

```bash
cd /var/www/ceramic-studio

# Restore from backup
gunzip -c /var/backups/ceramic-studio/db_backup_20240101_020000.sql.gz | \
  docker compose -f docker-compose.production.yml exec -T postgres \
  psql -U strapi strapi
```

#### Strapi Uploads Backup

```bash
# Backup media files
BACKUP_DIR="/var/backups/ceramic-studio"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

docker run --rm \
  --volumes-from tfstudio-strapi \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/uploads_$DATE.tar.gz -C /app/public uploads

# Restore media files
docker run --rm \
  --volumes-from tfstudio-strapi \
  -v $BACKUP_DIR:/backup \
  alpine tar xzf /backup/uploads_20240101_020000.tar.gz -C /app/public
```

### Updating Application

**Pull latest changes and rebuild:**
```bash
cd /var/www/ceramic-studio

# Pull latest code
git pull origin main

# Rebuild and restart services (zero-downtime)
docker compose -f docker-compose.production.yml up -d --build --no-deps frontend
docker compose -f docker-compose.production.yml up -d --build --no-deps strapi

# Remove old images
docker image prune -f
```

### Monitoring Server Resources

```bash
# Real-time resource usage
htop

# Docker container stats
docker stats

# Disk usage
df -h

# Check specific volume usage
docker system df
```

### Scaling for High Traffic

**1. Vertical Scaling (Upgrade Linode Plan):**
- Upgrade to higher tier: 8GB RAM, 4 CPU cores
- Resize via Linode Cloud Manager

**2. Optimize Docker Resources:**
```yaml
# Add to docker-compose.production.yml
services:
  strapi:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '1'
          memory: 2G
```

**3. Add Redis Caching:**
```bash
# Add Redis service to docker-compose.production.yml
redis:
  image: redis:7-alpine
  restart: unless-stopped
  networks:
    - tfstudio-network
```

**4. Use Linode Object Storage for Media:**
- Configure Strapi to use Linode Object Storage for uploads
- Reduces server disk usage and improves CDN delivery

**5. Enable NGINX Caching:**
```nginx
# Add to nginx-proxy.conf
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g 
                 inactive=60m use_temp_path=off;

location /uploads {
    proxy_cache my_cache;
    proxy_cache_valid 200 30d;
    proxy_pass http://strapi:1337;
}
```

## 🐛 Troubleshooting

### CentOS-Specific Issues

#### SELinux Blocking Docker

**Symptoms:** Containers fail to start, permission denied errors

**Solution:**
```bash
# Check SELinux status
getenforce

# Option 1: Set to permissive mode (temporary)
setenforce 0

# Option 2: Disable permanently (not recommended for production)
sed -i 's/^SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config

# Option 3: Configure SELinux policies (recommended)
setsebool -P httpd_can_network_connect 1
setsebool -P httpd_can_network_relay 1
```

#### Firewall Blocking Connections

**Symptoms:** Cannot access site from browser, timeout errors

**Solution:**
```bash
# Check firewall status
firewall-cmd --list-all

# Add HTTP/HTTPS if missing
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

# Test port accessibility
curl -I http://localhost
```

---

### Frontend Not Loading

**Check logs:**
```bash
cd /var/www/ceramic-studio
docker compose -f docker-compose.production.yml logs frontend
```

**Common issues:**
- ❌ Build failed due to missing dependencies
- ❌ VITE_STRAPI_URL misconfigured in `.env`
- ❌ NGINX routing issue

**Solution:**
```bash
# Rebuild frontend with no cache
docker compose -f docker-compose.production.yml build --no-cache frontend
docker compose -f docker-compose.production.yml up -d frontend

# Check NGINX configuration
docker compose -f docker-compose.production.yml exec nginx-proxy nginx -t
```

---

### Strapi Admin Panel Not Accessible

**Check Strapi logs:**
```bash
docker compose -f docker-compose.production.yml logs strapi
```

**Common issues:**
- ❌ Database connection failed
- ❌ Missing environment variables in `strapi/.env`
- ❌ Port 1337 not accessible from NGINX

**Solution:**
```bash
# Restart Strapi
docker compose -f docker-compose.production.yml restart strapi

# Check database connection
docker compose -f docker-compose.production.yml exec postgres psql -U strapi -l

# Verify environment variables
docker compose -f docker-compose.production.yml exec strapi env | grep DATABASE
```

---

### Database Connection Errors

**Verify PostgreSQL is running:**
```bash
docker compose -f docker-compose.production.yml ps postgres
docker compose -f docker-compose.production.yml logs postgres
```

**Common issues:**
- ❌ Wrong password in `strapi/.env`
- ❌ Database not initialized

**Solution:**
```bash
# Check database logs
docker compose -f docker-compose.production.yml logs postgres

# Reset database (⚠️ DELETES ALL DATA)
docker compose -f docker-compose.production.yml down
docker volume rm ceramic-studio_postgres_data
docker compose -f docker-compose.production.yml up -d
```

---

### Images Not Displaying

**Check image URLs** in browser console:
- ✅ Should be: `https://yourdomain.com/uploads/image.jpg`
- ❌ Not: `https://yourdomain.com:1337/uploads/image.jpg`

**Solution:**
```bash
# Verify VITE_STRAPI_URL in .env
cat .env | grep VITE_STRAPI_URL

# Should output: VITE_STRAPI_URL=https://yourdomain.com

# If wrong, update and rebuild
echo "VITE_STRAPI_URL=https://yourdomain.com" > .env
docker compose -f docker-compose.production.yml up -d --build frontend
```

---

### SSL Certificate Issues

**Symptoms:** HTTPS not working, browser shows "Not Secure"

**Solution:**
```bash
# Check certificate files exist
ls -la /etc/letsencrypt/live/yourdomain.com/

# Renew certificate manually
certbot renew --force-renewal

# Restart NGINX
docker compose -f docker-compose.production.yml restart nginx-proxy

# Check NGINX SSL configuration
docker compose -f docker-compose.production.yml exec nginx-proxy nginx -t
```

---

### Out of Disk Space

**Check disk usage:**
```bash
df -h
docker system df
```

**Solution:**
```bash
# Remove unused Docker images
docker image prune -a -f

# Remove unused volumes (⚠️ careful with this)
docker volume prune -f

# Remove old logs
journalctl --vacuum-time=7d

# Clear old backups
find /var/backups/ceramic-studio -type f -mtime +30 -delete
```

---

### High Memory Usage

**Check memory usage:**
```bash
free -h
docker stats
```

**Solution:**
```bash
# Add resource limits to docker-compose.production.yml
# See "Scaling for High Traffic" section

# Restart services with new limits
docker compose -f docker-compose.production.yml up -d

# Consider upgrading Linode plan if consistently high
```

---

### Container Keeps Restarting

**Check container status:**
```bash
docker compose -f docker-compose.production.yml ps
docker compose -f docker-compose.production.yml logs --tail=100 strapi
```

**Common causes:**
- ❌ Application crash (check logs for errors)
- ❌ Port already in use
- ❌ Missing environment variables

**Solution:**
```bash
# Stop all services
docker compose -f docker-compose.production.yml down

# Start services one by one to identify issue
docker compose -f docker-compose.production.yml up postgres
# Wait for postgres to be healthy, then:
docker compose -f docker-compose.production.yml up strapi
# Check logs, then:
docker compose -f docker-compose.production.yml up -d
```

---

## 📚 Additional Resources

### Official Documentation
- **Strapi Documentation**: https://docs.strapi.io/
- **React Documentation**: https://react.dev/
- **React Query**: https://tanstack.com/query/latest
- **Docker Documentation**: https://docs.docker.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui Components**: https://ui.shadcn.com/

### CentOS & Server Management
- **CentOS Documentation**: https://docs.centos.org/
- **Linode Guides**: https://www.linode.com/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/
- **NGINX Documentation**: https://nginx.org/en/docs/

### Tools & Utilities
- **Docker Compose File Reference**: https://docs.docker.com/compose/compose-file/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Certbot**: https://certbot.eff.org/

---

## 🔒 Security Best Practices

### Essential Security Measures

1. **Strong Passwords & Secrets**
   ```bash
   # Generate strong passwords
   openssl rand -base64 32
   ```

2. **Firewall Configuration**
   ```bash
   # Only allow necessary ports
   firewall-cmd --permanent --add-service={http,https,ssh}
   firewall-cmd --reload
   ```

3. **Regular Updates**
   ```bash
   # Update system weekly
   dnf update -y
   docker compose -f docker-compose.production.yml pull
   ```

4. **Automated Backups**
   - Database: Daily at 2 AM (automated via cron)
   - Uploads: Weekly backups
   - Keep 30 days of backups

5. **SSL/TLS**
   - Always use HTTPS in production
   - Auto-renew certificates (configured in setup)

6. **Strapi Security Settings**
   - Change default admin email
   - Enable 2FA for admin accounts
   - Configure CORS properly in `strapi/config/middlewares.js`
   - Use strong JWT secrets

7. **Docker Security**
   ```bash
   # Don't run containers as root
   # Use security scanning
   docker scan tfstudio-strapi
   ```

8. **Monitoring**
   ```bash
   # Check logs daily
   docker compose logs --tail=100
   
   # Monitor resource usage
   htop
   docker stats
   ```

9. **Fail2ban** (Already installed in setup)
   - Protects against brute-force attacks
   - Bans IPs after failed login attempts

10. **Regular Security Audits**
    - Review Strapi admin users monthly
    - Check for suspicious activity in logs
    - Update dependencies regularly

---

## 📊 Performance Optimization

### Frontend Optimization
```bash
# Enable Gzip compression in NGINX
# Already configured in nginx-proxy.conf
```

### Database Optimization
```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U strapi strapi

# Add indexes for frequently queried fields
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_products_is_available ON products(is_available);
```

### Caching Strategy
- Static assets: Cached by NGINX (30 days)
- API responses: Consider Redis for high-traffic sites
- Media uploads: Consider CDN (Cloudflare, Linode Object Storage)

---

## 🚨 Quick Commands Reference

### Start/Stop Services
```bash
cd /var/www/ceramic-studio

# Start all services
docker compose -f docker-compose.production.yml up -d

# Stop all services
docker compose -f docker-compose.production.yml down

# Restart specific service
docker compose -f docker-compose.production.yml restart strapi
```

### View Logs
```bash
# All services
docker compose -f docker-compose.production.yml logs -f

# Specific service
docker compose -f docker-compose.production.yml logs -f strapi
```

### Backup
```bash
# Database backup
/usr/local/bin/backup-ceramic-db.sh

# Manual upload backup
docker run --rm --volumes-from tfstudio-strapi \
  -v /var/backups/ceramic-studio:/backup alpine \
  tar czf /backup/uploads_$(date +%Y%m%d).tar.gz -C /app/public uploads
```

### Update Application
```bash
cd /var/www/ceramic-studio
git pull origin main
docker compose -f docker-compose.production.yml up -d --build
```

---

## 📞 Support & Community

### Getting Help

1. **Check logs first**: Most issues can be diagnosed from logs
2. **Review troubleshooting section**: Common issues are documented
3. **Strapi Forum**: https://forum.strapi.io/
4. **GitHub Issues**: Open an issue in this repository

### Reporting Issues

When reporting issues, include:
- CentOS version: `cat /etc/centos-release`
- Docker version: `docker --version`
- Service logs: `docker compose logs [service-name]`
- Error messages (full output)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎉 You're All Set!

Your ceramic studio website is now:
- ✅ Running in production on CentOS Linode
- ✅ Secured with SSL/HTTPS
- ✅ Backed up automatically
- ✅ Optimized for performance
- ✅ Ready to scale

**Next Steps:**
1. Visit `https://yourdomain.com/admin` to start adding content
2. Customize your collections, products, and blog posts
3. Monitor your site with `htop` and `docker stats`
4. Set up regular content updates

**Happy creating! 🏺✨**
