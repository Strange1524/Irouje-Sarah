-- 1. Create a table for the global site settings (Hero and About sections)
CREATE TABLE IF NOT EXISTS site_settings (
    id SMALLINT PRIMARY KEY DEFAULT 1,
    hero_name TEXT NOT NULL,
    hero_role TEXT NOT NULL,
    hero_description TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    about_text1 TEXT NOT NULL,
    about_text2 TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    -- This constraint ensures only one row can ever exist in this table
    CONSTRAINT single_row CHECK (id = 1)
);

-- 2. Insert your default site settings
INSERT INTO site_settings (id, hero_name, hero_role, hero_description, hero_image, about_text1, about_text2)
VALUES (
    1, 
    'IROUJE SARAH TEMITOPE', 
    'Professional & Creative Designer', 
    'I help brands stand out, build trust, and connect with their audience through clean, modern, and highly effective visual designs.', 
    'https://i.ibb.co/JT5cwhv/temi.jpg', 
    'Hello! I am a professional creative designer dedicated to helping small business owners and startups grow. Whether you need a striking logo, an engaging flyer, or a complete brand identity, I translate your vision into designs that sell.', 
    'Beyond graphic design, I specialize in social media management and content creation, ensuring your brand stays relevant and highly interactive online.'
) ON CONFLICT (id) DO NOTHING;

-- 3. Create a table for the portfolio items
CREATE TABLE IF NOT EXISTS portfolio (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Insert the default portfolio items
INSERT INTO portfolio (title, category, image_url)
VALUES 
('Tech Startup Brand Mark', 'Logo Design', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Corporate Event Poster', 'Flyer Design', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Instagram Campaign Pack', 'Social Media', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');

-- 5. Setup Row Level Security (RLS) to secure your database
-- Enable RLS on both tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so visitors can see the website)
CREATE POLICY "Public read access for site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access for portfolio" ON portfolio FOR SELECT USING (true);

-- Allow authenticated users (Admin) to make edits
CREATE POLICY "Admins can update site settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can insert portfolio items" ON portfolio FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update portfolio items" ON portfolio FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete portfolio items" ON portfolio FOR DELETE USING (auth.role() = 'authenticated');
