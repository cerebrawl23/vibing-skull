-- VibeDeck Seed Data
-- Run this AFTER the initial migration

-- ============================================
-- CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description, icon, display_order) VALUES
('AI Code Assistants', 'ai-code-assistants', 'AI-powered coding assistants, IDE integrations, and pair programming tools that help you write code faster.', 'Code', 1),
('AI Design & UI', 'ai-design-ui', 'AI tools for generating UI designs, converting screenshots to code, and building interfaces from prompts.', 'Palette', 2),
('Prompting & Context', 'prompting-context', 'Prompt engineering tools, context management, .cursorrules collections, and prompt libraries.', 'MessageSquare', 3),
('Deployment & Backend', 'deployment-backend', 'Backend-as-a-service, deployment platforms, and infrastructure tools for shipping fast.', 'Rocket', 4);

-- ============================================
-- TAGS
-- ============================================
INSERT INTO tags (name, slug) VALUES
('VS Code', 'vscode'),
('JetBrains', 'jetbrains'),
('Neovim', 'neovim'),
('CLI', 'cli'),
('Web', 'web'),
('Open Source', 'open-source'),
('Code Generation', 'code-generation'),
('Code Completion', 'code-completion'),
('Multi-file Editing', 'multi-file-editing'),
('Chat', 'chat'),
('Agentic', 'agentic'),
('UI Generation', 'ui-generation'),
('Full Stack', 'full-stack'),
('React', 'react'),
('Next.js', 'nextjs'),
('Tailwind', 'tailwind'),
('Database', 'database'),
('Auth', 'auth'),
('Hosting', 'hosting'),
('Serverless', 'serverless'),
('Edge', 'edge'),
('Real-time', 'real-time'),
('Prompt Library', 'prompt-library'),
('Context Management', 'context-management'),
('Screenshot to Code', 'screenshot-to-code'),
('Git Integration', 'git-integration'),
('AI Models', 'ai-models'),
('Self-hosted', 'self-hosted'),
('Enterprise', 'enterprise'),
('Free Tier', 'free-tier');

-- ============================================
-- TOOLS
-- ============================================

-- Get category IDs
DO $$
DECLARE
    cat_code_assistants UUID;
    cat_design_ui UUID;
    cat_prompting UUID;
    cat_deployment UUID;
    tool_id UUID;
