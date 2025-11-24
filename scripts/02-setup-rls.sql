-- Row Level Security (RLS) Policies
-- Run this script after creating tables

-- Enable RLS on all tables
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Universities: Public read access
CREATE POLICY "Universities are viewable by everyone"
  ON universities FOR SELECT
  USING (true);

-- Users: Users can read their own data, admins can read all
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
  ));

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Products: Students see their university's products, admins see all
CREATE POLICY "Students view own university products"
  ON products FOR SELECT
  USING (
    is_active = true AND (
      university_id IN (
        SELECT university_id FROM users WHERE id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
      )
    )
  );

-- Admins can manage products
CREATE POLICY "Admins manage products"
  ON products FOR ALL
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
  ));

-- Drops: Students see their university's drops
CREATE POLICY "Students view own university drops"
  ON drops FOR SELECT
  USING (
    university_id IN (
      SELECT university_id FROM users WHERE id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- Orders: Users can view their own orders, admins can view all
CREATE POLICY "Users view own orders"
  ON orders FOR SELECT
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Users create own orders"
  ON orders FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Order items: Viewable with order access
CREATE POLICY "Order items viewable with order"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders WHERE id = order_id AND (
        user_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
      )
    )
  );

-- Cart: Users manage their own cart
CREATE POLICY "Users manage own cart"
  ON cart_items FOR ALL
  USING (user_id = auth.uid());
