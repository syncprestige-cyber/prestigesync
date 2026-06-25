export default function PullDownPrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center font-bold text-xl">
              PS
            </div>
            <span className="text-lg font-semibold tracking-tight">PrestigeSync</span>
          </div>
          <a href="/" className="text-sm text-gray-400 hover:text-orange-400 transition">
            ← Kembali
          </a>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-invert">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy - PullDown</h1>
        <p className="text-gray-500 mb-10">Last updated: June 25, 2026</p>

        <p className="text-gray-300 leading-relaxed">
          This Privacy Policy describes how PullDown (&quot;we&quot;, &quot;our&quot;, &quot;the app&quot;)
          collects, uses, and shares information when you use our mobile application.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">1. Information We Collect</h2>
        <p className="text-gray-300 leading-relaxed">
          PullDown does not require account registration and does not directly collect
          personally identifiable information such as your name, email, or phone number.
        </p>
        <p className="text-gray-300 leading-relaxed mt-4">
          However, our app uses third-party services (described below) that may
          automatically collect certain technical and device information to provide
          advertising and app functionality.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Media Download Functionality</h2>
        <p className="text-gray-300 leading-relaxed">
          PullDown allows users to download publicly accessible video, audio, and other
          file content from URLs that the user provides. The app processes the URL
          locally on your device to fetch and save the requested file to your
          device&apos;s storage.
        </p>
        <p className="text-gray-300 leading-relaxed mt-4">
          We do not host, store, or have access to any files you download. All
          downloaded content is saved directly to your device and remains under your
          control. Users are solely responsible for ensuring they have the right to
          download and use any content they access through the app, and for complying
          with the terms of service of the source platforms they download from, as well
          as applicable copyright laws.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Device Storage Permission</h2>
        <p className="text-gray-300 leading-relaxed">
          PullDown requests storage-related permissions solely to save downloaded files
          to your device. These permissions are used only for this purpose and are not
          used to access, scan, or upload any other files on your device.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">4. Advertising (Google AdMob)</h2>
        <p className="text-gray-300 leading-relaxed">
          We use <strong>Google AdMob</strong> to display banner and interstitial
          advertisements within the app. AdMob may collect and process the following
          types of data:
        </p>
        <ul className="text-gray-300 leading-relaxed list-disc pl-6 mt-4 space-y-1">
          <li>Device identifiers (such as Advertising ID)</li>
          <li>IP address and approximate location</li>
          <li>App usage and interaction data</li>
          <li>Ad interaction data (impressions, clicks)</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mt-4">
          This data may be used to serve personalized or non-personalized ads, measure
          ad performance, and prevent fraud. For more information about how Google
          collects and uses data, please visit{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:underline"
          >
            policies.google.com/technologies/partner-sites
          </a>
          .
        </p>
        <p className="text-gray-300 leading-relaxed mt-4">
          You can manage your ad personalization settings via your device&apos;s settings
          (Android Settings, then Google, then Ads).
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Data Storage</h2>
        <p className="text-gray-300 leading-relaxed">
          App preferences and download history are stored locally on your device. We do
          not operate any remote server that stores your personal data or download
          activity.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">6. Children&apos;s Privacy</h2>
        <p className="text-gray-300 leading-relaxed">
          PullDown is not specifically directed at children under 13. We do not
          knowingly collect personal information from children. If you believe a child
          has provided us with personal information, please contact us so we can take
          appropriate action.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">7. Data Sharing</h2>
        <p className="text-gray-300 leading-relaxed">
          We do not sell your personal information. Data may be shared with third-party
          service providers (Google AdMob) solely for the purpose of providing app
          functionality and advertising as described above.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">8. Your Choices</h2>
        <p className="text-gray-300 leading-relaxed">
          You may opt out of personalized advertising through your device settings, or
          uninstall the app at any time to stop all data collection associated with it.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">9. Changes to This Policy</h2>
        <p className="text-gray-300 leading-relaxed">
          We may update this Privacy Policy from time to time. Changes will be posted on
          this page with an updated revision date.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">10. Contact Us</h2>
        <p className="text-gray-300 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          <strong>Email:</strong>{" "}
          <a
            href="mailto:syncprestige@gmail.com"
            className="text-orange-400 hover:underline"
          >
            syncprestige@gmail.com
          </a>
        </p>

        <p className="text-gray-500 mt-16">
          © 2024 - 2026 PrestigeSync. All rights reserved.
        </p>
      </article>
    </main>
  );
}