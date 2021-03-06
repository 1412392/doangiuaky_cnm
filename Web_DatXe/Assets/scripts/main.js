﻿
var logOutBlock = document.getElementById('logOutBlock');
var btnLogOut = document.getElementById('btnLogOut');
var telephone = document.getElementById('telephone');
var vm = new Vue({
    el: "#submitform",
    data: {
        name: "",
        phone: "",
        type: "1",
        address: ""
    },
    methods: {
        submitInfo: function () {
            var self = this;
            if (self.name == "" || self.address == "" || self.phone == "" || self.type == "") {
                bootbox.alert("<span style='color:red;'>Có lỗi xảy ra. Vui lòng thử lại</span>");
            }
            else {
                saveMessage(self.name, self.phone, self.type, self.address);
                self.name = "";
                self.phone = "";
                self.type = "1";
                self.address = "";
            }

        }
    }
});


// thiết lập xác thực firebase with google
var database = firebase.database();
const auth = firebase.auth();

//add logout event
btnLogOut.addEventListener('click', e => {
    auth.signOut();

    window.location.href = 'http://localhost:52398/Login/Login';
})

function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
};


//get all record in firebase

   window.arrUser = [];
database.ref('customer').on('child_added', function(snap){
 
    var temp={value: snap.val().telephone, address:snap.val().address};
    arrUser.push(temp);
   
});
 
console.log(arrUser);

$('#telephone').autocomplete({
   
   lookup: arrUser,
    onSelect: function (suggestion) {
        alert('Bạn chọn: ' + suggestion.value+','+suggestion.address );
        $('#address').val(suggestion.address);
    }
});






function saveMessage(a, b, c, d) {

    this.customerRef = this.database.ref('customer');
    this.customerRef.push({
        customerName: a,
        address: d,
        type: c,
        telephone: b,
        status: "0"

    }).then(function () {
        bootbox.alert("Thêm thành công");
    }.bind(this)).catch(function (error) {
        console.error('Error writing new message to Firebase Database', error);
        bootbox.alert("<span style='color:red;'>Có lỗi xảy ra. Vui lòng thử lại</span>");
    });
};

