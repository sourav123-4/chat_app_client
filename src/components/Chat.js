import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { HStack, Input, Modal, Box, Button, VStack, Spinner } from 'native-base';
import { allUser, showSettingsModel, fetchChat } from '../redux/action';
import { io } from 'socket.io-client';
const ENDPOINT = "http://localhost:8080";

var socket, selectedChatCompare;
const Chat = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { name, id, chat, users } = route.params.state;
    const { user, token, alluser, settingModal } = useSelector(state => state.rootReducer)
    const [message, setMessage] = useState("");
    const [allChat, setAllChat] = useState([]);
    const [chatName, setChatName] = useState(name);
    const [searchPeople, setSearchPeople] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [spinner, setSpinner] = useState(false);
    // const [typing, setTyping] = useState(false);
    // const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user);
        socket.on('connected', () => setSocketConnected(true))
        // socket.on("typing", () => setIsTyping(true));
        // socket.on("stop typing", () => setIsTyping(false));
    }, [searchPeople, onSend, spinner])

    const fetchMessages = (token, id) => {
        setSpinner(true)
        fetch(`http://localhost:8080/api/message/chatId`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => response.json())
            .then(responseJson => {
                setAllChat(responseJson)
                socket.emit('join chat', id)
            })
    }

    const sendMessages = (message, token, id) => {
        // socket.emit('stop typing', chat._id);
        fetch(`http://localhost:8080/api/message`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ content: message, chatId: id })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.message) {
                } else {
                    fetchMessages(token, id);
                    dispatch(fetchChat(token));
                    socket.emit("new message", responseJson);
                }
            })
    }

    useEffect(() => {
        fetchMessages(token, id)
        selectedChatCompare = chat;
        searchPeople.length > 0 && dispatch(allUser(token, searchPeople));
    }, [searchPeople, onSend, spinner])

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
            } else {
                setAllChat([...allChat, newMessageRecieved])
            }
        })
    }, [searchPeople, onSend, spinner])

    // const typingHandler = (e) => {
    //     if (!socketConnected) return;
    //     if (!typing) {
    //         setTyping(true)
    //         socket.emit("typing", chat._id)
    //     }
    //     let lastTypingTime = new Date().getTime();
    //     var timerLength = 1000;
    //     setTimeout(() => {
    //         var timeNow = new Date().getTime();
    //         var timeDiff = timeNow - lastTypingTime;
    //         if (timeDiff >= timerLength && typing) {
    //             socket.emit('stop typing', chat._id);
    //             setTyping(false);
    //         }
    //     }, timerLength)
    // }

    const onChangeHandler = (val) => {
        // typingHandler(val);
        setMessage(val);
    }
    const onSend = () => {
        setMessage("");
        sendMessages(message, token, id);
        fetchMessages(token, id);
        dispatch(fetchChat(token));
    }
    const leaveGroup = (userId) => {
        handleRemove(userId);
    }
    const handleRemove = (userId) => {
        fetch(`http://localhost:8080/api/chat/groupremove`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ chatId: id, userId: userId })
        }).then(res => res.json()).then(res => {
            dispatch(showSettingsModel(false))
            navigation.navigate('MessageAPP')
        })
    }
    const updateName = () => {
        fetch(`http://localhost:8080/api/chat/rename`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ chatId: id, chatName: chatName })
        }).then(res => res.json).then(() => {
            dispatch(showSettingsModel(false))
            navigation.navigate('MessageAPP')
        })
    }

    const addToGroup = (item) => {
        fetch(`http://localhost:8080/api/chat/groupadd`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ chatId: id, userId: item._id })
        }).then(res => res.json).then(() => {
            dispatch(showSettingsModel(false))
            navigation.navigate('MessageAPP')
        })
    }

    return <SafeAreaView>
        <View style={styles.container}>
            <Modal isOpen={settingModal} opacity={1} onClose={() => dispatch(showSettingsModel(false))}>
                <Modal.Content maxWidth="400px" bgColor='white' borderBottomWidth={0}>
                    <Modal.Header bgColor={'white'} borderBottomWidth={0} alignItems='center' justifyContent='center'><Text style={{ fontSize: 18 }}>{name}</Text></Modal.Header>
                    <Modal.Body borderBottomWidth={0}>
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: 3 }}>
                            {users?.map((item) => {
                                return <HStack alignItems="center" space={2} margin={1} borderRadius={15} padding={2} bgColor="blue.100"><Text>{item.name}</Text>
                                    <Pressable onPress={() => handleRemove(item._id)}><FontAwesome name='times' size={12} color='red' /></Pressable></HStack>
                            })}
                        </View>
                        <HStack alignItems="center" space={1}>
                            <Input width="75%" marginBottom={1} placeholder="chat name" defaultValue={name} onChangeText={(val) => setChatName(val)} />
                            <Button size="xs" onPress={() => updateName()}>Update</Button>
                        </HStack>
                        <Input onChangeText={(val) => setSearchPeople(val)} placeholder="search people" />
                        {alluser ? alluser.slice(0, 4).map((item) => {
                            return <Pressable onPress={() => addToGroup(item)} style={{ borderRadius: 15, borderWidth: 1, padding: 3, margin: 2, borderColor: "gray", justifyContent: "center", alignItems: "center" }}>
                                <HStack alignItems='center' space={[2, 3]} justifyContent="space-between">
                                    <VStack>
                                        <Text color="coolGray.800" bold fontSize={17}>
                                            {item.name}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Pressable>
                        }) : null}
                    </Modal.Body>
                    <Modal.Footer alignItems={'center'} justifyContent='center' bgColor={'white'} borderTopWidth={0}>
                        <Button onPress={() => leaveGroup(user._id)} bgColor="red.600">Leave Group</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            {console.log("allchat,apinner", spinner, allChat)}
            {allChat ? <Box paddingTop={1} style={{ position: "absolute", bottom: 44, top: 6, left: 0, right: 0 }}>
                <FlatList inverted={allChat.length >= 8 ? true : false}
                    data={allChat.length >= 8 ? [...allChat].reverse() : allChat} showsVerticalScrollIndicator={false} renderItem={({ item }) => {
                        return <View style={(item.sender._id === user._id) ? styles.reciever : styles.sender}>
                            <Text style={{ fontSize: 16, color: (item.sender._id === user._id) ? "black" : "white", marginLeft: (item.sender._id === user._id) ? 0 : 10, textAlign: (item.sender._id === user._id) ? "right" : "left" }}>{item.content}</Text>
                            <Text style={{ fontSize: 10, color: (item.sender._id === user._id) ? "black" : "white", marginRight: (item.sender._id === user._id) ? 0 : 10, textAlign: (item.sender._id === user._id) ? "right" : "left" }}>{moment(item.createdAt).format('LT')}</Text>
                        </View>
                    }} keyExtractor={item => item.id} />
            </Box> : <HStack marginTop={5} space={8} justifyContent="center" alignItems="center">
                    <Spinner size="lg" />
                </HStack>}
            <HStack alignItems="center" space={1} position="absolute" left={'5%'} bottom={0}>
                {/* {isTyping ? <View><Text>Loading...</Text></View> : null} */}
                <Input rightElement={<Pressable onPress={() => onSend()}><MaterialCommunityIcons
                    name="send-circle"
                    style={{ marginBottom: 5, marginRight: 5, alignItems: "center" }}
                    size={32}
                    color="#01BA88"
                /></Pressable>} placeholder="send mesg" width="95%" defaultValue={message} onChangeText={(val) => onChangeHandler(val)} />
            </HStack>
        </View>
    </SafeAreaView>
}

export default Chat

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    reciever: {
        backgroundColor: "#D1D1D1",
        marginRight: 15,
        marginTop: 10,
        padding: 10,
        maxWidth: "75%",
        alignSelf: "flex-end",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 20,
    },
    sender: {
        backgroundColor: "#8A8AFF",
        marginLeft: 15,
        marginTop: 10,
        padding: 10,
        maxWidth: "75%",
        alignSelf: "flex-start",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 20,
    }
})