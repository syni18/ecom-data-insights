
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className={cn(
        "min-h-screen transition-all duration-300 ease-in-out",
        collapsed ? "pl-20" : "pl-64"
      )}>
        <Navbar />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageContainer;
