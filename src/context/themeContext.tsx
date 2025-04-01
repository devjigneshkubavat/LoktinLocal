import { dark, light } from '@/constants/colors';
import { getLocally, setLocally } from '@/utils/helper';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

// Define theme types
export type ThemeType = 'light' | 'dark' | 'auto';
export interface Theme {
    colors: {
        [key: string]: string; // Allows dynamic keys with string values
    };
}


// Theme Context
interface ThemeContextProps {
    theme: Theme;
    handleTheme: (theme: ThemeType) => void;
    themeType: ThemeType
}
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Theme>(light);
    const [themeType, setThemetype] = useState<ThemeType>('auto');

    const getTheme = useCallback(async () => {
        const themename = await getLocally('theme');
        if (themename) {
            setThemetype(themename as ThemeType);
        }
    }, []);

    const handleTheme = useCallback(
        (payload: ThemeType) => {
            setThemetype(payload);
            setLocally('theme', payload)
        },
        [],
    );

    useEffect(() => {
        getTheme();
    }, [getTheme]);

    useEffect(() => {
        if (themeType !== 'auto') return;
        const listener = Appearance.addChangeListener(async ({ colorScheme }) => {
            setTheme(colorScheme == 'dark' ? dark : light);
        });
        return () => listener.remove();
    }, [themeType]);


    useEffect(() => {
        switch (themeType) {
            case 'light':
                setTheme(light);
                break;
            case 'dark':
                setTheme(dark);
                break;
            case 'auto':
                const systemTheme = Appearance.getColorScheme();
                if (systemTheme === 'dark') {
                    setTheme(dark);
                } else {
                    setTheme(light);
                }
                break;
            default:
                setTheme(light);
                break;
        }
    }, [themeType]);
    return (
        <ThemeContext.Provider value={{ theme, handleTheme, themeType }}>
            {children}
        </ThemeContext.Provider>
    );
};