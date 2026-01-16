import { Navbar } from '../../components/Navbar';
import { PrivacyPolicy } from '../../components/PrivacyPolicy';
import { Footer } from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}
