

//اول حاجه هعملها اني هنادي علي العانصؤ من خلال الاي دي 
//تاني حاجه بتأكد ان الاكوا شغاله 
//console.log(title ,price,taxes,ads,discount,total,count,category,submit)

let title = document.getElementById('titel')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads= document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit= document.getElementById('submit')
let mood ='creat';
let tmp;

/*
let mood = "creat"
let tmp;*/

//تالت حجاه بعمل اول فونكشن علشان اقدر احسب الضرايب والسعر والخصم 
//-------------------------------------------------------------------------
// -1 function1= get total
function geTtotal(){

if(price.value != ''){
let result = ( +price.value + +taxes.value + +ads.value ) - +discount.value;
total.innerHTML = result;
total.style.background = '#040';
}else{
    total.innerHTML = " ";
    total.style.background = '#a00d02'
}
}

//------------------------------------------------------------------------------------------------
// -2 function2= create proudct

let datapro;
if( localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro=[];
}

submit.onclick= function(){
    let newprw ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
      
    }
 if(title.value !='' && price.value != '' && category.value !==''&&newprw.count < 200 ){
    if(mood === 'creat'){
   
        if(newprw.count > 1){
            for(let i = 0 ; i < newprw.count ; i++){
                datapro.push(newprw);
            }
        }
      }else{
        datapro[  tmp ] = newprw;
        mood='creat'
        submit.innerHTML="create"
        count.style.display="block"
      }
      clearData()    
 }
 

   
   
   
   
 // -3 save in the localstorage
    localStorage.setItem("product", JSON.stringify(datapro))
    console.log(datapro)


 
    showdata()
}
//--------------------------------------------------------------------------

   
// -4 clear inputs

function clearData(){
title.value ='';
price.value = '';
taxes.value = '';
ads.value = '';
discount.value = '';
total.innerHTML ='';
count.value = '';
category.value = '';

}
//----------------------------------------------------------------------------------
//-5 function- read
function showdata(){
   geTtotal();
let tabel='';
for(let i = 0 ; i< datapro.length ; i++ ){
 tabel += `
    <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td> 
    <td>${datapro[i].category}</td>
    <td><button onclick="UpdateData(${i})" id="update">update</button></td>
    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
    </tr>  `

}

document.getElementById("tbody").innerHTML = tabel ;

//bouttn DeletAll
let btndeletAll = document.getElementById('deleteAll');
if(datapro.length > 0){
 btndeletAll.innerHTML = `
 <button onclick="deleteall()" >Delete All(${datapro.length})</button>
 
 `
}else{
    btndeletAll.innerHTML ='';
}

}
showdata()
//------------------------------------------------------------------------------


// 7- delete

function deleteData(i){

   datapro.splice(i,1);
   localStorage.product= JSON.stringify(datapro)
   showdata()
}


function deleteall(){
    localStorage.clear;
    datapro.splice(0)
    showdata()
}

//-----------------------------------------------------------------
// 6- count 

//----------------------------------------------------------------

// 8- update function
function UpdateData(i){
title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
discount.value = datapro[i].discount;
geTtotal()
count.style.display = "none"
category.value = datapro[i].category;
submit.innerHTML = "Update"
mood = "update"
tmp= i;
scroll({
    top:0,
    behavior:"smooth",
})
}
//--------------------------------------------------------------------------

// 9- search function
let searchMood = 'title';

function getsearchMood(id){
 
    let search = document.getElementById("search");
   if(id == "searchTitel"){
        searchMood = 'title';
      
    }else{
        searchMood = 'category'
      
    }
    search.placeholder='search By ' + searchMood;
    search.focus();
    search.value = '';
    showdata();

}

//fonction the search.

function searchData(value){
    let tabel = '';
if(searchMood == 'title'){
  
for(let i = 0; i < datapro.length ; i++){
    if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
        tabel += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td> 
        <td>${datapro[i].category}</td>
        <td><button onclick="UpdateData(${i})" id="update">update</button></td>
        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>  `
    
    }
}

}else{
    for(let i = 0; i < datapro.length ; i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            tabel += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td> 
            <td>${datapro[i].category}</td>
            <td><button onclick="UpdateData(${i})" id="update">update</button></td>
            <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
            </tr>  `
        
        }
    }
}


document.getElementById("tbody").innerHTML = tabel ;


}








