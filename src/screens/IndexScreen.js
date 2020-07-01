import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { State } from 'react-native-gesture-handler';
import { FontAwesome, Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    //const blogPosts = useContext(BlogContext);
    const { state, addBlogPost, deleteBlog } = useContext(Context);

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={(blogPosts) => blogPosts.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}- {item.id}</Text>
                                <TouchableOpacity
                                    onPress={() => deleteBlog(item.id)} >
                                    <Feather style={styles.icon}
                                        name="trash" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30} color="black" />
            </TouchableOpacity>
        ),
    };
};


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: 'gray',

    },
    title: {
        fontSize: 20
    },
    icon: {
        fontSize: 24,
        color: 'black'
    }

});



export default IndexScreen;