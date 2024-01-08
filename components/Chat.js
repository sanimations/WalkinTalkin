import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, userID, bgColor } = route.params;

  const [messages, setMessages] = useState([]);

  let unsubMessages;

  useEffect(() => {

    navigation.setOptions({ title: name });

    if(isConnected === true) {

      //unsubscribe if already subscribed
      if(unsubMessages) unsubMessages();
      unsubMessages = null;


      //Firestore query to get messages sorted by most recently created/sent
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];

      const currentUserID = route.params.userID;
      documentsSnapshot.forEach((doc) => {
        const messageData = doc.data();

        //Only include messages from the current user
        if (messageData.user._id === currentUserID) {
          newMessages.push({
            id: doc.id,
            ...messageData,
            createdAt: messageData.createdAt.toDate(),
          });
        }
      });
      //cache the new messages and update the useState
      cacheMessages(newMessages);
      setMessages(newMessages);
    });
  }else loadCachedMessages();  //When offline

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
      setMessages(JSON.parse(cachedMessages));
   }

   const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Send a new message to Firestore
  const onSend = async (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // render toolbar based on connection status
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

  // Change Bubble colors
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#67729D",
          },
          left: {
            backgroundColor: "#FED9ED",
          },
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
