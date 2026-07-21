export const metadata = {
  title: "Privacy Policy - Prestige POS",
  description: "Privacy Policy for the Prestige POS mobile app",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Simple Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#C8A24A] to-[#E5C158] rounded-xl flex items-center justify-center font-bold text-xl text-black">
              PS
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">Prestige POS</span>
          </a>
          <a href="/" className="px-5 py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white/5 transition text-gray-300">
            &larr; Kembali
          </a>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-bold mb-2 text-[#C8A24A]">Privacy Policy - Prestige POS</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: July 20, 2026</p>

        <p className="text-gray-300 leading-relaxed mb-8">
          This Privacy Policy describes how Prestige POS (&quot;we&quot;, &quot;our&quot;, &quot;the app&quot;) collects,
          uses, and shares information when you use our mobile application. Prestige POS is an offline-first cashier
          (Point of Sale) app designed to safeguard your business operational data.
        </p>

        <Section title="1. Offline-First & Data Storage">
          <p>
            Prestige POS is engineered as an offline-first cash register application. All your product catalogs, cost prices,
            selling prices, transaction records, customer names, and notes are saved strictly on your device&apos;s internal
            storage using an optimized SQLite database (via Room persistence library).
          </p>
          <p>
            We do not run external cloud servers to collect, upload, or inspect your business operations. Your data remains
            100% owned, stored, and managed by you.
          </p>
        </Section>

        <Section title="2. Device Permissions">
          <p>
            To deliver full retail and cashier capabilities, Prestige POS requests the following Android system permissions.
            These operations are processed strictly on-device:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>
              <strong className="text-white">Camera:</strong> Used exclusively when you trigger the built-in barcode scanner
              tool to quickly search or check out inventory items.
            </li>
            <li>
              <strong className="text-white">Storage & Media:</strong> Required to export database files (CSV / JSON backups),
              write high-resolution digital invoice receipts to your gallery, or load a custom store logo to display in the header.
            </li>
            <li>
              <strong className="text-white">Internet & Network State:</strong> Used only when you trigger external actions
              such as sharing a digital receipt image directly to WhatsApp, email, or other communication apps, or when retrieving
              advertisements.
            </li>
          </ul>
        </Section>

        <Section title="3. Feature Processing Matrix">
          <p className="mb-4">
            The table below shows whether your data is processed locally on your device or requires cloud servers:
          </p>
          <div className="overflow-x-auto border border-white/10 rounded-xl bg-white/5 mb-6">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-gray-300">
                  <th className="p-4 font-semibold">Feature / Service</th>
                  <th className="p-4 font-semibold">Local (On-Device)</th>
                  <th className="p-4 font-semibold">Cloud Server</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-400">
                <tr>
                  <td className="p-4 text-white">Cashier & Product Management</td>
                  <td className="p-4 text-green-400">&nbsp;Yes</td>
                  <td className="p-4 text-red-400">&nbsp;No</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">Camera Barcode Scanner</td>
                  <td className="p-4 text-green-400">&nbsp;Yes</td>
                  <td className="p-4 text-red-400">&nbsp;No</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">Receipt Theme Customization</td>
                  <td className="p-4 text-green-400">&nbsp;Yes</td>
                  <td className="p-4 text-red-400">&nbsp;No</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">Sales Analytics & Charts (Vico)</td>
                  <td className="p-4 text-green-400">&nbsp;Yes</td>
                  <td className="p-4 text-red-400">&nbsp;No</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">Local Database Storage (Room)</td>
                  <td className="p-4 text-green-400">&nbsp;Yes</td>
                  <td className="p-4 text-red-400">&nbsp;No</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">Ad Service (Google AdMob)</td>
                  <td className="p-4 text-red-400">&nbsp;No</td>
                  <td className="p-4 text-green-400">&nbsp;Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="4. Advertising (Google AdMob)">
          <p>
            We use <strong className="text-white">Google AdMob</strong> to display banner, interstitial, and rewarded
            advertisements within the app to support its continuous development and keep it free to use. AdMob may collect and
            process the following types of data:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Device identifiers (such as Google Advertising ID)</li>
            <li>IP address and approximate location</li>
            <li>App usage and interaction data</li>
            <li>Ad interaction data (impressions, clicks)</li>
          </ul>
          <p>
            This data is processed externally by Google according to Google&apos;s Partner Privacy Policy. You can manage
            your ad personalization settings or reset your Advertising ID via your device&apos;s settings (Android Settings &gt; Google &gt; Ads).
          </p>
          <p>
            For more information, please visit{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8A24A] hover:text-[#E5C158] underline"
            >
              policies.google.com/technologies/partner-sites
            </a>
            .
          </p>
        </Section>

        <Section title="5. Physical Device Security">
          <p>
            Since all business records are stored locally, data safety is heavily dependent on the physical security and screen
            lock system of your mobile device.
          </p>
          <p>
            If you lose your device or perform a factory reset without exporting a database backup (CSV/JSON), your sales and
            inventory records cannot be recovered by us. We strongly advise you to utilize the Excel/JSON backup tools regularly
            and store them in a secure personal location (e.g., your personal email).
          </p>
        </Section>

        <Section title="6. Children's Privacy">
          <p>
            Prestige POS is a business productivity utility and is not directed at children under the age of 13. We do not
            knowingly collect or maintain personal information from children.
          </p>
        </Section>

        <Section title="7. Third-Party Integrations">
          <p>
            When you click the share button to send digital invoice receipts to external tools (such as WhatsApp or Gmail),
            the formatted receipt text and image are passed via the standard Android Share Sheet. Any data transmitted to and
            processed by these apps is governed strictly by their respective third-party privacy policies.
          </p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p>
            If you have any questions, suggestions, or feedback regarding your data privacy in Prestige POS, please contact us at:
            <br />
            <strong className="text-white">Email:</strong>{" "}
            <a
              href="mailto:syncprestige@gmail.com"
              className="text-[#C8A24A] hover:text-[#E5C158] underline"
            >
              syncprestige@gmail.com
            </a>
          </p>
        </Section>
      </article>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-500">
        <p>&copy; 2024 - {new Date().getFullYear()} Prestige POS. All rights reserved.</p>
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
