import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, AsyncStorage } from 'react-native';
import { FaceDetector, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo.js';
import * as FileSystem from 'expo-file-system';
import Upload from './upload.js';
import isIPhoneX from 'react-native-is-iphonex';
import Form from './Form.js';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class GalleryScreen extends React.Component {
  state = { 
    photos: [],
    goNext: false,
    goCamera: false,
  };

  backFromResult = async () => {
    this.setState({    
      photos: [],
      goNext: false,
      goCamera: false,
    });
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  }

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };


  saveToGallery = async () => {
    this.setState({ goNext: true });

  };

  toggleGoCamera = async () => {
    this.setState({ goCamera: true });

  };

  renderPhoto = fileName =>
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
    />;



  render() {

    if (this.state.goCamera) {
      return <Form onPress={this.backFromResult.bind(this)} > </Form>
    }

    if (this.state.goNext) {
      return <Upload></Upload>
    }
    else {
      return (

        <View style={styles.container}>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
              <Text style={styles.whiteText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.saveToGallery} disabled={this.state.photos.length == 0}>
              <Text style={styles.whiteText}>Upload</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentComponentStyle={{ flex: 1 }}>
            <View style={styles.pictures}>
              {this.state.photos.map(this.renderPhoto)}
            </View>
          </ScrollView>
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={{ alignSelf: 'center'}}
              onPress={this.toggleGoCamera}>
              <Text style={{ color: 'white', marginTop:30, fontSize:18, fontWeight: 'bold'}}>Take new photo</Text>
            </TouchableOpacity>


          </View>
        </View>
      );

    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    backgroundColor: 'white',
  },
  navbar: {
    paddingTop:40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#46281d',
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    padding: 20,
  },
  whiteText: {
    color: 'white',
  },
  bottomBar: {
    //paddingTop: isIPhoneX ? 500 : 350,
    paddingBottom: isIPhoneX ? 60 : 40,
    backgroundColor: 'black',
    justifyContent: 'space-around',

    flexDirection: 'row',
  },
});