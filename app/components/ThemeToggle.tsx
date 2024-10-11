// components/ThemeToggle.tsx
'use client';

import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-mui';

const ThemeToggle: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div
      onClick={handleToggle}
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
    >
      {open === true ? <Sun /> : <Moon />}
    </div>
  );
};

export default ThemeToggle;
