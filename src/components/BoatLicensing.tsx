import { useState } from 'react';
import { ArrowLeft, Ship, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface BoatLicensingProps {
  onBack: () => void;
}

interface Boat {
  id: string;
  name: string;
  registration: string;
  type: string;
  length: number;
  homePort: string;
  licenseStatus: 'active' | 'pending' | 'expired';
  licenseExpiry: string;
  insuranceExpiry: string;
}

/**
 * Boat Licensing component for managing fishing vessel registrations
 * Features boat registration, license management, and renewal tracking
 */
export const BoatLicensing = ({ onBack }: BoatLicensingProps) => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock boats data
  const [boats, setBoats] = useState<Boat[]>([
    {
      id: '1',
      name: 'Sea Wanderer',
      registration: 'FL-9876-AB',
      type: 'Commercial Fishing Vessel',
      length: 42,
      homePort: 'Port Tampa',
      licenseStatus: 'active',
      licenseExpiry: '2024-12-31',
      insuranceExpiry: '2024-11-15'
    },
    {
      id: '2',
      name: 'Ocean Quest',
      registration: 'FL-5432-CD',
      type: 'Charter Boat',
      length: 28,
      homePort: 'Marina Bay',
      licenseStatus: 'pending',
      licenseExpiry: '2024-10-30',
      insuranceExpiry: '2024-12-01'
    }
  ]);

  const [newBoat, setNewBoat] = useState({
    name: '',
    registration: '',
    type: '',
    length: '',
    homePort: '',
    insuranceExpiry: ''
  });

  const handleAddBoat = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const boat: Boat = {
      id: Date.now().toString(),
      name: newBoat.name,
      registration: newBoat.registration,
      type: newBoat.type,
      length: parseInt(newBoat.length),
      homePort: newBoat.homePort,
      licenseStatus: 'pending',
      licenseExpiry: '2025-12-31',
      insuranceExpiry: newBoat.insuranceExpiry
    };

    setBoats(prev => [...prev, boat]);
    setNewBoat({
      name: '',
      registration: '',
      type: '',
      length: '',
      homePort: '',
      insuranceExpiry: ''
    });
    setShowAddForm(false);
    setIsSubmitting(false);

    toast({
      title: "Boat registration submitted",
      description: "Your boat registration has been submitted for approval."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'expired':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
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
            <h1 className="text-3xl font-bold text-foreground">Boat Licensing</h1>
            <p className="text-muted-foreground">Manage your fishing vessel registrations and licenses</p>
          </div>
        </div>
        
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-ocean hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4 mr-2" />
          Register New Boat
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Ship className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {boats.length}
                </p>
                <p className="text-sm text-muted-foreground">Registered Boats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {boats.filter(b => b.licenseStatus === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Active Licenses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {boats.filter(b => getDaysUntilExpiry(b.licenseExpiry) < 30).length}
                </p>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Boat Form */}
      {showAddForm && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Register New Boat</CardTitle>
            <CardDescription>
              Add a new fishing vessel to your license portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddBoat} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="boatName">Boat Name *</Label>
                  <Input
                    id="boatName"
                    value={newBoat.name}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration">Registration Number *</Label>
                  <Input
                    id="registration"
                    value={newBoat.registration}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, registration: e.target.value }))}
                    placeholder="e.g., FL-1234-AB"
                    required
                    className="border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="boatType">Boat Type *</Label>
                  <Select onValueChange={(value) => setNewBoat(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select boat type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial">Commercial Fishing Vessel</SelectItem>
                      <SelectItem value="charter">Charter Boat</SelectItem>
                      <SelectItem value="recreational">Recreational Fishing Boat</SelectItem>
                      <SelectItem value="sport">Sport Fishing Boat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length (feet) *</Label>
                  <Input
                    id="length"
                    type="number"
                    value={newBoat.length}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, length: e.target.value }))}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homePort">Home Port *</Label>
                  <Input
                    id="homePort"
                    value={newBoat.homePort}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, homePort: e.target.value }))}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceExpiry">Insurance Expiry *</Label>
                  <Input
                    id="insuranceExpiry"
                    type="date"
                    value={newBoat.insuranceExpiry}
                    onChange={(e) => setNewBoat(prev => ({ ...prev, insuranceExpiry: e.target.value }))}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
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
                    'Register Boat'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Boats List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Your Registered Boats</h2>
        
        {boats.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="p-8 text-center">
              <Ship className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No boats registered</h3>
              <p className="text-muted-foreground mb-4">
                Register your first fishing vessel to get started with boat licensing.
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-ocean hover:opacity-90 transition-opacity"
              >
                <Plus className="h-4 w-4 mr-2" />
                Register Your First Boat
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {boats.map((boat) => (
              <Card key={boat.id} className="border-border/50 hover:shadow-elevated transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{boat.name}</CardTitle>
                      <CardDescription>{boat.registration}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(boat.licenseStatus)}>
                      {boat.licenseStatus.charAt(0).toUpperCase() + boat.licenseStatus.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{boat.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Length</p>
                      <p className="font-medium">{boat.length} ft</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Home Port</p>
                      <p className="font-medium">{boat.homePort}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">License Expires</p>
                      <p className="font-medium">{new Date(boat.licenseExpiry).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Expiry warnings */}
                  {getDaysUntilExpiry(boat.licenseExpiry) < 30 && (
                    <div className="p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                      License expires in {getDaysUntilExpiry(boat.licenseExpiry)} days
                    </div>
                  )}

                  {getDaysUntilExpiry(boat.insuranceExpiry) < 30 && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                      Insurance expires in {getDaysUntilExpiry(boat.insuranceExpiry)} days
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Renew License
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-3 w-3" />
                    </Button>
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