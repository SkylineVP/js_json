"use strict";
const loadUsersPromise=new Promise(function (resolve,request) {
   fetch('./assets/json/users.json')
       .then(resolve)
       .catch(request);
});
loadUsersPromise
    .then(response=>response.json().then(appendUseritemTolist))
    .catch(console.error);


function createUserItem(user) {
   const userItemConteiner = document.createElement("li")
   userItemConteiner.classList.add("userItem");

   const userFullNameElem = document.createElement("h3");
   userFullNameElem.innerText=`${user.name} ${user.surname}`;

   const userAge=document.createElement("h4");
   userAge.innerText=user.age;

   userItemConteiner.appendChild(createUserAvatar(user));
   userItemConteiner.appendChild(userFullNameElem);
   userItemConteiner.appendChild(userAge);


   return userItemConteiner;

}
function appendUseritemTolist(user) {
   user.forEach(user=>{document.getElementById("usersList").appendChild(createUserItem(user));});


}
function createUserAvatar(user) {
   const pictureConteiner=document.createElement("div");
   pictureConteiner.classList.add("imageConteiner");


   const initials=document.createElement("h3");
   initials.classList.add("initials");
   let [nameInitial]=user.name.split("");
   let [surnameInitial]=user.surname.split("");
   initials.innerText=`${nameInitial}${surnameInitial}`;
   pictureConteiner.appendChild(initials);

   avatarLoadPromise
       .then(avatar=>pictureConteiner.appendChild(avatar))
       .catch(err=>{
          console.error(err);
          pictureConteiner.style.backgroundColor=stringToColour(`${user.name} ${user.surname}`);
       });







   return pictureConteiner;



}
var stringToColour = function(str) {
   var hash = 0;
   for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
   }
   var colour = '#';
   for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
   }
   return colour;
}
const avatarLoadPromise = new Promise(function (resolve, reject) {
   const avatarElem=document.createElement("img");
   avatarElem.onload=function(){
      resolve(avatarElem);
   };
   avatarElem.onerror= function () {
      reject(new Error());
   };
   avatarElem.src=user.picturePath;


})