BEGIN
    SELECT id INTO cat_code_assistants FROM categories WHERE slug = 'ai-code-assistants';
    SELECT id INTO cat_design_ui FROM categories WHERE slug = 'ai-design-ui';
    SELECT id INTO cat_prompting FROM categories WHERE slug = 'prompting-context';
    SELECT id INTO cat_deployment FROM categories WHERE slug = 'deployment-backend';

    -- ===== AI CODE ASSISTANTS =====

    -- Cursor
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_vscode, has_free_tier, ai_model)
    VALUES ('Cursor', 'cursor', 'AI-first code editor built on VS Code with powerful multi-file editing and agentic capabilities.',
    'Cursor is a fork of VS Code that deeply integrates AI into every part of the coding experience. It offers inline code generation, multi-file editing via its Composer feature, and a chat interface for asking questions about your codebase.

Cursor supports multiple AI models including GPT-4, Claude, and its own fine-tuned models. Its Tab completion feature predicts your next edit, and Composer can make coordinated changes across multiple files from a single prompt.

It has quickly become one of the most popular AI coding tools, especially in the vibe coding community where rapid prototyping is valued.',
    'https://cursor.com', cat_code_assistants, 'freemium', 'Free: 2000 completions/month. Pro: $20/mo. Business: $40/mo.', 'https://docs.cursor.com', true, true, true, 'GPT-4o, Claude 3.5 Sonnet')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Best-in-class multi-file editing with Composer', 1),
    (tool_id, 'pro', 'Familiar VS Code interface — easy to switch', 2),
    (tool_id, 'pro', 'Excellent codebase-aware context with @-mentions', 3),
    (tool_id, 'pro', 'Fast Tab completion predicts next edits', 4),
    (tool_id, 'con', 'Free tier is limited (2000 completions/month)', 1),
    (tool_id, 'con', 'Can be resource-heavy on older machines', 2),
    (tool_id, 'con', 'Proprietary — not open source', 3);

    INSERT INTO tool_features (tool_id, feature_name, feature_value, feature_group, display_order) VALUES
    (tool_id, 'VS Code', 'Yes (fork)', 'IDE Support', 1),
    (tool_id, 'Inline Completions', 'Yes', 'Code Generation', 1),
    (tool_id, 'Multi-file Editing', 'Yes (Composer)', 'Code Generation', 2),
    (tool_id, 'Chat Interface', 'Yes', 'AI Capabilities', 1),
    (tool_id, 'Agentic Mode', 'Yes', 'AI Capabilities', 2),
    (tool_id, 'Free Tier', '2000 completions/mo', 'Pricing', 1),
    (tool_id, 'Starting Price', '$20/month', 'Pricing', 2);

    -- GitHub Copilot
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_vscode, supports_jetbrains, supports_neovim, supports_cli, has_free_tier, ai_model)
    VALUES ('GitHub Copilot', 'github-copilot', 'AI pair programmer by GitHub that provides code completions and chat across major IDEs.',
    'GitHub Copilot is one of the most widely adopted AI coding assistants, developed by GitHub in collaboration with OpenAI. It provides real-time code suggestions as you type, powered by a model trained on billions of lines of public code.

Copilot integrates with VS Code, JetBrains, Neovim, and Visual Studio. Its chat feature lets you ask questions, generate code, and debug issues. Copilot Workspace extends this with project-level planning and implementation.

As part of the GitHub ecosystem, it benefits from deep integration with repositories, pull requests, and GitHub Actions.',
    'https://github.com/features/copilot', cat_code_assistants, 'paid', 'Individual: $10/mo. Business: $19/mo. Free for students.', 'https://docs.github.com/en/copilot', true, true, true, true, true, false, 'OpenAI Codex, GPT-4')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Excellent inline code completions', 1),
    (tool_id, 'pro', 'Broad IDE support (VS Code, JetBrains, Neovim)', 2),
    (tool_id, 'pro', 'Deep GitHub integration', 3),
    (tool_id, 'pro', 'Free for students and OSS maintainers', 4),
    (tool_id, 'con', 'No free tier for general users', 1),
    (tool_id, 'con', 'Multi-file editing less capable than Cursor', 2);

    INSERT INTO tool_features (tool_id, feature_name, feature_value, feature_group, display_order) VALUES
    (tool_id, 'VS Code', 'Yes', 'IDE Support', 1),
    (tool_id, 'JetBrains', 'Yes', 'IDE Support', 2),
    (tool_id, 'Neovim', 'Yes', 'IDE Support', 3),
    (tool_id, 'Inline Completions', 'Yes', 'Code Generation', 1),
    (tool_id, 'Chat Interface', 'Yes', 'AI Capabilities', 1),
    (tool_id, 'Free Tier', 'No (students only)', 'Pricing', 1),
    (tool_id, 'Starting Price', '$10/month', 'Pricing', 2);

    -- Claude Code
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_cli, has_free_tier, ai_model)
    VALUES ('Claude Code', 'claude-code', 'Anthropic''s agentic CLI coding tool that operates directly in your terminal with full codebase access.',
    'Claude Code is Anthropic''s command-line coding agent that brings Claude''s capabilities directly into your development workflow. It runs in your terminal and can read, write, and edit files across your entire codebase.

Unlike IDE-based tools, Claude Code works agenically — you describe what you want, and it plans and executes multi-step coding tasks autonomously. It understands project structure, can run commands, and integrates with git.

Claude Code excels at complex refactoring, implementing features across multiple files, and debugging.',
    'https://docs.anthropic.com/en/docs/claude-code', cat_code_assistants, 'paid', 'Usage-based via Anthropic API. ~$5-20/day for active use.', 'https://docs.anthropic.com/en/docs/claude-code', true, true, false, 'Claude 3.5 Sonnet, Claude 3 Opus')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'True agentic coding — plans and executes multi-step tasks', 1),
    (tool_id, 'pro', 'Full codebase context with large context window', 2),
    (tool_id, 'pro', 'Git-aware — creates commits and manages changes', 3),
    (tool_id, 'con', 'CLI-only — no visual IDE integration', 1),
    (tool_id, 'con', 'Usage-based pricing can be expensive', 2);

    INSERT INTO tool_features (tool_id, feature_name, feature_value, feature_group, display_order) VALUES
    (tool_id, 'CLI', 'Yes', 'IDE Support', 1),
    (tool_id, 'Multi-file Editing', 'Yes (agentic)', 'Code Generation', 1),
    (tool_id, 'Agentic Mode', 'Yes (primary mode)', 'AI Capabilities', 1),
    (tool_id, 'Free Tier', 'No', 'Pricing', 1),
    (tool_id, 'Starting Price', 'Usage-based', 'Pricing', 2);

    -- Windsurf
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_vscode, has_free_tier, ai_model)
    VALUES ('Windsurf', 'windsurf', 'Codeium''s AI IDE with Cascade — a multi-step agentic coding assistant.',
    'Windsurf is an AI-native IDE built by Codeium, featuring Cascade — a multi-step agentic assistant that can plan and execute complex coding tasks. Like Cursor, it''s built on VS Code but takes a different approach to AI integration.

Cascade can reason through multi-step problems, create and modify multiple files, and run terminal commands.',
    'https://codeium.com/windsurf', cat_code_assistants, 'freemium', 'Free tier available. Pro: $15/mo.', 'https://docs.codeium.com', true, true, true, 'Codeium models, GPT-4, Claude')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Generous free tier', 1),
    (tool_id, 'pro', 'Cascade agent handles complex multi-step tasks', 2),
    (tool_id, 'con', 'Newer — smaller community than Cursor/Copilot', 1);

    INSERT INTO tool_features (tool_id, feature_name, feature_value, feature_group, display_order) VALUES
    (tool_id, 'VS Code', 'Yes (fork)', 'IDE Support', 1),
    (tool_id, 'Multi-file Editing', 'Yes (Cascade)', 'Code Generation', 1),
    (tool_id, 'Agentic Mode', 'Yes (Cascade)', 'AI Capabilities', 1),
    (tool_id, 'Free Tier', 'Yes (generous)', 'Pricing', 1),
    (tool_id, 'Starting Price', '$15/month', 'Pricing', 2);

    -- Cline
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, github_url, is_featured, supports_vscode, has_free_tier, ai_model)
    VALUES ('Cline', 'cline', 'Open-source VS Code extension for autonomous AI coding with multi-model support.',
    'Cline (formerly Claude Dev) is an open-source VS Code extension that enables autonomous AI coding. It can create and edit files, run terminal commands, and use the browser — all with your approval at each step.

Cline supports multiple AI providers including Anthropic, OpenAI, Google, and local models via Ollama.',
    'https://github.com/cline/cline', cat_code_assistants, 'open_source', 'Free. You pay for the AI API you choose.', 'https://github.com/cline/cline', false, true, true, 'Any (Claude, GPT-4, Gemini, Ollama)')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Fully open source', 1),
    (tool_id, 'pro', 'Supports any AI model provider', 2),
    (tool_id, 'pro', 'Human-in-the-loop for safety', 3),
    (tool_id, 'con', 'Requires your own API keys', 1),
    (tool_id, 'con', 'VS Code only', 2);

    -- Aider
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, github_url, docs_url, is_featured, supports_cli, has_free_tier, ai_model)
    VALUES ('Aider', 'aider', 'Open-source CLI pair programming tool that edits code in your local git repo.',
    'Aider is an open-source command-line AI coding assistant that works directly with your local git repository. You chat with it in your terminal, and it makes changes to your code, automatically creating git commits.',
    'https://aider.chat', cat_code_assistants, 'open_source', 'Free. You pay for the AI API you choose.', 'https://github.com/paul-gauthier/aider', 'https://aider.chat/docs/', false, true, true, 'Any (Claude, GPT-4, Gemini, local)')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Excellent git integration with automatic commits', 1),
    (tool_id, 'pro', 'Supports many AI model providers', 2),
    (tool_id, 'pro', 'Strong benchmark performance', 3),
    (tool_id, 'con', 'CLI-only — no visual interface', 1);

    -- Continue.dev
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, github_url, docs_url, is_featured, supports_vscode, supports_jetbrains, has_free_tier, ai_model)
    VALUES ('Continue.dev', 'continue-dev', 'Open-source AI code assistant extension for VS Code and JetBrains with BYOM support.',
    'Continue is an open-source AI coding assistant that runs as an extension in VS Code and JetBrains. It provides code completion, chat, and editing capabilities with a bring-your-own-model approach.',
    'https://continue.dev', cat_code_assistants, 'open_source', 'Free. You pay for the AI model you choose.', 'https://github.com/continuedev/continue', 'https://docs.continue.dev', false, true, true, true, 'Any (BYOM)')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Open source with active development', 1),
    (tool_id, 'pro', 'Supports VS Code and JetBrains', 2),
    (tool_id, 'pro', 'Bring your own model — any provider', 3),
    (tool_id, 'con', 'Setup complexity for self-hosted models', 1);

    -- ===== AI DESIGN & UI =====

    -- v0
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_web, has_free_tier, ai_model)
    VALUES ('v0 by Vercel', 'v0', 'Generative UI tool by Vercel that creates React components from text prompts.',
    'v0 is Vercel''s AI-powered UI generation tool that creates React components with Tailwind CSS and shadcn/ui from natural language prompts. You describe what you want, and v0 generates production-ready code.

The generated components use modern React patterns and can be directly copied into your Next.js or React project.',
    'https://v0.dev', cat_design_ui, 'freemium', 'Free: limited generations. Premium: $20/mo.', 'https://v0.dev/docs', true, true, true, 'Vercel proprietary')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Generates production-ready React + Tailwind code', 1),
    (tool_id, 'pro', 'Uses shadcn/ui components', 2),
    (tool_id, 'pro', 'Great for rapid UI prototyping', 3),
    (tool_id, 'con', 'Limited to React/Tailwind output', 1),
    (tool_id, 'con', 'Free tier has generation limits', 2);

    INSERT INTO tool_features (tool_id, feature_name, feature_value, feature_group, display_order) VALUES
    (tool_id, 'React', 'Yes', 'Output', 1),
    (tool_id, 'Tailwind', 'Yes', 'Output', 2),
    (tool_id, 'Text Prompt', 'Yes', 'Input', 1),
    (tool_id, 'Live Preview', 'Yes', 'Features', 1);

    -- Bolt.new
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, is_featured, supports_web, has_free_tier, ai_model)
    VALUES ('Bolt.new', 'bolt-new', 'Full-stack web app builder that generates, runs, and deploys apps from prompts in the browser.',
    'Bolt.new by StackBlitz is a browser-based AI tool that can generate, run, and deploy full-stack web applications from natural language prompts. It runs a complete development environment in your browser using WebContainers.',
    'https://bolt.new', cat_design_ui, 'freemium', 'Free tier available. Pro plans for more tokens.', true, true, true, 'Claude, GPT-4')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Full-stack app generation from prompts', 1),
    (tool_id, 'pro', 'Runs entirely in the browser', 2),
    (tool_id, 'pro', 'Can deploy directly to production', 3),
    (tool_id, 'con', 'Token limits on free tier', 1);

    INSERT INTO tool_features (tool_id, feature_name, feature_value, feature_group, display_order) VALUES
    (tool_id, 'Full-stack', 'Yes', 'Output', 1),
    (tool_id, 'React', 'Yes', 'Output', 2),
    (tool_id, 'Live Preview', 'Yes', 'Features', 1),
    (tool_id, 'Hosting', 'Yes', 'Features', 2);

    -- Lovable
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_web, has_free_tier, ai_model)
    VALUES ('Lovable', 'lovable', 'AI full-stack builder that creates production apps from natural language with Supabase integration.',
    'Lovable (formerly GPT Engineer) is an AI-powered full-stack application builder. You describe your app in natural language, and Lovable generates a complete, deployable application with UI, backend, and database.

Lovable has built-in Supabase integration for databases and authentication.',
    'https://lovable.dev', cat_design_ui, 'freemium', 'Free tier available. Paid plans for more usage.', 'https://docs.lovable.dev', false, true, true, 'Claude, GPT-4')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'End-to-end app generation from prompts', 1),
    (tool_id, 'pro', 'Built-in Supabase integration', 2),
    (tool_id, 'con', 'Less control over code structure', 1);

    -- screenshot-to-code
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, github_url, is_featured, supports_web, has_free_tier, ai_model)
    VALUES ('screenshot-to-code', 'screenshot-to-code', 'Open-source tool that converts screenshots and designs into clean HTML/React code.',
    'screenshot-to-code is an open-source tool that takes a screenshot, image, or Figma design and converts it into functional code. It supports HTML/CSS, React, Vue, and other output formats.',
    'https://screenshottocode.com', cat_design_ui, 'open_source', 'Free. Self-hosted with your own API keys.', 'https://github.com/abi/screenshot-to-code', false, true, true, 'GPT-4 Vision, Claude Vision')
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Open source and self-hostable', 1),
    (tool_id, 'pro', 'Multiple output formats', 2),
    (tool_id, 'con', 'Requires AI API keys', 1);

    -- ===== PROMPTING & CONTEXT =====

    -- Awesome CursorRules
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, github_url, is_featured, has_free_tier)
    VALUES ('Awesome CursorRules', 'awesome-cursorrules', 'Community-curated collection of .cursorrules files for different frameworks and languages.',
    'Awesome CursorRules is a community-maintained GitHub repository containing curated .cursorrules files for Cursor IDE. These files configure how Cursor''s AI behaves for specific frameworks, languages, and coding styles.',
    'https://github.com/PatrickJS/awesome-cursorrules', cat_prompting, 'open_source', 'Free.', 'https://github.com/PatrickJS/awesome-cursorrules', true, true)
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Large collection of framework-specific rules', 1),
    (tool_id, 'pro', 'Community maintained and growing', 2),
    (tool_id, 'con', 'Cursor-specific', 1);

    -- Cursor Directory
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, is_featured, supports_web, has_free_tier)
    VALUES ('Cursor Directory', 'cursor-directory', 'Curated directory of cursor rules, prompts, and AI coding resources.',
    'Cursor Directory is a web-based directory of curated cursor rules and prompt templates for AI-assisted coding.',
    'https://cursor.directory', cat_prompting, 'free', 'Free.', false, true, true)
    RETURNING id INTO tool_id;

    -- Anthropic Prompt Library
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_web, has_free_tier)
    VALUES ('Anthropic Prompt Library', 'anthropic-prompt-library', 'Official collection of example prompts and techniques from Anthropic for Claude.',
    'The Anthropic Prompt Library is an official collection of example prompts, techniques, and best practices for working with Claude.',
    'https://docs.anthropic.com/en/prompt-library', cat_prompting, 'free', 'Free.', 'https://docs.anthropic.com/en/prompt-library', false, true, true)
    RETURNING id INTO tool_id;

    -- ===== DEPLOYMENT & BACKEND =====

    -- Supabase
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, github_url, docs_url, is_featured, supports_web, supports_cli, has_free_tier)
    VALUES ('Supabase', 'supabase', 'Open-source Firebase alternative with PostgreSQL, auth, real-time, storage, and edge functions.',
    'Supabase is an open-source backend-as-a-service platform built on PostgreSQL. It provides a complete backend stack including database, authentication, real-time subscriptions, file storage, and edge functions.

Supabase is popular in the vibe coding community because it dramatically reduces the time needed to set up a backend.',
    'https://supabase.com', cat_deployment, 'freemium', 'Free: 500MB DB, 1GB storage. Pro: $25/mo.', 'https://github.com/supabase/supabase', 'https://supabase.com/docs', true, true, true, true)
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Complete backend stack in one platform', 1),
    (tool_id, 'pro', 'PostgreSQL-based — powerful and familiar', 2),
    (tool_id, 'pro', 'Generous free tier', 3),
    (tool_id, 'pro', 'Open source with self-hosting option', 4),
    (tool_id, 'con', 'Free tier has resource limits for production', 1);

    INSERT INTO tool_features (tool_id, feature_name, feature_value, feature_group, display_order) VALUES
    (tool_id, 'Database', 'PostgreSQL', 'Core Services', 1),
    (tool_id, 'Auth', 'Yes (social + email)', 'Core Services', 2),
    (tool_id, 'Storage', 'Yes', 'Core Services', 3),
    (tool_id, 'Real-time', 'Yes', 'Core Services', 4),
    (tool_id, 'Free Tier Limits', '500MB DB, 1GB storage', 'Pricing', 1);

    -- Vercel
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_web, supports_cli, has_free_tier)
    VALUES ('Vercel', 'vercel', 'Frontend deployment platform optimized for Next.js with edge functions and analytics.',
    'Vercel is the company behind Next.js and provides a deployment platform optimized for modern web applications. It offers zero-config deployments, edge functions, analytics, and preview deployments for every pull request.',
    'https://vercel.com', cat_deployment, 'freemium', 'Free: hobby projects. Pro: $20/mo.', 'https://vercel.com/docs', true, true, true, true)
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Best-in-class Next.js deployment', 1),
    (tool_id, 'pro', 'Global edge network', 2),
    (tool_id, 'pro', 'Preview deployments for every PR', 3),
    (tool_id, 'con', 'Can get expensive at scale', 1);

    INSERT INTO tool_features (tool_id, feature_name, feature_value, feature_group, display_order) VALUES
    (tool_id, 'Auto-deploy', 'Yes (Git)', 'Deployment', 1),
    (tool_id, 'Preview URLs', 'Yes', 'Deployment', 2),
    (tool_id, 'Edge Network', 'Yes (global)', 'Deployment', 3),
    (tool_id, 'Free Tier Limits', 'Hobby projects', 'Pricing', 1);

    -- Railway
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_web, supports_cli, has_free_tier)
    VALUES ('Railway', 'railway', 'Modern cloud platform for deploying apps, databases, and services with minimal config.',
    'Railway is a modern cloud platform that simplifies deploying web applications, databases, and background services.',
    'https://railway.app', cat_deployment, 'freemium', 'Trial: $5 credit. Hobby: $5/mo. Pro: $20/mo.', 'https://docs.railway.app', false, true, true, true)
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Excellent DX — deploy in seconds', 1),
    (tool_id, 'pro', 'Built-in database provisioning', 2),
    (tool_id, 'con', 'Free tier is limited', 1);

    -- Neon
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, github_url, docs_url, is_featured, supports_web, supports_cli, has_free_tier)
    VALUES ('Neon', 'neon', 'Serverless Postgres with branching, autoscaling, and a generous free tier.',
    'Neon is a serverless PostgreSQL platform that brings modern features like database branching, autoscaling, and instant provisioning to Postgres.',
    'https://neon.tech', cat_deployment, 'freemium', 'Free: 512MB storage. Launch: $19/mo.', 'https://github.com/neondatabase/neon', 'https://neon.tech/docs', false, true, true, true)
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Database branching like Git', 1),
    (tool_id, 'pro', 'Serverless with autoscaling', 2),
    (tool_id, 'pro', 'Generous free tier', 3),
    (tool_id, 'con', 'Cold starts on free tier', 1);

    -- Cloudflare Workers
    INSERT INTO tools (name, slug, description, long_description, url, category_id, pricing, pricing_details, docs_url, is_featured, supports_web, supports_cli, has_free_tier)
    VALUES ('Cloudflare Workers', 'cloudflare-workers', 'Edge computing platform with KV storage, D1 database, and global deployment.',
    'Cloudflare Workers is an edge computing platform that lets you run JavaScript, TypeScript, Python, and Rust at the edge — close to your users worldwide.',
    'https://workers.cloudflare.com', cat_deployment, 'freemium', 'Free: 100K requests/day. Paid: $5/mo for 10M requests.', 'https://developers.cloudflare.com/workers/', false, true, true, true)
    RETURNING id INTO tool_id;

    INSERT INTO tool_pros_cons (tool_id, type, content, display_order) VALUES
    (tool_id, 'pro', 'Extremely low latency — runs at the edge', 1),
    (tool_id, 'pro', 'Generous free tier', 2),
    (tool_id, 'pro', 'D1 database included', 3),
    (tool_id, 'con', 'Different runtime from Node.js', 1);

