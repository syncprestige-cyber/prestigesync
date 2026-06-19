export const metadata = {
  title: "Privacy Policy - Math Rush",
  description: "Privacy Policy for the Math Rush mobile app",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Simple Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center font-bold text-xl">
              PS
            </div>
            <span className="text-xl font-semibold tracking-tight">PrestigeSync</span>
          </a>
          <a href="/" className="px-5 py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white/5 transition">
            ← Kembali
          </a>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy - Math Rush</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: June 19, 2026</p>

        <p className="text-gray-300 leading-relaxed mb-8">
          This Privacy Policy describes how Math Rush (&quot;we&quot;, &quot;our&quot;, &quot;the app&quot;) collects,
          uses, and shares information when you use our mobile application.
        </p>

        <Section title="1. Information We Collect">
          <p>
            Math Rush itself does not require account registration and does not directly collect
            personally identifiable information such as your name, email, or phone number.
          </p>
          <p>
            However, our app uses third-party services (described below) that may automatically
            collect certain technical and device information to provide advertising and app
            functionality.
          </p>
        </Section>

        <Section title="2. Advertising (Google AdMob)">
          <p>
            We use <strong className="text-white">Google AdMob</strong> to display banner,
            interstitial, and rewarded advertisements within the app. AdMob may collect and
            process the following types of data:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Device identifiers (such as Advertising ID)</li>
            <li>IP address and approximate location</li>
            <li>App usage and interaction data</li>
            <li>Ad interaction data (impressions, clicks)</li>
          </ul>
          <p>
            This data may be used to serve personalized or non-personalized ads, measure ad
            performance, and prevent fraud. For more information about how Google collects and
            uses data, please visit{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              policies.google.com/technologies/partner-sites
            </a>
            .
          </p>
          <p>
            You can manage your ad personalization settings via your device&apos;s settings
            (Android Settings, then Google, then Ads).
          </p>
        </Section>

        <Section title="3. Data Storage">
          <p>
            Game progress, scores, and preferences may be stored locally on your device using
            local storage. We may also use Supabase to store leaderboard scores (such as
            nickname/country and score), which are not linked to your real identity.
          </p>
        </Section>

        <Section title="4. Children's Privacy">
          <p>
            Math Rush is not specifically directed at children under 13. We do not knowingly
            collect personal information from children. If you believe a child has provided us
            with personal information, please contact us so we can take appropriate action.
          </p>
        </Section>

        <Section title="5. Data Sharing">
          <p>
            We do not sell your personal information. Data may be shared with third-party
            service providers (Google AdMob, Supabase) solely for the purpose of providing app
            functionality and advertising as described above.
          </p>
        </Section>

        <Section title="6. Your Choices">
          <p>
            You may opt out of personalized advertising through your device settings, or
            uninstall the app at any time to stop all data collection associated with it.
          </p>
        </Section>

        <Section title="7. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated revision date.
          </p>
        </Section>

        <Section title="8. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <strong className="text-white">Email:</strong>{" "}
            <a
              href="mailto:syncprestige@gmail.com"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              syncprestige@gmail.com
            </a>
          </p>
        </Section>
      </article>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-500">
        <p>© 2024 - {new Date().getFullYear()} PrestigeSync. All rights reserved.</p>
      </footer>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-3 text-white">{title}</h2>
      <div className="text-gray-300 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}