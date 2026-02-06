import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - The Vibing Skull',
  description: 'Privacy policy for The Vibing Skull',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-muted-foreground">Last updated: February 6, 2026</p>

      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to The Vibing Skull (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are
            committed to protecting your personal data. This privacy policy explains how we collect,
            use, and safeguard your information when you use our website at vibingskull.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="text-muted-foreground mb-2">We collect information you provide directly:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Account information (email, name) when you sign in with Google or GitHub</li>
            <li>Profile information from your OAuth provider</li>
            <li>Content you create (notes, bookmarks, favorites)</li>
          </ul>
          <p className="text-muted-foreground mt-4 mb-2">We automatically collect:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Usage data (pages visited, tools viewed)</li>
            <li>Device information (browser type, operating system)</li>
            <li>IP address and approximate location</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>To provide and maintain our service</li>
            <li>To personalize your experience (favorites, bookmarks, history)</li>
            <li>To improve our website and services</li>
            <li>To communicate with you about updates or changes</li>
            <li>To detect and prevent fraud or abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Storage</h2>
          <p className="text-muted-foreground">
            Your data is stored securely using Supabase, which provides enterprise-grade security
            with encryption at rest and in transit. We retain your data as long as your account
            is active or as needed to provide services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
          <p className="text-muted-foreground">
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Service providers (Supabase, Vercel) who help operate our service</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="text-muted-foreground">You have the right to:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Export your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
          <p className="text-muted-foreground">
            We use essential cookies for authentication and session management. We may use
            analytics cookies to understand how visitors use our site. You can control cookies
            through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
          <p className="text-muted-foreground">
            Our site contains links to third-party tools and websites. We are not responsible
            for their privacy practices. We encourage you to read their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Children&apos;s Privacy</h2>
          <p className="text-muted-foreground">
            Our service is not intended for children under 13. We do not knowingly collect
            information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this policy from time to time. We will notify you of significant
            changes by posting the new policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this privacy policy, contact us at:
            <br />
            Email: hello@vibingskull.com
          </p>
        </section>
      </div>
    </div>
  )
}
