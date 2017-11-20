﻿//get element
var txtMail = document.getElementById('email');
var txtPass = document.getElementById('password');
var btnLogIn = document.getElementById('btn-login');
var btnSignUp = document.getElementById('btn-register');
var logOutBlock = document.getElementById('logOutBlock');
var btnLogOut = document.getElementById('btnLogOut');
var adminName = document.getElementById('adminName');
var btnCustomerList = document.getElementById('btnCustomerList');

//add btncustomerList Event
if (btnCustomerList) {
    btnCustomerList.addEventListener('click', e => {
        window.location.href = 'http://localhost:52398/Home/GetCustomerList';
    });
}

//add login event
if (btnLogIn) {
    btnLogIn.addEventListener('click', e => {
        //get email and password
        const email = txtMail.value;
        const pass = txtPass.value;
        //sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.then(e => {
            logOutBlock.classList.remove("hide");
            adminName.innerHTML = e.email;
            window.location.href = 'http://localhost:52398/Home/Index';

        });
        promise.catch(e => console.log(e.message));
    });
}

//add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser=> {
    
    if (firebaseUser) {
        console.log(firebaseUser.email);
       
        logOutBlock.classList.remove("hide");
        adminName.innerHTML = firebaseUser.email;
    }
    else {
        console.log('not logged in');
        logOutBlock.classList.add("hide");
    }
});

