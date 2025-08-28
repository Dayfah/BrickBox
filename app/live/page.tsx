"use client";

export default function LivePage() {
  return (
    <section style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Live Streams</h1>
      <p style={{ marginBottom: '24px', maxWidth: '700px' }}>
        Catch me live on your favorite platform! Below you’ll find embedded players for Twitch and Kick. For TikTok, X (Twitter) and Instagram, use the links to open my profile in a new tab.
      </p>
      <div style={{ marginBottom: '32px' }}>
        <h2>Twitch</h2>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            src="https://player.twitch.tv/?channel=dayfah&parent=brickbox.vercel.app"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
      </div>
      <div style={{ marginBottom: '32px' }}>
        <h2>Kick</h2>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            src="https://kick.com/dayfah/embed"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
      </div>
      <div style={{ marginBottom: '32px' }}>
        <h2>Other Platforms</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: '1.8' }}>
          <li><a href="https://www.tiktok.com/@dayfaa" target="_blank" rel="noopener noreferrer">TikTok</a></li>
          <li><a href="https://x.com/Dayfuhh" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
          <li><a href="https://www.instagram.com/dayfah/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
    </section>
  );
}

