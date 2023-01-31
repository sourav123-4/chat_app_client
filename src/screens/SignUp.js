import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Box, Text, Pressable, Heading, VStack, HStack, FormControl, Input, Button, Center, NativeBaseProvider } from "native-base";
import { signupUser } from '../redux/action';

const SignUp = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user, err, token } = useSelector(state => state.rootReducer);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    useEffect(() => {
        if (token) {
            navigation.navigate('Tab')
            AsyncStorage.setItem('token', token)
        }
    }, [token])
    const handleClick = () => {
        dispatch(signupUser(data))
    }
    return (
        <View flex={1}>
            <Center w="100%" flex={1}>
                <Box safeArea p="2" w="90%" maxW="290" py="8">
                    <Heading size="lg" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }} fontWeight="semibold">
                        Welcome
        </Heading>
                    <Heading mt="1" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="medium" size="xs">
                        Sign up to continue!
        </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input onChangeText={(val) => setData({ ...data, name: val })} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input onChangeText={(val) => setData({ ...data, email: val })} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password" onChangeText={(val) => setData({ ...data, password: val })} />
                        </FormControl>
                        <Button mt="2" colorScheme="#01BA88" bgColor="#01BA88" onPress={() => handleClick()}>
                            Sign up
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text
                                fontSize="sm"
                                color="coolGray.600"
                                _dark={{
                                    color: 'warmGray.200',
                                }}
                            >
                                Already a user.{' '}
                            </Text>
                            <Pressable onPress={() => navigation.navigate('Login')}>
                                <Text color="#01BA88">Sign In</Text>
                            </Pressable>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </View>
    )
}

export default SignUp
