class chatController {
  constructor($scope,$http,$timeout,$watch) {
    this.http= $http;
    this.self = this;
    this.timeout= $timeout;
    this.messages = [], //array that hold the record of each string in chat
    this.lastUserMessage = "", //keeps track of the most recent input string from the user
    this.botMessage = "", //var keeps track of what the chatbot is going to say
    this.botName = 'Bank Agent', //name of the chatbot
    this.talking = true; //when false the speach function doesn't work
    this.chatbox ="";
    this.data = {"input":{"text":"6543210"},"context":{"conversation_id":"1c3df824-ba66-4e49-b9c8-c0e4b3e69ad0","system":{"dialog_stack":[{"dialog_node":"Welcome"}],"dialog_turn_counter":1,"dialog_request_counter":1,"_node_output_map":{"Welcome":{"0":[0]},"node_11_1532625559339":{"0":[0]}},"branch_exited":true,"branch_exited_reason":"fallback"},"timezone":"Asia/Kolkata"},"alternate_intents":true};
    this.messages.push("<b>Bank Agent</b> : Hi");
    this.accountNumber = '';
    this.isChatCompleted=false;
    this.showImpactDetails=false;
    this.watch= $watch;
    this.scope=$scope;
    this.impactMessage="";
    this.hideOverallImapctBtn=false;
    this.impactJson=[];
    this.selectedMode ="";
    this.setUnmute =true;
    this.setMute =false;
    this.scope.$on('menuchanged', function(event, args) {
      this.selectedMode=args;
  }.bind(this.self));
        

  this.options = {
    chart: {
        type: 'discreteBarChart',
        height: 250,
        margin : {
            top: 20,
            right: 20,
            bottom: 50,
            left: 80
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
            return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
            axisLabel: 'X Axis'
        },
        yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: -10
        }
    }
  };
  this.barGraphData= [];
this.barGraphObj = {};
this.barGraphObj.key= "Cumulative Return";
this.barGraphObj.values=[];

this.custGraphData= [];
this.custGraphObj = {};
this.custGraphObj.key= "Cumulative Return";
this.custGraphObj.values=[];

this.custBenefitData= [];
this.custBenefitGraphObj = {};
this.custBenefitGraphObj.key= "Cumulative Return";
this.custBenefitGraphObj.values=[];

this.bankImpactedData=[];
this.bankImpactedGraphObj = {};
this.bankImpactedGraphObj.key= "Cumulative Return";
this.bankImpactedGraphObj.values=[];

this.showYesNoBtn =false;
  }

 
  
  newEntry() {
    //if the message from the user isn't empty then run 
    if (this.chatbox != "") {
      this.data.input.text = this.chatbox;
      //pulls the value from the chatbox ands sets it to lastUserMessage
      this.lastUserMessage = "<b>Customer: </b>"+this.chatbox;
      //sets the chat box to be clear
      this.chatbox= "";
      //adds the value of the chatbox to the array messages
      this.messages.push(this.lastUserMessage);
      console.log("data >>"+typeof(this.data));
      var myJSON = JSON.stringify(this.data);
      console.log("data json >>"+myJSON);
      var config = {
        headers : {
          'Accept': 'application/json',
            'Content-Type': 'application/json;'
        }
      }
      //this.showImpactOnBankGraph();
      this.accountNumber =  sessionStorage.getItem('accno');
      this.orginsource = sessionStorage.getItem('originSourceId');
      
    this.http.post('https://java-spring-microservice-einxk.mybluemix.net/v1/loan/callForChatBotData?accountNumber='+this.accountNumber, this.data,config).then(function (response) { 
        if (response.data){

          console.log("resp >>"+ JSON.stringify(response.data));
          this.botMessage = response.data.output.text[0]; 
          console.log(response.data.output.text[0]);
          if(response.data.output.text[0].includes("Hello")){
          this.showYesNoBtn =true;
          }else{
            this.showYesNoBtn =false;
          }
          this.messages.push("<b>" + this.botName + ":</b> " + this.botMessage);
          this.data.context = response.data.context;
          this.data.isValidUser = response.data.isValidUser;
          this.data.isCompleted = true;
          //outputs the last few array elements of messages to html
         console.log("data after response >>" + JSON.stringify(this.data));
          for (var i = 1; i < 8; i++) {
            if (this.messages[this.messages.length - i])
              document.getElementById("chatlog" + i).innerHTML = this.messages[this.messages.length - i];
          }
         /*  if(this.data.isCompleted){
            this.isChatCompleted= true;
          } */
        }         
        }.bind(this.self), function (response) {
        alert("service not available");
        }.bind(this.self));
        

      //Speech(lastUserMessage);  //says what the user typed outloud
      //sets the variable botMessage in response to lastUserMessage
     // this.chatbotResponse();
      //add the chatbot's name and message to the array messages
     
    }
  }

  yesClicked(){
    this.handleBtnClick("Yes");
  }
  noClicked(){
    this.handleBtnClick("No");
  }


  handleBtnClick(input){
      this.data.input.text = input;
      //pulls the value from the chatbox ands sets it to lastUserMessage
      this.lastUserMessage = "<b>Customer: </b>"+ input;
      //sets the chat box to be clear
      this.chatbox= "";
      //adds the value of the chatbox to the array messages
      this.messages.push(this.lastUserMessage);
      console.log("data >>"+typeof(this.data));
      var myJSON = JSON.stringify(this.data);
      console.log("data json >>"+myJSON);
      var config = {
        headers : {
          'Accept': 'application/json',
            'Content-Type': 'application/json;'
        }
      }
      //this.showImpactOnBankGraph();
      this.accountNumber =  sessionStorage.getItem('accno');
      this.orginsource = sessionStorage.getItem('originSourceId');
      
    this.http.post('https://java-spring-microservice-einxk.mybluemix.net/v1/loan/callForChatBotData?accountNumber='+this.accountNumber, this.data,config).then(function (response) { 
        if (response.data){

          console.log("resp >>"+ JSON.stringify(response.data));
          this.botMessage = response.data.output.text[0]; 
          console.log(response.data.output.text[0]);
          
          this.showYesNoBtn =false;
          
          this.messages.push("<b>" + this.botName + ":</b> " + this.botMessage);
          this.data.context = response.data.context;
          this.data.isValidUser = response.data.isValidUser;
          this.data.isCompleted = true;
          //outputs the last few array elements of messages to html
         console.log("data after response >>" + JSON.stringify(this.data));
          for (var i = 1; i < 8; i++) {
            if (this.messages[this.messages.length - i])
              document.getElementById("chatlog" + i).innerHTML = this.messages[this.messages.length - i];
          }
        
        }         
        }.bind(this.self), function (response) {
        alert("service not available");
        }.bind(this.self));
  }

  

  chatCompleted(){
      this.isChatCompleted=true;
  }

  showCustomerImpact(){
this.showImpactDetails =true;
this.hideOverallImapctBtn =false;
this.accountNumber =  sessionStorage.getItem('accno');
      this.orginsource = sessionStorage.getItem('originSourceId');
      
    if(this.selectedMode==='false' || this.selectedMode== false){
      this.apiUrl="https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?key=BorrowersAccountNumber&value="+this.accountNumber+"&originSourceId="+this.orginsource+"&mode=VERTUAL&customerOutreach=COMPLETED";
    }else{
     this.apiUrl="https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?key=BorrowersAccountNumber&value="+this.accountNumber+"&originSourceId="+this.orginsource+"&mode=REAL&customerOutreach=COMPLETED";
    }

    this.http.get(this.apiUrl)
    .then(function(response){  
      
      this.details = response.data;

      this.impactMessage = "Total impact for customer "+ this.details.rightPanel.rightTop.graphDetails.loanList[0].borrower.firstName
 +" "+this.details.rightPanel.rightTop.graphDetails.loanList[0].borrower.lastName;
      if(this.details.impactFlag){

        // --
      for (var i=0; i<this.details.rightPanel.rightTop.impactOnGraph.loanTypes.length; i++) {
        this.graphValuesObj ={};
        this.graphValuesObj.label=this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].type  ;
        this.graphValuesObj.value=this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].loanAmount  ;
        this.barGraphObj.values.push(this.graphValuesObj); 

        this.custValuesObj ={};
          this.custValuesObj.label=this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].type  ;
          this.custValuesObj.value=this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].custmerCount  ;
          this.custGraphObj.values.push(this.custValuesObj);
      
      }
      this.barGraphData.push(this.barGraphObj);
      this.custGraphData.push(this.custGraphObj);
      
      this.custBenefitData= [];
      this.custBenefitGraphObj = {};
      this.custBenefitGraphObj.key= "Cumulative Return";
      this.custBenefitGraphObj.values=[];

      this.custBenefirValuesObj ={};
      this.custBenefirValuesObj.label="Total" ;
      this.custBenefirValuesObj.value=this.details.rightPanel.rightTop.impactOnGraph.totalCustomerCount  ;
      this.custBenefitGraphObj.values.push(this.custBenefirValuesObj); 
      this.custBenefirValuesObj ={};
      this.custBenefirValuesObj.label="Bnefited" ;
      this.custBenefirValuesObj.value=this.details.rightPanel.rightTop.impactOnGraph.totalCustomersBenefited  ;
      this.custBenefitGraphObj.values.push(this.custBenefirValuesObj); 
      this.custBenefitData.push(this.custBenefitGraphObj);
   

      this.bankImpactedValuesObj ={};
      this.bankImpactedValuesObj.label="Delay in EMI" ;
      this.bankImpactedValuesObj.value=this.details.rightPanel.rightTop.impactOnGraph.totalImmediateImpactOnBank  ;
      this.bankImpactedGraphObj.values.push(this.bankImpactedValuesObj); 
      this.bankImpactedValuesObj ={};
      this.bankImpactedValuesObj.label="Relief Fund" ;
      this.bankImpactedValuesObj.value=this.details.rightPanel.rightTop.impactOnGraph.totalImpactOnBank  ;
      this.bankImpactedGraphObj.values.push(this.bankImpactedValuesObj); 
      this.bankImpactedData.push(this.bankImpactedGraphObj);

     
  
  }
      console.log("details >>" + JSON.stringify(this.details));
  }.bind(this.self), function (response) {
    this.apiNotFound = true;
    }.bind(this.self));
  } 

  showOverallImpact(){
    this.showImpactDetails =true;
    this.hideOverallImapctBtn =true;
    this.accountNumber =  sessionStorage.getItem('accno');
      this.orginsource = sessionStorage.getItem('originSourceId');
      
    this.details={};
    this.impactMessage = "Total impact on bank so far";
        if(this.selectedMode==='false' || this.selectedMode== false){
          this.apiUrl="https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?mode=VERTUAL"+"&originSourceId="+this.orginsource+"&customerOutreach=COMPLETED";
        }else{
         this.apiUrl="https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?&mode=REAL"+"&originSourceId="+this.orginsource+"&customerOutreach=COMPLETED";
        }
    
        this.http.get(this.apiUrl)
        .then(function(response){  
          
          this.details = response.data;
          if(this.details.impactFlag){

            this.barGraphData=[];
            this.barGraphObj.values=[];
            this.graphValuesObj={};
            this.custGraphData=[];
            this.custGraphObj.values=[];
            this.custValuesObj ={};
          for (var i=0; i<this.details.rightPanel.rightTop.impactOnGraph.loanTypes.length; i++) {
            this.graphValuesObj ={};
            this.graphValuesObj.label=this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].type  ;
            this.graphValuesObj.value=this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].loanAmount  ;
            this.barGraphObj.values.push(this.graphValuesObj); 
    
            this.custValuesObj ={};
              this.custValuesObj.label=this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].type  ;
              this.custValuesObj.value=this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].custmerCount  ;
              this.custGraphObj.values.push(this.custValuesObj);
          
          }
          this.barGraphData.push(this.barGraphObj);
          this.custGraphData.push(this.custGraphObj);
          
          this.custBenefitData= [];
          this.custBenefitGraphObj = {};
          this.custBenefitGraphObj.key= "Cumulative Return";
          this.custBenefitGraphObj.values=[];
    
          this.custBenefirValuesObj ={};
          this.custBenefirValuesObj.label="Total" ;
          this.custBenefirValuesObj.value=this.details.rightPanel.rightTop.impactOnGraph.totalCustomerCount  ;
          this.custBenefitGraphObj.values.push(this.custBenefirValuesObj); 
          this.custBenefirValuesObj ={};
          this.custBenefirValuesObj.label="Bnefited" ;
          this.custBenefirValuesObj.value=this.details.rightPanel.rightTop.impactOnGraph.totalCustomersBenefited  ;
          this.custBenefitGraphObj.values.push(this.custBenefirValuesObj); 
          this.custBenefitData.push(this.custBenefitGraphObj);
       
          this.bankImpactedData=[];
          this.bankImpactedValuesObj ={};
          this.bankImpactedGraphObj.values=[];
          this.bankImpactedValuesObj.label="Delay in EMI" ;
          this.bankImpactedValuesObj.value=this.details.rightPanel.rightTop.impactOnGraph.totalImmediateImpactOnBank  ;
          this.bankImpactedGraphObj.values.push(this.bankImpactedValuesObj); 
          this.bankImpactedValuesObj ={};
          this.bankImpactedValuesObj.label="Relief Fund" ;
          this.bankImpactedValuesObj.value=this.details.rightPanel.rightTop.impactOnGraph.totalImpactOnBank  ;
          this.bankImpactedGraphObj.values.push(this.bankImpactedValuesObj); 
          this.bankImpactedData.push(this.bankImpactedGraphObj);
    
      
      }
          console.log("details >>" + JSON.stringify(this.details));
      }.bind(this.self), function (response) {
        this.apiNotFound = true;
        }.bind(this.self));
      } 
    

  

  

  callGraph(){
    this.wait(7000);  //7 seconds in milliseconds
this.showImpactDetails=true;
console.log('after');
  }

   wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
  
 toggleSound(img){
img.src="http://image.flaticon.com/icons/svg/10/10776.svg";
 }


 muteFunct(){
  this.setMute=true;
  this.setUnmute=false;
}
setUnMuteFunct(){
  this.setMute=false;
  this.setUnmute=true;
}


  chatbotResponse() {
   
    this.botMessage = "I'm confused"; //the default message
  
    if (this.lastUserMessage === 'hi' || this.lastUserMessage =='hello') {
      const hi = ['hi','howdy','hello']
      this.botMessage = hi[Math.floor(Math.random()*(hi.length))];;
    }
  
    if (this.lastUserMessage === 'name') {
      this.botMessage = 'My name is ' + this.botName;
    }
  }

  checkIfEnterKeyWasPressed($event){
    var keyCode = $event.which || $event.keyCode;
    if (keyCode === 13 || keyCode=== 3) {
      this.newEntry();
    }

  };

   placeHolder() {
    document.getElementById("chatbox").placeholder = "";
  }

}
chatController.$inject = ['$scope', '$http'];

export default chatController;