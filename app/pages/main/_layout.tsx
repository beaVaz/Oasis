import { Tabs, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; 
import TabBar from '../../../components/TabBar'; 
import { ScrollProvider } from '../../../contexts/ScrollContext';

export default function MainTabLayout() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const isFocused = useIsFocused(); 

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setIsAuthenticated(!!token);
        };

        if (isFocused) { 
            checkAuthStatus();
        }
        
        checkAuthStatus(); 
    }, [isFocused]); 

    return (
        <ScrollProvider>
            <Tabs
                tabBar={props => <TabBar {...props} />} 
                screenOptions={{ headerShown: false }}
            >
                <Tabs.Screen
                    name='index'
                    options={{ title: "Inicio" }}
                />
                <Tabs.Screen
                    name='cursos'
                    options={{ title: "Cursos" }}
                />
                <Tabs.Screen
                    name='provas'
                    options={{ title: "Provas" }}
                />
                <Tabs.Screen
                    
                    name='login' 
                    options={{ title: "User" }} 
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault(); 
                            AsyncStorage.getItem('userToken').then(token => {
                                if (token) {
                                    router.push('/pages/main/perfilUsuario');
                                } else {
                                    router.push('/pages/main/login');
                                }
                            });
                        },
                    }}
                />
            </Tabs>
        </ScrollProvider>
    );
}
