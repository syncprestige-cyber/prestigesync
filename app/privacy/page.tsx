export const metadata = {
  title: "Privacy Policy - Math Rush",
  description: "Privacy Policy for the Math Rush mobile app",
};

export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        maxWidth: "760px",
        margin: "40px auto",
        padding: "0 20px",
        lineHeight: 1.6,
        color: "#222",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "28px" }}>Privacy Policy - Math Rush</h1>
      <p style={{ color: "#666", fontSize: "14px" }}>Last updated: June 19, 2026</p>

      <p>This Privacy Policy describes how Math Rush ("we", "our", "the app") collects, uses, and shares information when you use our mobile application.</p>

      <h2 style={{ fontSize: "20px", marginTop: "32px" }}>1. Information We Collect</h2>
      <p>Math Rush itself does not require account registration and does not directly collect personally identifiable information such as your name, email, or phone number.</p>
      <p>However, our app uses third-party services (described below) that may automatically collect certain technical and device information to provide advertising and app functionality.</p>

      <h2 style={{ fontSize: "20px", marginTop: "32px" }}>2. Advertising (Google AdMob)</h2>
      <p>We use <strong>Google AdMob</strong> to display banner, interstitial, and rewarded advertisements within the app. AdMob may collect and process the following types of data:</p>
      <ul>
        <li>Device identifiers (such as Advertising ID)</li>
        <li>IP address and approximate location</li>
        <li>App usage and interaction data</li>
        <li>Ad interaction data (impressions, clicks)</li>
      </ul>
      <p>This data may be used to serve personalized or non-personalized ads, measure ad performance, and prevent fraud. For more information about how Google collects and uses data, please visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.</p>
      <p>You can manage your ad personalization settings via your device's settings (Android Settings, then Google, then Ads).</p>

      <h2 style={{ fontSize: "20px", marginTop: "32px" }}>3. Data Storage</h2>
      <p>Game progress, scores, and preferences may be stored locally on your device using local storage. We may also use Supabase to store leaderboard scores (such as nickname/country and score), which are not linked to your real identity.</p>

      <h2 style={{ fontSize: "20px", marginTop: "32px" }}>4. Children's Privacy</h2>
      <p>Math Rush is not specifically directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.</p>

      <h2 style={{ fontSize: "20px", marginTop: "32px" }}>5. Data Sharing</h2>
      <p>We do not sell your personal information. Data may be shared with third-party service providers (Google AdMob, Supabase) solely for the purpose of providing app functionality and advertising as described above.</p>

      <h2 style={{ fontSize: "20px", marginTop: "32px" }}>6. Your Choices</h2>
      <p>You may opt out of personalized advertising through your device settings, or uninstall the app at any time to stop all data collection associated with it.</p>

      <h2 style={{ fontSize: "20px", marginTop: "32px" }}>7. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>

      <h2 style={{ fontSize: "20px", marginTop: "32px" }}>8. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:<br /><strong>Email:</strong> syncprestige@gmail.com</p>
    </main>
  );
}
