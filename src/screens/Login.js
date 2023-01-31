import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Pressable,
  useToast,
  Spinner
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { allUser, loginUser } from '../redux/action';

const Login = ({ navigation }) => {

  const dispatch = useDispatch();
  const toast = useToast();
  const { user, token } = useSelector(state => state.rootReducer);
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    console.log('token  ---', token)
    if (token || user) {
      setLoading(false)
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            Login successfull !!
                </Box>
        },
        placement: "bottom"
      });
      navigation.navigate('Tab')
      AsyncStorage.setItem('token', token)
    } else if (!user || !token) {

      setLoading(false)
      toast.show({
        render: () => {
          return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
            Login failed !!
                </Box>
        },
        placement: "bottom"
      });
    }
  }, [token, user, handleClick])

  const handleClick = () => {
    setLoading(true)
    dispatch(loginUser(data))
  }
  return (
    <View flex={1}>
      <Center w="100%" flex={1} px="3">
        {loading ? <Spinner size="lg" /> :
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
            >
              Welcome To Chat
          </Heading>
            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
          </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input onChangeText={(val) => setData({ ...data, email: val })} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" onChangeText={(val) => setData({ ...data, password: val })} />
                <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: '#01BA88',
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
              </Link>
              </FormControl>
              <Button
                mt="2"
                bgColor="#01BA88"
                colorScheme="#01BA88"
                onPress={() => handleClick()}
              >
                Sign in
            </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  I'm a new user.{' '}
                </Text>
                <Pressable onPress={() => navigation.navigate('SignUp')}>
                  <Text color="#01BA88">Sign Up</Text>
                </Pressable>
              </HStack>
            </VStack>
          </Box>
        }
      </Center>
    </View>
  );
};

export default Login;
