export const metadata = {
  title: "Privacy Policy - FUN MATH",
  description: "Privacy Policy for the FUN MATH mobile app",
};

export default function FunMathPrivacyPolicy() {
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
        <h1 className="text-4xl font-bold mb-2">Privacy Policy - FUN MATH</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: July 8, 2026</p>

        <p className="text-gray-300 leading-relaxed mb-8">
          This Privacy Policy describes how FUN MATH (&quot;we&quot;, &quot;our&quot;, &quot;the app&quot;)
          collects, uses, and shares information when you use our mobile application.
        </p>

        <Section title="1. Information We Collect">
          <p>
            FUN MATH does not require account registration and does not directly collect
            personally identifiable information such as your name, email, or phone number.
          </p>
          <p>
            If you choose to save your score to the Global Leaderboard, you may optionally
            enter a nickname of your choosing (no login required). Your nickname and game
            score are the only user-provided data we store.
          </p>
          <p>
            Our app also uses third-party services (described below) that may automatically
            collect certain technical and device information to provide advertising and app
            functionality.
          </p>
        </Section>

        <Section title="2. Gameplay Data">
          <p>
            FUN MATH is a math practice game. During gameplay, we process data such as your
            score, correct-answer count, and combo streak locally on your device to run the
            game logic. This data is used to calculate your results and, if you opt in, is
            submitted along with your chosen nickname to our Global Leaderboard.
          </p>
        </Section>

        <Section title="3. Local Leaderboard &amp; High Scores">
          <p>
            Your personal high scores and Local Leaderboard entries are stored directly on
            your device and are never transmitted to any server. This data is removed if you
            clear the app&apos;s data or uninstall FUN MATH.
          </p>
        </Section>

        <Section title="4. Global Leaderboard (Firebase)">
          <p>
            If you choose to submit your score to the Global Leaderboard, your nickname and
            score are stored using <strong className="text-white">Firebase</strong> (a Google
            service) so that other players can view the leaderboard. This feature is entirely
            optional and does not require any account or login.
          </p>
          <p>
            For more information, please visit{" "}
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              firebase.google.com/support/privacy
            </a>
            .
          </p>
        </Section>

        <Section title="5. AI Brain Coach Feature">
          <p>
            Our optional &quot;AI Brain Coach&quot; feature uses{" "}
            <strong className="text-white">Google Gemini via Firebase AI Logic</strong> to
            analyze your session statistics (score, correct-answer count, combo streak) and
            generate a short performance summary. Only gameplay statistics are sent for this
            analysis — no personally identifiable information is included, and this data is
            not retained by the analysis service beyond generating your result.
          </p>
          <p>
            For more information on how Google processes this data, please visit{" "}
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              firebase.google.com/support/privacy
            </a>
            .
          </p>
        </Section>

        <Section title="6. Advertising (Google AdMob)">
          <p>
            We use <strong className="text-white">Google AdMob</strong> to display banner,
            interstitial, native, and rewarded video advertisements within the app to support
            the app remaining free. AdMob may collect and process the following types of data:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Device identifiers (such as Advertising ID)</li>
            <li>IP address and approximate location</li>
            <li>App usage and interaction data</li>
            <li>Ad interaction data (impressions, clicks)</li>
          </ul>
          <p>
            This data may be used to serve personalized or non-personalized ads, measure ad
            performance, and prevent fraud. For more information about how Google collects
            and uses data, please visit{" "}
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
            (Android Settings, then Google, then Ads), or at{" "}
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

        <Section title="7. Children's Privacy">
          <p>
            FUN MATH is intended for a general audience aged 13 and above, consistent with
            our target audience declaration on Google Play. We do not knowingly collect
            personal information from children under 13. If you are a parent or guardian and
            believe a child under 13 has provided us with information, please contact us at
            the email below so we can take appropriate action, including deletion of that
            information.
          </p>
        </Section>

        <Section title="8. Data Sharing">
          <p>
            We do not sell your personal information. Data may be shared with third-party
            service providers (Google AdMob, Firebase, including Firebase AI Logic) solely
            for the purpose of providing app functionality, the Global Leaderboard, the AI
            Brain Coach feature, and advertising as described above.
          </p>
        </Section>

        <Section title="9. Your Choices">
          <p>
            You may clear your local high scores and Local Leaderboard at any time using the
            in-app &quot;Reset&quot; options. You may opt out of personalized advertising
            through your device settings, or uninstall the app at any time to stop all data
            collection associated with it.
          </p>
          <p>
            If you are located in the European Economic Area (EEA), United Kingdom, or
            Switzerland, you may have additional rights under applicable data protection law,
            including the right to request access to, correction of, or deletion of your
            data. Since we only store a nickname and score for the Global Leaderboard, you
            may exercise these rights by contacting us at the email below.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on
            this page with an updated revision date.
          </p>
        </Section>

        <Section title="11. Contact Us">
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