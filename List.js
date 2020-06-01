import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
const detailSize = 100;
export default class Patient extends React.Component {
    constructor(props) {
        super(props);
        key = this.props.timestamp;
        // id = this.props.id;
        // drug = this.props.drug;
        // uri = this.props.uri;
        drug = '';
        d = '';
    }
    state = {
        items: [],
    }
    upload = () => {
        this.props.homeUpload(key, this.state.items)
    }
    getItem = async () => {
        let item = await AsyncStorage.getItem(key);
        data = JSON.parse(item);
        drug = data.drug
        if (drug.length != 0 && drug[0].includes('Others')) {
            d = data.drugOther
        }
        this.setState({ items: data })

    }
    render() {
        if (this.state.items.length == 0) {
            this.getItem();
        }

        return (
            <TouchableOpacity
                style={styles.pictureWrapper}
                activeOpacity={1}
            >
                <View style={styles.topBar}>
                    <Text style={styles.header}>Subject ID: {this.state.items.id}</Text>
        <Text style={[styles.header, { flexWrap: 'wrap' }]}>Drug : {d}</Text>
                </View>
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={this.upload}
                >
                    <FontAwesome name="cloud-upload" size={35}></FontAwesome>
                    <Text>Upload</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    pictures: {
        flex: 1,
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 0,
        // alignItems: 'center',
        borderColor: '#b3b3ba',
        borderBottomWidth: 1.5,
        // backgroundColor: 'red',
    },
    picture: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        resizeMode: 'contain',
    },
    pictureWrapper: {
        height: detailSize,
        // alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        marginHorizontal: 10,
        // backgroundColor: 'red',
        borderColor: '#b3b3ba',
        borderWidth: 1.5,
        borderRadius: 10,
        flexDirection: 'row'
    },
    topBar: {
        margin: 10,
        marginLeft: 20,
        flex: 0.8,
        // backgroundColor:'red',
    },
    header: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },
    imgBar: {
        margin: 10,
        alignItems: 'center',
    },
    img: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    resultBar: {
        backgroundColor: 'green',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    resultText: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        marginTop: 10,
    },
    uploadButton: {
        alignItems: 'center',
        margin: 20,
        flex: 0.2,
    },
});