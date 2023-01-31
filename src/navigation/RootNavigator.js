import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { showSettingsModel } from '../redux/action';
import Chat from '../components/Chat';
import Message from '../components/Message';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabView = () => {
    return <Tab.Navigator>
        <Tab.Screen
            options={{
                tabBarIcon: ({ focused, size }) => {
                    size = focused ? 25 : 22;
                    return <FontAwesome name='home' size={size} color={!focused ? 'gray' : '#01BA88'} />
                },
                tabBarActiveTintColor: "#01BA88",
                headerTintColor: '#01BA88',
            }}
            name='Home' component={Home} />
        <Tab.Screen name='Message' component={Message}
            options={() => ({
                tabBarIcon: ({ focused, size }) => {
                    size = focused ? 22 : 20;
                    return <FontAwesome name='envelope' size={size} color={!focused ? 'gray' : '#01BA88'} />
                },
                tabBarActiveTintColor: "#01BA88",
                headerShown: false,
                headerLeftLabelVisible: false,
            })}
        />
        <Tab.Screen options={{
            tabBarIcon: ({ focused, size }) => {
                size = focused ? 25 : 22;
                return <FontAwesome name='user' size={size} color={!focused ? 'gray' : '#01BA88'} />
            },
            headerTintColor: '#01BA88',
            tabBarActiveTintColor: "#01BA88",
        }} name='Profile' component={Profile} />
    </Tab.Navigator>
}

const RootNavigator = () => {
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    useEffect(() => {
        AsyncStorage.getItem('token').then(res => setToken(res))
    }, [])
    console.log("token", token)
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' options={{ headerShown: false }} component={Login} />
            <Stack.Screen name='Tab' options={{ headerShown: false }} component={TabView} />
            <Stack.Screen name='SignUp' options={{ headerShown: false }} component={SignUp} />
            <Stack.Screen name='Chat' options={({ route }) => ({
                headerBackTitleVisible: false,
                headerTintColor: '#01BA88',
                headerTitle: route.params.state.name,
                headerRight: () => {
                    return route.params.state.isGroupChat && <Pressable style={{ marginRight: 5 }} onPress={() => dispatch(showSettingsModel(true))}><FontAwesome name="cog" size={22} color="#01BA88" /></Pressable>
                }
            })} component={Chat} />
        </Stack.Navigator>
    )
}

export default RootNavigator