END $$;

-- ============================================
-- WORKFLOWS
-- ============================================

DO $$
DECLARE
    wf_id UUID;
    tool_cursor UUID;
    tool_supabase UUID;
    tool_vercel UUID;
    tool_v0 UUID;
    tool_claude_code UUID;
    tool_screenshot UUID;
BEGIN
    SELECT id INTO tool_cursor FROM tools WHERE slug = 'cursor';
    SELECT id INTO tool_supabase FROM tools WHERE slug = 'supabase';
    SELECT id INTO tool_vercel FROM tools WHERE slug = 'vercel';
    SELECT id INTO tool_v0 FROM tools WHERE slug = 'v0';
    SELECT id INTO tool_claude_code FROM tools WHERE slug = 'claude-code';
    SELECT id INTO tool_screenshot FROM tools WHERE slug = 'screenshot-to-code';

    -- Build a SaaS in a Weekend
    INSERT INTO workflows (title, slug, description, difficulty, estimated_time, is_featured)
    VALUES ('Build a SaaS in a Weekend', 'build-saas-weekend', 'Go from idea to deployed SaaS application using AI-powered tools.', 'intermediate', '1-2 days', true)
    RETURNING id INTO wf_id;

    INSERT INTO workflow_steps (workflow_id, step_number, title, description, estimated_time) VALUES
    (wf_id, 1, 'Set Up Your Project', 'Create a new Next.js project with Supabase. Install shadcn/ui for your component library.', '30 minutes'),
    (wf_id, 2, 'Design Your Database', 'Design your tables in Supabase Dashboard. Write SQL migrations and RLS policies.', '1 hour'),
    (wf_id, 3, 'Build the UI', 'Use v0 to generate UI components. Wire them up to your Supabase backend with Cursor.', '3-4 hours'),
    (wf_id, 4, 'Add Authentication', 'Set up Supabase Auth with social login. Create login/signup pages.', '1 hour'),
    (wf_id, 5, 'Implement Core Features', 'Build out your SaaS core functionality with Cursor Composer.', '4-6 hours'),
    (wf_id, 6, 'Deploy to Production', 'Push to GitHub and deploy on Vercel. Configure your custom domain.', '30 minutes');

    INSERT INTO workflow_tools (workflow_id, tool_id, role_in_workflow, is_required, display_order) VALUES
    (wf_id, tool_cursor, 'Primary code editor', true, 1),
    (wf_id, tool_supabase, 'Database, auth, and backend', true, 2),
    (wf_id, tool_vercel, 'Deployment and hosting', true, 3),
    (wf_id, tool_v0, 'UI component generation', false, 4);

    -- Ship a Landing Page in 1 Hour
    INSERT INTO workflows (title, slug, description, difficulty, estimated_time, is_featured)
    VALUES ('Ship a Landing Page in 1 Hour', 'landing-page-one-hour', 'Create and deploy a professional landing page using AI-generated UI.', 'beginner', '1 hour', true)
    RETURNING id INTO wf_id;

    INSERT INTO workflow_steps (workflow_id, step_number, title, description, estimated_time) VALUES
    (wf_id, 1, 'Generate Your Landing Page', 'Open v0.dev and describe your landing page with hero, features, and CTA.', '15 minutes'),
    (wf_id, 2, 'Set Up Your Project', 'Create a new Next.js project. Copy the v0 generated components.', '15 minutes'),
    (wf_id, 3, 'Customize and Polish', 'Update text content, add your logo, adjust colors.', '15 minutes'),
    (wf_id, 4, 'Deploy', 'Push to GitHub and import in Vercel. Add your custom domain.', '5 minutes');

    INSERT INTO workflow_tools (workflow_id, tool_id, role_in_workflow, is_required, display_order) VALUES
    (wf_id, tool_v0, 'Generate landing page components', true, 1),
    (wf_id, tool_vercel, 'Deploy to production', true, 2);

    -- API Backend in 30 Minutes
    INSERT INTO workflows (title, slug, description, difficulty, estimated_time, is_featured)
    VALUES ('API Backend in 30 Minutes', 'api-backend-30-minutes', 'Set up a complete REST API with database and auth using Supabase.', 'beginner', '30 minutes', false)
    RETURNING id INTO wf_id;

    INSERT INTO workflow_steps (workflow_id, step_number, title, description, estimated_time) VALUES
    (wf_id, 1, 'Create Supabase Project', 'Go to app.supabase.com and create a new project.', '5 minutes'),
    (wf_id, 2, 'Design Your Tables', 'Use the Table Editor to create your tables. Add RLS policies.', '15 minutes'),
    (wf_id, 3, 'Enable Auth and Test', 'Enable authentication providers. Test your API using the built-in docs.', '10 minutes');

    INSERT INTO workflow_tools (workflow_id, tool_id, role_in_workflow, is_required, display_order) VALUES
    (wf_id, tool_supabase, 'Database and auto-generated API', true, 1);

END $$;
