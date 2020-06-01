import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, style, captureButton, AsyncStorage } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Dimensions } from 'react-native'
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import isIPhoneX from 'react-native-is-iphonex';
// import Pick from './Pick.js'
import RNPickerSelect from 'react-native-picker-select';
import Home from './Home.js'
import Store from './Storeimage.js'
import * as FileSystem from 'expo-file-system';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Drug from './Drug.js'


export default class Newcamera extends React.Component {
  constructor(props) {
    super(props);
    // all = '';
    dictUri = [];
    dictDisease = [];
    order = 0;
    position = 'Left Hand';
    drug = this.props.sendDrug
    temp = Date.now();
    radio_props = [
      { label: 'Normal', value: 'normal' },
      { label: 'Abnormal', value: 'abnormal' },
      { label: 'Others', value: 'others' }
    ];

  }

  state = {
    permissionsGranted: null,
    type: 'back',
    path: null, // store uri of photo
    whatType: false,
    diseaseType: null,
    values: this.props.values,
    done: false,

  };

  backFromResult = () => {
    this.setState({
      permissionsGranted: null,
      type: 'back',
      path: null, // store uri of photo
      whatType: false,
      diseaseType: null,
      values: this.props.values,
      done: false,

    });
  }

  back = e => {
    e.preventDefault();
    this.props.onPress();
  };


