import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB0OmxcGPHlQp3R_fjtzFFDbFOpd9cZpWg",
    authDomain: "laundromatch-ada09.firebaseapp.com",
    databaseURL: "https://laundromatch-ada09.firebaseio.com",
    projectId: "laundromatch-ada09",
    storageBucket: "laundromatch-ada09.appspot.com",
    messagingSenderId: "100338533266",
    appId: "1:100338533266:android:0cf5a1a42d84dc80c9774b"
};

firebase.initializeApp(firebaseConfig);

export default firebase;