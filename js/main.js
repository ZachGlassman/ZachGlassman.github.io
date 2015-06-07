/**
*MAin Angular JS application*/

var app = angular.module('ZacharyGlassman', [
    'ngRoute'
]);

//configure routes

app.config(['$routeProvider', function($routeprovider){
    $routeProvider
    .when("/", {templateUrl: "partials/home.html", controller:"PageCtrl" })
    .when("/contact", {templateUrl: "partials/contact.html", controller:"PageCtrl" })
    .when("/about", {templateUrl: "partials/about.html", controller:"PageCtrl" })
    .when("/notes", {templateUrl: "partials/notes.html", controller:"PageCtrl" });
}]);

app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });
  
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});