import TwitchEmbed from '@/components/TwitchEmbed';

export const metadata = {
  title: 'Live',
  description: 'Watch the live Twitch stream',
};

export default function LivePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Live on Twitch</h1>
      <TwitchEmbed />
    </main>
  );
}
