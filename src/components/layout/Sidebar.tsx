
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

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/customers', label: 'Customers', icon: Users },
  ];
  
  const bottomNavItems = [
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <aside className={cn(
      "h-screen border-r bg-card flex flex-col fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-end h-16 px-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto py-6">
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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
        </nav>
        
        <div className="mt-auto">
          <nav className="flex flex-col gap-2 px-4">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
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
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
