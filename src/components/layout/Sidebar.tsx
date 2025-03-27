
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/orders', label: 'Orders', icon: ShoppingCart, highlight: true },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/customers', label: 'Customers', icon: Users },
  ];
  
  const bottomNavItems = [
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/help', label: 'Help', icon: HelpCircle },
  ];
  
  const handleNavClick = (path: string, label: string) => {
    if (path === '/customers') {
      toast.info("Customers section is coming soon!");
      return true; // Prevent default navigation
    }
    return false;
  };
  
  const handleBottomNavClick = (path: string, label: string) => {
    if (path === '/settings' || path === '/help') {
      toast.info(`${label} section is coming soon!`);
    }
  };

  return (
    <aside className={cn(
      "h-[calc(100vh-64px)] border-r bg-card flex flex-col fixed left-0 top-16 z-30 transition-all duration-300 ease-in-out",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col flex-1 overflow-y-auto py-6">
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={(e) => {
                if (handleNavClick(item.path, item.label)) {
                  e.preventDefault();
                }
              }}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50",
                item.highlight && !isActive ? "text-primary hover:text-primary" : "",
                collapsed && "justify-center py-3"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed && "h-6 w-6")} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto">
          <nav className="flex flex-col gap-2 px-4">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  if (item.path === '/settings' || item.path === '/help') {
                    e.preventDefault();
                    handleBottomNavClick(item.path, item.label);
                  }
                }}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                  isActive ? "bg-secondary text-foreground" : "hover:bg-secondary/50",
                  collapsed && "justify-center py-3"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed && "h-6 w-6")} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
            
            {/* Collapse Button moved here */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "mt-2 rounded-lg flex items-center gap-3 px-3 py-2 w-full",
                collapsed && "justify-center"
              )}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight size={18} /> : (
                <>
                  <ChevronLeft size={18} />
                  <span>Collapse</span>
                </>
              )}
            </Button>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
