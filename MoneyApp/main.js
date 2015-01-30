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
	//global list for overall prices for i/o
	var expenseList;
  var cat;
  var perc;
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

  //items will always be in the following format
  //date,category,description,price
  //all amounts will be POSITIVE by convention
  //income will automatically be add to account
  //we will read them into an object and add to list
  function transfer(date,cat,descr,pr){
    this.date = date;
    this.category = cat;
    this.info = descr;
    this.price = pr;

    this.getMonth = function(){
      var monthYear = this.date.split('/');
      return monthYear[0] + '/' + monthYear[2];
    };
  }


  function parseData(itemsList){
    var result = [];
    for(var i =0; i < itemsList.length; i++){
      var parseList  = itemsList[i].split(',');
      var tempTransfer = new transfer(
        parseList[0],
        parseList[1],
        parseList[2],
        parseList[3]
      );
      result.push(tempTransfer);
    }
    return result;
  }
  function pObj(pList, catt){
    //create object of categories
    var result = {};
    for(var j=0; j < catt.length; j++){
      result[catt[j]] = parseFloat(pList[j]);
    }
    return result;
  }
  //function to sort  expenses into category
  //create object to hold this
  function sortCatData(itemList, catt){
    //create object of categories
    var result = {};
    for(var j=0; j < catt.length; j++){
      result[catt[j]] = 0;
    }
    for(var i = 0 ; i < itemList.length; i++){
      result[itemList[i].category] += parseFloat(itemList[i].price);
    }
    return result;
  }

  //function to check if object is in array
  function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
  }


  function addPosMonths(posM){
    for(var i = 0; i < posM.length; i++){
      monthSelect.innerHTML +=  '<option value=' + posM[i] + '>' + posM[i] + '</option>';
    }
  }

  function sortNumber(a,b){
    return a-b;
  }

  //function sort posmonths
  //create object with possible years, then add array of months to those
  function sortPosMonths(posM){
    var tempObj = {};
    for(var i = 0; i < posM.length; i++){
      var tempEle = posM[i].split('/');
      if(tempObj[tempEle[1]]){
        tempObj[tempEle[1]].push(parseInt(tempEle[0]));
      }
      else{
        tempObj[tempEle[1]] = [parseInt(tempEle[0])];
      }
    }

    //create list of years to be sroted and sort months
    var yearList = [];
    for(var j in tempObj){
      tempObj[j].sort(sortNumber);
      yearList.push(parseInt(j));
    }
    yearList.sort(sortNumber);
    //now traverse the yearlist and build list to return
    var answer = [];

    for(var k =0 ; k < yearList.length; k++){
      var ind = yearList[k].toString();
      for(var h = 0; h < tempObj[ind].length; h++){
        answer.push(tempObj[ind][h].toString() + '/' + ind);
      }
    }

    return answer;
  }

  //function to sort expenses by month into object with all the months
  function sortMonthData(itemList, catt){
    //list of all possible months
    var posMonthsRaw = [];
    for(var i = 0; i < itemList.length; i++){
      if(contains(posMonthsRaw, itemList[i].getMonth())){
        continue;
      }
      else{
        posMonthsRaw.push(itemList[i].getMonth());
      }
    }
    //now sort pos months
    var posMonths = sortPosMonths(posMonthsRaw);
    addPosMonths(posMonths);
    //create monthly object containing list of expenses for each month
    var monthly = {};
    for(var j=0; j < posMonths.length; j++){
      monthly[posMonths[j]] = [];
    }
    for(var k = 0 ; k < itemList.length; k++){
      monthly[itemList[k].getMonth()].push(itemList[k]) ;
    }
    //now create results object with category sorted results for each month
    var result = {};
    for(var h in monthly){
      result[h] = sortCatData(monthly[h],catt);
    }

    return result;
  }

  function percMonthReport(monthobj,percent){
    var result = {};
    for( var i in monthobj){
      result[i] = financeReport(monthobj[i],percent);
    }
    return result;
  }

  function writeOutTable(sortobj,percobj,place){
    var table = document.createElement('TABLE');
    table.border='1';
    var tableHead = document.createElement('THEAD');
    table.appendChild(tableHead);
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    var tableFoot = document.createElement('TFOOT');
    table.appendChild(tableFoot);
    //first row with titles

    var tr = document.createElement('TR');
    tableHead.appendChild(tr);
    var td = document.createElement('TD');
    td.width='75';
    td.appendChild(document.createTextNode('Category'));
    tr.appendChild(td);
    var td = document.createElement('TD');
    td.appendChild(document.createTextNode('Amount Spent'));
    tr.appendChild(td);
    var td = document.createElement('TD');
    td.appendChild(document.createTextNode('Amount Left'));
    tr.appendChild(td);
    for (var i in sortobj){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);

        //rcolumn
        var td = document.createElement('TD');
        td.width='100';
        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(sortobj[i].toFixed(2)));
        tr.appendChild(td);
        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(percobj[i].calcLeft()));
        tr.appendChild(td);

    }
    var tr = document.createElement('TR');
    tableFoot.appendChild(tr);
    var td = document.createElement('TD');
    td.width='75';
    td.appendChild(document.createTextNode('Total'));
    tr.appendChild(td);
    var td = document.createElement('TD');
    td.appendChild(document.createTextNode(percobj['Spent'].toFixed(2)));
    tr.appendChild(td);
    var td = document.createElement('TD');
    td.appendChild(document.createTextNode(percobj['Total'].toFixed(2)));
    tr.appendChild(td);

    place.appendChild(table);

  }


  function addRestHTML(){
    monthOut.innerHTML += "<h2>Monthly Expenses</h2>"
    monthOutSelect.innerHTML +=
    "<select id = 'monthSelect'></select>";
    monthOutSelect.innerHTML +="<button id ='monthB'>Get Data</button>";
    allTimeOut.innerHTML+="<h2>All Expenses</h2>";
  }
  //object for holding percreport
  function percReport(percentage,spent,has) {
    this.percentage = percentage;
    this.spend = spent;
    this.total = has;
    this.calcLeft = function(){
      if(this.percentage > 0){
        return (this.total * this.percentage - this.spend).toFixed(2);
      }
      else{
        return "N/A";
      }
    }
  }
  //generate finance report object
  //need to report total by percentage with -
  function financeReport(exobj,percent){
    var result = {};
    var has = 0;
    result['Total'] = 0;
    result['Spent'] = 0;
    for(var i in exobj){
      if (percent[i] < 0){
        result['Total']+= exobj[i];
        has += exobj[i];
      }
      else if(isNaN(exobj[i])){
        continue;
      }
      else{
        result['Total'] += -1 * exobj[i];
        result['Spent'] += exobj[i];
      }
    }

    for(var j in exobj){
      result[j] = new percReport(percent[j],exobj[j],has);
    }
    return result;

  }

  function writeMonthTable(monthT,monthP){
    var mon = document.getElementById('monthSelect').value;
    if(monthOutTable.hasChildNodes()){
      monthOutTable.removeChild(monthOutTable.childNodes[0]);
    }
    writeOutTable(monthT[mon],monthP[mon],monthOutTable);
  }
  //create chart helper functions

  function datasetMe(label,fillC,strokeC,pointC,pointSC,pointHF,pointHS){
    this.label = label;
    this.fillColor = fillC;
    this.strokeColor = strokeC;
    this.pointColor = pointC;
    this.pointStrokeColor = pointSC;
    this.pointHighlightFill = pointHF;
    this.data = [];
  }

  function genRandomColor(){
    var ans = "rgba(";
    var one = Math.floor(Math.random() * 255) + 1;
    var two = Math.floor(Math.random() * 255) + 1;
    var three = Math.floor(Math.random() * 255) + 1;
    ans = ans + one.toString() + ',' + two.toString() + ',' + three.toString()+ ',';
    return ans;
  };

  function colorOpac(color,opac){
    return color + opac.toString() + ')';
  }

  function correctColors(leg){
    var tempList =  leg.split('</span>');
    var ans = tempList[0].split('</li>');
    for(var i =1; i < tempList.length; i++){
      ans += tempList[i].split('</li>')[0] + '</span></li>';
      ans += tempList[i].split('</li>')[1];
    }
    return ans ;
  }

  function drawMonthChart(monthT, percT, catt){
    var data = {
    labels: [],
    datasets: []
    };

    //now create a dataset for each variable
    for(var j =0; j<catt.length; j++){
      var col = genRandomColor();
      data.datasets.push(
        new datasetMe(catt[j],
                  colorOpac(col,.1),//fill
                  colorOpac(col,.8),
                  colorOpac(col,.5),
                  "#fff",//dots
                  "#fff",
                  colorOpac(col,1)
                  ));
        for(var k in monthT){
          data.datasets[j].data.push(monthT[k][catt[j]]);
        }
    }
    for(var i in monthT){
      data.labels.push(i);
    }

    var monthChart = new Chart(ctx).Line(data);
    var legend = monthChart.generateLegend();
    var correctLegend = correctColors(legend);
    chartLegend.innerHTML = correctLegend;

  }

  //main routines

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

  function processData(res){

    //now sort expenses by category both for all time and for month
    //also add possible months to selection box
    var allTotals = sortCatData(expenseList, cat);
    var monthTotals = sortMonthData(expenseList, cat);
    var frep = financeReport(allTotals,perc);
    var mfrep = percMonthReport(monthTotals,perc);

    //now write out HTML Table for this information
    writeOutTable(allTotals,frep,allTimeOutTable);
    document.getElementById("monthB").addEventListener(
      "click",function(){
          writeMonthTable(monthTotals,mfrep);
        },false);


    //write to output
    output.innerHTML = "Processed " + expenseList.length + " transactions";

    drawMonthChart(monthTotals,mfrep,cat);
  }

};