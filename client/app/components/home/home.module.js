import angular from 'angular';
import homeComponent from './home.component';
//import angularGoogleMaps from 'angular-google-maps';

const homeModule = angular.module('home', [])
  .component('home', homeComponent);
export default homeModule;