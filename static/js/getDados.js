import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { onAuthStateChanged, getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCl0JWatkJRMYBdQoFNG18aJ_GrP9UN-lk",
    authDomain: "hubbixgourmet.firebaseapp.com",
    databaseURL: "https://hubbixgourmet-default-rtdb.firebaseio.com",
    projectId: "hubbixgourmet",
    storageBucket: "hubbixgourmet.appspot.com",
    messagingSenderId: "393049551253",
    appId: "1:393049551253:web:c9b9559115f17e16a8c69c",
    measurementId: "G-JR7VJ0Q1LL"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

onAuthStateChanged(auth, (user) => {
    try{
        window.sessionStorage.setItem('email', user.email);
        document.getElementById('btnLgOut').textContent = user.email;
    }catch(error){
        console.log('Erro', error)
    }
})

document.getElementById('btnSair').onclick = function(){
    signOut(auth)
    .then(()=>{
        window.location = '/login'
    })
    .catch((error)=>{console.log(error)})
}