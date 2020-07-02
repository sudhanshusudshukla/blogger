import React, { useContext, useState } from 'react';
import {
    View, Text, StyleSheet, TextInput,
    FlatList, Button, TouchableOpacity
} from 'react-native';
import { Context } from '../context/BlogContext';

const EditScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    const blogPost = state.find((blogPost) =>
        blogPost.id === navigation.getParam('id')
    );

    //console.log(blogPost.id === navigation.getParam('id'));

    const [title, setTitle] = useState(blogPost.title);
    const [content, setContent] = useState(blogPost.content);

    return (
        <View>
            <Text>Edit Screen:{navigation.getParam('id')}</Text>
            <TextInput
                value={title}
                onChangeText={(newTitle) => setTitle(newTitle)}></TextInput>
        </View>
    );
};

const styles = StyleSheet.create({});

export default EditScreen;