import { ReactNode } from 'react';
import { Waves, Fish, Anchor } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout component that wraps all pages
 * Provides consistent header, navigation, and footer structure
 */
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-coastal">
      {/* Header with marine-themed branding */}
      <header className="bg-card shadow-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Waves className="h-8 w-8 text-primary" />
                <Fish className="h-4 w-4 text-accent absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Fisher ID System
                </h1>
                <p className="text-sm text-muted-foreground">
                  Digital Licensing & Registration
                </p>
              </div>
            </div>
            
            {/* Quick stats or user info can go here */}
            <div className="flex items-center space-x-2">
              <Anchor className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Maritime Authority
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Fisher ID System - Maritime Licensing Authority</p>
            <p className="mt-1">Secure • Digital • Efficient</p>
          </div>
        </div>
      </footer>
    </div>
  );
};