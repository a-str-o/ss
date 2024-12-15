-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(50) UNIQUE,
    description TEXT,
    category VARCHAR(100),
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    minimum_quantity INTEGER NOT NULL DEFAULT 0,
    stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
    supplier VARCHAR(255),
    brand VARCHAR(255),
    barcode VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    expiry_date DATE,
    manufacturing_date DATE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT products_name_user_id_key UNIQUE (name, user_id)
);

-- Create indexes
CREATE INDEX products_stock_id_idx ON products(stock_id);
CREATE INDEX products_user_id_idx ON products(user_id);
CREATE INDEX products_sku_idx ON products(sku);
CREATE INDEX products_category_idx ON products(category);
CREATE INDEX products_status_idx ON products(status);

-- Create RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own products"
    ON products FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own products"
    ON products FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
    ON products FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products"
    ON products FOR DELETE
    USING (auth.uid() = user_id);
