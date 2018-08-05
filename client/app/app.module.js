import $ from "jquery";
import 'bootstrap-css-only';
import 'normalize.css';
import angular from 'angular';
import appComponent from './app.component';
import ComponentsModule from './components/components';

import uiRouter from '@uirouter/angularjs';

import '../vendor/js/ui-bootstrap-tpls-0.12.0.min.js';
import '../../node_modules/bootstrap-sweetalert/dist/sweetalert.min.js';
import '../../node_modules/bootstrap-sweetalert/dist/sweetalert.css';
//import '../vendor/plugins/bootstrap/css/bootstrap.min.css';
import '../vendor/plugins/bootstrapv3/css/bootstrap-theme.min.css';
//import '../vendor/js/google.js';
import '../../node_modules/angular-chart.js/dist/angular-chart.min.js';
import '../../node_modules/chart.js/dist/Chart.min.js';
import '../../node_modules/angular-simple-logger/dist/angular-simple-logger.js';
import '../vendor/plugins/lodash.js';
import '../../node_modules/angular-google-maps/dist/angular-google-maps.js';
import dchart from 'angular-nvd3';
import '../../node_modules/d3/d3.js';
import '../../node_modules/angular-nvd3/dist/angular-nvd3.js';
import '../../node_modules/nvd3/build/nv.d3.js';
import '../../node_modules/nvd3/build/nv.d3.css';
import '../vendor/js/angular-audio-recorder.min.js';

angular.module('app', [
  ComponentsModule.name,
  uiRouter,
  'chart.js',
  'uiGmapgoogle-maps',
  'nemLogging',
  'nvd3',
  'angularAudioRecorder',
  'ui.bootstrap'  
])
  .config(function ($stateProvider,) {
    'ngInject';

    var states = [{
      name: 'home',
      url: '/home',
      // Using component: instead of template:
      component: 'home'
    },
    {
      name: 'chat',
      url: '/chat',
      // Using component: instead of template:
      component: 'chat'
    }
  ];

    // Loop over the state definitions and register them
    states.forEach(function (state) {
      $stateProvider.state(state);
    });

  })
  .component('app', appComponent);

  /* angular.module('app').config([
    'uiGmapGoogleMapApiProvider',
    function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key      : 'AIzaSyDFCFrugTB2nyGgHyrUe_l3-lbY0rg9HwE',
            v        : '3.32',
            libraries: 'places,geometry'
        });
    }
]); */