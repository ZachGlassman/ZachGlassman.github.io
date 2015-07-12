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
{'content': '\nFractals are mathematical objects which have many interesting and visually stunning properties.  Often these can be represented through recurseive algorithms.  This post will attempt to explain how to make some beautiful, recursively drawn fractals using Tikz, a $\\\\LaTeX$ drawing package.  For more information on $\\\\LaTeX$, check out the tutorial on my projects page.\n\n### Recursion\nRecursion is quite generally a process which repeats itself in a self similiar way.  There are many examples of recursion in computer science, but perhaps the most basic is the computation of the factorial, denote $n!$.\n\nWe define the factorial function as\n$$ n! = n(n-1)(n-2)\\\\dots (2)(1),$$\nand we make the assumption that $0! = 1$.\n\nWe can compute this factorial in two different ways, one is to enumerate all the numbers less than $n$ and then multiply them together.  Or we can notice that $ n! = n*(n-1)! $, for all $n$.  This recursive  definition allows us to define a function of $n$ in terms of the function itself.  As long as we have a base case which allows the recursion to stop, this is a perfectly valid procedure.  We can write some python code to compute this as\n\n\n    def factorial(n):\n        """return the n!"""\n        if n < 1:\n            return 1\n        else:\n            return n * factorial(n-1)\n\n            \nOf course, this assumes we are inputing $n$ as a positive integer.\n\n### Fractals\nFractals are loosely defined as a set which has a repeating pattern at any scale one observes it.  For example, when looking at a pictorial representation, one can zoom in or out arbitrarily many times and see the same pattern.  One famous example is the Sierpinski triangle, which is shown below:\n\n![Sierpinski triangle](/Images/Sierpinski.png "Sierpinski triangle")\n\nLater we will show how to make draw this exact triangle in $\\\\LaTeX$, but lets first consider the algorithm design behind it.  We start with a single black triangle, divide it into four equilaterial triangle and remove the middle triangle.  This produces\n\n#### Step 1\n![Sierpinski triangle stage 1](/Images/Sierpinski1.png "Sierpinski triangle stage 1")\n\n#### Step 2\nAnd if we then perform the same operation on each of the inner triangles ,we get the second step,\n\n![Sierpinski triangle stage 2](/Images/Sierpinski2.png "Sierpinski triangle stage 2")\n\n#### Step3\nIf we take each of the black triangles, and again perform the original operation, we obtain the next stage:\n\n![Sierpinski triangle stage 3](/Images/Sierpinski3.png "Sierpinski triangle stage 3")\n\n\nSo we can see that this is a recursive process where all we need to do is\n\n* Define function $f$ to remove the middle of the triangle\n* Create the large triangle\n* Operate with $f$ on the large triangle\n* Now consider each of the three border triangle the original triangle and continue.\n\nIn principle, we can continue the process forever and keep producing the fractal, but in practice we only need a few iterations to produce a good graphic.\n\n### Tikz\nImplementing this is not too dificult now that we have the algorithm.  We will be using tikz which is a graphics package for $\\\\LaTeX$ which produces high quality graphics.  We will also use the package ifthen which gives us some conditional statements.  Here is the source code, broken up into chunks. It produces all of the pictures shown above, depending on how many steps one recurses. The full code will be at the end of the document.\n\nThe first part imports the necessary packages, we use standalone here to just generate an image, but we could just as easily use article and wrap the tikzpicture in a figur environment.  We will need the tikz and ifthem packages, and the calc tikz library to perform coordinate calculations.\n\n    \\documentclass{standalone}\n    \\usepackage{tikz,ifthen}\n    \\usetikzlibrary{calc}\n    \nHere we begin the document and define two triangles, one up and one down.  Each take four arguments which are x,y,length,color, where\n\n* x - x coordinate of lower left corner\n* y - y coordinate of lower left corner\n* length - length of side\n* color - fill color\n\nRemember that tikz commands such as these can be thought of as macros to insert the code they contain whenever called.  We do not need to use these, however, they will save us a large amount of work.\n\n    \\begin{document}\n    \\newcommand{\\drawtri}[4]{\n        \\pgfmathsetmacro\\xone{#1+#3}\n        \\pgfmathsetmacro\\xtwo{#1+#3/2}\n        \\pgfmathsetmacro\\yone{#2 + #3/2 *1.732050807568877}\n        \\draw[fill = #4](#1,#2)--(\\xone,#2)--(\\xtwo,\\yone)--cycle;\n    }\n    \n    \\newcommand{\\drawdowntri}[4]{\n        \\pgfmathsetmacro\\xone{#1+#3}\n        \\pgfmathsetmacro\\xtwo{#1+#3/2}\n        \\pgfmathsetmacro\\yone{#2 - #3/2 *1.732050807568877}\n        \\draw[fill = #4](#1,#2)--(\\xone,#2)--(\\xtwo,\\yone)--cycle;\n    }\n    \nNow we define the command \\sierpinskitriangle to draw the fractal.  Its arguments are (n,x,y,length), where the n is the recursion level and x,y,length the parameters to draw the first inner triangles.  The algorithm goes like this,\n\n1. Check if we are at the max recursion limit, if we are, complete function.\n2. If not at recursion limit then calculate the three lower left corners of the outer triangles, draw triangles there and call \\sierpinskitriangle with length divided by two and n incremented by one.\n3. Clean up middle triangle by drawing white triangle over whatever is already there.\n\nHere is the relevant code:\n\n    \\newcommand{\\sierpinskitriangle}[4]{\n        \\ifthenelse{#1 = 6}\n            {\n                \n            }\n            {\n                {\n                    \\pgfmathtruncatemacro{\\newn}{#1+1}\n                    \\pgfmathsetmacro\\coln{#1*10}\n                    \\pgfmathsetmacro\\newl{#4/2}\n                    \\drawtri{#2}{#3}{\\newl}{black}\n                    \\sierpinskitriangle{\\newn}{#2}{#3}{\\newl}\n                }\n                    %second\n                {\n                    \\pgfmathtruncatemacro{\\newn}{#1+1}\n                    \\pgfmathsetmacro\\coln{#1*10}\n                    \\pgfmathsetmacro\\newx{#2 + #4/2}\n                    \\pgfmathsetmacro\\newl{#4/2}\n                    \\drawtri{\\newx}{#3}{\\newl}{black}\n                    \\sierpinskitriangle{\\newn}{\\newx}{#3}{\\newl}\n                }\n                {\n                    \\pgfmathtruncatemacro{\\newn}{#1+1}\n                    \\pgfmathsetmacro\\coln{#1*10}\n                    \\pgfmathsetmacro\\newx{#2 + #4/4}\n                    \\pgfmathsetmacro\\newy{#3 + #4/4*1.732050807568877}\n                    \\pgfmathsetmacro\\newl{#4/2}\n                    \\drawtri{\\newx}{\\newy}{\\newl}{black}\n                    \\sierpinskitriangle{\\newn}{\\newx}{\\newy}{\\newl}\n                }\n                \\pgfmathsetmacro\\newx{#2 + #4/4}\n                \\pgfmathsetmacro\\newy{#3 + #4/4*1.732050807568877}\n                \\pgfmathsetmacro\\newl{#4/2}\n                \\drawdowntri{\\newx}{\\newy}{\\newl}{white}\n            }}\n       \nNow we actually draw the picture and end the document.\n\n    \\begin{tikzpicture}\n    \\sierpinskitriangle{0}{0}{0}{10}\n    \\end{tikzpicture}\n    \\end{document}\n    \nSo we have drawn the complete fractal using recursion and tikz.  For convenience, here is the complete source code\n\n    \\begin{document}\n    \\newcommand{\\drawtri}[4]{\n        \\pgfmathsetmacro\\xone{#1+#3}\n        \\pgfmathsetmacro\\xtwo{#1+#3/2}\n        \\pgfmathsetmacro\\yone{#2 + #3/2 *1.732050807568877}\n        \\draw[fill = #4](#1,#2)--(\\xone,#2)--(\\xtwo,\\yone)--cycle;\n    }\n    \n    \\newcommand{\\drawdowntri}[4]{\n        \\pgfmathsetmacro\\xone{#1+#3}\n        \\pgfmathsetmacro\\xtwo{#1+#3/2}\n        \\pgfmathsetmacro\\yone{#2 - #3/2 *1.732050807568877}\n        \\draw[fill = #4](#1,#2)--(\\xone,#2)--(\\xtwo,\\yone)--cycle;\n    }\n    \n\n    \\newcommand{\\sierpinskitriangle}[4]{\n        \\ifthenelse{#1 = 6}\n            {\n                \n            }\n            {\n                {\n                    \\pgfmathtruncatemacro{\\newn}{#1+1}\n                    \\pgfmathsetmacro\\coln{#1*10}\n                    \\pgfmathsetmacro\\newl{#4/2}\n                    \\drawtri{#2}{#3}{\\newl}{black}\n                    \\sierpinskitriangle{\\newn}{#2}{#3}{\\newl}\n                }\n                    %second\n                {\n                    \\pgfmathtruncatemacro{\\newn}{#1+1}\n                    \\pgfmathsetmacro\\coln{#1*10}\n                    \\pgfmathsetmacro\\newx{#2 + #4/2}\n                    \\pgfmathsetmacro\\newl{#4/2}\n                    \\drawtri{\\newx}{#3}{\\newl}{black}\n                    \\sierpinskitriangle{\\newn}{\\newx}{#3}{\\newl}\n                }\n                {\n                    \\pgfmathtruncatemacro{\\newn}{#1+1}\n                    \\pgfmathsetmacro\\coln{#1*10}\n                    \\pgfmathsetmacro\\newx{#2 + #4/4}\n                    \\pgfmathsetmacro\\newy{#3 + #4/4*1.732050807568877}\n                    \\pgfmathsetmacro\\newl{#4/2}\n                    \\drawtri{\\newx}{\\newy}{\\newl}{black}\n                    \\sierpinskitriangle{\\newn}{\\newx}{\\newy}{\\newl}\n                }\n                \\pgfmathsetmacro\\newx{#2 + #4/4}\n                \\pgfmathsetmacro\\newy{#3 + #4/4*1.732050807568877}\n                \\pgfmathsetmacro\\newl{#4/2}\n                \\drawdowntri{\\newx}{\\newy}{\\newl}{white}\n            }\n    }\n       \n\n    \\begin{tikzpicture}\n    \\sierpinskitriangle{0}{0}{0}{10}\n    \\end{tikzpicture}\n    \\end{document}\n', 'date': 'July 11, 2015', 'name': 'Fractals, Recursion, Tikz'},
{'content': "\nThe Delta function potential is a great example problem for one-dimensional quantum mechanics.  The solution shows off many of the tricks associated with solving these problems and it has features such as a bound state which can be harder to understand in more complicated contexts.\n\nBefore stating the problem, a quick refresher on the Dirac Delta functions.  While not technically a *function*, it is a mathematica object which is very useful for many physical reasons.  So we define it as the functoin where $\\delta(x) =0$ unless $x=0$ in which case $\\delta(0) = +\\infty$ and $$\\int\\_{-\\infty}^\\infty \\delta(x)\\,dx = 1.$$  There are are many other useful properties, but this is all we will need for this problem.\n### Problem Statement\nFind the wavefunctions and energies of a 1-D particle of mass m in the potential\n\\begin{equation}\nV(x) = V\\_0 a \\delta(x),\n\\end{equation}\n\n### Solution\nSo we want to solve the Schrodinger equation\n\\begin{equation}\n-\\frac{\\hbar^2}{2m}\\frac{d^2}{dx^2}\\psi(x) + V(x)\\psi(x) = E\\psi(x),\n\\end{equation}\nwhere $-\\infty\\lt x\\lt \\infty$.  So our general idea will be to solve the equation for $x \\lt 0$ and for $x \\gt 0$ and join at the origin.  The free particle solutions can be written as\n\\begin{equation}\n\\psi\\_- = A \\sin(kx) + B\\cos(kx)\n\\end{equation}\n\\begin{equation}\n\\psi\\_+ = C \\sin(kx)+ D\\cos(kx),\n\\end{equation}\nwhere $k$ is not necessarily real and defined by\n\\begin{equation}\n\\frac{\\hbar^2 k^2}{2m} = E.\n\\end{equation}\nOur two general boundary conditions are given by the continuity of the wavefunction at $x=0$ and if we integrate both sides of the Schrodinger equation from $-\\epsilon $ to $\\epsilon$ where $\\epsilon \\to 0$, we must retain equality.  More explicitly, we have that\n\\begin{equation}\\psi\\_-(0)=\\psi\\_+(0)\\end{equation},\nwhich implies that\n\\begin{equation}\n-\\frac{\\hbar^2}{2m}\\int\\_{-\\epsilon}^\\epsilon \\psi''(x)\\, dx + \\int\\_{-\\epsilon}^\\epsilon V\\_0 a \\delta(x) \\psi(x)\\,dx = \\int\\_{-\\epsilon}^\\epsilon E\\psi(x),\n\\end{equation}\nand we can simplify the equation by noting that $\\psi$ is continuous, thus $\\int\\_{-\\epsilon}^\\epsilon E\\psi(x)=0$ and by using the definition of the delta function, we get for the second condition\n\\begin{equation}\n-\\frac{\\hbar^2}{2m}[\\psi'(x)]\\_{-\\epsilon}^\\epsilon + V\\_0 a \\psi(0) = 0,\n\\end{equation}\nwhich leads to the two conditions\n\\begin{align}\nB &=D\\\\\n\\label{1ddelta}\n\\frac{\\hbar^2k}{2m}[C-A]&=V\\_0aB\n\\end{align}\nNow we must consider the cases of a bound state and a scattering state.\n#### Bound State\nFor this state, we require the wavefunction be normalizable, so we require that\n\\begin{equation}\n\\lim\\_{x\\to \\pm \\infty}\\psi(x) = 0.\n\\end{equation}\nSo in order to have this, we know $k$ must be imaginary, so we define $\\kappa = ik$, which gives us that\n\\begin{equation}\n\\psi\\_- = A\\left(\\frac{e^{-\\kappa x}-e^{\\kappa x}}{2i}\\right) + B\\left(\\frac{e^{-\\kappa x}+e^{\\kappa x}}{2}\\right),\n\\end{equation}\nand if we require this to be zero at $-\\infty$, we get that $A=-iB$ by noting that the term pre-multiplying the divergent exponential, must be zero.  Similar considerations for $\\psi\\_+$ gives that $C=iD$.  Since we know that\n\\begin{equation}\nk = \\frac{\\sqrt{2mE}}{\\hbar},\n\\end{equation}\nand $k$ is imaginary, we must have $E \\lt 0$.\n\nWe now have four equations, which allows us to write\n\\begin{equation}\n-\\frac{\\hbar^2 k}{m}=V\\_0 a B,\n\\end{equation}\nwhich implies that\n\\begin{equation}\n\\kappa = -\\frac{maV\\_0}{\\hbar^2},\n\\end{equation}\nwhich implies that $V\\_0 a$ must be negative to get a bound state and there is only one bound state.  We can write the energy of this bound state as\n\\begin{equation}\nE = -\\frac{\\hbar^2\\kappa^2}{2m} = -\\frac{ma^2V\\_0^2}{2\\hbar^2},\n\\end{equation}\nwhich lets us write the wavefunction\n\\begin{align}\n\\psi\\_- &= Be^{\\kappa x}\\\\\n\\psi\\_+ &= -Ce^{-\\kappa x},\n\\end{align}\nand so using the fact that $B=-C$, we get that\n\\begin{equation}\n\\psi(x) = Be^{-\\kappa |x|},\n\\end{equation}\nand we could determine $B$ by normalization.\n#### Scattering States\nFor these states, we can project onto the delta states which gives the idea of a forward and backward traveling state.\n", 'date': 'June 21, 2015', 'name': 'Delta Function Potential'},
{'content': '\nRiemann sums are one of the first things learned when beginning the study of integration.  Yet often they are presented as a theoretical underpinning and then quickly forgotten as the *rules* of integration are hammered into memory.  While they do not allow for easy computation of integrals, they are an excellent glimpse into the nature of the integral.\n\nFirst we will consider a straight line with equation $f(x) = sx$, a straight line with slope $s$.  We can plot it as shown in the following figure.  You can play around with the slope by moving the slider.\n\n\n<script src = "/Graphs/lineplot.js"></script>\n<div class="plotdiv" id="17d2cbeb-5f32-4f5b-b626-29ad385fc246"></div>\nSo now we want to *integrate* this simple function, but what does that mean?  If we look up integrate on google, we get\n> #### integrate\n\n> combine one thing with another so that they become whole.\n\nSo it appears we want to do some sort of combining or adding.  To proceed, we must first define the problem which we are trying to solve.  Informally, we can state this as\n\n> Given a function $f(x)$ find the area of the region, $R$ in the x-y plane subject to the following conditions\n>\n> * $R$ is always between $f(x)$ and the $x$-axis\n> * The area above the $x$-axis is positive and the area below is negative\n> * $R$ is bounded by the vertial lines $x=a$ and $x=b$.\n\nThose who have studied some calculus recognize that we can state this problem without the last condition, although without the last condition, our problem is not to compute the area of $R$, but rather to find a function which represents the area of $R$.  For now, we will assume all the conditions.\n\nIf we go back to our example of a line, and let $a=-5,b=5$, then we can write our statement of the problem as\n\n$$ R = \\int_a^b f(x)\\,dx.$$\n\nThe curly sign simply means we want to find all the area and the function is any one we choose, in this case $f(x) =s x$.  However, at this point you may be bothered by the $dx$ at the end.  $dx$ is not technically a number, but we can think of it as the limit of one.  For now, we will say that it is some sort of distance along the $x$-axis, we will develop understanding of its nature through the Riemann sum.\n\nThe plot below shows the problem we are trying to solve where $R$ is the blue region minus the red region.  Again you can move the slider to see how the region changes.\n\n<script src = "/Graphs/lineplotfilled.js"></script>\n<div class="plotdiv" id="7cc2bbe7-dc2b-4d93-894b-3bf2501bcb6f"></div>\n\nFor this specific case, the region is always composed of two right triangular regions, one red, one blue.  We can use the formula for the area of a triangle which is\n\n$$ A = \\frac{ h \\times b}{2},$$\n\nwhere $h$ is the height and $b$ is the base of the triangle (not to be confused with $b$ the right bound of integration), to compute this area.  For both regions, we know that the base of the triangle is $b=5$. The height for the blue side is $f(5)=5s$ and the height for the red side is $f(-5)= -5s$.  So the region is given as\n$$R=A\\_{blue}-A\\_{red} = \\frac{25s}{2}-\\frac{25s}{2}=0,$$\n\nso in this case, the solution to the integral problem is zero.\n\nLets take a moment and see if this is surprising.  We know that the function $f(x)=sx$ is anti-symmetric with respect to reflection over the $y$ axis in the sense that $f(x) = -f(-x)$.  So it makes sense if we take any region where $a=-b$, then the areas will always exactly cancel each other out.  However, if $a\\neq -b$, then we will get a non-zero answer.\nIt is easy enough to do this problem for general $a$ and $b$, which is given as\n\n$$ R = \\frac{sb^2}{2}-\\frac{sa^2}{2},$$\n\nmake sure you understand how to get to this formula before you continue.\n\nThe following app illustrates allows you to change the slope, $a$, and $b$, and will compute the slope.\n\n<script src = "/Graphs/lineplotab.js"></script>\n<div class="plotdiv" id="99782a86-2387-4e6e-9e24-687c8f90a02c"></div>\n\nNotice that in this easy case, we are able to get by just knowing about triangles.  However, we have discovered one, very essential detail, **We can solve the problem by breaking it into pieces**.  In the previous case, these pieces were two triangles and we were able to get an exact answer, but now we will on to more complicated function where this will not be sufficent to get an exact answer.\n\nLet us consider the slightly more complicated function\n\n$$ f(x) = \\sin(x) + \\frac{x}{8},$$\n\nwhich is shown in the plot below.\n\n<script src = "/Graphs/sinplot.js"></script>\n<div class="plotdiv" id="78bbf997-72bb-4bcc-9e3e-aeb7c39e231b"></div>\n\nWe can see that triangles don\'t really make sense, so we choose to use the simplest shape we can, a rectangle.  The following will get slightly technical, but the basic idea is that we will divide the range we want to integrate over into equally spaced regions $\\Delta x$.  We will then approximate the curve in each region by a rectange and add them up.  As we make $\\Delta x$ smaller, we will achieve a better approximation to the integral.  In the limit that $\\Delta x \\to 0$, we have solved our problem.\n\nMore formally, divide the interval $[a,b]$ into $n$ subintervals, which all have equal length $\\Delta x$ given as\n\n$$\\Delta x = \\frac{b-a}{n}.$$\n\nThis is usually referred to as a *parition* of the interval.  We can write out the elements of the partition as\n\n$$ P = \\{a,a+\\Delta x, a + 2\\Delta x,\\dots,a + (n-1)\\Delta x, b\\}.$$\n\nWe can then define the left Riemann sum as the approximation where we take the value of the function at the left of each element of the parition and create a rectange with one side $f(p_i)$ and the other side $\\Delta x$.  So we then form the Left Riemann sum\n\n$$ S = \\sum\\_{i=1}^n f(x\\_{i-1})(x\\_i-x\\_{i-1}).$$\n\nIf we replace $f(x\\_{i-1})$ with $f(x\\_{i})$ in this expression, we get the right Riemann sum.  In principle, we could use any value $f(x^*)$ with the caveat that\n\n$$ x\\_{i-1}\\leq x^* \\leq x\\_{i}.$$\n\nFor our specific example, then app, shows this formalism applied to our function.  The lower right plot shows the dependance of the sum on $n$, where $n$ is the number of partitions.  Notice that the Left and Right Riemann sums are not in general equal, however, they approach each other, as well as the correct answer as $n$ gets large.\n\n<script src = "/RiemannSums/Riemann.js"></script>\n<div class="plotdiv" id="96bf92b6-51b3-4f94-ac99-0601f79f39d7"></div>\n\nIn the limit that $\\Delta x \\to 0$,($n \\to \\infty$), for a properly *behaved* function, this converges to the integral.  The exact details of this are quite complicated and if you are interested, I point you to the Real Analysis notes in the Notes section of this website which have a much more rigourous derivation.\n\nWe are now ready to say that $dx$ is an infinitly small segment of the real line.  Integration is the act of adding infinitesimally narrow rectangles together to find the area of the curve.  Although outside the scope of this post, we could use the fundamnetal theorem of calculus to compute that\n\n$$ \\int_a^b \\sin(x) + \\frac{x}{8} = \\left(-\\cos(b)+\\frac{b^2}{16}\\right)-\\left(-\\cos(a)+\\frac{a^2}{16}\\right),$$\n\nwhich answers the question of integration for this function.\n\n\n\n    #import necessary packages\n    import numpy as np\n    import matplotlib.pyplot as plt\n    from scipy.integrate import quad\n    %matplotlib inline\n\n\n    def Riemann_left(func,a,b,n):\n        """Calculate the Riemann left sum for function func in region (a,b) with partition number n, an integer"""\n        dx = (b-a)/n\n        x = np.linspace(a,b-dx,n) # make a vector of points to evaluate sum on\n        y = func(x) #evaluate x on each of these points\n        return np.sum(y * dx) #sum the list of the points evaluated\n    \n    def Riemann_right(func,a,b,n):\n        """Calculate the Riemann right sum for function func in region (a,b) with partition number n, an integer"""\n        dx = (b-a)/n\n        x = np.linspace(a+dx,b,n)\n        y = func(x)\n        return np.sum(y * dx)\n    \n    #now for an actual numerical integration routine\n    def num_integrate(func,a,b):\n        result = quad(lambda x: func(x), a, b)\n        return result[0]\n\n\n    def plot_sums(func,n,a,b,ax):\n        """function plot sums for a function, given a function, an axis,a,b, and list of n"""\n        #calculate the Riemann sums for each element of n\n        sums_left = [Riemann_left(func,a,b,i) for i in n]\n        sums_right = [Riemann_right(func,a,b,i) for i in n]\n        num_ans = num_integrate(func,a,b)\n        sums_ac = [num_ans for i in n]\n        #generate function plot\n        x = np.linspace(a,b,100)\n        ax[0].plot(x,func(x))\n        ax[1].plot(n,sums_left,label= \'Left\')\n        ax[1].plot(n,sums_right, label = \'Right\')\n        ax[1].plot(n,sums_ac, label = \'Numerical\')\n        ax[1].legend()\n\n\n    #define our function\n    def func(x):\n        return np.cos(x) - x/8\n    \n    #define a and b\n    a = -10\n    b = 10\n    n = [i for i in range(1,30)]\n    #define axis for plotting\n    fig, ax = plt.subplots(2,1)\n    plot_sums(func,n,a,b,ax)\n    ax[0].set_xlabel(\'x\')\n    ax[1].set_xlabel(\'n\')\n    ax[0].set_ylabel(\'f(x)\')\n    ax[1].set_ylabel(\'Approximate Integral\')\n    plt.tight_layout()\n\n\n![png](/Images/RiemannSums_files/RiemannSums_3_0.png)\n', 'date': 'June 20, 2015', 'name': 'Riemann Sums'},
{'content': '\nThis is my blog that I will use to talk about things that I am working on or things that I am thinking about.  A relavant first discussion is about the general technologies used to develop this site.\n\nThis website was written using a Bootstrap theme controlled with AngularJS and the markdown on the blog rendered with Showndown.  Lets discuss each of these individually.\n\n### Bootstrap\n\nThe Bootstrap contains the basic CSS and HTML structure of the website.  I think it provides a nice look and is easily customizable.  It provides an easy HTML structure for the rest of the website.  However, I did not want to write each page completely individually, it seems that things like the header and the footer should only have to be written once.  I played with some static site generators such as Hugo, but found that I was putting too much work into making the site display exactly as I wanted, it would have been easier to just write every page myself.  Therefore, I took the plunge into AngularJS\n\n### AngularJS\n\nAngularJS is a framework that allows abstract definitions of how to view data.  This means that instead of defining every individual element of a webpage, we can define how to view a *model*.  For example, in this blog, I do not write the HTML for every post separately, rather I write the posts in markdown and then generate the HTML automatically.  Angular also allows for fast responsive pages and some nifty effects.  I am by no means skilled at using Angular and I hope to write about it as I learn more of its features.\n\n### Showdown\n\nShowdown converts markdown to HTML, so for example, if we get can render\n\n    ### This is a heading\n    *italics are cool*\n    * item\n    * item\n    * item\n### This is a heading\n*italics are cool*\n\n* item\n* item\n* item\n\nI find this to be a nicer medium with which to write quickly and efficiently instead of hand coding the HTML.  After I write my blog posts, I have a simple python script which generates the Angular model, including the mardown which is then rendered live as the page loads.\n\n### Bokeh\n\nThe last nice piece of software which is going to be featured prominently in this site is bokeh, a python package for interactive visualizations.  It produces javascript graphs based on d3.js.  Technology such as this can be extremely effective at reducing complicated mathematical ideas to simple pictures.  One example is shown in the Riemann sums post.\n\n\n', 'date': 'June 20, 2015', 'name': 'Welcome to my Blog'},
//end replace
      ];

}]).filter('markdown', function ($sce) {
    var converter = new Showdown.converter();
    return function (value) {
		var html = converter.makeHtml(value || '');
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        hljs.initHighlightingOnLoad();
        return $sce.trustAsHtml(html);
    };
});