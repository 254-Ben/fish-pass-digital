import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { FisherRegistration } from '@/components/FisherRegistration';
import { DigitalIDCard } from '@/components/DigitalIDCard';
import { BoatLicensing } from '@/components/BoatLicensing';
import { SeasonalPermits } from '@/components/SeasonalPermits';

/**
 * Main Index page component for the Fisher ID and Licensing System
 * Manages navigation between different sections of the application
 */
const Index = () => {
  const [currentSection, setCurrentSection] = useState<string>('dashboard');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleBackToDashboard = () => {
    setCurrentSection('dashboard');
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'registration':
        return <FisherRegistration onBack={handleBackToDashboard} />;
      case 'id-card':
        return <DigitalIDCard onBack={handleBackToDashboard} />;
      case 'boat-licensing':
        return <BoatLicensing onBack={handleBackToDashboard} />;
      case 'seasonal-permits':
        return <SeasonalPermits onBack={handleBackToDashboard} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout>
      {renderCurrentSection()}
    </Layout>
  );
};

export default Index;
