import React, { useEffect, useState } from 'react'
import { StyleSheet, Pressable, FlatList } from 'react-native'
import { Box, HStack, VStack, Text, Spacer, NativeBaseProvider, Input } from "native-base";
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Spinner } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import { allUser, addGroupModal, fetchChat, createGroup } from '../redux/action';

const Stack = createStackNavigator();

const MessageApp = ({ navigation }) => {
    const dispatch = useDispatch();
    const [searchPeople, setSearchPeople] = useState("");
    const [chatName, setChatName] = useState("");
    const [modalUser, setModalUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const { token, user, alluser, groupmodal, allchat } = useSelector(state => state.rootReducer);

    const addUserInModal = (user) => {
        setSpinner(true);
        setSelectedUser([...selectedUser, user]);
    }

    useEffect(() => {
        dispatch(fetchChat(token));
        searchPeople.length > 0 && dispatch(allUser(token, searchPeople));
        setModalUser(alluser);
    }, [searchPeople, modalUser])

    const getSender = (loggeduser, users) => {
        return users[0]._id === loggeduser._id ? users[1].name : users[0].name;
    }
    const addToGroup = () => {
        dispatch(addGroupModal(false));
        dispatch(createGroup(token, selectedUser, chatName));
    }

    return <NativeBaseProvider>
        <Box paddingTop={1}>
            <Modal isOpen={groupmodal} opacity={1} onClose={() => dispatch(addGroupModal(false))}>
                <Modal.Content maxWidth="400px" bgColor='white' borderBottomWidth={0}>
                    <Modal.Header bgColor={'white'} borderBottomWidth={0} alignItems='center' justifyContent='center'><Text>Create Your Group</Text></Modal.Header>
                    <Modal.Body borderBottomWidth={0}>
                        <Input marginBottom={1} placeholder="chat name" onChangeText={(val) => setChatName(val)} />
                        <Input onChangeText={(val) => setSearchPeople(val)} placeholder="search people" />
                        {selectedUser && selectedUser.map((item) => {
                            return <Text key={item._id} style={{ color: "red" }}>{item.name}</Text>
                        })}
                        {modalUser && !spinner ? modalUser.slice(0, 4).map((item) => {
                            return <Pressable key={item._id} onPress={() => addUserInModal(item)} style={{ borderRadius: 15, borderWidth: 1, padding: 3, margin: 2, borderColor: "gray", justifyContent: "center", alignItems: "center" }}>
                                <HStack alignItems='center' space={[2, 3]} justifyContent="space-between">
                                    <VStack>
                                        <Text color="coolGray.800" bold fontSize={17}>
                                            {item.name}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                </HStack>
                            </Pressable>
                        }) : <HStack marginTop={5} space={8} justifyContent="center" alignItems="center">
                                <Spinner size="sm" />
                            </HStack>}
                    </Modal.Body>
                    <Modal.Footer alignItems={'center'} justifyContent='center' bgColor={'white'} borderTopWidth={0}>
                        <Button onPress={() => addToGroup()}>Add</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            {allchat ? <FlatList showsVerticalScrollIndicator={false} data={allchat} renderItem={({ item }) => (
                <Pressable key={item._id} onPress={() => navigation.navigate('Chat', { state: { chat: item, name: !item.isGroupChat ? getSender(user, item.users) : item.chatName, users: item.users, isGroupChat: item.isGroupChat, id: item._id } })} style={styles.container} >
                    <HStack space={[2, 3]} justifyContent="space-between">
                        <VStack>
                            <Text color="gray.700" fontSize={18} bold>
                                {!item.isGroupChat ? getSender(user, item.users) : item.chatName}
                            </Text>
                            <Text color="gray.500" bold>
                                {item?.latestMessage?.content}
                            </Text>
                        </VStack>
                        <Text fontSize={12} alignSelf="flex-end" color="coolGray.500" bold>
                            {moment(item?.latestMessage?.createdAt).format('LT')}
                        </Text>
                    </HStack>
                </Pressable>
            )} /> : <HStack marginTop={5} space={8} justifyContent="center" alignItems="center">
                    <Spinner size="lg" />
                </HStack>}
        </Box></NativeBaseProvider>
}
const Message = () => {
    const dispatch = useDispatch();
    return (
        <Stack.Navigator>
            <Stack.Screen name='MessageAPP' options={{
                headerRight: () => {
                    return <Pressable onPress={() => dispatch(addGroupModal(true))} style={{ marginRight: 10 }}><FontAwesome name='plus' size={20} color={'#01BA88'} /></Pressable>
                }, headerLeft: () => null, headerTitle: 'Message', headerLeftLabelVisible: false, headerTintColor: '#01BA88',
            }} component={MessageApp} />
        </Stack.Navigator>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        padding: 8,
        margin: 8,
        padding: 12,
        borderRadius: 15,
        backgroundColor: "#01BA88"
    },
    heading: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black'
    }
})