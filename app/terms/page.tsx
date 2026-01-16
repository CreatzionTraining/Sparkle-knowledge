import { Navbar } from '../../components/Navbar';
import { TermsAndConditions } from '../../components/TermsAndConditions';
import { Footer } from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <TermsAndConditions />
      <Footer />
    </div>
  );
}
