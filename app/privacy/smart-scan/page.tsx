export const metadata = {
  title: "Privacy Policy - Smart Scan AI",
  description: "Privacy Policy for the Smart Scan AI mobile app",
};

export default function SmartScanAIPrivacyPolicy() {
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
        <h1 className="text-4xl font-bold mb-2">Privacy Policy - Smart Scan AI</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: July 14, 2026</p>

        <p className="text-gray-300 leading-relaxed mb-8">
          This Privacy Policy describes how Smart Scan AI (&quot;we&quot;, &quot;our&quot;, &quot;the
          app&quot;) collects, uses, and shares information when you use our mobile application.
          Smart Scan AI is offered in multiple versions with different feature sets. Some
          sections of this Policy apply only if the corresponding feature is available and
          enabled in the version of the app you are using; those sections are marked
          accordingly.
        </p>

        <Section title="1. Introduction">
          <p>
            Smart Scan AI is a document and image scanning application that has evolved
            across several releases: version 1.0 (offline scanning), version 1.5 (PDF
            tools), version 2.0 (cloud backup and optional login), and version 3.0 (AI
            features and collaboration). This single Privacy Policy is designed to cover all
            of these versions. If a feature described below is not present in the version of
            the app installed on your device, the related data practices do not apply to
            you.
          </p>
          <p>
            <strong className="text-white">Smart Scan AI is designed as an offline-first
            application.</strong> Most scanning, OCR, PDF creation, QR scanning, and barcode
            scanning features work entirely on your device without requiring an internet
            connection. Internet access is only required when you choose to use optional
            cloud services, AI-powered features, advertisements, or analytics.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>
            The categories of information we collect depend on which features you use:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>
              <strong className="text-white">Offline use (v1.0+):</strong> No account or
              personal information is required. Scanned documents and images are processed
              and stored locally on your device.
            </li>
            <li>
              <strong className="text-white">Cloud &amp; optional login (v2.0+):</strong> If
              you choose to create an account or sign in, we may collect an email address or
              other identifier provided by your chosen sign-in method, along with the files
              and file metadata you choose to back up to the cloud.
            </li>
            <li>
              <strong className="text-white">AI features (v3.0+):</strong> If you use AI-powered
              features, the content of the specific document or scan you submit is sent to
              our AI processing provider solely to generate the requested output (e.g. a
              summary or extracted text).
            </li>
          </ul>
        </Section>

        <Section title="3. Android Permissions">
          <p>
            Depending on the features you use, the app may request the following device
            permissions:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Camera — to scan documents, QR codes, and barcodes</li>
            <li>Storage / Photos and Media — to save and access scanned files and PDFs</li>
            <li>Internet / Network State — to enable cloud backup, AI features, and ads</li>
          </ul>
          <p>
            You may deny or revoke these permissions at any time through your device
            settings; doing so may limit the availability of certain features.
          </p>
        </Section>

        <Section title="4. Local Storage">
          <p>
            Scans, generated PDFs, and app preferences are stored locally on your device by
            default. This local data is removed if you clear the app&apos;s data or
            uninstall Smart Scan AI, and is not transmitted to our servers unless you
            actively choose to use Cloud Backup (v2.0+) or an AI feature that requires
            processing (v3.0+).
          </p>
        </Section>

        <Section title="5. Camera Usage">
          <p>
            The app uses your device&apos;s camera to capture images of documents, QR codes,
            and barcodes for scanning purposes. Captured images are processed on your device
            (and, where applicable, by the features described below) and are not accessed by
            us except as necessary to provide the feature you have chosen to use.
          </p>
        </Section>

        <Section title="6. OCR Processing">
          <p>
            By default, Optical Character Recognition (OCR) is performed on-device using
            Google ML Kit whenever supported by your device, so scanned text generally never
            leaves your phone. For certain advanced recognition scenarios not supported
            on-device, the scanned image may be sent to a processing service solely to
            return the extracted text to you. Extracted text is not used for any purpose
            other than providing this feature to you.
          </p>
        </Section>

        <Section title="7. QR Scanner">
          <p>
            The QR Scanner feature reads QR codes using your device&apos;s camera. Decoded
            content is displayed to you and processed locally; it is not stored on our
            servers unless you separately choose to save or sync it via Cloud Backup.
          </p>
        </Section>

        <Section title="8. Barcode Scanner">
          <p>
            The Barcode Scanner feature reads standard barcodes using your device&apos;s
            camera. As with QR scanning, decoded content is processed locally on your device
            and is not transmitted to our servers unless you choose to sync it via Cloud
            Backup.
          </p>
        </Section>

        <Section title="9. QR Generator">
          <p>
            The QR Generator feature creates QR codes from text or data that you enter. This
            input is processed locally on your device to generate the QR code image and is
            not transmitted to our servers.
          </p>
        </Section>

        <Section title="10. PDF Tools">
          <p>
            PDF tools (available from v1.5+) allow you to create, merge, split, compress, or
            convert PDF files from your scans. These operations are performed locally on
            your device. The resulting PDF files are stored locally unless you choose to
            back them up via Cloud Backup.
          </p>
        </Section>

        <Section title="11. Processing Location: Local vs. Cloud">
          <p>
            The table below summarizes, feature by feature, whether your data is processed
            locally on your device or requires cloud processing:
          </p>
          <div className="overflow-x-auto mt-4 mb-2 rounded-lg border border-white/10">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 font-semibold text-white border-b border-white/10">Feature</th>
                  <th className="px-4 py-3 font-semibold text-white border-b border-white/10">Local</th>
                  <th className="px-4 py-3 font-semibold text-white border-b border-white/10">Cloud</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2">Document Scan</td>
                  <td className="px-4 py-2">✅</td>
                  <td className="px-4 py-2">❌</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2">OCR</td>
                  <td className="px-4 py-2">✅</td>
                  <td className="px-4 py-2">Optional</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2">QR Scanner / Generator</td>
                  <td className="px-4 py-2">✅</td>
                  <td className="px-4 py-2">❌</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2">Barcode Scanner</td>
                  <td className="px-4 py-2">✅</td>
                  <td className="px-4 py-2">❌</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2">PDF Tools</td>
                  <td className="px-4 py-2">✅</td>
                  <td className="px-4 py-2">❌</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2">Cloud Backup</td>
                  <td className="px-4 py-2">❌</td>
                  <td className="px-4 py-2">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">AI Summary / AI Features</td>
                  <td className="px-4 py-2">❌</td>
                  <td className="px-4 py-2">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="12. Cloud Backup">
          <p>
            Cloud Backup (available from v2.0+) is an optional feature that, if enabled,
            allows you to back up your scanned documents and PDFs so they can be restored
            across devices. This requires an account or sign-in. Files you back up are
            stored on secure cloud infrastructure and are only accessible to you through
            your account.
          </p>
          <p>
            In addition to file contents, Cloud Backup may store file metadata such as file
            name, file size, created and modified dates, folder structure, and the device
            identifier associated with the backup. This metadata is used solely to organize
            and restore your files correctly. You may disable Cloud Backup or delete your
            backed-up data and its associated metadata at any time from within the app.
          </p>
        </Section>

        <Section title="13. AI Features">
          <p>
            AI-powered features (available from v3.0+), such as document summarization,
            smart text extraction, or collaboration assistance, process the content of the
            specific document or scan you submit in order to generate the requested output.
            We only transmit the minimum information necessary to complete your request.
          </p>
          <p>
            Smart Scan AI may use one or more third-party AI service providers (for example,
            Google Gemini, OpenAI, or Microsoft Azure AI, depending on the version and
            configuration of the app). Data submitted to an AI service is processed
            according to the privacy policy of the specific AI provider used by Smart Scan
            AI at that time. Where collaboration features are used, shared content is only
            accessible to the collaborators you explicitly invite.
          </p>
        </Section>

        <Section title="14. Third-Party Services">
          <p>
            Smart Scan AI may use trusted third-party services to provide certain features,
            including:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Google Play Services</li>
            <li>Google AdMob</li>
            <li>Firebase (Analytics, Crashlytics, AI Logic)</li>
            <li>Google ML Kit</li>
            <li>Google Sign-In</li>
            <li>Google Drive</li>
            <li>Dropbox</li>
            <li>Microsoft OneDrive</li>
          </ul>
          <p>
            Each third-party service operates under its own privacy policy, which governs
            how that provider collects and processes your data when its service is used
            within the app. We encourage you to review the privacy policy of any third-party
            service you choose to connect.
          </p>
        </Section>

        <Section title="15. Ads (Google AdMob)">
          <p>
            We use <strong className="text-white">Google AdMob</strong> to display banner,
            interstitial, native, and rewarded video advertisements within the app to help
            keep it free to use. AdMob may collect and process the following types of data:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Device identifiers (such as Advertising ID)</li>
            <li>IP address and approximate location</li>
            <li>App usage and interaction data</li>
            <li>Ad interaction data (impressions, clicks)</li>
          </ul>
          <p>
            Google may use cookies or similar technologies (such as Advertising ID) to serve
            and measure ads and to help prevent fraud. For more information about how Google
            collects and uses this data, please visit{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              policies.google.com/technologies/partner-sites
            </a>
            . You can manage your ad personalization settings via your device&apos;s
            settings (Android Settings, then Google, then Ads), or at{" "}
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

        <Section title="16. Firebase Analytics &amp; Crashlytics">
          <p>
            We use <strong className="text-white">Firebase Analytics</strong> and{" "}
            <strong className="text-white">Firebase Crashlytics</strong> (Google services) to
            understand how the app is used and to identify and fix crashes or technical
            issues. These services may collect device information, app usage events, and
            crash logs. This information is used solely to improve app stability and
            performance. For more information, please visit{" "}
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

        <Section title="17. Open Source Software">
          <p>
            Smart Scan AI is built using a number of open-source libraries and components,
            which may include CameraX, ML Kit, Coil, Room, and PdfBox, among others. Each
            library is used under the terms of its own open-source license. Use of these
            libraries does not itself result in additional data collection beyond what is
            described elsewhere in this Policy.
          </p>
        </Section>

        <Section title="18. Data Security">
          <p>
            We apply reasonable technical and organizational measures to protect your
            information, including encryption of data in transit for any features that
            communicate with our servers (Cloud Backup, AI Features) and encryption at rest
            for data stored on our cloud infrastructure. However, no method of transmission
            or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="19. Data Retention">
          <p>
            We retain different categories of data for different periods, depending on the
            feature involved:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>
              <strong className="text-white">Local data</strong> (scans, PDFs, preferences):
              retained on your device until you delete it or uninstall the app.
            </li>
            <li>
              <strong className="text-white">Cloud Backup data</strong> (files and metadata):
              retained until you delete it or delete your account.
            </li>
            <li>
              <strong className="text-white">Analytics &amp; crash data</strong>: retained
              according to Firebase&apos;s standard retention policy.
            </li>
            <li>
              <strong className="text-white">AI-processed data</strong>: processed
              temporarily to generate your requested output and is not retained by us beyond
              that purpose, subject to the retention practices of the specific AI provider
              used.
            </li>
          </ul>
        </Section>

        <Section title="20. User Rights">
          <p>
            You may delete locally stored scans and PDFs at any time using the in-app
            deletion options. If you have created an account (v2.0+), you may request
            access to, correction of, or deletion of your account data, including data
            stored via Cloud Backup, by contacting us at the email below or, where
            available, using in-app account deletion options.
          </p>
          <p>
            <strong className="text-white">Delete Account:</strong> Users may request
            deletion of their account and all associated cloud data at any time. Once a
            deletion request is completed, the associated account data and cloud-backed-up
            files are permanently removed from our servers.
          </p>
          <p>
            If you are located in the European Economic Area (EEA), United Kingdom, or
            Switzerland, you may have additional rights under applicable data protection
            law, including the right to data portability and the right to object to certain
            processing. You may exercise these rights by contacting us at the email below.
          </p>
        </Section>

        <Section title="21. Children's Privacy">
          <p>
            Smart Scan AI is intended for a general audience and is not directed at children
            under 13. We do not knowingly collect personal information from children under
            13. If you are a parent or guardian and believe a child under 13 has provided us
            with information, please contact us at the email below so we can take
            appropriate action, including deletion of that information.
          </p>
        </Section>

        <Section title="22. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time, including as new versions
            or features of Smart Scan AI are released. When we do, we will revise the
            &quot;Last updated&quot; date at the top of this page and, where a change
            materially affects a specific feature, update the corresponding section above.
          </p>
        </Section>

        <Section title="23. Contact Information">
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