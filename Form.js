import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import Camera from './Newcamera.js'
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
    {children}
  </TouchableWithoutFeedback>
);

const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0

export default class Form extends Component {
  constructor(props) {
    super(props);
    checkId = true;
    checkAge = true;
    checkGender = true;
    checkConcenG = true;
    checkConcenML = true;
    checkDrug = true;
    checkDrugOther = true;
  }
  state = {
    fPickerVisible: false,
    sPickerVisible: false,
    id: '',
    age: 0,
    gender: '',
    concenG: 0,
    concenML: 0,
    timeNore: moment().format('DD MMM YYYY HH:mm'),
    timeExtra: moment().format('DD MMM YYYY HH:mm'),
    isNext: false,
    drug: [],
    drugOther: '',
    checkAll: false,
    // checkTimeNore : false,
    // checkTimeExtra : true,
  }

  drugs = [
    {
      name: 'Hyperosmolar agents',
      id: 'Hyperosmolar agents',
      problem: [
        { name: '5.5% calcium gluconate', id: '5.5% calcium gluconate', },
        { name: '10% calcium gluconate', id: '10% calcium gluconate', },
        { name: '20% lipid', id: '20% lipid', },
        { name: '50% MgSo4', id: '50% MgSo4', },
        { name: 'Contrast media', id: 'Contrast media', },
        { name: 'Dextrose (>10%)', id: 'Dextrose (>10%)', },
        { name: 'KCl (> 40 mmol/L)', id: 'KCl (> 40 mmol/L)', },
        { name: 'Mannitol', id: 'Mannitol', },
        { name: 'NSS (>3-10%)', id: 'NSS (>3-10%)', },
        { name: 'PPN/ TPN', id: 'PPN/ TPN', },
        { name: 'Phenytoin', id: 'Phenytoin', },
        { name: 'Others', id: 'OthersHyperosmolar', },
      ],
    }, {
      name: 'Chemotherapy',
      id: 'Chemotherapy',
      problem: [
        { name: 'Bleomycin C', id: 'Bleomycin', },
        { name: 'Cisplatin', id: 'Cisplatin', },
        { name: 'Carmustine Cetuximab', id: 'Carmustine Cetuximab', },
        { name: 'Cyclophosphamide', id: 'Cyclophosphamide', },
        { name: 'Dacarbazine Etoposide', id: 'Dacarbazine Etoposide', },
        { name: 'Dactinomycin', id: 'Dactinomycin', },
        { name: 'Doxorubicin', id: 'Doxorubicin', },
        { name: 'Docetaxel', id: 'Docetaxel', },
        { name: 'Epirubicin', id: 'Epirubicin', },
        { name: 'Gemtalabine Teniposide', id: 'Gemtalabine Teniposide', },
        { name: 'Idarubicin', id: 'Idarubicin', },
        { name: 'Mitomycin C', id: 'Mitomycin C', },
        { name: 'Oxaliplatin', id: 'Oxaliplatin', },
        { name: 'Paclitaxel', id: 'Paclitaxel', },
        { name: 'Vinblastine Vincristine', id: 'Vinblastine Vincristine', },
        { name: 'Vindesine Vinorelbine', id: 'Vindesine Vinorelbine', },
        { name: 'Others', id: 'OthersChemotherapy', },
      ],
    }, {
      name: 'Vascular regulators',
      id: 'Vascular regulators',
      problem: [
        { name: 'Adrenaline', id: 'Adrenaline', },
        { name: 'Dobutamine', id: 'Dobutamine', },
        { name: 'Dopamine', id: 'Dopamine', },
        { name: 'Norepinephrine', id: 'Norepinephrine', },
        { name: 'Others', id: 'OthersVascular', },
      ],
    }, {
      name: 'Antibiotic (Acid) & (alkaline)',
      id: 'Antibiotic (Acid) & (alkaline)',
      problem: [
        { name: 'Acyclovir', id: 'Acyclovir', },
        { name: 'Aminophylline', id: 'Aminophylline', },
        { name: 'Amphotericin B', id: 'Amphotericin B', },
        { name: 'Cefotaxime', id: 'Cefotaxime', },
        { name: 'Ceftriaxone', id: 'Ceftriaxone', },
        { name: 'Co trimoxazole', id: 'Co trimoxazole', },
        { name: 'Erythromycin', id: 'Erythromycin', },
        { name: 'Ganciclovir', id: 'Ganciclovir', },
        { name: 'Liposomal Amphotericin B', id: 'Liposomal Amphotericin B', },
        { name: 'Penicillin', id: 'Penicillin', },
        { name: 'Vancomycin', id: 'Vancomycin', },
        { name: 'Others', id: 'OthersAntibiotic', },
      ],
    }, {
      name: 'Sedative drugs & Anticonvulsant',
      id: 'Sedative drugs & Anticonvulsant',
      problem: [
        { name: 'Diazepam', id: 'Diazepam', },
        { name: 'Phenobarbital', id: 'Phenobarbital', },
        { name: 'Thiopental', id: 'Thiopental', },
        { name: 'Others', id: 'OthersSedative', },
      ],
    }, {
      name: 'Arrythmia drugs & vasopressor',
      id: 'Arrythmia drugs & vasopressor',
      problem: [
        { name: 'Amiodarone', id: 'Amiodarone', },
        { name: 'Digoxin', id: 'Digoxin', },
        { name: 'Vasopressin', id: 'Vasopressin', },
        { name: 'Others', id: 'OthersArrythmia', },
      ],
    }, {
      name: 'Others',
      id: 'Others',
      problem: [
        { name: 'Others', id: 'Others', },
      ],
    }
  ];

