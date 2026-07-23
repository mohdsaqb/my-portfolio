import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-6">
      <p className="font-display text-7xl font-bold text-gradient">404</p>
      <p className="text-gray-400">This page doesn't exist.</p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </section>
  );
}
