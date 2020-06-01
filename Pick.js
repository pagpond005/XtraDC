import React, { Component }from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard , TouchableWithoutFeedback, TouchableOpacity, Dimensions} from 'react-native';
import { Button, Icon  } from 'react-native-elements';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Camera from './Newcamera.js'
import Upload from './upload.js'

export default class Form extends Component {

    constructor(props){
        super(props);
        pick = '';
       
      }

    state = {
        values : this.props.values,
        lh : this.props.lh === undefined ? '' :  this.props.lh,
        position:null,
        allUri : this.props.dictUri === undefined ? [] :  this.props.dictUri,
        allDisease : this.props.dictDisease === undefined ? [] :  this.props.dictDisease,
        
    }


     backFromResult = () => {
        this.setState({
            values : this.props.values,
            lh : this.props.lh === undefined ? '' :  this.props.lh,
            position:null,
            allUri : this.props.dictUri === undefined ? [] :  this.props.dictUri,
            allDisease : this.props.dictDisease === undefined ? [] :  this.props.dictDisease,
         });
      }

      back = e => {
        e.preventDefault();
        this.props.onPress();
      };


    renderTopBar = () => {
      return (
        <View style={styles.topBar}> 
          <TouchableOpacity style={styles.backBotton} onPress={this.back} >
              <MaterialIcons name="arrow-back" size={35} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smileFace} >     
            <Text style={styles.text}>Position</Text>
          </TouchableOpacity>
        </View>
      );
    }

    renderChoice = () => {
      console.log(this.state.lh)
      pick =  this.state.lh.toString()
      console.log('Left Hand + ', pick.includes('Left Hand'))
      return (
        <View style={styles.choiceBar}>
            <View style={styles.subContainer}>
                  <Button 
                      title="Left Hand"
                      buttonStyle={[styles.backBtn,  pick.includes('Left Hand') ? {backgroundColor : 'black'} : {backgroundColor: '#f8f8ec'} ]}
                      type="outline"
                      onPress={() => this.setState({position:'Left Hand'})}
                      titleStyle={ pick.includes('Left Hand') ? {color: 'white'}: {color: 'black'}}
                  >
                  </Button>
                  <Button 
                      title="Right Hand"
                      buttonStyle={[styles.backBtn,  pick.includes('Right Hand') ? {backgroundColor : 'black'} : {backgroundColor: '#f8f8ec'} ]}
                      type="outline"
                      onPress={() => this.setState({position:"Right Hand"})}
                      titleStyle={ pick.includes('Right Hand') ? {color: 'white'}: {color: 'black'}}
                  >
                  </Button>
                </View>

                <View style={styles.subContainer}>
                  <Button 
                      title="Left Arm"
                      buttonStyle={[styles.backBtn,  pick.includes('Left Arm') ? {backgroundColor : 'black'} : {backgroundColor: '#f8f8ec'} ]}
                      type="outline"
                      onPress={() => this.setState({position:"Left Arm"})}
                      titleStyle={ pick.includes('Left Arm') ? {color: 'white'}: {color: 'black'}}
                  >
                  </Button>
                  <Button 
                      title="Right Arm"
                      buttonStyle={[styles.backBtn,  pick.includes('Right Arm') ? {backgroundColor : 'black'} : {backgroundColor: '#f8f8ec'} ]}
                      type="outline"
                      onPress={() => this.setState({position:"Right Arm"})}
                      titleStyle={ pick.includes('Right Arm') ? {color: 'white'}: {color: 'black'}}
                  >
                  </Button>
                </View>

                <View style={styles.subContainer}>
                  <Button 
                      title="Left Leg"
                      buttonStyle={[styles.backBtn,  pick.includes('Left Leg') ? {backgroundColor : 'black'} : {backgroundColor: '#f8f8ec'} ]}
                      type="outline"
                      onPress={() => this.setState({position:"Left Leg"})}
                      titleStyle={ pick.includes('Left Leg') ? {color: 'white'}: {color: 'black'}}
                  >
                  </Button>
                  <Button 
                      title="Right Leg"
                      buttonStyle={[styles.backBtn,  pick.includes('Right Leg') ? {backgroundColor : 'black'} : {backgroundColor: '#f8f8ec'} ]}
                      type="outline"
                      onPress={() => this.setState({position:"Right Leg"})}
                      titleStyle={ pick.includes('Right Leg') ? {color: 'white'}: {color: 'black'}}
                  >
                  </Button>
                </View>

                <View style={styles.subContainer}>
                  <Button 
                      title="Left Foot"
                      buttonStyle={[styles.backBtn,  pick.includes('Left Foot') ? {backgroundColor : 'black'} : {backgroundColor: '#f8f8ec'} ]}
                      type="outline"
                      onPress={() => this.setState({position:"Left Foot"})}
                      titleStyle={ pick.includes('Left Foot') ? {color: 'white'}: {color: 'black'}}
                  >
                  </Button>
                  <Button 
                      title="Right Foot"
                      buttonStyle={[styles.backBtn,  pick.includes('Right Foot') ? {backgroundColor : 'black'} : {backgroundColor: '#f8f8ec'} ]}
                      type="outline"
                      onPress={() => this.setState({position:"Right Foot"})}
                      titleStyle={ pick.includes('Right Foot') ? {color: 'white'}: {color: 'black'}}
                  >
                  </Button>
                </View>

        </View>
      );
    }

    render () {
        pick =  this.state.lh.toString()
        if(pick.includes('Right Foot') && pick.includes('Left Foot')&&pick.includes('Right Leg')&&pick.includes('Left Leg')&&pick.includes('Right Arm')&&pick.includes('Left Arm')&&pick.includes('Left Hand')&&pick.includes('Right Hand'))
        {
                return(<Upload values = {this.state.values} allUri = {this.state.allUri} allDisease = {this.state.allDisease}></Upload>)
        }
    

      if(this.state.position != null)
      {
          return(
              <Camera 
                dictUri={this.state.allUri} 
                dictDisease={this.state.allDisease} 
                values={this.state.values} 
                position={this.state.position}  
                onPress={this.backFromResult.bind(this)} 
                lhPick={this.state.lh}
              >
              </Camera>
          )
      }

         return (
            <View style={styles.container}> 
                {this.renderTopBar()}
                {this.renderChoice()}
                
            </View>
         ); 
    }
}

const styles = StyleSheet.create({
    container: {
      // justifyContent: 'center',
      backgroundColor: '#f8f8ec',
      flexDirection: 'column',
      flex: 1,
    },
    topBar : {
      flex: 0.13,
      backgroundColor: '#46281d',
      flexDirection: 'row',
    },
    choiceBar : {
      flex: 0.87,
    },
    subContainer : {
        flexDirection: 'row',
        justifyContent : 'flex-start',
        marginLeft : 10,
        marginRight : 10,
        backgroundColor: '#f8f8ec',
    },
    text : {
      fontSize: 18,
      color: 'white',
    },
    backBotton: {
      marginTop: 40,
      marginLeft: 5,
    },
    smileFace: {
      marginTop: 50,
      marginLeft: 110,
    },
    backBtn: {
      
      borderColor: '#6a6e78',
      width: Dimensions.get('window').width/2 - 10, 
      height: Dimensions.get('window').height/4 - 25
    },
});