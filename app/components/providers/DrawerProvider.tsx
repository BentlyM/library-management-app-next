import React, { createContext, useContext, useState } from 'react';

interface DrawerContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  drawerWidth: number;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;  // Define your drawer width, adjust as needed

  return (
    <DrawerContext.Provider value={{ open, setOpen, drawerWidth }}>
      {children}
    </DrawerContext.Provider>
  );
};

// Custom hook to use the DrawerContext
export const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
