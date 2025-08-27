import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Connection } from "@solana/web3.js";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const {
  RPC_URL = "https://api.mainnet-beta.solana.com",
  MINT_ADDRESS,
  TREASURY_ADDRESS,
  MIN_BBX = "25",
  DECIMALS = "9",
  PORT = "8787",
  SUPABASE_URL,
  SUPABASE_ANON_KEY
} = process.env;

if (!MINT_ADDRESS || !TREASURY_ADDRESS) {
  console.error("Set MINT_ADDRESS and TREASURY_ADDRESS in .env");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const conn = new Connection(RPC_URL, "confirmed");
const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const toUnits = (nStr) => BigInt(nStr);
const pow10 = (n) => BigInt(10) ** BigInt(n);
const minAmountUnits = BigInt(MIN_BBX) * pow10(Number(DECIMALS));

function amtForOwner(list = [], mint, owner) {
  const row = list.find(
    (b) => b.mint === mint && (b.owner || "").toLowerCase() === owner.toLowerCase()
  );
  if (!row) return 0n;
  // amount is a string in base units (no decimals)
  return toUnits(row.uiTokenAmount.amount);
}

function deltaToTreasury(meta, mint, owner) {
  const pre = amtForOwner(meta?.preTokenBalances, mint, owner);
  const post = amtForOwner(meta?.postTokenBalances, mint, owner);
  return post - pre; // positive if treasury received tokens
}

app.post("/claim", async (req, res) => {
  try {
    const { wallet, signature, link } = req.body || {};
    if (!signature || !link) return res.status(400).json({ ok: false, reason: "missing-fields" });

    const tx = await conn.getParsedTransaction(signature, { maxSupportedTransactionVersion: 0 });
    if (!tx || !tx.meta) return res.status(400).json({ ok: false, reason: "tx-not-found-or-unparsed" });

    const got = deltaToTreasury(tx.meta, MINT_ADDRESS, TREASURY_ADDRESS);
    const ok = got >= minAmountUnits;

    // optional: store in Supabase
    if (supabase) {
      await supabase.from("boost_claims").insert({
        wallet: wallet || null,
        signature,
        content_url: link,
        amount_units: got.toString(),
        valid: ok
      });
    }

    if (!ok) {
      return res.status(400).json({
        ok: false,
        reason: "insufficient-or-wrong-mint",
        received_units: got.toString(),
        required_units: minAmountUnits.toString()
      });
    }

    return res.json({ ok: true, received_units: got.toString() });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, reason: "server-error" });
  }
});

app.listen(Number(PORT), () => {
  console.log(`BBX boost portal running on http://localhost:${PORT}`);
});
