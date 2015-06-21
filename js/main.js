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
{'name': 'Visualizing Riemann Sums', 'content': '\nRiemann sums are one of the first things learned when beginning the study of integration.  Yet often they are presented as a theoretical underpinning and then quickly forgotten as the *rules* of integration are hammered into memory.  While they do not allow for easy computation of integrals, they are an excellent glimpse into the nature of the integral.\n\nFirst we will consider a straight line with equation \\(y = x\\), a straight line.  We can plot it as shown in the following figure.  You can play around with the slope by moving the slider.\n<script src = "/js/lineplot.js">\n</script>\n<div class="plotdiv" id="96d89225-138d-4052-b636-36ceb3839a08"></div>\nSo now we want to *integrate* this simple function, but what does that mean?  If we look up integrate on google, we get\n> integrate\n> combine one thing with another so that they become whole.\n\nSo it appears we want to do some sort of combining or adding.\n<script src = "/js/Riemann.js">\n</script>\n    \n<div class="plotdiv" id="e3e05286-f3bf-4a8a-af56-9c282fa255d6"></div>', 'date': 'June 20, 2015'},
{'name': 'Welcome to my Blog', 'content': '\nThis is my blog that I will use to talk about things that I am working on or things that I am thinking about.  A relavant first discussion is about the general technologies used to develop this site.\n\nThis website was written using a Bootstrap theme controlled with AngularJS and the markdown on the blog rendered with Showndown.  Lets discuss each of these individually.\n\n### Bootstrap\n\nThe Bootstrap contains the basic CSS and HTML structure of the website.  I think it provides a nice look and is easily customizable.  It provides an easy HTML structure for the rest of the website.  However, I did not want to write each page completely individually, it seems that things like the header and the footer should only have to be written once.  I played with some static site generators such as Hugo, but found that I was putting too much work into making the site display exactly as I wanted, it would have been easier to just write every page myself.  Therefore, I took the plunge into AngularJS\n\n### AngularJS\n\nAngularJS is a framework that allows abstract definitions of how to view data.  This means that instead of defining every individual element of a webpage, we can define how to view a *model*.  For example, in this blog, I do not write the HTML for every post separately, rather I write the posts in markdown and then generate the HTML automatically.  Angular also allows for fast responsive pages and some nifty effects.  I am by no means skilled at using Angular and I hope to write about it as I learn more of its features.\n\n### Showdown\n\nShowdown converts markdown to HTML, so for example, if we get can render\n\n    ### This is a heading\n    *italics are cool*\n    * item\n    * item\n    * item\n### This is a heading\n*italics are cool*\n\n* item\n* item\n* item\n\nI find this to be a nicer medium with which to write quickly and efficiently instead of hand coding the HTML.  After I write my blog posts, I have a simple python script which generates the Angular model, including the mardown which is then rendered live as the page loads.\n\n### Bokeh\n\nThe last nice piece of software which is going to be featured prominently in this site is bokeh, a python package for interactive visualizations.  It produces javascript graphs based on d3.js.  Technology such as this can be extremely effective at reducing complicated mathematical ideas to simple pictures.  One example is shown in the Riemann sums post.\n\n\n', 'date': 'June 20, 2015'},
//end replace
      ];

}]).filter('markdown', function ($sce) {
    var converter = new Showdown.converter();
    return function (value) {
		var html = converter.makeHtml(value || '');
        return $sce.trustAsHtml(html);
    };
});