-- CMS Pages table for managing content pages
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default pages
INSERT INTO pages (slug, title, content, meta_description) VALUES
('about', 'About Us', '<h1>About Loomlane</h1><p>We are a premium merchandise brand for college students.</p>', 'Learn more about Loomlane and our mission'),
('our-work', 'Our Work', '<h1>Our Work</h1><p>Showcasing our best designs and collaborations with universities.</p>', 'See our portfolio of university merchandise'),
('contact', 'Contact Us', '<h1>Contact Us</h1><p>Get in touch with the Loomlane team.</p><p>Email: hello@loomlane.com</p>', 'Contact Loomlane for inquiries')
ON CONFLICT (slug) DO NOTHING;
