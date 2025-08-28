import { PostComposer } from '../components/PostComposer';
import { PostFeed } from '../components/PostFeed';

export default function HomePage() {
  return (
    <div className="grid two">
      <div>
        <header className="hero">
          <h1>BrickBox</h1>
          <p className="small">Share hauls, track runs, flex variants. Built for collectors.</p>
        </header>
        <PostComposer />
        <PostFeed />
      </div>
      <div>
        <div className="card">
          <h3>Your perks</h3>
          <ul>
            <li>Free: post & track your collection</li>
            <li>Pro: bigger uploads, early features</li>
            <li>BRICK holders: community-only drops (soon)</li>
          </ul>
        </div>
        <div className="card" style={{marginTop:16}}>
          <h3>Shop</h3>
          <p className="small">Support the project with merch.</p>
          <a className="btn" href="/shop">Open Store</a>
        </div>
      </div>
    </div>
  );
}
