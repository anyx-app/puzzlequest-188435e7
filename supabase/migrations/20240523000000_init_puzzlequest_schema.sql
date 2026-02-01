-- Set search path to the project schema
SET search_path TO proj_97f19520;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. profiles (Public User Data)
-- Note: No Foreign Key to auth.users (isolated schema)
CREATE TABLE profiles (
    id UUID PRIMARY KEY, -- Matches auth.users.id
    username TEXT UNIQUE,
    avatar_url TEXT,
    total_stars INTEGER DEFAULT 0,
    current_world_id UUID, -- References worlds(id) later
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. worlds (Game Chapters/Themes)
CREATE TABLE worlds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE,
    order_index INTEGER NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Update profiles to reference worlds safely (circular dependency handling)
-- We add the FK constraint now that worlds exists
ALTER TABLE profiles 
ADD CONSTRAINT fk_profiles_world 
FOREIGN KEY (current_world_id) 
REFERENCES worlds(id) 
ON DELETE SET NULL;

-- 3. levels (Individual Puzzles)
CREATE TABLE levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    world_id UUID NOT NULL REFERENCES worlds(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('matching', 'logic', 'pattern')),
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
    order_index INTEGER NOT NULL,
    puzzle_config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. user_progress (Tracking)
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    level_id UUID NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'completed')),
    stars_earned INTEGER DEFAULT 0 CHECK (stars_earned BETWEEN 0 AND 3),
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, level_id)
);

-- 5. rewards (Unlockables)
CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    unlock_condition_type TEXT,
    unlock_condition_value JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. user_rewards
CREATE TABLE user_rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reward_id UUID NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE worlds ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

-- Policies

-- Profiles: Users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Worlds: Public read-only
CREATE POLICY "Worlds are viewable by everyone" ON worlds
    FOR SELECT USING (true);

-- Levels: Public read-only
CREATE POLICY "Levels are viewable by everyone" ON levels
    FOR SELECT USING (true);

-- User Progress: Users can read/insert/update own rows only
CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own progress" ON user_progress
    FOR INSERT WITH CHECK (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Rewards: Public read-only
CREATE POLICY "Rewards are viewable by everyone" ON rewards
    FOR SELECT USING (true);

-- User Rewards: Users can read own rows
CREATE POLICY "Users can view own rewards" ON user_rewards
    FOR SELECT USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Indexes for performance
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_levels_world_id ON levels(world_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_rewards_user_id ON user_rewards(user_id);
