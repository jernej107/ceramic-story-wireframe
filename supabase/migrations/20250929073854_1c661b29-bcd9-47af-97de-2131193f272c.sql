-- Create enum types
CREATE TYPE public.inquiry_type AS ENUM ('general', 'custom_order', 'wholesale');
CREATE TYPE public.inquiry_status AS ENUM ('new', 'in_progress', 'resolved', 'closed');
CREATE TYPE public.content_section AS ENUM ('hero', 'about', 'featured', 'footer');

-- Categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('product_category', 'blog_category')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Collections table  
CREATE TABLE public.collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  featured_image_url TEXT,
  gallery_images TEXT[],
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  images TEXT[],
  dimensions TEXT,
  materials TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_second_chance BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  author TEXT DEFAULT 'TFstudio',
  published_at TIMESTAMP WITH TIME ZONE,
  read_time_minutes INTEGER DEFAULT 5,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  slug TEXT UNIQUE,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  inquiry_type inquiry_type DEFAULT 'general',
  status inquiry_status DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  source TEXT DEFAULT 'website'
);

-- Studio information table
CREATE TABLE public.studio_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name content_section NOT NULL,
  title TEXT,
  content TEXT,
  images TEXT[],
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Image gallery table  
CREATE TABLE public.image_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  alt_text TEXT,
  category TEXT,
  associated_id UUID,
  associated_type TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.image_gallery ENABLE ROW LEVEL SECURITY;

-- Public read policies (visitors can view published content)
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Collections are viewable by everyone" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (is_available = true);
CREATE POLICY "Published blog posts are viewable by everyone" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Studio info is viewable by everyone" ON public.studio_info FOR SELECT USING (is_active = true);
CREATE POLICY "Image gallery is viewable by everyone" ON public.image_gallery FOR SELECT USING (true);

-- Contact inquiries can be inserted by anyone
CREATE POLICY "Anyone can submit contact inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- Newsletter subscriptions can be inserted by anyone
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON public.collections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON public.contact_inquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_studio_info_updated_at BEFORE UPDATE ON public.studio_info FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.categories (name, description, type) VALUES
  ('Functional', 'Everyday ceramic pieces', 'product_category'),
  ('Decorative', 'Artistic ceramic pieces', 'product_category'),
  ('Studio Updates', 'Behind the scenes content', 'blog_category'),
  ('Techniques', 'Ceramic making processes', 'blog_category');

INSERT INTO public.collections (name, description, featured_image_url, is_featured, display_order) VALUES
  ('Organic Forms', 'Inspired by nature''s flowing lines and textures', '/src/assets/ceramic-collection-1.jpg', true, 1),
  ('Minimalist Series', 'Clean lines and simple elegance', '/src/assets/ceramic-collection-2.jpg', true, 2),
  ('Textured Vessels', 'Rich surfaces and tactile experiences', '/src/assets/ceramic-collection-3.jpg', true, 3);

INSERT INTO public.blog_posts (title, excerpt, featured_image_url, published_at, read_time_minutes, slug, is_published) VALUES
  ('The Art of Hand-Building', 'Exploring traditional techniques in modern ceramic practice', '/src/assets/ceramic-process.jpg', now() - interval '7 days', 8, 'art-of-hand-building', true),
  ('Finding Beauty in Imperfection', 'Why our Second Chance pieces tell the most interesting stories', '/src/assets/second-chance-ceramics.jpg', now() - interval '14 days', 6, 'beauty-in-imperfection', true),
  ('Studio Diary: Spring Collection', 'Behind the scenes of our latest ceramic creations', '/src/assets/featured-ceramics.jpg', now() - interval '21 days', 5, 'spring-collection-diary', true);

INSERT INTO public.studio_info (section_name, title, content) VALUES
  ('hero', 'Handcrafted Ceramics', 'Where clay becomes art through passion, patience, and the transformative power of fire'),
  ('about', 'About TFstudio', 'At TFstudio, we believe in the beauty of handmade ceramics. Each piece is carefully crafted with attention to detail, blending traditional techniques with contemporary design. Our passion lies in creating functional art that brings warmth and character to everyday life.');