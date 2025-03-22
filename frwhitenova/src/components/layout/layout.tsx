import { ReactNode } from "react";
import { Header } from "./header";
import logo from "../../assets/logo.png";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return ( 
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Header />
      <main className="flex-1 py-10 px-4 flex justify-center">
        {children}
      </main>
      <footer className="p-4 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-text-secondary text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img
              src={logo}
              alt="logo"
              className="h-6 w-6"
            />
            <span>© 2025 WhiteNova</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-text-primary">Terms</a>
            <a href="#" className="hover:text-text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary">Disclaimer</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
