'use strict';

/**
 * @ngdoc overview
 * @name onyoApp
 * @description
 * # onyoApp
 *
 * Main module of the application.
 */
angular
  .module('onyoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'menuDirectives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/menuitems', {
        templateUrl: 'views/menuitems/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/menuitems/category', {
        templateUrl: 'views/menuitems/category.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
