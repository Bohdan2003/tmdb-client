import type { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
