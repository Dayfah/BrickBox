const MINT = process.env.NEXT_PUBLIC_BBX_MINT;
const LOGO_URL = process.env.NEXT_PUBLIC_BBX_LOGO_URL;

export default function BBXTokenPage() {
  return (
    <section style={{padding:"20px"}}>
      <h1 style={{fontSize:"32px", marginBottom:"4px"}}>BBX — BrickBox Token</h1>
      <p style={{opacity:.85, marginBottom:"16px"}}>
        Utility token for the BrickBox ecosystem.
      </p>

      {LOGO_URL && (
        <img
          src={LOGO_URL}
          alt="BBX"
          style={{height:"80px", width:"80px", borderRadius:"12px", marginBottom:"16px"}}
        />
      )}

      <h3 style={{marginTop:"8px"}}>Mint Address</h3>
      <code style={{display:"block", wordBreak:"break-all"}}>
        {MINT ?? "Set NEXT_PUBLIC_BBX_MINT in Vercel → Settings → Environment Variables"}
      </code>

      {MINT && (
        <p style={{marginTop:"12px"}}>
          <a href={`https://solscan.io/token/${MINT}`} target="_blank">
            View on Solscan ↗
          </a>
        </p>
      )}

      <h3 style={{marginTop:"24px"}}>Add BBX in Phantom</h3>
      <ol>
        <li>Open Phantom → Tokens → Add / Manage → Add custom token</li>
        <li>Paste the Mint Address above → Save</li>
      </ol>
    </section>
  );
}
