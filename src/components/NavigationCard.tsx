import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface NavigationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  status?: 'active' | 'pending' | 'expired' | 'none';
  children?: ReactNode;
}

/**
 * Reusable navigation card component for dashboard sections
 * Features hover effects, status indicators, and smooth transitions
 */
export const NavigationCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  status = 'none',
  children
}: NavigationCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'text-emerald-600 bg-emerald-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'expired':
        return 'Expired';
      default:
        return '';
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 border-border/50"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-ocean rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </div>
          </div>
          
          {status !== 'none' && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          )}
        </div>
      </CardHeader>
      
      {children && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
};