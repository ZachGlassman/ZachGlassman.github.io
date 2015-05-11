window.onload = function() {

  "use strict";
  //global variables
  var fileInput = document.getElementById('fileInput');
  var output = document.getElementById('output');
  var allTimeOut = document.getElementById('allTimeOut');
  var allTimeOutTable = document.getElementById('allTimeOutTable');
  var monthOut = document.getElementById('monthOut');
  var monthOutTable = document.getElementById('monthOutTable');
  var monthOutSelect = document.getElementById('monthOutSelect');
  var reportTable = document.getElementById('reportTable');
  var ctx = document.getElementById('canvas1').getContext('2d');
  var chartLegend = document.getElementById('chartLegend');
	//simple program to get data and display it in table sorted by day

  fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					processInitialData(reader.result);
				};

				reader.readAsText(file);
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}

		});


	//process data by sorting by month and by meal
	//data to be stored always in foodObj, a food obj

	function foodObj


	function processInitialData(res){
    //add the rest of the form
    addRestHTML()

    //get the list first list is categories, second is percentages
    var resList = res.split('\n');
    cat = resList[0].split(',');
    perc = pObj(resList[1].split(','),cat);
    //fill expenseList with objects containg data
    expenseList = parseData(resList.slice(2));

    processData(res);
  }
};