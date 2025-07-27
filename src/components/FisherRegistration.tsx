import { useState } from 'react';
import { ArrowLeft, Upload, Camera, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface FisherRegistrationProps {
  onBack: () => void;
}

/**
 * Fisher registration form component
 * Handles new fisher registration and profile updates
 * Includes photo upload, personal details, and fishing experience information
 */
export const FisherRegistration = ({ onBack }: FisherRegistrationProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  
  // Form state management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    fishingExperience: '',
    specializations: '',
    previousLicenses: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload process
    setPhotoUploaded(true);
    toast({
      title: "Photo uploaded successfully",
      description: "Your profile photo has been uploaded and will be used for your digital ID."
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Registration submitted successfully!",
      description: "Your fisher registration has been submitted for review. You will receive an email within 24 hours."
    });

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
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
          <h1 className="text-3xl font-bold text-foreground">Fisher Registration</h1>
          <p className="text-muted-foreground">Complete your official fisher registration</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photo Upload Section */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-primary" />
              <span>Profile Photo</span>
            </CardTitle>
            <CardDescription>
              Upload a clear, recent photo for your digital fisher ID card
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50">
                {photoUploaded ? (
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Photo uploaded</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload</p>
                  </div>
                )}
              </div>
              <Button 
                type="button"
                variant="outline"
                onClick={handlePhotoUpload}
                disabled={photoUploaded}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {photoUploaded ? 'Photo Uploaded' : 'Upload Photo'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Provide your personal details as they appear on official documents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="border-border/50 focus:border-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
            <CardDescription>
              Your current residential address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
                className="border-border/50 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger className="border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                    <SelectItem value="ma">Massachusetts</SelectItem>
                    <SelectItem value="wa">Washington</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
            <CardDescription>
              Emergency contact information for safety purposes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fishing Experience */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Fishing Experience</CardTitle>
            <CardDescription>
              Tell us about your fishing background and experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fishingExperience">Years of Experience</Label>
              <Select onValueChange={(value) => handleInputChange('fishingExperience', value)}>
                <SelectTrigger className="border-border/50 focus:border-primary">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Less than 1 year</SelectItem>
                  <SelectItem value="intermediate">1-5 years</SelectItem>
                  <SelectItem value="experienced">5-10 years</SelectItem>
                  <SelectItem value="expert">More than 10 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specializations">Fishing Specializations</Label>
              <Textarea
                id="specializations"
                placeholder="e.g., Deep sea fishing, fly fishing, commercial fishing..."
                value={formData.specializations}
                onChange={(e) => handleInputChange('specializations', e.target.value)}
                className="border-border/50 focus:border-primary min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousLicenses">Previous Licenses</Label>
              <Textarea
                id="previousLicenses"
                placeholder="List any previous fishing licenses you've held..."
                value={formData.previousLicenses}
                onChange={(e) => handleInputChange('previousLicenses', e.target.value)}
                className="border-border/50 focus:border-primary min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Section */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="hover:bg-muted transition-colors"
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-ocean hover:opacity-90 transition-opacity px-8"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Registration'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};