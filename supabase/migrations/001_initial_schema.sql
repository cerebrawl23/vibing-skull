-- The Vibing Skull Database Schema
-- Full initial migration with all tables, indexes, triggers, and RLS policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIES
-- ============================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- TAGS
-- ============================================
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- TOOLS
-- ============================================
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    long_description TEXT,
    url TEXT NOT NULL,
    logo_url TEXT,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    pricing TEXT NOT NULL CHECK (pricing IN ('free', 'paid', 'freemium', 'open_source')),
    pricing_details TEXT,
    github_url TEXT,
    docs_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    supports_vscode BOOLEAN DEFAULT FALSE,
    supports_jetbrains BOOLEAN DEFAULT FALSE,
    supports_neovim BOOLEAN DEFAULT FALSE,
    supports_web BOOLEAN DEFAULT FALSE,
    supports_cli BOOLEAN DEFAULT FALSE,
    has_free_tier BOOLEAN DEFAULT FALSE,
    ai_model TEXT,
    avg_rating NUMERIC(3,2) DEFAULT 0,
    rating_count INT DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_pricing ON tools(pricing);
CREATE INDEX idx_tools_featured ON tools(is_featured) WHERE is_featured = TRUE;

-- ============================================
-- TOOL_TAGS (junction table)
-- ============================================
CREATE TABLE tool_tags (
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, tag_id)
);

-- ============================================
-- TOOL_PROS_CONS
-- ============================================
CREATE TABLE tool_pros_cons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('pro', 'con')),
    content TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tool_pros_cons_tool ON tool_pros_cons(tool_id);

-- ============================================
-- TOOL_FEATURES (for comparison matrices)
-- ============================================
CREATE TABLE tool_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    feature_name TEXT NOT NULL,
    feature_value TEXT NOT NULL,
    feature_group TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tool_features_tool ON tool_features(tool_id);
CREATE INDEX idx_tool_features_group ON tool_features(feature_group);

-- ============================================
-- TOOL_RATINGS
-- ============================================
CREATE TABLE tool_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tool_id, user_id)
);

CREATE INDEX idx_tool_ratings_tool ON tool_ratings(tool_id);
CREATE INDEX idx_tool_ratings_user ON tool_ratings(user_id);

-- ============================================
-- NEWS_ARTICLES
-- ============================================
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id TEXT NOT NULL,
    source TEXT NOT NULL CHECK (source IN ('reddit', 'hackernews', 'devto')),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    author TEXT,
    content_preview TEXT,
    thumbnail_url TEXT,
    source_url TEXT NOT NULL,
    subreddit TEXT,
    score INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    relevance_score NUMERIC(5,2) DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    published_at TIMESTAMPTZ NOT NULL,
    fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (source, external_id)
);

CREATE INDEX idx_news_source ON news_articles(source);
CREATE INDEX idx_news_relevance ON news_articles(relevance_score DESC);
CREATE INDEX idx_news_published ON news_articles(published_at DESC);
CREATE INDEX idx_news_score ON news_articles(score DESC);

-- ============================================
-- WORKFLOWS
-- ============================================
CREATE TABLE workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    estimated_time TEXT NOT NULL,
    cover_image_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    view_count INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_workflows_slug ON workflows(slug);

-- ============================================
-- WORKFLOW_STEPS
-- ============================================
CREATE TABLE workflow_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    estimated_time TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (workflow_id, step_number)
);

CREATE INDEX idx_workflow_steps_workflow ON workflow_steps(workflow_id);

-- ============================================
-- WORKFLOW_TOOLS
-- ============================================
CREATE TABLE workflow_tools (
    workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    role_in_workflow TEXT,
    is_required BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    PRIMARY KEY (workflow_id, tool_id)
);

-- ============================================
-- PROFILES
-- ============================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- BOOKMARKS
-- ============================================
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    article_id UUID NOT NULL REFERENCES news_articles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, article_id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);

-- ============================================
-- FAVORITE_TOOLS
-- ============================================
CREATE TABLE favorite_tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, tool_id)
);

CREATE INDEX idx_favorite_tools_user ON favorite_tools(user_id);

-- ============================================
-- USER_NOTES
-- ============================================
CREATE TABLE user_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES tools(id) ON DELETE SET NULL,
    title TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_notes_user ON user_notes(user_id);

-- ============================================
-- READING_HISTORY
-- ============================================
CREATE TABLE reading_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    article_id UUID REFERENCES news_articles(id) ON DELETE SET NULL,
    tool_id UUID REFERENCES tools(id) ON DELETE SET NULL,
    workflow_id UUID REFERENCES workflows(id) ON DELETE SET NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('article', 'tool', 'workflow')),
    visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reading_history_user ON reading_history(user_id);
CREATE INDEX idx_reading_history_visited ON reading_history(visited_at DESC);

-- ============================================
-- TRIGGERS: Auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tools_updated_at BEFORE UPDATE ON tools FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_user_notes_updated_at BEFORE UPDATE ON user_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_tool_ratings_updated_at BEFORE UPDATE ON tool_ratings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- TRIGGER: Update avg_rating on tools
-- ============================================
CREATE OR REPLACE FUNCTION update_tool_avg_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE tools
    SET
        avg_rating = COALESCE((SELECT AVG(rating)::NUMERIC(3,2) FROM tool_ratings WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id)), 0),
        rating_count = (SELECT COUNT(*) FROM tool_ratings WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id))
    WHERE id = COALESCE(NEW.tool_id, OLD.tool_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_tool_avg_rating
    AFTER INSERT OR UPDATE OR DELETE ON tool_ratings
    FOR EACH ROW EXECUTE FUNCTION update_tool_avg_rating();

-- ============================================
-- TRIGGER: Auto-create profile on user signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_pros_cons ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON tools FOR SELECT USING (is_published = true);
CREATE POLICY "Public read" ON tags FOR SELECT USING (true);
CREATE POLICY "Public read" ON tool_tags FOR SELECT USING (true);
CREATE POLICY "Public read" ON tool_pros_cons FOR SELECT USING (true);
CREATE POLICY "Public read" ON tool_features FOR SELECT USING (true);
CREATE POLICY "Public read" ON news_articles FOR SELECT USING (true);
CREATE POLICY "Public read" ON workflows FOR SELECT USING (is_published = true);
CREATE POLICY "Public read" ON workflow_steps FOR SELECT USING (true);
CREATE POLICY "Public read" ON workflow_tools FOR SELECT USING (true);
CREATE POLICY "Public read ratings" ON tool_ratings FOR SELECT USING (true);

-- User-specific policies
CREATE POLICY "Users manage own ratings" ON tool_ratings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users manage own bookmarks" ON bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own favorites" ON favorite_tools FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own notes" ON user_notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own history" ON reading_history FOR ALL USING (auth.uid() = user_id);
