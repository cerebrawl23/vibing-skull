export interface SeedWorkflow {
  title: string
  slug: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimated_time: string
  is_featured: boolean
  tool_slugs: { slug: string; role: string; required: boolean }[]
  steps: { step_number: number; title: string; description: string; estimated_time: string }[]
}

export const workflows: SeedWorkflow[] = [
  {
    title: 'Build a SaaS in a Weekend',
    slug: 'build-saas-weekend',
    description: 'Go from idea to deployed SaaS application using AI-powered tools. This workflow covers database setup, auth, UI generation, and deployment.',
    difficulty: 'intermediate',
    estimated_time: '1-2 days',
    is_featured: true,
    tool_slugs: [
      { slug: 'cursor', role: 'Primary code editor', required: true },
      { slug: 'supabase', role: 'Database, auth, and backend', required: true },
      { slug: 'vercel', role: 'Deployment and hosting', required: true },
      { slug: 'v0', role: 'UI component generation', required: false },
    ],
    steps: [
      {
        step_number: 1,
        title: 'Set Up Your Project',
        description: 'Create a new Next.js project with `npx create-next-app`. Initialize Supabase with `npx supabase init`. Install shadcn/ui for your component library. Set up your `.env.local` with Supabase credentials.\n\nUse Cursor to scaffold the project structure — describe your app idea and let it generate the initial folder layout.',
        estimated_time: '30 minutes',
      },
      {
        step_number: 2,
        title: 'Design Your Database',
        description: 'Open Supabase Dashboard and design your tables. For a typical SaaS, you need: users/profiles, organizations, and your core domain tables.\n\nWrite your SQL migrations and set up Row Level Security policies. Use Cursor to help generate the SQL — paste your requirements and let it write the migration files.',
        estimated_time: '1 hour',
      },
      {
        step_number: 3,
        title: 'Build the UI',
        description: 'Use v0 to generate your key UI components — landing page, dashboard layout, data tables, forms. Copy the generated code into your project.\n\nThen use Cursor Composer to wire up the components to your Supabase backend. Describe the data flow and let Cursor generate the server components and API routes.',
        estimated_time: '3-4 hours',
      },
      {
        step_number: 4,
        title: 'Add Authentication',
        description: 'Set up Supabase Auth with social login (Google, GitHub). Create login/signup pages, middleware for protected routes, and the OAuth callback handler.\n\nCursor can generate most of this from the Supabase docs patterns. Use `@supabase/ssr` for server-side auth.',
        estimated_time: '1 hour',
      },
      {
        step_number: 5,
        title: 'Implement Core Features',
        description: 'Build out your SaaS core functionality. Use Cursor Composer to implement CRUD operations, real-time features, and business logic.\n\nFocus on the MVP — what is the one thing your SaaS does? Build that first, skip the nice-to-haves.',
        estimated_time: '4-6 hours',
      },
      {
        step_number: 6,
        title: 'Deploy to Production',
        description: 'Push your code to GitHub. Connect the repo to Vercel for automatic deployments. Set up environment variables in Vercel Dashboard.\n\nConfigure your custom domain, set up Supabase production project, and run your migrations against the production database. Your SaaS is live.',
        estimated_time: '30 minutes',
      },
    ],
  },
  {
    title: 'Ship a Landing Page in 1 Hour',
    slug: 'landing-page-one-hour',
    description: 'Create and deploy a professional landing page using AI-generated UI components and instant deployment.',
    difficulty: 'beginner',
    estimated_time: '1 hour',
    is_featured: true,
    tool_slugs: [
      { slug: 'v0', role: 'Generate landing page components', required: true },
      { slug: 'vercel', role: 'Deploy to production', required: true },
    ],
    steps: [
      {
        step_number: 1,
        title: 'Generate Your Landing Page',
        description: 'Open v0.dev and describe your landing page. Include details about: hero section, features grid, testimonials, pricing, and CTA.\n\nExample prompt: "Create a modern landing page for [your product] with a hero section, 3 feature cards, testimonial carousel, pricing table, and email signup CTA. Use a dark theme with blue accents."',
        estimated_time: '15 minutes',
      },
      {
        step_number: 2,
        title: 'Set Up Your Project',
        description: 'Create a new Next.js project: `npx create-next-app my-landing --ts --tailwind --app`. Install shadcn/ui: `npx shadcn@latest init`.\n\nCopy the v0 generated components into your project. Adjust the content with your actual copy, images, and links.',
        estimated_time: '15 minutes',
      },
      {
        step_number: 3,
        title: 'Customize and Polish',
        description: 'Update the text content, add your logo, adjust colors to match your brand. Add SEO metadata (title, description, OG image).\n\nMake sure the page is responsive — check at mobile, tablet, and desktop widths.',
        estimated_time: '15 minutes',
      },
      {
        step_number: 4,
        title: 'Deploy',
        description: 'Push to GitHub and import the project in Vercel. It will auto-deploy in seconds. Add your custom domain if you have one.\n\nYour landing page is live and ready to collect signups.',
        estimated_time: '5 minutes',
      },
    ],
  },
  {
    title: 'Build a Chrome Extension with AI',
    slug: 'chrome-extension-ai',
    description: 'Create a Chrome extension from scratch using an AI coding assistant to handle the Chrome APIs and manifest configuration.',
    difficulty: 'intermediate',
    estimated_time: '4-6 hours',
    is_featured: false,
    tool_slugs: [
      { slug: 'claude-code', role: 'Agentic coding assistant', required: true },
      { slug: 'cursor', role: 'Code editor (alternative)', required: false },
    ],
    steps: [
      {
        step_number: 1,
        title: 'Plan Your Extension',
        description: 'Define what your Chrome extension will do. Keep the scope small for your first extension — e.g., a page annotator, a tab organizer, or a quick-access tool.\n\nDescribe the functionality, UI (popup vs. sidebar vs. content script), and any APIs you need.',
        estimated_time: '15 minutes',
      },
      {
        step_number: 2,
        title: 'Scaffold the Project',
        description: 'Use Claude Code to generate the extension scaffold. Tell it: "Create a Chrome Manifest V3 extension that [your description]. Include manifest.json, popup HTML/JS, and any content scripts needed."\n\nClaude Code will create the correct file structure with manifest.json, popup, background service worker, and content scripts.',
        estimated_time: '30 minutes',
      },
      {
        step_number: 3,
        title: 'Implement Core Features',
        description: 'Work iteratively with Claude Code to implement your extension\'s functionality. Chrome extension APIs can be tricky — the AI handles message passing between popup, background, and content scripts.\n\nTest by loading the extension in Chrome: go to `chrome://extensions`, enable Developer mode, and "Load unpacked" pointing to your extension folder.',
        estimated_time: '2-3 hours',
      },
      {
        step_number: 4,
        title: 'Polish and Add Styling',
        description: 'Add CSS styling to your popup or sidebar UI. Include an extension icon (16x16, 48x48, 128x128). Handle edge cases and add error messages.\n\nTest on different websites to make sure content scripts work correctly.',
        estimated_time: '1 hour',
      },
      {
        step_number: 5,
        title: 'Package and Publish',
        description: 'Zip your extension folder. Go to the Chrome Web Store Developer Dashboard and upload your extension. Fill in the listing details, screenshots, and description.\n\nReview takes 1-3 days. In the meantime, you can share the unpacked extension with testers.',
        estimated_time: '30 minutes',
      },
    ],
  },
  {
    title: 'Full-Stack App from a Screenshot',
    slug: 'app-from-screenshot',
    description: 'Convert a UI screenshot or mockup into a working full-stack application with database and authentication.',
    difficulty: 'beginner',
    estimated_time: '2-3 hours',
    is_featured: false,
    tool_slugs: [
      { slug: 'screenshot-to-code', role: 'Convert design to code', required: true },
      { slug: 'cursor', role: 'Implement backend logic', required: true },
      { slug: 'supabase', role: 'Database and auth', required: true },
    ],
    steps: [
      {
        step_number: 1,
        title: 'Capture Your Design',
        description: 'Take a screenshot of the UI you want to build — this could be from a Figma mockup, a competitor\'s app, or a hand-drawn wireframe.\n\nMultiple screenshots work too — capture the main pages and modals you need.',
        estimated_time: '10 minutes',
      },
      {
        step_number: 2,
        title: 'Convert to Code',
        description: 'Upload your screenshot(s) to screenshot-to-code. Select React + Tailwind as the output format. The tool will generate the UI components matching your design.\n\nReview the output and iterate — you can ask it to adjust specific parts of the generated code.',
        estimated_time: '30 minutes',
      },
      {
        step_number: 3,
        title: 'Set Up the Project',
        description: 'Create a Next.js project and integrate the generated UI code. Set up Supabase for your backend — create tables matching the data shown in your screenshots.\n\nUse Cursor to help wire the static UI to real data from Supabase.',
        estimated_time: '45 minutes',
      },
      {
        step_number: 4,
        title: 'Add Interactivity',
        description: 'Use Cursor Composer to add form handling, data fetching, and mutations. Implement authentication if the design shows login/signup screens.\n\nConnect all the UI elements to real functionality — buttons submit forms, lists show real data, filters actually work.',
        estimated_time: '1-2 hours',
      },
    ],
  },
  {
    title: 'API Backend in 30 Minutes',
    slug: 'api-backend-30-minutes',
    description: 'Set up a complete REST API with database, authentication, and auto-generated endpoints using Supabase.',
    difficulty: 'beginner',
    estimated_time: '30 minutes',
    is_featured: false,
    tool_slugs: [
      { slug: 'supabase', role: 'Database and auto-generated API', required: true },
      { slug: 'cursor', role: 'Generate client code', required: false },
    ],
    steps: [
      {
        step_number: 1,
        title: 'Create Supabase Project',
        description: 'Go to app.supabase.com and create a new project. Choose your region and set a database password.\n\nNote your project URL and anon key — you\'ll need these for client connections.',
        estimated_time: '5 minutes',
      },
      {
        step_number: 2,
        title: 'Design Your Tables',
        description: 'Use the Supabase Table Editor or SQL Editor to create your tables. Supabase automatically generates REST and GraphQL APIs for every table.\n\nAdd Row Level Security policies to control who can read/write what data. Example: "Users can only read their own rows."',
        estimated_time: '15 minutes',
      },
      {
        step_number: 3,
        title: 'Enable Auth and Test',
        description: 'Enable authentication providers in Supabase Dashboard (email, Google, GitHub). Supabase handles the entire auth flow.\n\nTest your API using the built-in API docs (available in the Supabase dashboard). You now have a complete, authenticated REST API with zero code.',
        estimated_time: '10 minutes',
      },
    ],
  },
]