  async componentDidMount() {
    console.log(position)
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });

    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });

  }

  renderNoPermissions = () =>
    <View style={styles.noPermissions}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>

  renderImage = () => {

    switch (position) {
      case 'Left Hand': img = require('./Images/hand.png'); break;
      case 'Right Hand': img = require('./Images/hand.png'); break;
      case 'Left Arm': img = require('./Images/arm.png'); break;
      case 'Right Arm': img = require('./Images/arm.png'); break;
      case 'Left Leg': img = require('./Images/arm.png'); break;
      case 'Right Leg': img = require('./Images/arm.png'); break;
      case 'Left Foot': img = require('./Images/foot.png'); break;
      case 'Right Foot': img = require('./Images/foot.png'); break;
    }
    return (
      <View style={styles.imgBar} >
        <Image source={img} resizeMode='stretch' style={styles.mask} />
      </View>
    );
  }

  async snapPhoto() {
    // console.log(this.state.faces);

    if (this.camera) {
      console.log('Taking photo');
      const data = await this.camera.takePictureAsync();
      // this.setState({ path: data.uri });

      let p = position.replace(/\s/g, "");

      await FileSystem.copyAsync({
        from: data.uri,
        to: `${FileSystem.documentDirectory}photos/${p}_${temp}.jpg`
      });
      this.setState({ path: `${FileSystem.documentDirectory}photos/${p}_${temp}.jpg` });
    }

  }


  renderTopBar = () =>
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.smileFace} >
      </TouchableOpacity>

      <View style={styles.smileFace} >
        <Text style={styles.icon}>{position}</Text>
      </View>

      <TouchableOpacity style={styles.smileFace} >
      </TouchableOpacity>


    </View>

  renderSecondTopBar = () =>
    <View style={styles.secondBar}>
      <Text style={styles.textMessage}>
        {position}
        {/* {text} */}
      </Text>
    </View>


  renderMarks = () => {

    return (
      <View style={styles.maskBar} >
        {this.renderImage()}
      </View>
    );

  }

  renderBottomBar = () =>
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={{ alignSelf: 'center' }}
        onPress={this.snapPhoto.bind(this)}>
        <Ionicons name="ios-radio-button-on" size={70} color="white" />
      </TouchableOpacity>
    </View>

  renderCamera = () =>
    <View style={{ flex: 1 }}>
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.camera}
        type={this.state.type}
        onMountError={this.handleMountError}
        ratio={'16:9'}
      >
        {this.renderTopBar()}
        {/* {this.renderSecondTopBar()} */}
        {this.renderMarks()}
        {this.renderBottomBar()}
      </Camera>
    </View>


  saveData = async () => {
    let value = this.state.values;

    let obj = {
      id: value.id,
      age: value.age,
      gender: value.gender,
      concenG: value.concenG,
      concenML: value.concenML,
      timeNore: value.timeNore,
      timeExtra: value.timeExtra,
      massage: value.massage,
      drug: value.drug,
      drugOther: value.drugOther,
      dictUri: dictUri,
      dictDisease: dictDisease,
    }
    try {
      // AsyncStorage.clear()
      AsyncStorage.setItem(temp.toString(), JSON.stringify(obj));
      // let item =  await AsyncStorage.getItem(temp.toString());
      // let items = JSON.parse(item);     

    } catch (error) {
      alert(error);
    }
  }

  pressOK = () => {
    if (this.state.diseaseType != null) {
      this.setState({ done: true });
    }
  }

  render() {
    // console.log('camera-----------------------------')

    if (order < 8) {
      if (order == 1) {
        position = 'Right Hand'
      }
      if (order == 2) {
        position = 'Left Arm'
      }
      if (order == 3) {
        position = 'Right Arm'
      }
      if (order == 4) {
        position = 'Left Leg'
      }
      if (order == 5) {
        position = 'Right Leg'
      }
      if (order == 6) {
        position = 'Left Foot'
      }
      if (order == 7) {
        position = 'Right Foot'
      }


      if (this.state.done) {

        dictUri.push({
          key: position,
          value: this.state.path
        });

        dictDisease.push({
          key: position,
          value: this.state.diseaseType
        });

        order = order + 1;
        this.setState({ path: null });
        this.setState({ whatType: false });
        this.setState({ done: false });
        this.setState({ diseaseType: null });


      }

      // select type of imges
      if (this.state.whatType) {
        return (
          <View style={styles.container}>
            {/* <View style={styles.okBar}>
              <TouchableOpacity style={styles.nextButton} onPress={this.pressOK}>
                <Text style={styles.icon}>Next</Text>
              </TouchableOpacity>
            </View> */}



            <View style={styles.topBar}>
            <TouchableOpacity style={styles.smileFace} onPress={() => {
                if (this.state.diseaseType != null) { this.setState({ done: true }); }
              }} >
                <Text style={styles.iconNext}></Text>

              </TouchableOpacity>

              <TouchableOpacity style={styles.smileFace} onPress={() => {
                if (this.state.diseaseType != null) { this.setState({ done: true }); }
              }} >
                <Text style={styles.iconNext}></Text>

              </TouchableOpacity>
              <TouchableOpacity style={styles.previewsmileFace} onPress={() => {
                if (this.state.diseaseType != null) { this.setState({ done: true }); }
              }} >
                <Text style={styles.iconNext}>Next</Text>

              </TouchableOpacity>

            </View>


            <View style={{ flex: 0.7 }}>
              <Image
                source={{ uri: this.state.path }}
                style={styles.preview}
              />
            </View>



            <View style={styles.previewbottomBar}>
              <View style={styles.selectButton}>

                <RadioForm
                  buttonColor={'#B6452C'}
                  selectedButtonColor = {'#B6452C'}
                  labelColor={'black'}
                  radio_props={radio_props}
                  initial={-1}
                  animation={true}
                  labelHorizontal={false}
                  formHorizontal={true}
                  onPress={(value) => {
                    console.log(value);
                    this.setState({ diseaseType: value });
                  }}
                  labelStyle={{ marginHorizontal: 20 }}
                />
              </View>

            </View>



            {/* <Button
              title="OK"
              onPress={() => {
                if (this.state.diseaseType != null) { this.setState({ done: true }); }
              }}
              buttonStyle={[styles.okButton]}
              type="solid"
              titleStyle={{ color: 'white' }}
            /> */}

          </View>
        );
      }


      if (this.state.path == null) {
        const cameraScreenContent = this.state.permissionsGranted
          ? this.renderCamera()
          : this.renderNoPermissions();
        const content = cameraScreenContent;

        return (
          <View style={styles.container}>
            {content}
          </View>
        );
      }
      else {
        // show a photo when press takePhoto button
        return (


          <View style={styles.container}>

            <View style={styles.topBar}>
              <TouchableOpacity style={styles.smileFace} >
              </TouchableOpacity>
              <View style={styles.smileFace} >
                <Text style={styles.icon}>{position}</Text>
              </View>
              <TouchableOpacity style={styles.smileFace} >
              </TouchableOpacity>


            </View>

            <View style={{ flex: 0.7 }}>
              <Image
                source={{ uri: this.state.path }}
                style={styles.preview}
              />
            </View>


            <View style={styles.bottomBar}>
              <TouchableOpacity
                style={styles.previewcancleButton}
                onPress={() => {
                  { this.setState({ path: null }) };
                }}
              >
                <Text style={styles.cancleText}> Retake </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.previewokButton}
                onPress={() => {
                  { this.setState({ whatType: true }) };
                }}
              >
                <Text style={styles.upText}> Use </Text>
              </TouchableOpacity>
            </View>


          </View>
        );

      }
    }

    else { // when take all step
      // console.log(this.state)
      // console.log(dictUri);
      // console.log(dictDisease)
      this.saveData();
      return (
        // <Store dictUri={dictUri} dictDisease={dictDisease} values={this.state.values}  ></Store>
        //ตอนแรก <Home>
        <Drug sendDrug={drug} dictUri={dictUri} dictDisease={dictDisease} values={this.state.values} onPressLogout={this.props.onPressLogout}> ></Drug>
      );

    }



  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  upButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 144,
    height: 42,
  },
  cancleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 144,
    height: 42,
  },
  okButton: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 70,
    height: 42,
  },
  previewcancleButton: {
    marginTop:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
    // position: 'absolute',
    // bottom: 40,
    // left: 20,
    width: 144,
    height: 42,
  },
  previewokButton: {
    marginTop:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
    // position: 'absolute',
    // bottom: 70,
    // right: 20,
    width: 144,
    height: 42,
  },
  selectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7F4',
    borderRadius: 5,
    marginTop: isIPhoneX ? 30 : 30,
    // position: 'absolute',
    // bottom: 70,
    // left: 20,
    width: 330,
    height: 60,
  },

  select: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    top: 50,
    left: 50,
  },
  upText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  topBar: {
    paddingTop: 10,
    flex: 0.13,
    backgroundColor: '#2B435F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  previewtopBar: {
    flex: 0.13,
    backgroundColor: '#2B435F',
    flexDirection: 'column',
    alignItems: 'center',
  },
  secondBar: {
    flex: 0.03,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  maskBar: {
    flex: 0.7,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  mask: {
    height: Dimensions.get('window').height * 0.7,
    width: Dimensions.get('window').width,

  },
  bottomBar: {
    //paddingTop: isIPhoneX ? 500 : 350,
    paddingBottom: isIPhoneX ? 10 : 5,
    backgroundColor: 'black',
    justifyContent: 'space-around',
    flex: 0.2,
    flexDirection: 'row',
  },
  previewbottomBar: {
    //paddingTop: isIPhoneX ? 500 : 350,
    paddingBottom: isIPhoneX ? 10 : 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    flex: 0.2,
    flexDirection: 'row',
  },
  noPermissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  smileFace: {
    // marginTop: 60,
    paddingTop: isIPhoneX ? 20 : 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewsmileFace: {
    paddingTop: isIPhoneX ? 20 : 10,
    paddingRight: isIPhoneX ? 40 : 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  okBar: {

    flex: 0.13,
    paddingTop: 30,
    backgroundColor: '#3d1c02',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  nextButton: {
    // marginTop: 30,
    alignSelf: 'flex-end',
  },
  backBotton: {
    marginTop: 50,
    marginLeft: 5,
  },
  textToggleButton: {
    paddingLeft: 25,
    flex: 0.25,
    height: 50,
    marginHorizontal: 2,
    marginBottom: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusLabel: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  bottomButton: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },

  newPhotosDot: {
    position: 'absolute',
    top: 0,
    right: -5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4630EB'
  },
  options: {
    position: 'absolute',
    bottom: 80,
    left: 30,
    width: 200,
    height: 160,
    backgroundColor: '#000000BA',
    borderRadius: 4,
    padding: 10,
  },
  detectors: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pictureQualityLabel: {
    fontSize: 10,
    marginVertical: 3,
    color: 'white'
  },
  pictureSizeContainer: {
    flex: 0.5,
    alignItems: 'center',
    paddingTop: 10,
  },
  pictureSizeChooser: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  pictureSizeLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  preview: {
    // flex: 0.7,

    height: Dimensions.get('window').height * 0.7,
    width: Dimensions.get('window').width,
  },
  cancel: {
    position: 'absolute',
    left: 40,
    top: 60,
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 17,
  },
  ok: {
    position: 'absolute',
    right: 40,
    top: 60,
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 17,
  },

  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: "center",
  },
  iconNext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: "center",
  },
  textMessage: {
    alignSelf: "center",
    fontSize: 15,
    color: 'blue',

  }

});
