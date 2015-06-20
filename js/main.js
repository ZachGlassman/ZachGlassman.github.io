/**
 * Main AngularJS Web Application
 */
var app = angular.module('zachGlassmanApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/research", {templateUrl: "partials/research.html", controller: "PageCtrl"})
    .when("/notes", {templateUrl: "partials/notes.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    .when("/projects", {templateUrl: "partials/projects.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);


/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', ['$scope', '$sce',function ($scope,$sce) {
  $scope.posts = [
//begin replace
{'name': 'Visualizing Riemann Sums', 'content': '\nRiemann sums are one of the first things learned when beginning the study of integration.\n\n<script\n    src="/js/Rjs.js"\n    id="9f50422a-8c48-4f2e-847f-27ee040ad8cf"\n    async="true"\n    data-bokeh-data="static"\n    data-bokeh-modelid="73370343-424f-49da-b279-3d1bcb6d9e9d"\n    data-bokeh-modeltype="VBoxForm"\n    data-bokeh-loglevel="info"\n></script>\n\n<div id="73370343-424f-49da-b279-3d1bcb6d9e9d"></div>', 'date': 'June 20, 2015'},
{'name': 'Welcome to my Blog', 'content': '\nThis is my blog that I will use to talk about things that I am working on\nor things that I am thinking about.  So a relevant first discussion would be how this website was created.\n\nThis website was written using a Bootstrap theme controlled with AngularJS and the markdown on the blog rendered with Showndown.  Lets discuss each of these individually.\n\n### Bootstrap\n\nThe Bootstrap contains the basic CSS and HTML structure of the website.  I think it provides a nice look and is easily customizable.  It provides an easy HTML structure for the rest of the website.  However, I did not want to write each page completely individually, it seems that things like the header and the footer should only have to be written once.  I played with some static site generators such as Hugo, but found that I was putting too much work into making the site display exactly as I wanted, it would have been easier to just write every page myself.  Therefore, I took the plunge into AngularJS\n\n### AngularJS\n\n\n', 'date': 'June 20, 2015'},
//end replace
      ];

}]).filter('markdown', function ($sce) {
    var converter = new Showdown.converter();
    return function (value) {
		var html = converter.makeHtml(value || '');
        return $sce.trustAsHtml(html);
    };
});