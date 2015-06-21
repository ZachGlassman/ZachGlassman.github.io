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
{'name': 'Visualizing Riemann Sums', 'date': 'June 20, 2015', 'content': '\nRiemann sums are one of the first things learned when beginning the study of integration.  Yet often they are presented as a theoretical underpinning and then quickly forgotten as the *rules* of integration are hammered into memory.  While they do not allow for easy computation of integrals, they are an excellent glimpse into the nature of the integral.\n\nFirst we will consider a straight line with equation $f(x) = sx$, a straight line with slope $s$.  We can plot it as shown in the following figure.  You can play around with the slope by moving the slider.\n<script src = "/Graphs/lineplot.js">\n</script>\n<div class="plotdiv" id="17d2cbeb-5f32-4f5b-b626-29ad385fc246"></div>\nSo now we want to *integrate* this simple function, but what does that mean?  If we look up integrate on google, we get\n> #### integrate\n\n> combine one thing with another so that they become whole.\n\nSo it appears we want to do some sort of combining or adding.  To proceed, we must first define the problem which we are trying to solve.  Informally, we can state this as\n\n> Given a function $f(x)$ find the area of the region, $R$ in the x-y plane subject to the following conditions\n>\n> * $R$ is always between $f(x)$ and the $x$-axis\n> * The area above the $x$-axis is positive and the area below is negative\n> * $R$ is bounded by the vertial lines $x=a$ and $x=b$.\n\nThose who have studied some calculus recognize that we can state this problem without the last condition, although without the last condition, our problem is not to compute the area of $R$, but rather to find a function which represents the area of $R$.  For now, we will assume all the conditions.\n\nIf we go back to our example of a line, and let $a=-5,b=5$, then we can write our statement of the problem as\n$$R = \\int_a^b f(x)\\,dx.$$\n\nThe curly sign simply means we want to find all the area and the function is any one we choose, in this case $f(x) =s x$.  However, at this point you may be bothered by the $dx$ at the end.  $dx$ is not technically a number, but we can think of it as the limit of one.  For now, we will say that it is some sort of distance along the $x$-axis, we will develop understanding of its nature through the Riemann sum.\n\nThe plot below shows the problem we are trying to solve where $R$ is the blue region minus the red region.  Again you can move the slider to see how the region changes.\n<script src = "/Graphs/lineplotfilled.js"></script>\n<div class="plotdiv" id="b8cf7902-e82a-4c0f-b15a-c3b613ee88cf"></div>\n\nFor this specific case, the region is always composed of two right triangular regions, one red, one blue.  We can use the formula for the area of a triangle which is\n$$ A = \\frac{ h \\times b}{2},$$\nwhere $h$ is the height and $b$ is the base of the triangle (not to be confused with $b$ the right bound of integration), to compute this area.  For both regions, we know that the base of the triangle is $b=5$. The height for the blue side is $f(5)=5a$ and the height for the red side is $f(-5)= -5a$.  So the region is given as\n$$R = A_{blue}+A_{red} = \\frac{25s}{2}-\\frac{25s}{2}=0,$$\nso in this case, the solution to the integral problem is zero.\n\nLets take a moment and see if this is surprising.  We know that the function $f(x)=sx$ is anti-symmetric with respect to reflection over the $y$ axis in the sense that $f(x) = -f(-x)$.  So it makes sense if we take any region where $a=-b$, then the areas will always exactly cancel each other out.  However, if $a\\neq -b$, then we will get a non-zero answer.\nIt is easy enough to do this problem for general $a$ and $b$, which is given as\n$$R = \\frac{\n<script src = "/js/Riemann.js">\n</script>\n    \n<div class="plotdiv" id="e3e05286-f3bf-4a8a-af56-9c282fa255d6"></div>'},
{'name': 'Welcome to my Blog', 'date': 'June 20, 2015', 'content': '\nThis is my blog that I will use to talk about things that I am working on or things that I am thinking about.  A relavant first discussion is about the general technologies used to develop this site.\n\nThis website was written using a Bootstrap theme controlled with AngularJS and the markdown on the blog rendered with Showndown.  Lets discuss each of these individually.\n\n### Bootstrap\n\nThe Bootstrap contains the basic CSS and HTML structure of the website.  I think it provides a nice look and is easily customizable.  It provides an easy HTML structure for the rest of the website.  However, I did not want to write each page completely individually, it seems that things like the header and the footer should only have to be written once.  I played with some static site generators such as Hugo, but found that I was putting too much work into making the site display exactly as I wanted, it would have been easier to just write every page myself.  Therefore, I took the plunge into AngularJS\n\n### AngularJS\n\nAngularJS is a framework that allows abstract definitions of how to view data.  This means that instead of defining every individual element of a webpage, we can define how to view a *model*.  For example, in this blog, I do not write the HTML for every post separately, rather I write the posts in markdown and then generate the HTML automatically.  Angular also allows for fast responsive pages and some nifty effects.  I am by no means skilled at using Angular and I hope to write about it as I learn more of its features.\n\n### Showdown\n\nShowdown converts markdown to HTML, so for example, if we get can render\n\n    ### This is a heading\n    *italics are cool*\n    * item\n    * item\n    * item\n### This is a heading\n*italics are cool*\n\n* item\n* item\n* item\n\nI find this to be a nicer medium with which to write quickly and efficiently instead of hand coding the HTML.  After I write my blog posts, I have a simple python script which generates the Angular model, including the mardown which is then rendered live as the page loads.\n\n### Bokeh\n\nThe last nice piece of software which is going to be featured prominently in this site is bokeh, a python package for interactive visualizations.  It produces javascript graphs based on d3.js.  Technology such as this can be extremely effective at reducing complicated mathematical ideas to simple pictures.  One example is shown in the Riemann sums post.\n\n\n'},
//end replace
      ];

}]).filter('markdown', function ($sce) {
    var converter = new Showdown.converter();
    return function (value) {
		var html = converter.makeHtml(value || '');
        return $sce.trustAsHtml(html);
    };
});