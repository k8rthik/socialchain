import React from 'react';

interface CenteredLayoutProps {
  children: React.ReactNode;
};

// components/CenteredLayout.js
const CenteredLayout = ({ children }: CenteredLayoutProps) => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {children}
    </div>
  );
};

export default CenteredLayout;
