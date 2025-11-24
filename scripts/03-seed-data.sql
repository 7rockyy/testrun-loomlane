-- Seed data for development
-- Run this script to populate initial data

-- Insert sample universities
INSERT INTO universities (id, name, email_domain, logo_url) VALUES
  ('00000000-0000-0000-0000-000000000001', 'IIT Delhi', 'iitd.ac.in', 'https://upload.wikimedia.org/wikipedia/en/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg'),
  ('00000000-0000-0000-0000-000000000002', 'IIT Bombay', 'iitb.ac.in', 'https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg'),
  ('00000000-0000-0000-0000-000000000003', 'IIT Kanpur', 'iitk.ac.in', 'https://upload.wikimedia.org/wikipedia/en/5/58/Indian_Institute_of_Technology_Kanpur_Logo.svg')
ON CONFLICT (email_domain) DO NOTHING;

-- Sample products for IIT Delhi
INSERT INTO products (university_id, name, description, category, price, image_url, sizes, stock, is_active) VALUES
  ('00000000-0000-0000-0000-000000000001', 'IIT Delhi Classic Tee', 'Premium cotton t-shirt with IIT Delhi logo', 'T-Shirts', 499.00, '/placeholder.svg?height=400&width=400', '["S", "M", "L", "XL", "XXL"]'::jsonb, '{"S": 25, "M": 30, "L": 35, "XL": 20, "XXL": 15}'::jsonb, true),
  ('00000000-0000-0000-0000-000000000001', 'IIT Delhi Premium Hoodie', 'Warm fleece hoodie perfect for winter', 'Hoodies', 1299.00, '/placeholder.svg?height=400&width=400', '["M", "L", "XL", "XXL"]'::jsonb, '{"M": 20, "L": 25, "XL": 15, "XXL": 10}'::jsonb, true),
  ('00000000-0000-0000-0000-000000000001', 'IIT Delhi Cap', 'Adjustable baseball cap', 'Caps', 399.00, '/placeholder.svg?height=400&width=400', '["One Size"]'::jsonb, '{"One Size": 50}'::jsonb, true);

-- Sample products for IIT Bombay
INSERT INTO products (university_id, name, description, category, price, image_url, sizes, stock, is_active) VALUES
  ('00000000-0000-0000-0000-000000000002', 'IIT Bombay Classic Tee', 'Premium cotton t-shirt with IIT Bombay logo', 'T-Shirts', 499.00, '/placeholder.svg?height=400&width=400', '["S", "M", "L", "XL", "XXL"]'::jsonb, '{"S": 20, "M": 25, "L": 30, "XL": 15, "XXL": 10}'::jsonb, true),
  ('00000000-0000-0000-0000-000000000002', 'IIT Bombay Hoodie', 'Comfortable hoodie for campus life', 'Hoodies', 1299.00, '/placeholder.svg?height=400&width=400', '["M", "L", "XL"]'::jsonb, '{"M": 15, "L": 20, "XL": 10}'::jsonb, true);
