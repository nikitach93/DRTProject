class headerbarController {
  constructor($scope,$state) {
    this.name = 'headerbar';
    this.scope=$scope;
    this.selectedAppMode = "";
    this.showTextBox =false;
    this.selectedName= "";
    this.criteriaObject={};
    this.textValue="";
    this.state=$state;
   this.isChatbot=false;
    this.criterias= [
      {
        id:"BorrowersZipCode",
        name: "Zip Code"
      },
      {
        id:"BorrowersPhoneNumber",
        name: "Phone Number"
      },
      {
        id: "BorrowersAccountNumber",
        name: "Account Number"
      },
      {
        id: "City",
        name: "City"
      }
    ];

    this.calamities= [
      {
        id:"EarthquakeNepal",
        name: "Earthquake"
      },
      {
        id:"Mumbaiflood2005",
        name: "Flood"
      },
      {
        id: "Mumbaiflood2018",
        name: "Flood 2018"
      },
      {
        id: "CycloneUS",
        name: "Cyclone"
      }
    ];
  }

  changeMode()
{
  this.scope.$broadcast("menuchanged", this.selectedAppMode);
  sessionStorage.setItem('selectedMode', this.selectedAppMode);
}

getTextBox()
{
  this.showTextBox= true;
  
    this.textValue= "Please enter " + this.selectedName.name + " here";
  
}

getChatBot(){
if(!this.isChatbot){
  this.scope.$broadcast("showChatbot", true);
}else{
  this.scope.$broadcast("showChatbot", false);
}
}

generateURL(){
  this.criteriaObject.key= this.selectedName.id;
  this.criteriaObject.calamity= this.calamity.id;
  this.scope.$broadcast("criteriaSelected", this.criteriaObject);
}
}
headerbarController.$inject = ['$rootScope','$state'];
export default headerbarController;
