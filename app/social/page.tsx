export const metadata = {
  title: 'Social Links',
  description: 'Find BrickBox across the web.',
};

export default function SocialPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Connect with BrickBox</h1>
      <ul>
        <li>
          <a
            href="https://x.com/dayfuhh?s=21"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://m.twitch.tv/dayfah/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitch
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@dayfaa?_t=ZP-8zDjhuOz98p&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
        </li>
      </ul>
    </main>
  );
}
