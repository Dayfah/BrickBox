const TOKEN_LOGO = 'https://pmlvtovpbfpbrjaexvqh.supabase.co/storage/v1/object/public/Public/brickbox_token.png';

export default function TokenPage(){
  return (
    <div className="card">
      <h2>BRICK Token (Coming Soon)</h2>
      <p>We’ll use this token to unlock community perks inside BrickBox.</p>
      <div style={{display:'flex', gap:16, alignItems:'center', marginTop:12}}>
        <img className="token-logo" src={TOKEN_LOGO} alt="BRICK logo"/>
        <div>
          <div className="small">Logo hosted on Supabase Storage</div>
          <div className="small">Mint address: <code>{process.env.NEXT_PUBLIC_BRICK_TOKEN_MINT || '(set later)'}</code></div>
        </div>
      </div>
      <hr/>
      <ol>
        <li>Mint token on Solana (Devnet first), get the <b>mint address</b>.</li>
        <li>Paste it as <code>NEXT_PUBLIC_BRICK_TOKEN_MINT</code> in your Vercel env.</li>
        <li>Flip on token-gated perks in the app.</li>
      </ol>
    </div>
  );
}
