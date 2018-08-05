import { TransitionHookPhase } from "@uirouter/core";

class homeController {
  constructor($scope, $http, $interval, $rootScope,uiGmapIsReady) {

    this.name = 'home';
    this.http = $http;
    this.self = this;
    this.uiGmapIsReady =uiGmapIsReady;

    this.graphData = {};
    this.ndata = [{
      key: "Cumulative Return",
      values: []
    }];

    this.showLine= false;

    this.markers = [];

    this.slides = [];

    this.map = {};
    this.map.center = {};
    this.markers1 = [];

    this.map1 = {};
    this.map1.center = {};

    this.droneCapturedImages = [];
    this.showTrack = false;

    // this.markersOptions = { animation: new window.google.maps.Animation.BOUNCE };

    this.scope = $scope;
    this.$interval = $interval;
    this.data = [];
    this.details = {};
    this.criteriaObj = {};
    this.apiUrl = "";
    this.apiNotFound = false;
    this.getChartData();
    this.showChatbot = false;
    // this.scope.$on('menuchanged', this.listenGreeting)
    this.selectedMode = "";
    //this.myInterval = 5000;
    this.scope.noWrapSlides = false;
    this.currIndex = 0;
    this.isNewsList = false;
    this.slides = [];
    sessionStorage.removeItem('selectedMode');

    

    this.scope.$on('menuchanged', function (event, args) {
      this.selectedMode = args;
      if (Object.keys(this.criteriaObj).length != 0) {
        if (this.selectedMode === 'true' || this.selectedMode == true) {
          this.apiUrl = "https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?key=" + this.criteriaObj.key + "&value=" + this.criteriaObj.value + "&mode=REAL";
        } else {
          this.apiUrl = "https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?key=" + this.criteriaObj.key + "&value=" + this.criteriaObj.value + "&mode=VIRTUAL";
        }
      }
      this.getChartData();
    }.bind(this.self));
    this.scope.$on('showChatbot', function (event, args) {
      if (args) {
        this.showChatbot = true;
      } else {
        this.showChatbot = false;
      }
    }.bind(this.self));


    this.scope.$on('criteriaSelected', function (event, obj) {
      this.criteriaObj = obj;
      if (this.selectedMode === 'true' || this.selectedMode == true) {
        this.apiUrl = "https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?key=" + this.criteriaObj.key + "&value=" + this.criteriaObj.value + "&originSourceId=" + this.criteriaObj.calamity + "&mode=REAL";
      } else {
        this.apiUrl = "https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?key=" + this.criteriaObj.key + "&value=" + this.criteriaObj.value + "&originSourceId=" + this.criteriaObj.calamity + "&mode=VIRTUAL";
      }
      sessionStorage.setItem('accno', this.criteriaObj.value);
      sessionStorage.setItem('originSourceId', this.criteriaObj.calamity);
      sessionStorage.setItem('selectedMode', this.selectedMode);
      this.getChartData();
    }.bind(this.self));

    /* this.startInterval = function(isNewsList) {
     if(isNewsList) {
       this.intervalRef = setInterval(function () {
         this.getChartData();
   
       }.bind(this.self), 10000000)
     } else {
       this.intervalRef = setInterval(function() {
         this.getChartData();
       }.bind(this.self), 20000000);
     }
   }
*/
    // graph --------
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 350,
        margin: {
          top: 20,
          right: 20,
          bottom: 50,
          left: 80
        },
        x: function (d) { return d.label; },
        y: function (d) { return d.value; },
        showValues: true,
        valueFormat: function (d) {
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
    this.barGraphData = [];
    this.barGraphObj = {};
    this.barGraphObj.key = "Cumulative Return";
    this.barGraphObj.values = [];

    this.custGraphData = [];
    this.custGraphObj = {};
    this.custGraphObj.key = "Cumulative Return";
    this.custGraphObj.values = [];

  }


  markerClicked() {
     swal({
      title: "Drone Status",
      text: "Journey towards target started...",
      imageUrl: 'https://static.thenounproject.com/png/76060-200.png',
      timer: 3000
    }); 

    this.showLine=true;
  }

  getChartData() {

    this.details = "";
    this.showLine=false;
   
    if (Object.keys(this.criteriaObj).length === 0) {
      if (this.selectedMode === 'true' || this.selectedMode == true) {
        this.apiUrl = "https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?mode=REAL";
      } else {
        this.apiUrl = "https://java-spring-microservice-einxk.mybluemix.net/v1/loan/panelData?mode=VIRTUAL";
      }
    }
    this.apiNotFound = false;
    this.http.get(this.apiUrl)
      .then(function (response) {
        this.details = response.data;
        if (this.details.newsFlag && this.details.rightPanel.rightTop.newsDetails.newsDataList.length > 1) {
          clearInterval(this.intervalRef);
          // this.startInterval(false);
        } else {
          clearInterval(this.intervalRef);
          // this.startInterval(true);
        }
        console.log(response.status);
        console.log(this.details);
        console.log(this.details.rightPanel.rightTop.graphDetails.summary.loanTypes);
        // this.labels
        this.graphValuesObj = {};
        this.custValuesObj = {};
        this.barGraphObj.values = [];
        this.custGraphObj.values = [];
        this.custGraphData = [];
        this.barGraphData = [];
        for (var i = 0; i < this.details.rightPanel.rightTop.graphDetails.summary.loanTypes.length; i++) {
          this.graphValuesObj = {};
          this.graphValuesObj.label = this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].type;
          this.graphValuesObj.value = this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].loanAmount;
          this.barGraphObj.values.push(this.graphValuesObj);

          this.custValuesObj = {};
          this.custValuesObj.label = this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].type;
          this.custValuesObj.value = this.details.rightPanel.rightTop.graphDetails.summary.loanTypes[i].custmerCount;
          this.custGraphObj.values.push(this.custValuesObj);

        }
        this.custGraphData.push(this.custGraphObj);
        this.barGraphData.push(this.barGraphObj);
        this.map.center.latitude = this.details.rightPanel.rightTop.mapDetails.minLatitude;
        this.map.center.longitude = this.details.rightPanel.rightTop.mapDetails.minLongitude;
        this.map.zoom = 12;

        this.map1.center.latitude = this.details.rightPanel.rightTop.droneCords.source.latitide;
        this.map1.center.longitude = this.details.rightPanel.rightTop.droneCords.target.longitude;
        this.map1.zoom = 10;
        this.map1.polylines = [
          {
            id: 1,
            path: [
              {
                latitude: this.details.rightPanel.rightTop.droneCords.source.latitide,
                longitude: this.details.rightPanel.rightTop.droneCords.source.longitude
              },
              {
                latitude: this.details.rightPanel.rightTop.droneCords.target.latitide,
                longitude: this.details.rightPanel.rightTop.droneCords.target.longitude
              }
            ],
            stroke: {
              color: '#6060FB',
              weight: 3
            },
            editable: false,
            draggable: false,
            geodesic: true,
            visible: true
          }
        ];


        this.markers = [];
        for (let j = 0; j < this.details.rightPanel.rightTop.mapDetails.mapDataList.length; j++) {
          this.marker = {};
          this.marker.coords = {};
          this.marker.id = j;
          this.marker.coords.latitude = this.details.rightPanel.rightTop.mapDetails.mapDataList[j].latitide;
          this.marker.coords.longitude = this.details.rightPanel.rightTop.mapDetails.mapDataList[j].longitude;
          this.markers.push(this.marker);
        }
        this.droneMarker = {};
        this.droneMarker.coords = {};
        this.droneMarker.id = 6;
        this.droneMarker.coords.longitude = this.details.rightPanel.rightTop.droneCords.source.longitude;
        this.droneMarker.coords.latitude = this.details.rightPanel.rightTop.droneCords.source.latitide;
        this.droneMarker.icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
        this.droneMarker.scaledSize = {};
        // this.marker.icon.scaledSize= new google.maps.Size(70, 60),
        //  this.droneMarker.options = {};
        // this.droneMarker.options.animation=  google.maps.Animation.BOUNCE ;
        this.droneMarkers = [];
        this.droneMarkers.push(this.droneMarker);

        this.droneMarker = {};
        this.droneMarker.coords = {};
        this.droneMarker.id = 7;
        this.droneMarker.coords.longitude = this.details.rightPanel.rightTop.droneCords.target.longitude;
        this.droneMarker.coords.latitude = this.details.rightPanel.rightTop.droneCords.target.latitide;
        this.droneMarker.icon = "../../vendor/img/d1.png";
        // this.marker.icon.scaledSize= new google.maps.Size(70, 60),
        this.droneMarker.options = {};
        this.droneMarker.options.animation = google.maps.Animation.BOUNCE;
        this.droneMarker.options.labelClass = 'marker_labels';
        //this.droneMarker.options.labelContent = "marker me";

        //this.droneMarker.options.labelAnchor = '12 60';

        this.droneMarkers.push(this.droneMarker);
        console.log("this.droneCapturedImages >>"+this.details.rightPanel.rightTop.droneCaptureResponse.images.length);
        this.droneCapturedImages=[];
        this.slides=[];
        
        console.log("length >> " + this.details.rightPanel.rightTop.droneCaptureResponse.images.length);
        for (let k = 0; k < this.details.rightPanel.rightTop.droneCaptureResponse.images.length; k++) {
          this.droneCapturedImages.push(this.details.rightPanel.rightTop.droneCaptureResponse.images[k]);
          this.droneCapturedTitle = this.details.rightPanel.rightTop.droneCaptureResponse.title;
        }

        this.droneCapturedImages.forEach((imgUrl, index) => {
          this.addSlide(imgUrl, index);
        });

        console.log("markers>>" + JSON.stringify(this.markers[0]));
        console.log("markers>>" + JSON.stringify(this.markers[1]));

        //this.data = [["52","48"],["66","33"]];
      }.bind(this.self), function (response) {
        this.apiNotFound = true;
      }.bind(this.self));
  }

  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }



  animateCircle(line) {
    var count = 0;
    window.setInterval(function () {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
    }, 20);
  }

  addSlide(imgUrl, index) {
    var newWidth = 600 + this.slides.length + 1;
    this.slides.push({
      image: imgUrl,
      //text: ['Nice image', 'Awesome photograph', 'That is so cool'][this.slides.length % 3],
      id: index
    });


  };

  // this.myInterval = 5000;
  // var slides = this.slides = [];






}

homeController.$inject = ['$scope', '$http', '$rootScope'];

export default homeController;