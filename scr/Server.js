// Import Firebase configuration

import * as firebase from 'firebase';
import moment, { duration } from 'moment';

// Function defined
// Description: upload data
// 1) Upload Data directly into Firebase database
async function uploadData(userObj, dataObj, imgArray, diseaseArray, timestamp) {

  // Defined path references in Firebase storage
  // let ref = firebase.database().ref(dataObj.first);
  const dbh = firebase.firestore();

  const imgDict = []
  for (i = 0; i < imgArray.length; i++) {
    uri = imgArray[i].value;
    key = imgArray[i].key;


    imgDict.push({
      key: key,
      value: 'gs://extra-e10c8.appspot.com/images/' + key + '_' + timestamp + '.jpg',
    })
  }


  function replaceOther(arr1, arr2) {
    var array1 = arr1.slice()
    var index = array1.findIndex(element => element.includes("Others"))
    // var index = array1.indexOf("Others");
    if (index != -1) {
      array1[index] = arr2;
    }
    return array1;
  }

  drug = (dataObj.drug.length != 0 && dataObj.drug[0].includes('Others')) ? replaceOther(dataObj.drug, dataObj.drugOther) : dataObj.drug;
  console.log(drug)

  dbh.collection("data").doc(timestamp).set({
    // staff: userObj.Email,
    subjectId: dataObj.id,
    age: dataObj.age,
    gender: dataObj.gender,
    concentrationMG: dataObj.concenG,
    concentrationML: dataObj.concenML,
    timeUsing: dataObj.timeNore,
    timeOccuring: dataObj.timeExtra,
    drug: drug,
    diseaseType: diseaseArray,
    imgUri: imgDict,
  });

}

async function uploadImage(uri, imageName) {
  // console.log('uploadImage')
  // console.log(uri)
  // console.log(imageName)
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref().child("images/" + imageName);
  // console.log('put Image')
  return ref.put(blob);
}


export { uploadData }
export { uploadImage }