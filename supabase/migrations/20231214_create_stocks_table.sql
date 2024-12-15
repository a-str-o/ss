-- Create stocks table
CREATE TABLE IF NOT EXISTS stocks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    volume_size INTEGER NOT NULL DEFAULT 0,
    size_limit INTEGER NOT NULL DEFAULT 0,
    address TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT stocks_name_user_id_key UNIQUE (name, user_id)
);

-- Create RLS policies
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stocks"
    ON stocks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stocks"
    ON stocks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stocks"
    ON stocks FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stocks"
    ON stocks FOR DELETE
    USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX stocks_user_id_idx ON stocks(user_id);
CREATE INDEX stocks_name_idx ON stocks(name);
CREATE INDEX stocks_type_idx ON stocks(type);