  back = e => {
    e.preventDefault();
    this.props.onPress();
  };
  backFromResult = () => {
    this.setState({
      fPickerVisible: false,
      sPickerVisible: false,
      id: '',
      age: 0,
      gender: '',
      concenG: 0,
      concenML: 0,
      timeNore: moment().format('DD MMM YYYY HH:mm'),
      timeExtra: moment().format('DD MMM YYYY HH:mm'),
      isNext: false,
      checkAll: false,
      drug: [],
      drugOther: '',
    });
    checkId = true;
    checkAge = true;
    checkGender = true;
    checkConcenG = true;
    checkConcenML = true;
    checkDrug = true;
    checkDrugOther = true;
  }
  onButtonPress = e => {
    if (this.validate()) {
      // e.preventDefault();
      // this.setState({ isNext: true });
    }
  }
  validate = () => {
    if (this.state.id == '') {
      checkId = false
    }
    else {
      checkId = true
    }
    if (this.state.age == 0) {
      checkAge = false
    }
    else {
      checkAge = true
    }
    if (this.state.gender == '') {
      checkGender = false
    }
    else {
      checkGender = true
    }
    if (this.state.concenG == 0) {
      checkConcenG = false
    }
    else {
      checkConcenG = true
    }
    if (this.state.concenML == 0) {
      checkConcenML = false
    }
    else {
      checkConcenML = true
    }
    if (this.state.drug.length == 0) {
      checkDrug = false;
    } else {
      checkDrug = true;
    }

    if (this.state.drug.length != 0 && this.state.drug[0].includes('Others')) {
      if (this.state.drugOther == '') {
        checkDrugOther = false;
      } else {
        checkDrugOther = true;
      }
    }
    // if(this.state.timeNore == moment().format('DD MMM YYYY HH:mm'))
    // {
    //   this.state.checkTimeNore = false;
    // }
    // else{
    //   this.state.checkTimeNore = true;
    // }
    // if(this.state.timeExtra == moment().format('DD MMM YYYY HH:mm'))
    // {
    //   this.state.checkTimeExtra = false;
    // }
    // else{
    //   this.state.checkTimeExtra = true;
    // }
    const allValid = checkId && checkAge && checkGender && checkConcenG && checkConcenML && checkDrug && checkDrugOther;
    if (allValid) {
      this.setState({ checkAll: true })
    } else {
      this.setState({ checkAll: false })
    }

    if (allValid) {
      this.setState({ isNext: true });
    } else {
      this.setState({ isNext: false });
    }
    return this.state.checkAll;
  }
  renderError = (type, text) => {
    if (!type) {
      return <Text style={styles.error}>{text}</Text>;
    }
    return null;
  }
  renderForm() {
    return (
      <DismissKeyboard>
        {/* <View style={styles.container}> */}
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? "padding" : null} keyboardVerticalOffset={keyboardVerticalOffset} enabled>
          <View style={styles.subContainer}>
            <TouchableOpacity style={styles.logoutHeader} onPress={this.back} >
              <MaterialIcons name="arrow-back" size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.profileHeader}>
              <Text style={styles.header}>Profile</Text>
            </View>
          </View>
          <ScrollView style={styles.formArea}>
            <Text style={styles.subheader}>Subject ID</Text>
            <TextInput
              style={[styles.textinput]}
              placeholder='Subject ID'
              returnKeyType="next"
              keyboardType="number-pad"
              onSubmitEditing={() => this.ageInput.focus()}
              maxLength={20}
              onChangeText={(e) => this.setState({ id: e })}
              defaultValue={this.state.id}
              autoCorrect={false}
            />
            {this.renderError(checkId, 'please enter Subject ID.')}
            <Text style={styles.subheader}>Age</Text>
            <TextInput
              style={[styles.textinput]}
              placeholder='Age'
              returnKeyType="next"
              keyboardType="number-pad"
              ref={(input) => this.ageInput = input}
              maxLength={2}
              onChangeText={(e) => this.setState({ age: e })}
              defaultValue={this.state.age}
              autoCorrect={false}
            />
            {this.renderError(checkAge, 'please enter Age.')}
            <Text style={styles.subheader}>Gender</Text>
            <RadioForm
              radio_props={[
                { label: 'Male', value: "MALE" },
                { label: 'Female', value: "FEMALE" },
              ]}
              initial={-1}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'#2196f3'}
              onPress={(e) => this.setState({ gender: e })}
              style={styles.form}
              buttonSize={15}
              labelStyle={{ fontSize: 16, marginHorizontal: 5 }}
              buttonColor={'#3d1c02'}
              selectedButtonColor={'#3d1c02'}
            />
            {this.renderError(checkGender, 'please enter Gender.')}


            <Text style={styles.subheader}>Drug</Text>
            <View>
              <SectionedMultiSelect
                items={this.drugs}
                uniqueKey="id"
                selectText="ระบุ..."
                subKey="problem"
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={(e) => this.setState({ drug: e })}
                selectedItems={this.state.drug}
                expandDropDowns={false}
                searchPlaceholderText="Search"
                colors={{ subText: '#000000'  }}
                single={true}
                styles={{
                  container: {
                    backgroundColor: 'white',
                  },
                  selectToggle: {
                    // backgroundColor: '#e2e2e2',
                    // backgroundColor: '#f2f2f2',
                    borderWidth: 1,
                    borderColor: '#6a6e78',
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginBottom: 5,
                  },
                  selectToggleText: {
                    // fontWeight: 'bold'
                  }
                }}
              />
            </View>
            {this.renderError(checkDrug, 'please enter Drug')}

            {this.state.drug.length != 0 && this.state.drug[0].includes('Others') ?
              <View>
                <Text style={styles.subheader}>โปรดระบุ </Text>
                <TextInput
                  style={[styles.textinput]}
                  placeholder='Drug'
                  returnKeyType="next"
                  // keyboardType="number-pad"
                  // onSubmitEditing={() => this.ageInput.focus()}
                  maxLength={20}
                  onChangeText={(e) => this.setState({ drugOther: e })}
                  defaultValue={this.state.drugOther}
                  autoCorrect={false}
                />
              </View> : <View></View>
            }
            {this.renderError(checkDrugOther, 'please enter Drug')}



            <Text style={styles.subheader}>Concentration (mg/ml)</Text>
            <View style={styles.concentrationArea}>
              <TextInput
                style={[styles.textinput, { width: 150 }]}
                placeholder='mg'
                returnKeyType="next"
                keyboardType="number-pad"
                onSubmitEditing={() => this.concenML.focus()}
                maxLength={5}
                onChangeText={(e) => this.setState({ concenG: e })}
                defaultValue={this.state.concenG}
                autoCorrect={false}
              />
              <Text style={styles.subheader}>/</Text>
              <TextInput
                style={[styles.textinput, { width: 150 }]}
                placeholder='ml'
                returnKeyType="next"
                keyboardType="number-pad"
                ref={(input) => this.concenML = input}
                maxLength={5}
                onChangeText={(e) => {
                  this.setState({ concenML: e });
                }}
                defaultValue={this.state.concenML}
                autoCorrect={false}
              />
            </View>
            {this.renderError(checkConcenG, 'please enter Concentration (mg).')}
            {this.renderError(checkConcenML, 'please enter Concentration (ml).')}
            <Text style={styles.subheader}>Start time for using drug</Text>
            <DateTimePicker
              isVisible={this.state.fPickerVisible}
              onConfirm={(e) => {
                e = moment(e).format('DD MMM YYYY HH:mm');
                console.log('timeNora: ' + e);
                this.setState({ timeNore: e });
                this.setState({ fPickerVisible: false })
              }}
              onCancel={() => { this.setState({ fPickerVisible: false }) }}
              mode={'datetime'}
              maximumDate={new Date()}
            />
            <Button
              icon={
                <Icon
                  name='calendar'
                  type='font-awesome'
                  color='#165d5a'
                />
              }
              title={(this.state.timeNore).toString()}
              buttonStyle={[styles.backBtn, { width: 250 }, { height: 40 }]}
              type="outline"
              onPress={() => this.setState({ fPickerVisible: true })}
              titleStyle={{ color: 'black', paddingLeft: 10 }}
            >
            </Button>
            {/* {this.renderError(this.state.checkTimeNore, 'Start time can not be blank.')}      */}
            <Text style={styles.subheader}>Start time for occuring extravasation</Text>
            <DateTimePicker
              isVisible={this.state.sPickerVisible}
              onConfirm={(e) => {
                e = moment(e).format('DD MMM YYYY HH:mm');
                console.log('timeExtra: ' + e)
                this.setState({ timeExtra: e });
                this.setState({ sPickerVisible: false })
              }}
              onCancel={() => { this.setState({ sPickerVisible: false }) }}
              mode={'datetime'}
              maximumDate={new Date()}
            />
            <Button
              icon={
                <Icon
                  name='calendar'
                  type='font-awesome'
                  color='#165d5a'
                />
              }
              title={(this.state.timeExtra).toString()}
              buttonStyle={[styles.backBtn, { width: 250 }, { height: 40 }]}
              type="outline"
              onPress={() => this.setState({ sPickerVisible: true })}
              titleStyle={{ color: 'black', paddingLeft: 10 }}
            >
            </Button>
            {/* {this.renderError(this.state.checkTimeExtra, 'Start time can not be blank.')}    */}
            <View style={styles.btntap}>
              <Button
                title="NEXT"
                onPress={this.validate}
                buttonStyle={[styles.nextBtn, { width: 300, height: 50 }]}
                type="solid"
                titleStyle={{ color: 'white' }}
              />
            </View>
          </ScrollView>
          {/* <View style={styles.btntap}>
          </View> */}
        </KeyboardAvoidingView>
        {/* </View> */}
      </DismissKeyboard>
    );
  }
  render() {
    // console.log(this.state);
    const x = this.state.isNext ? <Camera sendDrug={this.state.drug} values={this.state} onPressLogout={this.props.onPressLogout}> onPress={this.backFromResult.bind(this)} ></Camera> : this.renderForm();
    const content = x;
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    backgroundColor: '#F5F7F4',
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    fontSize: 18,
    color: 'white',
    marginTop: 40,
  },
  profileHeader: {
    marginTop: 5,
    marginLeft: 110
  },
  logoutHeader: {
    marginTop: 40,
    marginLeft: 10
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    marginTop: 10,
  },
  textinput: {
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#6a6e78',
    paddingLeft: 5,
    borderRadius: 10,
    height: 40,
    color: 'black',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 90,
    paddingLeft: 10
  },
  concentrationArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
    backgroundColor: '#f8f8ec',
    borderColor: '#6a6e78',
  },
  nextBtn: {
    backgroundColor: '#B6452C',
    borderColor: '#B6452C',
    // marginTop: 30,
    justifyContent: 'center',
    borderRadius: 5,
  },
  subContainer: {
    backgroundColor: '#2B435F',
    flex: 0.17,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  btntap: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0.2,
    marginVertical: 40
  },
  formArea: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    flex: 0.8,
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  formpicker: {
    marginHorizontal: 5,
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 10,
    height: 70,
    justifyContent: 'center',
  },
});