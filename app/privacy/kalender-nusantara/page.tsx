export const metadata = {
  title: "Privacy Policy - Kalender Nusantara",
  description: "Privacy Policy for the Kalender Nusantara mobile app",
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
        <h1 className="text-4xl font-bold mb-2">Privacy Policy - Kalender Nusantara</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: July 13, 2026</p>

        <p className="text-gray-300 leading-relaxed mb-8">
          This Privacy Policy describes how Kalender Nusantara (&quot;we&quot;, &quot;our&quot;, &quot;the app&quot;) collects,
          uses, and shares information when you use our mobile application.
        </p>

        <Section title="1. Information We Collect">
          <p>
            Kalender Nusantara does not require user account registration and does not directly
            collect, transmit, or store personally identifiable information such as your name,
            email, phone number, or exact physical location on our servers.
          </p>
          <p>
            Our app operates primarily offline. However, it integrates standard third-party
            services (described below) that may automatically process technical and device
            identifiers for the purpose of serving advertisements and facilitating app
            analytics.
          </p>
        </Section>

        <Section title="2. Personal Notes and Agenda Data">
          <p>
            The app features a custom scheduling and memo functionality. Any personal notes,
            tasks, agendas, or event reminders that you create are stored 100% locally on your
            device using an offline Room Database.
          </p>
          <p>
            This data is entirely private to you, never uploaded to the internet, and will be
            permanently removed if you choose to uninstall the app or clear its application data
            through your device settings.
          </p>
        </Section>

        <Section title="3. Traditional Calculations (Weton & Primbon)">
          <p>
            All custom calculations for Weton, Neptu, and Primbon matches are computed locally on
            your device instantly. We do not transmit or log the dates or parameters you input to
            any external databases.
          </p>
        </Section>

        <Section title="4. Advertising (Google AdMob)">
          <p>
            We use <strong className="text-white">Google AdMob</strong> to display banner,
            interstitial, and native advertisements within the app to support its continuous and
            free development. AdMob may collect and process the following types of data:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Device identifiers (such as Android Advertising ID / GAID)</li>
            <li>IP address and general network location</li>
            <li>App usage logs and user interaction with ad formats</li>
            <li>Ad performance telemetry (impressions, clicks, and load rates)</li>
          </ul>
          <p>
            This data may be used to serve personalized or non-personalized ads, prevent click
            fraud, and measure promotional statistics. For more information about how Google
            collects and uses data, please visit{" "}
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
            You can opt out of personalized advertisements at any time by configuring your
            device&apos;s settings (go to Android Settings, then Google, then Ads) or by visiting{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              adssettings.google.com
            </a>
            .
          </p>
        </Section>

        <Section title="5. Children's Privacy">
          <p>
            Kalender Nusantara is suitable for general audiences of all ages. We do not knowingly
            collect or store any personal data from anyone, including children under 13 years of
            age. If you are a parent or legal guardian and have any concerns, please contact us.
          </p>
        </Section>

        <Section title="6. Data Sharing & Third-Party Providers">
          <p>
            We do not sell, trade, or distribute your information. Technical details (like mobile
            advertising IDs) are only processed by our primary advertising network partner
            (Google AdMob) in strict adherence to standard Google Developer policies.
          </p>
        </Section>

        <Section title="7. Contact Us">
          <p>
            If you have any questions, suggestions, or requests regarding this Privacy Policy,
            please feel free to reach out to us:
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
        <p>© 2026 PrestigeSync. All rights reserved.</p>
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