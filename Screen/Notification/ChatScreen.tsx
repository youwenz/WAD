import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import io from 'socket.io-client';
import {PRIMARY, SECONDARY} from '../../Screen/Style/Color';

const socket = io('http://10.0.2.2:5000', {transports: ['websocket']});

const ChatScreen = () => {
  const [messages, setMessages] = useState<{sender: string; text: string}[]>(
    [],
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for the connection event
    socket.on('connect', () => {
      console.log('Connected to backend with socket id:', socket.id);
      ToastAndroid.show('Connected to server', ToastAndroid.LONG); // Show Toast upon successful connection
    });

    // Handle reconnection and display a toast
    socket.on('reconnect', () => {
      ToastAndroid.show('Reconnected to server', ToastAndroid.SHORT);
    });

    // Handle connection errors or disconnect events
    socket.on('connect_error', error => {
      console.log('Connection Error:', error);
      ToastAndroid.show('Connection failed', ToastAndroid.SHORT);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      ToastAndroid.show('Disconnected from server', ToastAndroid.SHORT);
    });

    // Listen for server messages
    socket.on('message_broadcast', (data: any) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      // Clean up listeners when the component unmounts
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message_broadcast');
      socket.off('connect_error');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      socket.emit('message_sent', {
        sender: 'User',
        text: message,
      });
      setMessage('');
    }
  };

  const renderItem = ({item}: {item: {sender: string; text: string}}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'User' ? styles.userMessage : styles.otherMessage,
      ]}>
      <Text style={item.sender === 'User' ? styles.messageText : styles.replyMessage}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    borderRadius: 15,
    padding: 10,
    right:10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: PRIMARY,
    borderTopRightRadius: 0,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: SECONDARY,
    borderRadius: 15,
    marginLeft: 20,
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 18
  },
  sendButton: {
    backgroundColor: PRIMARY,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  replyMessage:{
    color: PRIMARY,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default ChatScreen;
