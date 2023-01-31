import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { VStack, Input, Pressable, Text, Image, Box, FlatList, HStack, Spacer, Spinner } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { accessChat, fetchChat, allUser } from '../redux/action';

const Home = () => {

    const dispatch = useDispatch();
    const { alluser, token } = useSelector(state => state.rootReducer);
    const [searchData, setSearchData] = useState("");
    const [spinner, setSpinner] = useState(false);

    const handleClick = () => {
        setSpinner(true);
        searchData.length > 0 && dispatch(allUser(token, searchData));
    }

    const handleFunction = (id) => {
        dispatch(accessChat(token, id));
        dispatch(fetchChat(token));
    }
    useEffect(() => {
        setSpinner(false);
        dispatch(fetchChat(token));
    }, [spinner, dispatch])

    return (
        <View style={styles.container}>
            <VStack w="95%" space={5} alignSelf="center" paddingTop={3}>
                <HStack space={1} alignItems="center">
                    <Input onChangeText={(val) => setSearchData(val)} placeholder="Search user" width="89%" borderRadius="4" py="3" px="1" fontSize="14" />
                    <Pressable borderRadius={8} justifyContent="center" bgColor="green.600" size="10" onPress={handleClick}>
                        <Text color="white" alignSelf="center" bold>GO</Text>
                    </Pressable>
                </HStack>
                {alluser && !spinner ? <Box paddingTop={1}>
                    <FlatList data={alluser} renderItem={({ item }) => (
                        <Box key={item._id} borderRadius={20} borderWidth="1" margin={2} borderColor="muted.800" >
                            <Pressable onPress={() => handleFunction(item._id)} style={styles.item} >
                                <HStack alignItems='center' space={[2, 3]} justifyContent="space-between">
                                    <Image alt="img" borderRadius={35} size="48px" source={{
                                        uri: item.pic
                                    }} />
                                    <VStack>
                                        <Text color="coolGray.800" bold fontSize={17}>
                                            {item.name}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                </HStack>
                            </Pressable>
                        </Box>)} keyExtractor={item => item.id} />
                </Box> : <HStack marginTop={5} space={8} justifyContent="center" alignItems="center">
                        <Spinner size="sm" />
                    </HStack>}
            </VStack>
        </View >
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    heading: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black'
    },
    item: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})