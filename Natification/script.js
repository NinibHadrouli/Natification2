document.body.style.backgroundImage="url('images/bg.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
let alarmes=[];
let triggeredAlarmes=[];

let btnDelete=[];
const testAlarm={
    addedDate:"2020-01-31",
    addedTime:"13:33",
    addedName:"myTest",
    addedStatus:"Active",
}
//alarmes.push(testAlarm);
//console.log(alarmes);

const h1=document.getElementById("h1");
const btnPlus=document.getElementById("btnPlus");
const btnSave=document.getElementById("btnSave");
const fetchData=document.getElementById("fetchData");

const inputElement=document.querySelector(".inputElement");
const dateInput=document.getElementsByClassName("dateInput");

setNewData();
btnPlus.addEventListener("click",showControl);
// Show input fields 
function showControl(e){
  
    if(inputElement.style.width===""||inputElement.style.width==="37px"){
        e.target.style.transform="rotate(45deg)";
        inputElement.style.width="580px";
        dateInput[0].style.display="inline";
        dateInput[1].style.display="inline";
        document.getElementById("nameInput").style.display="inline";
        btnSave.style.display="inline";
        document.getElementById("nameInput").focus();
    }else{
        e.target.style.transform="rotate(0deg)";
        
        inputElement.style.width="37px";
            
        dateInput[0].style.display="none";
        dateInput[1].style.display="none";
        document.getElementById("nameInput").style.display="none";
        btnSave.style.display="none";
        document.getElementById("timeInput").value="";
        document.getElementById("dateInput").value="";
        btnSave.style.color="#f18c2e";

    }
}
////////////////////////

btnSave.addEventListener("click",saveNewAlarm);
function saveNewAlarm(e){
   //Get inputs value
    let inDate=document.getElementById("dateInput").value;
    let inTime=document.getElementById("timeInput").value;
    let inName=document.getElementById("nameInput").value;

    //Check if inputs value is not empty
    if(inTime!==""&&inDate!==""&&inName!==""){
        
        const newAlarm={
            addedDate:inDate,
            addedTime:inTime,
            addedName:inName,
            addedStatus:"Active",
        }
        //set inputs value in an array
        alarmes.push(newAlarm);
       
        //invoke function setNewData to set in Html file
        setNewData();

        // Invoke  checkingDate and passing the new alarm's name
        checkingDate();
        
        //Empty the feilds
        document.getElementById("timeInput").value="";
        document.getElementById("dateInput").value="";
        document.getElementById("nameInput").value="";
        e.target.style.color="#f18c2e";
        //checkingPassedAlarm();
    }else{
        e.target.style.color="red";
    }

};


var fetchFullDate=0;
var raknare=0;
let fullNewDateInAlarm2;
function checkingDate(){
    if(alarmes.length>0){
        //Get current full date 
        getCurrentTime();
                //Check current date with alarems
   
               alarmes.map((alarm)=>{
                 fullNewDateInAlarm2 =`${alarm.addedDate} ${alarm.addedTime}`;   
               /*  console.log(fullNewDateInAlarm2);
                console.log(getCurrentTime()); */
                
        if(getCurrentTime()===fullNewDateInAlarm2){
            //Invoke setNotification and passing the 
            
            setNotification(alarm.addedName);
            console.log("It is matchad");
            triggeredAlarmes.push(fullNewDateInAlarm2);// set the deleted alarm to a new array.
            alarmes.splice(alarm,1);  // Remove the alarm as tirggered from alarms.
            console.log(triggeredAlarmes);
            //checkingTriggeredAlarms();
            checkingPassedAlarm();
            
        }else{
            startTimer();
        }
    });
    }else{
       // console.log("The Array is empty");
    }
}
    
    let startTimer=()=>{
        setTimeout(()=>{
           // console.log("in timer "+raknare);
            raknare ++;
            checkingDate();
        },1000);
    }
    
 

//Set Notification
const setNotification=(notiName)=>{

    if(`Notification`in window){
       const options={
          // body:`New Notification`,
           lang:`en-En`,
           dir:`ltr`,
           icon:`images/noti.ico`,
           /* timestamp:dts, */
           //image:"images/Facebook_icon.png",
           data:{site:`www.google.com`}
       }
       
       if(Notification.permission!==`granted`){
           Notification.requestPermission()
           .then(function(result){
               if(result===`granted`){
                   
                   let notif=new Notification(notiName,options);
                   notif.addEventListener("show",function(event){
                       console.log(`Notiv activ ${event}`);
                       //notif.close();
                   })
               }
           })
           .catch((err)=>{
               console.log(err);
           })
       }else{
           let notif=new Notification(notiName,options);
           notif.addEventListener("show",function(event){
               console.log(`Notiv activ `);
              // notif.close();
               
           })
       }
       
   }else{
       alert(`Your browser doesn't support Notification`);
   }
}


