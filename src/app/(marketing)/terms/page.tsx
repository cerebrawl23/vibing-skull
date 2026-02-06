import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - The Vibing Skull',
  description: 'Terms of service for The Vibing Skull',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
      <p className="mb-4 text-muted-foreground">Last updated: February 6, 2026</p>

      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using The Vibing Skull (vibingskull.com), you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="text-muted-foreground">
            The Vibing Skull is a directory of AI coding tools, news aggregator, and workflow
            resource for developers. We provide:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Curated directory of AI coding tools</li>
            <li>Aggregated news from developer communities</li>
            <li>Workflow templates and guides</li>
            <li>Personal dashboard for bookmarks, favorites, and notes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="text-muted-foreground">
            To access certain features, you must create an account using Google or GitHub OAuth.
            You are responsible for:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Maintaining the security of your account</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us of any unauthorized access</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
          <p className="text-muted-foreground">You agree not to:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the service</li>
            <li>Scrape or collect data without permission</li>
            <li>Upload malicious content or spam</li>
            <li>Impersonate others or misrepresent your affiliation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p className="text-muted-foreground">
            The Vibing Skull name, logo, and original content are our intellectual property.
            Tool information displayed is sourced from publicly available data and belongs
            to their respective owners. You retain ownership of content you create (notes, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Tools</h2>
          <p className="text-muted-foreground">
            We provide information about third-party tools and services. We do not endorse or
            guarantee any third-party tool. Your use of external tools is at your own risk and
            subject to their terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. We do not guarantee
            that the service will be uninterrupted, error-free, or secure. Tool information may
            become outdated and we make no guarantees about accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF
            THE SERVICE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
          <p className="text-muted-foreground">
            We may terminate or suspend your account at any time for violation of these terms.
            You may delete your account at any time. Upon termination, your right to use the
            service ceases immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. We will notify users of
            significant changes. Continued use of the service after changes constitutes
            acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
          <p className="text-muted-foreground">
            These terms shall be governed by and construed in accordance with applicable laws,
            without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Contact</h2>
          <p className="text-muted-foreground">
            For questions about these terms, contact us at:
            <br />
            Email: hello@vibingskull.com
          </p>
        </section>
      </div>
    </div>
  )
}
