import { COLORS } from '@/constants/colors';
import { useTheme } from '@/hooks/useTheme';
import React, { useState, ComponentType } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

interface WithLoaderProps {
    setLoading?: (loading: boolean) => void;
}

// Higher Order Component (HOC) for adding a loader to screens
const BoxComponent = <P extends object>(
    WrappedComponent: ComponentType<P & WithLoaderProps>
): React.FC<P> => {
    return (props: P) => {
          const { theme, handleTheme } = useTheme()
        // const [loading, setLoading] = useState(false);

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
                <WrappedComponent {...props} />
            </SafeAreaView>
        );
    };
};

export default BoxComponent;
