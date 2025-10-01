# TFStudio - React + Directus CMS with Docker

Production-ready ceramic studio website with headless CMS. Designed for deployment with Docker on CentOS servers using Caddy as reverse proxy.

---

## 📋 Table of Contents

1. [Architecture](#-architecture)
2. [Prerequisites](#-prerequisites)
3. [React App Docker Setup](#-react-app-docker-setup)
4. [Directus CMS Installation](#-directus-cms-installation)
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
│  React App      │   │  Directus CMS    │
│  (Port 80)      │   │  (Port 8055)     │
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
- CMS: Directus 10+
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
VITE_DIRECTUS_URL=https://tfstudio.website
VITE_DIRECTUS_API_URL=https://tfstudio.website/api
EOF
```

### 4. Build and Start React App

```bash
docker-compose up -d --build
```

### 5. Verify React App

```bash
docker ps | grep tfstudio
docker logs tfstudio
```

---

## 📊 Directus CMS Installation

### 1. Create Directus Directory

```bash
mkdir -p /srv/tfstudio/directus
cd /srv/tfstudio/directus
```

### 2. Generate Secure Secrets

```bash
# Generate random secrets for Directus
openssl rand -base64 32  # For KEY
openssl rand -base64 32  # For SECRET
```

### 3. Create Directus Environment File

```bash
cat > .env << 'EOF'
####################################
# Database
####################################
DB_CLIENT=postgres
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=directus
DB_USER=directus
DB_PASSWORD=<GENERATE_SECURE_PASSWORD>

####################################
# Security
####################################
KEY=<YOUR_GENERATED_KEY>
SECRET=<YOUR_GENERATED_SECRET>

####################################
# General
####################################
PUBLIC_URL=https://tfstudio.website
ADMIN_EMAIL=admin@tfstudio.website
ADMIN_PASSWORD=<GENERATE_SECURE_PASSWORD>

####################################
# Storage
####################################
STORAGE_LOCATIONS=local
STORAGE_LOCAL_ROOT=./uploads

####################################
# CORS (for React frontend)
####################################
CORS_ENABLED=true
CORS_ORIGIN=https://tfstudio.website
EOF
```

**Important:** Replace the placeholder values:
- `<GENERATE_SECURE_PASSWORD>`: Generate strong passwords
- `<YOUR_GENERATED_KEY>` and `<YOUR_GENERATED_SECRET>`: Use the openssl commands above

### 4. Create Docker Compose Configuration

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: directus-postgres
    restart: unless-stopped
    volumes:
      - ./data/database:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${DB_DATABASE}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    networks:
      - directus-network

  directus:
    image: directus/directus:10
    container_name: directus-cms
    restart: unless-stopped
    ports:
      - "8055:8055"
    volumes:
      - ./uploads:/directus/uploads
      - ./extensions:/directus/extensions
    depends_on:
      - postgres
    env_file:
      - .env
    networks:
      - directus-network
      - proxy

networks:
  directus-network:
    driver: bridge
  proxy:
    external: true
EOF
```

### 5. Launch Directus Services

```bash
docker-compose up -d
```

### 6. Verify Directus Startup

```bash
# Check logs
docker logs directus-cms -f

# Check if services are running
docker ps | grep directus
```

Wait for the message: "Server started at port 8055"

### 7. Access Directus Admin

1. Navigate to `https://tfstudio.website/admin` (after updating Caddy - see next section)
2. Login with credentials from your `.env` file:
   - Email: Value of `ADMIN_EMAIL`
   - Password: Value of `ADMIN_PASSWORD`

---

## 🔌 Caddy Integration

### Update Caddyfile

Add Directus proxying to your existing Caddyfile:

```bash
# Assuming your Caddy configuration is at /srv/caddy/Caddyfile
cat >> /srv/caddy/Caddyfile << 'EOF'

tfstudio.website {
    # Directus Admin and API
    handle /admin* {
        reverse_proxy directus-cms:8055
    }
    
    handle /api* {
        reverse_proxy directus-cms:8055
    }
    
    handle /assets* {
        reverse_proxy directus-cms:8055
    }
    
    # React Frontend (default)
    handle {
        reverse_proxy tfstudio:80
    }
}
EOF
```

### Reload Caddy Configuration

```bash
# Get Caddy container name
docker ps | grep caddy

# Reload Caddy (replace caddy-container with actual name)
docker exec caddy-container caddy reload --config /etc/caddy/Caddyfile

# Or restart Caddy container
docker restart caddy-container
```

---

## 📝 Content Management

### Content Collections Structure

Create the following collections in Directus admin panel:

#### 1. **Studio Info** (`studio_info`)

| Field Name | Type | Options |
|------------|------|---------|
| `id` | UUID | Primary Key |
| `hero_title` | String | Required |
| `hero_subtitle` | String | Optional |
| `hero_description` | Text | Required |
| `hero_image` | File | Image, Required |
| `about_title` | String | Required |
| `about_description` | Text | Required |
| `about_image` | File | Image, Required |
| `years_experience` | String | Required |
| `pieces_created` | String | Required |
| `shop_url` | String | Required, URL |

**Permissions:** Public read access

#### 2. **Categories** (`categories`)

| Field Name | Type | Options |
|------------|------|---------|
| `id` | Integer | Primary Key, Auto-increment |
| `name` | String | Required |
| `slug` | String | Required, Unique |
| `type` | Dropdown | Values: `blog`, `product` |

**Permissions:** Public read access

#### 3. **Collections** (`collections`)

| Field Name | Type | Options |
|------------|------|---------|
| `id` | Integer | Primary Key, Auto-increment |
| `name` | String | Required |
| `description` | Text | Optional |
| `featured_image` | File | Image, Required |
| `gallery_images` | Files | Multiple Images |
| `display_order` | Integer | Default: 0 |
| `is_featured` | Boolean | Default: false |

**Permissions:** Public read access

#### 4. **Blog Posts** (`blog_posts`)

| Field Name | Type | Options |
|------------|------|---------|
| `id` | Integer | Primary Key, Auto-increment |
| `title` | String | Required |
| `slug` | String | Required, Unique |
| `excerpt` | Text | Required |
| `content` | Text | Required, WYSIWYG |
| `category` | Many-to-One | Related to Categories |
| `featured_image` | File | Image, Required |
| `author` | String | Required |
| `published_at` | DateTime | Required |
| `read_time` | Integer | Required (in minutes) |

**Permissions:** Public read access

#### 5. **Products** (`products`)

| Field Name | Type | Options |
|------------|------|---------|
| `id` | Integer | Primary Key, Auto-increment |
| `name` | String | Required |
| `description` | Text | Required |
| `price` | Decimal | Required |
| `images` | Files | Multiple Images, Required |
| `collection` | Many-to-One | Related to Collections |
| `is_second_chance` | Boolean | Default: false |
| `is_available` | Boolean | Default: true |

**Permissions:** Public read access

### Setting Up Collections

1. **Access Directus Admin Panel**: Navigate to `https://tfstudio.website/admin`
2. **Go to Settings → Data Model**
3. **Create each collection** following the structure above
4. **Configure Permissions**:
   - Go to Settings → Roles & Permissions
   - Select "Public" role
   - Enable "Read" permission for all collections
5. **Add Content**: Navigate to each collection and add items

---

## 🔧 Maintenance

### View Logs

```bash
# React App
docker logs tfstudio -f

# Directus
docker logs directus-cms -f

# PostgreSQL
docker logs directus-postgres -f
```

### Database Backup

```bash
# Create backup directory
mkdir -p /srv/tfstudio/backups

# Backup PostgreSQL database
docker exec directus-postgres pg_dump -U directus directus > /srv/tfstudio/backups/directus_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Database Restore

```bash
# Restore from backup
cat /srv/tfstudio/backups/directus_backup_YYYYMMDD_HHMMSS.sql | docker exec -i directus-postgres psql -U directus directus
```

### Media Files Backup

```bash
# Backup Directus uploads
tar -czf /srv/tfstudio/backups/directus_uploads_$(date +%Y%m%d_%H%M%S).tar.gz -C /srv/tfstudio/directus ./uploads
```

### Update Application

```bash
# Update React App
cd /srv/tfstudio/app
git pull
docker-compose up -d --build

# Update Directus
cd /srv/tfstudio/directus
docker-compose pull
docker-compose up -d
```

### Restart Services

```bash
# Restart React App
docker restart tfstudio

# Restart Directus
docker restart directus-cms

# Restart all Directus services
cd /srv/tfstudio/directus
docker-compose restart
```

---

## 🐛 Troubleshooting

### React App Not Loading

1. Check container status: `docker ps | grep tfstudio`
2. Check logs: `docker logs tfstudio`
3. Verify environment variables: `docker exec tfstudio env | grep VITE`
4. Check Caddy routing: `docker logs caddy-container`

### Can't Access Directus Admin

1. Verify Directus is running: `docker ps | grep directus-cms`
2. Check logs: `docker logs directus-cms`
3. Verify Caddy routing for `/admin` path
4. Check CORS settings in Directus `.env`

### Database Connection Errors

1. Check PostgreSQL: `docker ps | grep directus-postgres`
2. Check database logs: `docker logs directus-postgres`
3. Verify database credentials in `.env`
4. Test connection: `docker exec directus-postgres psql -U directus -d directus -c "SELECT 1"`

### Caddy Not Proxying Correctly

1. Check Caddy logs: `docker logs caddy-container`
2. Verify all containers are on `proxy` network:
   ```bash
   docker network inspect proxy
   ```
3. Test direct access:
   - React: `curl http://localhost:80` (from inside tfstudio container)
   - Directus: `curl http://localhost:8055` (from inside directus-cms container)

### Firewall Issues

```bash
# Open required ports
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```

### SELinux Issues (CentOS)

```bash
# If SELinux is blocking Docker
setsebool -P container_manage_cgroup on
semanage fcontext -a -t container_file_t "/srv/tfstudio(/.*)?"
restorecon -Rv /srv/tfstudio
```

### High Memory Usage

```bash
# Check resource usage
docker stats

# Limit Directus memory (in docker-compose.yml)
directus:
  deploy:
    resources:
      limits:
        memory: 1G
```

### SSL Certificate Issues

```bash
# Force SSL renewal with Caddy
docker exec caddy-container caddy reload --force
```

---

## 📚 Additional Resources

- [Directus Documentation](https://docs.directus.io)
- [Docker Documentation](https://docs.docker.com)
- [Caddy Documentation](https://caddyserver.com/docs)
- [React Query Documentation](https://tanstack.com/query)

---

## 📄 License

This project is proprietary. All rights reserved.
