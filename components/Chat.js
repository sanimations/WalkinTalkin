import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({route, navigation}) => {
    const { name, bgColor } = route.params;
// tried adding bgColor and it messes up the whole program

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

 return (
   <View style={[styles.container, { backgroundColor: bgColor }]}>
     <Text>Hello Chat!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  //  backgroundColor: bgColor
 }
});

export default Chat;