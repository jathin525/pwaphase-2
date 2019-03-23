var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
 param=query[i].split("=");
 paramValue=parseInt(param[1]);
}
var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webKitIndexedDB;
if(!idb in window){
    alert("Browser is not supported");
}
var open=idb.open("StoreData",1);
console.log("IndexedDB is created ");

open.onupgradeneeded=function(event){
var  request=event.target.result;
request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});

}
open.onerror=function(error){
  console.log("object stored is not created",+error)
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");
var info=storeDB.get(paramValue);
info.onsuccess=function(data){
  console.log(data.target.result);
display(data.target.result);
education(data.target.result);
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right")
function display(data)
{
  var img=document.createElement("img");
  img.src="images/man.svg";
  left.append(img);

  var h3=document.createElement("h3");
  h3.textContent=data.name;
  left.append(h3);

  var email=document.createElement("h4");
  email.textContent=data.email;
  left.append(email);

  var role=document.createElement("h4");
  role.textContent=data.role;
  left.append(role);

  var mobile=document.createElement("h4");
  mobile.textContent=data.mobile;
  left.append(mobile);
//right div
  var head=document.createElement("h1");
  head.textContent="carrier objective";
  right.append(head);
  var pc=document.createElement("p");
  pc.textContent=data.carrier;
  right.append(pc);

  var head1=document.createElement("h1");
  head1.textContent="educational details";
  right.append(head1);
}
function education(data){
 var table=document.createElement('table');

        let row='';
        row+= "<tr>"+"<th>"+"college"+
        "</th>"+"<th>"+"degree"+
        "</th>"+"<th>"+"branch"+
        "</th>"+"<th>"+"marks"+
        "</th>"+"</tr>";
        for(i in data.education){
          row+= "<tr>"+"<td>"+data.education[i].college+
          "</td>"+"<td>"+data.education[i].degree+
          "</td>"+"<td>"+data.education[i].branch+
          "</td>"+"<td>"+data.education[i].marks+
          "</td>"+  "</tr>";
        }
        table.innerHTML=row;
        right.append(table);

        var technical=document.createElement("h1");
        technical.textContent="skills :";
        right.append(technical);

        var skills=document.createElement("p");
        skills.textContent=data.skills;
        right.append(skills);

}
