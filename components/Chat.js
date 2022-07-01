import * as React from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button, Platform
} from 'react-native';
import ChatBubble from "./static/ChatBubble";
import {useState} from "react";
import * as ImagePicker from 'expo-image-picker';


export default function Chat() {
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [inputClicked, setInputClicked] = useState(false)
    const [image, setImage] = useState(null);

    function handleSendMessage() {
        if (currentMessage !== "") {
            setMessages([...messages, currentMessage])
            setCurrentMessage("")
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }


    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.chatContainer}
        >
            <ScrollView styles={styles.chatContainerBubbles}>
                {messages.map(message =>
                    <ChatBubble message={message} writer></ChatBubble>
                )}
            </ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.chatInput}>
                <View
                    style={[styles.chatContainerInput, inputClicked ? styles.chatContainerInputClicked : styles.chatContainerInput]}>
                    <TextInput
                        style={styles.input}
                        placeholder='Type something...'
                        value={currentMessage}
                        onChangeText={setCurrentMessage}
                        onPressIn={() => setInputClicked(true)}
                        onEndEditing={() => setInputClicked(false)}
                    >
                    </TextInput>
                    <TouchableOpacity style={styles.camera} onPress={pickImage}>
                        <Text style={styles.buttonText}>cam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
                        <Text style={styles.buttonText}>send</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatContainer: {
        height: "100%",
        flexDirection: "column",
        display: "flex",
    },
    chatContainerBubbles: {
        flexGrow: 45,
        flexBasis: "auto",
    },
    chatInput: {
        maxWidth: "100%",
        flexGrow: 5,
    },
    chatContainerInput: {
        flexDirection: "row",
        flexBasis: "auto",
        paddingBottom: 50,
    },
    chatContainerInputClicked: {
        paddingBottom: 100,
    },
    input: {
        margin: 12,
        width: "50%",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        flexGrow: 1,
        flexShrink: false,
    },
    camera: {
        width: "10%",
        margin: 12,
        height: 40,
        backgroundColor: '#2196F3',
        borderRadius: 15,
        flexGrow: 1,
        flexShrink: 1,
    },
    button: {
        width: "10%",
        margin: 12,
        height: 40,
        backgroundColor: '#2196F3',
        borderRadius: 15,
        flexGrow: 1,
        flexShrink: 1,
        //flexGrow: 1,
    },
    buttonText: {
        textAlign: 'center',
        padding: 11,
        color: 'white'
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    }
})