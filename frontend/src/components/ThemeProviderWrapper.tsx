import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="default">
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;