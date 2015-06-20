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
    {'name': 'Visualizing Riemann Sums', 'date': 'June 20, 2015','content':$scope.s1 = $sce.trustAsHtml('This is my first post# will be bout Riemann sums')},
    {'name': 'Welcome to my Blog', 'date': 'June 20, 2015','content':$scope.s0 = $sce.trustAsHtml('An h1 header============Paragraphs are separated by a blank line.2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized listslook like:  * this one  * that one  * the other oneNote that --- not considering the asterisk --- the actual textcontent starts at 4-columns in.> Block quotes are> written like so.>> They can span multiple paragraphs,> if you like.Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it\'s allin chapters 12--14"). Three dots ... will be converted to an ellipsis.')},
//end replace
      ];

}]);

app.directive('markdown', function () {
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var htmlText = converter.makeHtml(element.text());
            element.html(htmlText);
        }
    };

});