import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { uploadImage, uploadData } from './scr/Server';
import firebase from 'firebase'
import '@firebase/firestore';
// import Form from './Form.js';
import * as FileSystem from 'expo-file-system';
import Gallery from './Home.js'
// import * as React from 'react';
import * as Progress from 'react-native-progress';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class UploadConfirm extends Component {

  constructor(props) {
    super(props);
    data = {};
    uri = [];
    disease = [];
    hasdata = true;
    fakepercent = 0.1;

  }

  state = {
    next: false,
    loading: true,
    uploadThis: this.props.items,
    uploadkey: this.props.uploadkey,
    finishimage: '',
    finishdata: 'Uploading data...',
    percentdata: 0,
  }


  componentDidMount() {

    // setInterval(() => {
    //   this.setState({
    //     loading: false,
    //   });
    // }, 3000);
  }



  toggleNext = () => {
    this.clear()
    this.setState({ next: !this.state.next })
  }

  sendImage = async (timestamp) => {
    var i;
    for (i = 0; i < uri.length; i++) {
      u = uri[i].value;
      k = uri[i].key;
      // imageName = uri.split('/')
      // uploadImage(uri, i + '_' + imageName[imageName.length - 1]);
      uploadImage(u, k + '_' + timestamp + '.jpg');
    }
  }

  sendData = async (timestamp) => {
    uploadData(this.state.User, data, uri, disease, timestamp);
    this.checkDocExist(timestamp);
  }

  checkDocExist(key) {

    const db = firebase.firestore();
    let cityRef = db.collection('data').doc(key);
    let getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document! ');
          this.checkDocExist(key);
        } else {
          console.log('exist yayyyy')
          console.log('Document data:', doc.data());
          this.setState({ finishdata: 'Uploading Image...', percentdata: 0.1 })



        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  checkPhotoExist = async (key) => {
    const db = firebase.firestore();
    let cityRef = db.collection('data').doc(key);
    let getDoc = cityRef.get()
      .then(async (doc) => {
        if (doc.get('upload') === undefined) {
          console.log('No such photo! ');
          if (fakepercent < 0.8) {
            this.setState({ percentdata: fakepercent })
            fakepercent = fakepercent + 0.005
            console.log(fakepercent)

          }
          this.checkPhotoExist(key);

        } else {
          console.log('exist photo')
          console.log('upload data:', doc.data().upload);
          upload = doc.data().upload;
          // if (upload.length > 0) {
          //   this.setState({ finishdata: 'Uploading Image...' })
          // }
          this.setState({ finishimage: upload.length })
          if (this.state.finishimage == 1) {
            this.setState({ percentdata: 0.82 })
          }
          else if (this.state.finishimage == 2) {
            this.setState({ percentdata: 0.86 })
          }
          else if (this.state.finishimage == 3) {
            this.setState({ percentdata: 0.86 })
          }
          else if (this.state.finishimage == 4) {
            this.setState({ percentdata: 0.90 })
          }
          else if (this.state.finishimage == 5) {
            this.setState({ percentdata: 0.92 })
          }
          else if (this.state.finishimage == 6) {
            this.setState({ percentdata: 0.94 })
          }
          else if (this.state.finishimage == 7) {
            this.setState({ percentdata: 0.96 })
          }
          else if (this.state.finishimage == 8) {
            this.setState({ percentdata: 1 })
          }
          // finishimage = upload.length;
          if (upload.length != 8) {
            console.log('upload.length != 8')
            this.checkPhotoExist(key);
          } else {
            console.log('upload success!')
            this.setState({ loading: false });
          }

        }
      })
      .catch(err => {
        console.log('Error getting photo', err);
      });
  }

  back = e => { 
    // e.preventDefault();
    console.log('backkkkkkkkkkkk')
    this.props.onPress()
  }

  retrieveData = async () => {
    console.log(this.state.uploadThis)
    try {
      hasdata = false;
      data = {
        id: this.state.uploadThis.id,
        age: this.state.uploadThis.age,
        gender: this.state.uploadThis.gender,
        concenG: this.state.uploadThis.concenG,
        concenML: this.state.uploadThis.concenML,
        timeNore: this.state.uploadThis.timeNore,
        timeExtra: this.state.uploadThis.timeExtra,
        drug: this.state.uploadThis.drug,
        drugOther: this.state.uploadThis.drugOther,
      }

      uri = this.state.uploadThis.dictUri;
      disease = this.state.uploadThis.dictDisease;

      await this.sendImage(this.state.uploadkey);
      await this.sendData(this.state.uploadkey);
      this.checkPhotoExist(this.state.uploadkey);

      // AsyncStorage.getAllKeys(async (err, keys) => {
      //   AsyncStorage.multiGet(keys, async (err, stores) => {
      //     stores.map(async (result, i, store) => {
      //       // get at each store's key/value so you can work with it
      //       let key = store[i][0];
      //       let value = store[i][1];
      //       console.log('retrieveData');
      //       console.log(key);

      //       if (key.length == 13) {
      //         let item = await AsyncStorage.getItem(key);
      //         // console.log('item')
      //         // console.log(item)
      //         let items = JSON.parse(item);
      //         // console.log('items')
      //         // console.log(items)
      //         data = {
      //           id: items.id,
      //           age: items.age,
      //           gender: items.gender,
      //           concenG: items.concenG,
      //           concenML: items.concenML,
      //           timeNore: items.timeNore,
      //           timeExtra: items.timeExtra,
      //           massage : items.massage,
      //           drug : items.drug,
      //         }

      //         uri = items.dictUri;
      //         disease = items.dictDisease;

      //         await this.sendImage(key);
      //         await this.sendData(key);
      //         this.checkPhotoExist(key);
      //       }

      //     });
      //   });
      // });


    }
    catch (error) {
      alert(error);
    }
  }

  deletePhoto = async (fileName) => {
    await FileSystem.deleteAsync(`${fileName}`)
    console.log('deleteFinish');
  }

  async clear() {
    // const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    // console.log(photos)

    uri = this.state.uploadThis.dictUri;
    var i;
    for (i = 0; i < uri.length; i++) {
      u = uri[i].value;
      this.deletePhoto(u)
    }


    // photos.map(this.deletePhoto)

    await AsyncStorage.removeItem(this.state.uploadkey)
    // AsyncStorage.clear();
  }

  async clearAll() {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    photos.map(this.deleteAllPhoto)
    AsyncStorage.clear();
  }

  deleteAllPhoto = async (fileName) => {
    await FileSystem.deleteAsync(`${PHOTOS_DIR}/${fileName}`)
  }

  render() {
    // this.clearAll()
    // console.log('values: ')
    // console.log(this.state.values);
    if (hasdata) {
      this.retrieveData();
    }


    if (this.state.next) {
      return (
        <Gallery onPressLogout={this.props.onPressLogout}></Gallery>
      );
    }
    else if (this.state.loading) {
      return (
        <View style={styles.container}>
          {/* <ActivityIndicator size="large" color="black" margin={20} /> */}
          <Text style={styles.loading}> {this.state.finishdata} </Text>
          {/* <Text style={styles.loading}> {this.state.finishimage} </Text> */}
          <Progress.Bar style={styles.loading} progress={this.state.percentdata} color={'#2B435F'} height={15} width={250} />


          <TouchableOpacity style={styles.homeButton} onPress={this.props.onPress}>
            <Text style={styles.okText}>Cancel</Text>
          </TouchableOpacity>

        </View>
      )
    } else {

      return (
        <View style={styles.container1}>
          <View style={styles.contentBox}>
            <Ionicons name='ios-checkmark' size={128} color="#2B435F" margin={12}></Ionicons>
            <Text style={styles.textComplete}> SUCCESS </Text>
          </View>
          <TouchableOpacity style={styles.okButton} onPress={this.toggleNext}>
            <Text style={styles.okText}> New Patient </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: '#2B435F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7F4',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.25,
    left: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 5,
  },
  textComplete: {
    color: '#2B435F',
    fontSize: 32,
  },
  okButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 500,
    backgroundColor: '#B6452C',
    borderRadius: 5,
    width: 300,
    height: 50,
  },
  homeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
    backgroundColor: '#B6452C',
    borderRadius: 5,
    width: 300,
    height: 50,
  },
  okText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loading: {
    color: 'black',
    marginTop: 20,
    fontSize: 20,
  }
});