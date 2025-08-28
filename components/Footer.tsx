export default function Footer() {
  return (
    <footer className="py-6 text-center border-t border-bbxRed">
      <p>&copy; {new Date().getFullYear()} BrickBox. All rights reserved.</p>
      <div className="mt-2 text-sm opacity-80 space-x-4">
        <a href="/legal/terms">Terms</a>
        <a href="/legal/privacy">Privacy</a>
      </div>
    </footer>
  );
}
