import { useState } from 'react';
import { ArrowLeft, Calendar, Fish, MapPin, Plus, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SeasonalPermitsProps {
  onBack: () => void;
}

interface Permit {
  id: string;
  season: string;
  fishType: string;
  area: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'expired' | 'denied';
  applicationDate: string;
  quotaAllowed: number;
  quotaUsed: number;
}

/**
 * Seasonal Permits component for managing fishing season applications
 * Features permit applications, quota tracking, and seasonal restrictions
 */
export const SeasonalPermits = ({ onBack }: SeasonalPermitsProps) => {
  const { toast } = useToast();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock permits data
  const [permits, setPermits] = useState<Permit[]>([
    {
      id: '1',
      season: 'Fall 2024',
      fishType: 'Crab',
      area: 'Coastal Zone A',
      startDate: '2024-09-01',
      endDate: '2024-11-30',
      status: 'active',
      applicationDate: '2024-08-15',
      quotaAllowed: 500,
      quotaUsed: 187
    },
    {
      id: '2',
      season: 'Winter 2024',
      fishType: 'Lobster',
      area: 'Deep Water Zone B',
      startDate: '2024-12-01',
      endDate: '2025-02-28',
      status: 'pending',
      applicationDate: '2024-10-20',
      quotaAllowed: 300,
      quotaUsed: 0
    },
    {
      id: '3',
      season: 'Summer 2024',
      fishType: 'Tuna',
      area: 'Offshore Zone C',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'expired',
      applicationDate: '2024-05-10',
      quotaAllowed: 1000,
      quotaUsed: 856
    }
  ]);

  const [application, setApplication] = useState({
    season: '',
    fishType: '',
    area: '',
    boatId: '',
    quotaRequested: '',
    purpose: '',
    experience: ''
  });

  // Available seasons and fish types (mock data)
  const availableSeasons = [
    { id: 'spring-2025', name: 'Spring 2025', startDate: '2025-03-01', endDate: '2025-05-31' },
    { id: 'summer-2025', name: 'Summer 2025', startDate: '2025-06-01', endDate: '2025-08-31' },
    { id: 'fall-2025', name: 'Fall 2025', startDate: '2025-09-01', endDate: '2025-11-30' }
  ];

  const fishTypes = [
    'Salmon', 'Crab', 'Lobster', 'Tuna', 'Cod', 'Halibut', 'Shrimp', 'Mackerel'
  ];

  const fishingAreas = [
    'Coastal Zone A', 'Coastal Zone B', 'Deep Water Zone A', 'Deep Water Zone B', 
    'Offshore Zone C', 'Protected Waters', 'International Waters'
  ];

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedSeason = availableSeasons.find(s => s.id === application.season);
    const newPermit: Permit = {
      id: Date.now().toString(),
      season: selectedSeason?.name || '',
      fishType: application.fishType,
      area: application.area,
      startDate: selectedSeason?.startDate || '',
      endDate: selectedSeason?.endDate || '',
      status: 'pending',
      applicationDate: new Date().toISOString().split('T')[0],
      quotaAllowed: parseInt(application.quotaRequested),
      quotaUsed: 0
    };

    setPermits(prev => [...prev, newPermit]);
    setApplication({
      season: '',
      fishType: '',
      area: '',
      boatId: '',
      quotaRequested: '',
      purpose: '',
      experience: ''
    });
    setShowApplicationForm(false);
    setIsSubmitting(false);

    toast({
      title: "Application submitted successfully",
      description: "Your seasonal permit application has been submitted for review."
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'expired':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'denied':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'expired':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'denied':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getQuotaPercentage = (used: number, allowed: number) => {
    return Math.round((used / allowed) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Seasonal Permits</h1>
            <p className="text-muted-foreground">Apply for and manage your seasonal fishing permits</p>
          </div>
        </div>
        
        <Button
          onClick={() => setShowApplicationForm(true)}
          className="bg-gradient-ocean hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {permits.length}
                </p>
                <p className="text-sm text-muted-foreground">Total Permits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {permits.filter(p => p.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Active Permits</p>
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
                  {permits.filter(p => p.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Fish className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {permits.reduce((sum, p) => sum + p.quotaUsed, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Quota Used</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Form */}
      {showApplicationForm && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>New Seasonal Permit Application</CardTitle>
            <CardDescription>
              Apply for a new seasonal fishing permit for specific fish types and areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="season">Fishing Season *</Label>
                  <Select onValueChange={(value) => setApplication(prev => ({ ...prev, season: value }))}>
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSeasons.map((season) => (
                        <SelectItem key={season.id} value={season.id}>
                          {season.name} ({new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fishType">Fish Type *</Label>
                  <Select onValueChange={(value) => setApplication(prev => ({ ...prev, fishType: value }))}>
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select fish type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fishTypes.map((fish) => (
                        <SelectItem key={fish} value={fish}>
                          {fish}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Fishing Area *</Label>
                  <Select onValueChange={(value) => setApplication(prev => ({ ...prev, area: value }))}>
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select fishing area" />
                    </SelectTrigger>
                    <SelectContent>
                      {fishingAreas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quotaRequested">Quota Requested (lbs) *</Label>
                  <Input
                    id="quotaRequested"
                    type="number"
                    value={application.quotaRequested}
                    onChange={(e) => setApplication(prev => ({ ...prev, quotaRequested: e.target.value }))}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Application</Label>
                <Textarea
                  id="purpose"
                  placeholder="Describe the purpose and commercial/recreational nature of your fishing activities..."
                  value={application.purpose}
                  onChange={(e) => setApplication(prev => ({ ...prev, purpose: e.target.value }))}
                  className="border-border/50 focus:border-primary min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience</Label>
                <Textarea
                  id="experience"
                  placeholder="Describe your experience with this type of fishing and in the requested area..."
                  value={application.experience}
                  onChange={(e) => setApplication(prev => ({ ...prev, experience: e.target.value }))}
                  className="border-border/50 focus:border-primary min-h-[100px]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowApplicationForm(false)}
                  className="hover:bg-muted transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-ocean hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Permits List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Your Seasonal Permits</h2>
        
        {permits.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No seasonal permits</h3>
              <p className="text-muted-foreground mb-4">
                Apply for your first seasonal permit to start fishing in regulated areas.
              </p>
              <Button
                onClick={() => setShowApplicationForm(true)}
                className="bg-gradient-ocean hover:opacity-90 transition-opacity"
              >
                <Plus className="h-4 w-4 mr-2" />
                Apply for First Permit
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {permits.map((permit) => (
              <Card key={permit.id} className="border-border/50 hover:shadow-elevated transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Fish className="h-5 w-5 text-primary" />
                        <span>{permit.fishType} - {permit.season}</span>
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{permit.area}</span>
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(permit.status)} flex items-center space-x-1`}>
                      {getStatusIcon(permit.status)}
                      <span>{permit.status.charAt(0).toUpperCase() + permit.status.slice(1)}</span>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium">{new Date(permit.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-medium">{new Date(permit.endDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Applied</p>
                      <p className="font-medium">{new Date(permit.applicationDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Quota Used</p>
                      <p className="font-medium">{permit.quotaUsed} / {permit.quotaAllowed} lbs</p>
                    </div>
                  </div>

                  {/* Quota Progress Bar */}
                  {permit.status === 'active' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quota Progress</span>
                        <span className="font-medium">{getQuotaPercentage(permit.quotaUsed, permit.quotaAllowed)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all duration-300"
                          style={{ width: `${getQuotaPercentage(permit.quotaUsed, permit.quotaAllowed)}%` }}
                        />
                      </div>
                      {getQuotaPercentage(permit.quotaUsed, permit.quotaAllowed) > 80 && (
                        <p className="text-xs text-amber-600">
                          Warning: You are approaching your quota limit
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    {permit.status === 'active' && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          Update Quota
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                      </>
                    )}
                    {permit.status === 'pending' && (
                      <Button variant="outline" size="sm" className="flex-1" disabled>
                        Under Review
                      </Button>
                    )}
                    {permit.status === 'expired' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Renew Permit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};