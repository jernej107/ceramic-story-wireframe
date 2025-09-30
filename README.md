# Ceramic Studio - Self-Hosted React + Strapi CMS

A modern, production-ready ceramic studio website with a headless CMS powered by Strapi. This project is fully containerized with Docker and designed for easy self-hosting on any server.

## 🏗️ Architecture Overview

This application consists of four main services orchestrated with Docker Compose:

```
┌─────────────────────────────────────────────────────────┐
│                     NGINX Proxy                         │
│                    (Port 80/443)                        │
└────────────┬──────────────────────────┬─────────────────┘
             │                          │
             │                          │
    ┌────────▼────────┐        ┌───────▼──────────┐
    │  React Frontend │        │  Strapi CMS      │
    │  (Port 80)      │        │  (Port 1337)     │
    │  - Vite Build   │        │  - Admin Panel   │
    │  - Static Files │        │  - REST API      │
    └─────────────────┘        └───────┬──────────┘
                                       │
                               ┌───────▼──────────┐
                               │  PostgreSQL      │
                               │  (Port 5432)     │
                               │  - CMS Database  │
                               └──────────────────┘
```

**Key Components:**
- **React Frontend**: Vite-built SPA with TypeScript, React Router, and Tailwind CSS
- **Strapi CMS**: Headless CMS with admin panel for content management
- **PostgreSQL**: Database for Strapi content and media metadata
- **NGINX Proxy**: Reverse proxy routing traffic between frontend and backend

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (v20.10+): [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** (v2.0+): [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js** (v18+) & npm (for local development): [Install Node.js](https://nodejs.org/)
- **Git**: [Install Git](https://git-scm.com/downloads)

For production deployment:
- A Linux server (Ubuntu 20.04+ recommended)
- Domain name with DNS configured
- SSL certificate (Let's Encrypt recommended)

## 🚀 Quick Start - Local Development

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd ceramic-studio
```

### 2. Set Up Environment Variables

Create environment files for both frontend and Strapi:

```bash
# Frontend environment variables (already provided in .env)
cat .env
# VITE_STRAPI_URL=http://localhost:1337
# VITE_STRAPI_API_URL=http://localhost:1337/api

# Strapi environment variables
cd strapi
cp .env.example .env

# Edit strapi/.env and update the following:
# - Generate secure secrets for JWT_SECRET, ADMIN_JWT_SECRET, etc.
# - Update DATABASE_PASSWORD if needed
```

**Generate secure secrets** for Strapi:
```bash
# Generate random secrets (Linux/Mac)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Start All Services with Docker Compose

```bash
# From project root
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

**Services will be available at:**
- Frontend: http://localhost
- Strapi Admin: http://localhost/admin
- Strapi API: http://localhost/api

### 4. Initialize Strapi Admin Account

On first launch, visit http://localhost/admin and create your admin account:
- Email: your-email@example.com
- Password: Choose a strong password
- First Name & Last Name

### 5. Install Frontend Dependencies (for local dev without Docker)

```bash
npm install
npm run dev  # Runs on http://localhost:8080
```

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

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f strapi
docker-compose logs -f frontend
docker-compose logs -f postgres

# Last 100 lines
docker-compose logs --tail=100
```

### Backing Up Data

#### PostgreSQL Database Backup

```bash
# Create backup
docker-compose exec postgres pg_dump -U strapi strapi > backup_$(date +%Y%m%d).sql

# Restore backup
docker-compose exec -T postgres psql -U strapi strapi < backup_20240101.sql
```

#### Strapi Uploads Backup

```bash
# Backup media files
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz strapi/public/uploads/

# Restore media files
tar -xzf uploads_backup_20240101.tar.gz -C strapi/public/
```

### Updating Services

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart services
docker-compose -f docker-compose.production.yml up -d --build

# Remove old images
docker image prune -f
```

### Scaling for High Traffic

To handle more traffic, you can:

1. **Increase resources** in `docker-compose.yml`:
```yaml
strapi:
  deploy:
    resources:
      limits:
        cpus: '2'
        memory: 2G
```

2. **Add caching** (Redis) for API responses
3. **Use CDN** for static assets and images
4. **Horizontal scaling** with Docker Swarm or Kubernetes

## 🐛 Troubleshooting

### Frontend not loading

**Check logs:**
```bash
docker-compose logs frontend
```

**Common issues:**
- Strapi URL misconfigured in `.env`
- Nginx routing issue (check `nginx-proxy.conf`)
- Build failed (check `docker-compose logs frontend`)

**Solution:**
```bash
# Rebuild frontend
docker-compose up -d --build frontend
```

### Strapi admin panel not accessible

**Check Strapi logs:**
```bash
docker-compose logs strapi
```

**Common issues:**
- Database connection failed
- Missing environment variables
- Port 1337 not exposed

**Solution:**
```bash
# Restart Strapi
docker-compose restart strapi

# Check database connection
docker-compose exec postgres psql -U strapi -c "\l"
```

### Database connection errors

**Verify PostgreSQL is running:**
```bash
docker-compose ps postgres
docker-compose logs postgres
```

**Reset database** (⚠️ deletes all data):
```bash
docker-compose down -v
docker-compose up -d
```

### Images not displaying

**Check image URLs** in browser console:
- Should be: `http://localhost/uploads/image.jpg`
- Not: `http://localhost:1337/uploads/image.jpg`

**Fix:** Verify `VITE_STRAPI_URL` in `.env` matches your domain

### Port conflicts

If ports 80, 1337, or 5432 are in use:

```bash
# Check what's using the port
sudo lsof -i :80

# Update ports in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead
```

### Permission issues with uploads

```bash
# Fix upload directory permissions
sudo chmod -R 755 strapi/public/uploads
sudo chown -R 1000:1000 strapi/public/uploads
```

## 📚 Additional Resources

- **Strapi Documentation**: https://docs.strapi.io/
- **React Query Documentation**: https://tanstack.com/query/latest
- **Docker Documentation**: https://docs.docker.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui Components**: https://ui.shadcn.com/

## 🔒 Security Best Practices

1. **Change default database password** in production
2. **Use strong secrets** for JWT tokens (32+ characters)
3. **Enable HTTPS** with valid SSL certificates
4. **Configure CORS** properly in Strapi
5. **Regular backups** of database and uploads
6. **Keep Docker images updated**
7. **Use environment variables** for all sensitive data
8. **Enable rate limiting** in Strapi
9. **Set up firewall rules** (UFW on Ubuntu)
10. **Monitor logs** for suspicious activity

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Need help?** Check the troubleshooting section or refer to `README-STRAPI.md` and `MIGRATION-GUIDE.md` for more detailed information.
