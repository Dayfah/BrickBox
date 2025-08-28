'use client';
import { useEffect, useState } from 'react';

export default function TwitchEmbed() {
  const [parent, setParent] = useState<string | null>(null);

  useEffect(() => {
    setParent(window.location.hostname);
  }, []);

  if (!parent) return null;

  return (
    <iframe
      src={`https://player.twitch.tv/?channel=dayfah&parent=${parent}`}
      height="480"
      width="720"
      allowFullScreen
    ></iframe>
  );
}