// set data in Html file

function setNewData(){
    const fullDate=`${document.getElementById("dateInput")} ${document.getElementById("timeInput")}`;
    
   // console.log(alarmes);
    let part1=`
        <table>    
            <tr class="allData">
                <tr>
                    
                    <th>Name</th>
                    <th>Alarms</th>
                    <th>Status</th>
                </tr>`;
    let newPart2="";
    alarmes.forEach(ele=>{
        newPart2 += `
        <tr>
            
            <td class="timeData">${ele.addedName}</td>
            <td class="timeData inFullTime">${ele.addedDate} ${ele.addedTime}</td>
            <td class="timeData" id="status">${ele.addedStatus}</td>
            <td >
               
                <label class="btnLabels btns btnDelete"id="btnDelete">Delete</label>
            </td>
        </tr> `;
    })
    
    let part3=`</table>`;
    const newTr=`
    ${part1} 
    ${newPart2}
    ${part3}
    `;
    
    fetchData.innerHTML = newTr;
    
    

 btnDelete=document.getElementsByClassName("btnDelete");

   console.log(btnDelete[0]);
   console.log(btnDelete.length);
   if(btnDelete.length!==0){
       for(i=0;i<btnDelete.length;i++){
        btnDelete[i].addEventListener("click",deteteAlarm);
       }
      /*   btnDelete.forEach(btn=>{

            btn.addEventListener("click",deteteAlarm);
        }) */
   }
};


function deteteAlarm(e){
    const tirggeredAlameInHtml=e.target.parentElement.parentElement.childNodes[3].innerText;
    console.log(tirggeredAlameInHtml);
    alarmes.map((ale)=>{
        const alarmInAlarms=`${ale.addedDate} ${ale.addedTime}`;
        console.log(alarmInAlarms);
        if(tirggeredAlameInHtml===alarmInAlarms){
            alarmes.splice(ale,1);
        }
    })
    e.target.parentElement.parentElement.remove();

};
///////////////////
const getCurrentTime=()=>{
    var dateNow=new Date();
    var dDet={
              year:dateNow.getFullYear(),
              month:dateNow.getMonth(),
              date:dateNow.getDate(),
              hours:dateNow.getHours(),
              minuts:dateNow.getMinutes(),
              seconds:dateNow.getSeconds()
              };
             
              let correctMonth=dDet.month+1;
             
              // check if minuts and month are less an 10
              if(dDet.minuts<10){
                  dDet.minuts=`0${dDet.minuts}`;
              }
              if(correctMonth<10){
                  correctMonth=`0${correctMonth}`;
              }
              if(dDet.date<10){
                  dDet.date=`0${dDet.date}`;
              }
              // Set current date string formel to  match with same alarms formel
              return  `${dDet.year}-${correctMonth}-${dDet.date} ${dDet.hours}:${dDet.minuts}`;
              
}
////




let num=1;
let allTimesInHtml;
let elementsInTr=[];
let checkingPassedAlarm=()=>{
    let myName="Loop";
    console.log(myName+" "+ num);
    num ++;
    
   //function checkingTriggeredAlarms(){
         allTimesInHtml=document.getElementsByClassName("inFullTime");
         
        if(allTimesInHtml.length>0){

            console.log(allTimesInHtml);
            console.log(allTimesInHtml[0].innerText);
            console.log(allTimesInHtml.length);
            for(let e=0;e<allTimesInHtml.length;e++){
                const eleText=allTimesInHtml[e];
                console.log(eleText);
                console.log(triggeredAlarmes);
        
            let isInclude= triggeredAlarmes.includes(eleText.innerText);
            console.log(isInclude);
            if(isInclude){
                //alert("It is in");
                eleText.style.textDecoration="line-through";
                console.log(eleText.firstChild);
                elementsInTr=eleText.parentElement;
                console.log(elementsInTr);
                console.log(elementsInTr.childNodes);
                elementsInTr.childNodes[1].style.textDecoration="line-through";
                elementsInTr.childNodes[5].innerText="Triggered";
                elementsInTr.childNodes[5].style.color="red";
                console.log(elementsInTr.children);
               
                
            }
                
            }
       // }
    }else{
        console.log("The array is less than 1")
    }
//checkingTriggeredAlarms();
    
    
    /* allTimesInHtml.foreach((line)=>{

        console.log(line);
    }) */
}

//checkingPassedAlarm();

/* triggeredAlarmes.map((tAlarm)=>{
    console.log(1===1);
    if(element.innerText===tAlarm){
        alert("It is in");
    }
}) */