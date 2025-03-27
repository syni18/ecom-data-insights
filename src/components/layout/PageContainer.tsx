
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
      <Navbar />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className={cn(
        "min-h-[calc(100vh-64px)] pt-16 transition-all duration-300 ease-in-out",
        collapsed ? "pl-20" : "pl-64"
      )}>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageContainer;
