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
        templateUrl: 'views/menu/main.html',
        controller: 'MenuController',
        controllerAs: 'menu'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
