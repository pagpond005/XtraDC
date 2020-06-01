import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, AsyncStorage } from 'react-native';
import { FaceDetector, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import Photo from './Photo.js';
import * as FileSystem from 'expo-file-system';
import Upload from './upload.js';
import isIPhoneX from 'react-native-is-iphonex';
import Form from './Form.js';
import Patient from './List.js';
import Drug from './Drug.js'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class Home extends React.Component {
  state = {
    photos: [],
    id: [],
    goNext: false,
    goCamera: false,
    goUpload: false,
    uploaditems: [],
    uploadkey: [],
  };

  backFromResult = async () => {
    this.setState({
      photos: [],
      id: [],
      goNext: false,
      goCamera: false,
      goUpload: false,
      uploaditems: [],
      uploadkey: [],
    });
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
    const allid = [];
    await AsyncStorage.getAllKeys(async (err, keys) => {
      await AsyncStorage.multiGet(keys, async (err, stores) => {
        stores.map(async (result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];

          if (key.length == 13) {
            allid.push(key);
          }
        });
      });
      this.setState({ id: allid });
    });
  }

  componentDidMount = async () => {
    this.showyoyo()
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

  renderUpload = key => {
    return (
      <Patient
        key={key}
        timestamp={key}
        homeUpload = {this.homeUpload}
      />
    );

  }

  homeUpload = (key,items) =>{
    this.setState({
      goUpload:true,
      uploaditems : items,
      uploadkey:key,
    })
    
    
  }



  showyoyo = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
    const allid = [];
    await AsyncStorage.getAllKeys(async (err, keys) => {
      await AsyncStorage.multiGet(keys, async (err, stores) => {
        stores.map(async (result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];

          if (key.length == 13) {
            allid.push(key);
          }
        });
      });
      this.setState({ id: allid });
    });

  }

  renderNoData = () =>
    <View style={styles.noData}>
      <Text style={styles.noDataText}>- ไม่มีข้อมูลที่ยังไม่ได้อัปโหลด -</Text>
    </View>


  render() {

    if(this.state.goUpload)
    {
      return(<Upload uploadkey={this.state.uploadkey} onPress={this.backFromResult.bind(this)} items = {this.state.uploaditems} onPressLogout={this.props.onPressLogout} ></Upload>)
    }

    if (this.state.goCamera) {
      return <Form onPress={this.backFromResult.bind(this)} onPressLogout={this.props.onPressLogout}> </Form>
    }

    if (this.state.goNext) {
      return <Upload></Upload>
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.navbar}>
            <TouchableOpacity>
              <Image source={require('./Images/logo.png')} style={{ width: 75, height: 75 }} />
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 130 }}></TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.props.onPressLogout}>
              <MaterialCommunityIcons name="logout" size={25} color="white"></MaterialCommunityIcons>
              <Text style={styles.whiteText}>Log Out</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={this.saveToGallery} disabled={this.state.photos.length == 0}>
              <Text style={styles.whiteText}>Upload</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.bottomBar}>
            <Button
              title="Take new photo"
              type="solid"
              buttonStyle={styles.newButton}
              onPress={this.toggleGoCamera}
              titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
            />
          </View>

          <View style={styles.upload}>
            <View style={styles.uploadBar}>
              <Text style={styles.uploadText}>ข้อมูลที่ยังไม่ได้อัปโหลด</Text>
            </View>
          </View>

          <ScrollView contentComponentStyle={{ flex: 1 }}>
            {this.state.id.length == 0 ? this.renderNoData() : this.state.id.map(this.renderUpload)}
          </ScrollView>

        </View>
      );

    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    backgroundColor: '#F5F7F4',
  },
  navbar: {
    paddingTop: isIPhoneX ? 50 : 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2B435F',
    paddingHorizontal: 10,
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  
  button: {
    padding: 10,
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontSize: 14
  },
  bottomBar: {
    paddingTop: 20,
    paddingBottom: 20,
    // backgroundColor: 'black',
    justifyContent: 'space-around',
    margin: 10,
    marginVertical: 20,
    flexDirection: 'row',
    // borderColor: '#b3b3ba',
    // borderBottomWidth: 1.5,
  },
  newButton: {
    alignSelf: 'center',
    borderRadius: 10,
    width: 300,
    height: 100,
    backgroundColor: '#B6452C',
  },
  uploadBar: {
    height: 50,
    alignItems: 'center',
    backgroundColor: '#B6966D'
  },
  uploadText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  upload:{
    borderColor: '#B6966D',
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    marginBottom: 10,
  }, 
  noDataText: {
    fontSize: 18,
    // fontWeight : 'bold',
    alignItems: 'center'
  },
  noData: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  }
});