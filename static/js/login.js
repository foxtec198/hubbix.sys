import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth()

document.getElementById('btn').onclick = function(){
    const email = document.getElementById('email').value
    const pwd = document.getElementById('pwd').value

    signInWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
        const idUser = userCredential['user']['uid']
        console.log('Conectado');
        // window.location = '/clientes/idUser='+idUser
    })
    .catch((error) => {
        const errorMessage = error.message;
        if(errorMessage == 'Firebase: Error (auth/invalid-email).'){
            document.getElementById('status').textContent = 'Email Invalido'
        }
        else if(errorMessage == 'Firebase: Error (auth/invalid-credential).'){
            document.getElementById('status').textContent = 'Senha Invalida'
        }
        else {
            document.getElementById('status').textContent = errorMessage
        }
    });
}

function checkId(){
    onAuthStateChanged(auth, (user) => {
        try{ 
            console.log('Este é seu id: ', user.uid)
            window.location = '/clientes/idUser='+user.uid
        }catch{return}
    })
};

function logout(){
    signOut(auth)
    .then(()=>{})
    .catch((error)=>{console.log(error)})
}
checkId()