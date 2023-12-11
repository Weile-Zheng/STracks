// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
/**
 * App check is a wrapper that encapsulates a variety of protection solutions incuding 
 * App check would prevent sites other than your own from accessing your firebase resources.
 * Recaptcha helps to block bots or spammers from your own site.  
 * 
 */

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDaEmoP8LT_mV_E96QDeIG0OsFmXlkRmZE", 
    authDomain: "stracks.firebaseapp.com", 
    projectId: "stracks", 
    storageBucket: "stracks.appspot.com", 
    messagingSenderId: "807344813612", 
    appId: "1:807344813612:web:0936ae4911fe103dcfc389", 
    measurementId: "G-5LZ0F03D4D"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider("6LfYMiQpAAAAANYQTvMf2atD2llCPy4acaKHJR7s"),
// Optional argument. If true, the SDK automatically refreshes App Check
// tokens as needed.
isTokenAutoRefreshEnabled: true
});


export default firebaseApp;



//--------------Firestore---------------//


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider("6LfYMiQpAAAAANYQTvMf2atD2llCPy4acaKHJR7s"),
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});


/**
 * add a document(data entry) to signups collection
 * @param {string} name  
 * @param {string} email
 * @param {string} spotifyID(optional)
 * Note that this is a different method than clientID and client secret. 
 */
export async function addToSignupForm(name, email, spotifyID=""){
    await addDoc(collection(db, "signups"), {
      Name: name,
      Email: email,
      SpotifyID:spotifyID
  });
  
}

