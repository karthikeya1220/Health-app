import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { LightTheme, DarkTheme, Theme, pastelThemes } from '@/theme/colors';

type ThemeMode = 'light' | 'dark' | 'system';
type PastelTheme = 'default' | 'softEnergy' | 'calmZenPop' | 'retroFresh' | 'sportyMinimal';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  pastelTheme: PastelTheme;
  colors: Theme;
  setThemeMode: (mode: ThemeMode) => void;
  setPastelTheme: (theme: PastelTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [pastelTheme, setPastelTheme] = useState<PastelTheme>('default');
  const [systemTheme, setSystemTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const getActiveTheme = (): 'light' | 'dark' => {
    if (themeMode === 'system') {
      return systemTheme === 'dark' ? 'dark' : 'light';
    }
    return themeMode;
  };

  const getColors = (): Theme => {
    const activeTheme = getActiveTheme();
    
    if (pastelTheme === 'default') {
      return activeTheme === 'dark' ? DarkTheme : LightTheme;
    }
    
    return pastelThemes[pastelTheme][activeTheme] as Theme;
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: getActiveTheme(),
        themeMode,
        pastelTheme,
        colors: getColors(),
        setThemeMode,
        setPastelTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};