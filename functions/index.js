const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


// Listens for new image added to /images 
// and set value to firestore
exports.receivedImg = functions.storage.object().onFinalize(async (object) => {
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType; // File content type.

    console.log('filePath: ' + filePath)
    console.log('contentType: ' + contentType)

    if (!contentType.startsWith('image/')) {
        return console.log('This is not an image.');
    }

    if (!filePath.startsWith('images/')) {
        return console.log('This is not upload in images/.');
    }

    // ex. Left Arm_1582057167884.jpg
    const fileName = filePath.split('/').pop();
    // get position ex. Left Arm
    const position = fileName.split('_')[0];
    // get timestamp ex. 1582057167884
    const imgName = fileName.split('_')[1];
    const timestamp = imgName.split('.')[0];

    console.log('timestamp: ' + timestamp)

    let FieldValue = require('firebase-admin').firestore.FieldValue;

    return admin.firestore().collection('data').doc(timestamp).update({
        // upload : {
        //     key : position,
        //     value : true
        // }
        upload : admin.firestore.FieldValue.arrayUnion(position)
    });
});