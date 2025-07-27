import { useState } from 'react';
import { ArrowLeft, Download, Share, QrCode, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface DigitalIDCardProps {
  onBack: () => void;
}

/**
 * Digital ID Card component displaying official fisher identification
 * Features QR code verification, download options, and card sharing
 */
export const DigitalIDCard = ({ onBack }: DigitalIDCardProps) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  // Mock fisher data - in real app, this would come from API
  const fisherData = {
    id: 'FID-2024-001',
    name: 'John Maritime',
    photo: '/placeholder.svg', // placeholder profile photo
    dateOfBirth: '1985-06-15',
    issueDate: '2024-01-15',
    expiryDate: '2024-12-31',
    licenseType: 'Commercial Fisher',
    endorsements: ['Deep Sea', 'Coastal Waters', 'Crab Fishing'],
    status: 'Active',
    authority: 'Maritime Licensing Authority'
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "ID Card Downloaded",
      description: "Your digital ID card has been downloaded as a PDF."
    });
    
    setIsDownloading(false);
  };

  const handleShare = () => {
    toast({
      title: "Share Link Copied",
      description: "A verification link has been copied to your clipboard."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
          <h1 className="text-3xl font-bold text-foreground">Digital Fisher ID</h1>
          <p className="text-muted-foreground">Official digital identification card</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Digital ID Card */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Your Digital ID Card</h2>
          
          {/* Main ID Card */}
          <Card className="relative overflow-hidden bg-gradient-ocean text-white border-none shadow-elevated">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0">
                {/* Decorative dots pattern */}
                <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="white" fillOpacity="0.1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>
            </div>
            
            <CardContent className="p-6 relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold">FISHER ID CARD</h3>
                  <p className="text-sm opacity-90">{fisherData.authority}</p>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  {fisherData.status.toUpperCase()}
                </Badge>
              </div>

              {/* Profile Section */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
                  <User className="h-10 w-10 text-white/70" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-1">{fisherData.name}</h4>
                  <p className="text-sm opacity-90 mb-2">ID: {fisherData.id}</p>
                  <p className="text-sm opacity-90">{fisherData.licenseType}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="opacity-70">Date of Birth</p>
                  <p className="font-medium">{new Date(fisherData.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="opacity-70">Issue Date</p>
                  <p className="font-medium">{new Date(fisherData.issueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="opacity-70">Expires</p>
                  <p className="font-medium">{new Date(fisherData.expiryDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="opacity-70">Endorsements</p>
                  <p className="font-medium">{fisherData.endorsements.length}</p>
                </div>
              </div>

              {/* QR Code placeholder */}
              <div className="flex justify-end mt-6">
                <div className="w-16 h-16 bg-white/20 rounded border border-white/30 flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-white/70" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 bg-primary hover:bg-primary/90 transition-colors"
            >
              {isDownloading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Downloading...</span>
                </div>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Card Details and Information */}
        <div className="space-y-6">
          {/* License Details */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">License Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fisher ID</span>
                  <span className="font-medium">{fisherData.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">License Type</span>
                  <span className="font-medium">{fisherData.licenseType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-emerald-50 text-emerald-700">
                    {fisherData.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Issued By</span>
                  <span className="font-medium text-sm">{fisherData.authority}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endorsements */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Endorsements</h3>
              <div className="space-y-2">
                {fisherData.endorsements.map((endorsement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-sm font-medium">{endorsement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Validity Information */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Validity Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Valid Until</p>
                    <p className="font-medium">{new Date(fisherData.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Your license expires in {Math.ceil((new Date(fisherData.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days. 
                    Remember to renew before expiration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Verification */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Verification</h3>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-muted/50 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    Show this QR code to verify your identity and license status with authorities.
                  </p>
                  <Button variant="outline" size="sm">
                    Generate New QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};