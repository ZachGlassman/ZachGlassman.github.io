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
{'content': 'This is my first post\n\n# will be bout Riemann sums\n\n', 'name': 'Visualizing Riemann Sums', 'date': 'June 20, 2015'},
{'content': '\nAn h1 header\n============\n\n<h1>TRY THIS</h1>\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n  * this one\n  * that one\n  * the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it\'s all\nin chapters 12--14"). Three dots ... will be converted to an ellipsis.\n\n\n', 'name': 'Welcome to my Blog', 'date': 'June 20, 2015'},
//end replace
      ];

}]);

filter('markdown', function ($sce) {
    var converter = new Showdown.converter();
    return function (value) {
		var html = converter.makeHtml(value || '');
        return $sce.trustAsHtml(html);
    };
});