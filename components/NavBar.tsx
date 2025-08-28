import Link from "next/link";
import Image from "next/image";

const BBX_ICON = process.env.BBX_ICON || "https://pmlvtovpbfpbrjaexvqh.supabase.co/storage/v1/object/public/Public/brickbox_icon.png";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-bbxDark">
      <div className="flex items-center gap-3">
        <Image src={BBX_ICON} alt="BBX" width={40} height={40} />
        <span className="font-bold text-lg">BrickBox</span>
      </div>
      <ul className="flex gap-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/token">Token</Link></li>
        <li><Link href="/products">Store</Link></li>
        <li><Link href="/pricing">Pricing</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/legal/terms">Terms</Link></li>
        <li><Link href="/legal/privacy">Privacy</Link></li>
      </ul>
    </nav>
  );
}
