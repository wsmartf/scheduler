import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDt9UBo-860R7HFiSucWQN71pzB7m2P7fU",
  authDomain: "scheduler-e771f.firebaseapp.com",
  databaseURL: "https://scheduler-e771f-default-rtdb.firebaseio.com",
  projectId: "scheduler-e771f",
  storageBucket: "scheduler-e771f.appspot.com",
  messagingSenderId: "56353701405",
  appId: "1:56353701405:web:713641a85be59cbe85d0f4",
  measurementId: "G-MWJMT04LG4"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

  export const setData = (path, value) => (
    set(ref(database, path), value)
  );