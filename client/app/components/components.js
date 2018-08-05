import angular from 'angular';
    
    import HomeModule from './home/home.module';
    import ChatModule from './chat/chat.module';
    import Sidebar from './sidebar/sidebar';
    import Headerbar from './headerbar/headerbar';

const ComponentsModule = angular.module('app.components',[       
     HomeModule.name,
     ChatModule.name,
     Sidebar.name,
     Headerbar.name 
]);

export default ComponentsModule;