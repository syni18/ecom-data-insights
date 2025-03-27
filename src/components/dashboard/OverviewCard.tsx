
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  iconColor?: string;
  className?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  iconColor = "text-primary",
  className,
}) => {
  return (
    <Card className={cn("hover-scale card-transition", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {trend && (
              <div className="flex items-center mt-1">
                <span className={cn(
                  "text-xs font-medium",
                  trend.positive ? "text-green-600" : "text-red-600"
                )}>
                  {trend.positive ? "+" : ""}{trend.value}
                </span>
                {description && (
                  <span className="text-xs text-muted-foreground ml-1">
                    {description}
                  </span>
                )}
              </div>
            )}
            
            {!trend && description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          <div className={cn(
            "h-12 w-12 rounded-lg flex items-center justify-center bg-opacity-15",
            iconColor.startsWith("text-") ? iconColor.replace("text", "bg") + "/15" : "bg-primary/15"
          )}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
