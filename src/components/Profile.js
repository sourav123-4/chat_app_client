import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
    const handleLogout = () => {
        AsyncStorage.removeItem('token');
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => handleLogout()}><Text style={styles.heading}>Logout</Text></Pressable>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    heading: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black'
    }
})