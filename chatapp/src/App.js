import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs,
} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAH7mjbgFDGwbDe62DDsSHmgFq0cKwiqsg',
  authDomain: 'luomu-fbd4c.firebaseapp.com',
  projectId: 'luomu-fbd4c',
  storageBucket: 'luomu-fbd4c.appspot.com',
  messagingSenderId: '542159287247',
  appId: '1:542159287247:web:57a6555670dea7608ad8ba',
  measurementId: 'G-S9HFLXKL29',
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'messages');

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs);
    const chat = [];
    const messages = [];
    snapshot.docs.forEach((doc) => {
      chat.push({ ...doc.data(), id: doc.id });
    });
    chat.forEach((elem) => console.log(elem.text));
  })
  .catch((err) => {
    console.log(err);
  });

function App() {
  return (
    <div>
      See the console
    </div>
  );
}

export default App;
