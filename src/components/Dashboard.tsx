import { useState } from 'react';
import { 
  User, 
  Ship, 
  Calendar, 
  CreditCard, 
  FileText, 
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { NavigationCard } from './NavigationCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

/**
 * Main dashboard component showing overview of all fisher services
 * Displays registration status, active licenses, and quick actions
 */
export const Dashboard = ({ onNavigate }: DashboardProps) => {
  // Mock data - in a real app, this would come from an API
  const [fisherData] = useState({
    profile: {
      name: 'John Maritime',
      id: 'FID-2024-001',
      registrationDate: '2024-01-15',
      status: 'active' as const
    },
    licenses: {
      boat: { status: 'active' as const, expires: '2024-12-31' },
      fishing: { status: 'active' as const, expires: '2024-11-30' },
      seasonal: { status: 'pending' as const, expires: '2024-10-31' }
    },
    stats: {
      totalLicenses: 3,
      activeLicenses: 2,
      pendingApplications: 1
    }
  });

  return (
    <div className="space-y-8">
      {/* Welcome section with quick stats */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {fisherData.profile.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Fisher ID: {fisherData.profile.id}
          </p>
        </div>

        {/* Quick stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {fisherData.stats.activeLicenses}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Licenses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {fisherData.stats.pendingApplications}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {fisherData.stats.totalLicenses}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main navigation sections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Your Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fisher Registration */}
          <NavigationCard
            title="Fisher Registration"
            description="Manage your fisher profile and digital ID"
            icon={User}
            status={fisherData.profile.status}
            onClick={() => onNavigate('registration')}
          >
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Registration Date: {fisherData.profile.registrationDate}
              </p>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                Verified Profile
              </Badge>
            </div>
          </NavigationCard>

          {/* Digital ID Card */}
          <NavigationCard
            title="Digital ID Card"
            description="View and download your official fisher ID"
            icon={CreditCard}
            status="active"
            onClick={() => onNavigate('id-card')}
          >
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Valid until: December 2024
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                View Digital ID
              </Button>
            </div>
          </NavigationCard>

          {/* Boat Licensing */}
          <NavigationCard
            title="Boat Licensing"
            description="Register and manage your fishing vessels"
            icon={Ship}
            status={fisherData.licenses.boat.status}
            onClick={() => onNavigate('boat-licensing')}
          >
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                License expires: {fisherData.licenses.boat.expires}
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View License
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </NavigationCard>

          {/* Seasonal Permits */}
          <NavigationCard
            title="Seasonal Permits"
            description="Apply for and manage seasonal fishing permits"
            icon={Calendar}
            status={fisherData.licenses.seasonal.status}
            onClick={() => onNavigate('seasonal-permits')}
          >
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Current season: Fall 2024
              </p>
              <div className="flex items-center space-x-1 text-amber-600">
                <AlertTriangle className="h-3 w-3" />
                <span className="text-xs">Application under review</span>
              </div>
            </div>
          </NavigationCard>
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline"
            onClick={() => onNavigate('registration')}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
          <Button 
            variant="outline"
            onClick={() => onNavigate('id-card')}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <FileText className="h-4 w-4 mr-2" />
            Download Documents
          </Button>
          <Button 
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <User className="h-4 w-4 mr-2" />
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
};