function check(a,b)
{
	if(a == ""){
		document.getElementById("warning").value += "No "+ b+"\n";
		}
	else{
		document.getElementById("output").value += "\t" + b +" = " +"{"+a+"},\n"
		};
}
function showText() 
{
    var author = document.getElementById("author").value;
	var id = document.getElementById("id").value;
	var title = document.getElementById("title").value;
	var journal = document.getElementById("journal").value;
	var volume = document.getElementById("volume").value;
	var year = document.getElementById("year").value;
	var pages = document.getElementById("pages").value;
	var publisher = document.getElementById("publisher").value;
	var number = document.getElementById("number").value;
	var abs = document.getElementById("abstract").value;
	var e = document.getElementById("type");
	var type = e.options[e.selectedIndex].value;
	document.getElementById("warning").value = "";
	document.getElementById("output").value += "@"+type+"{"+id+",\n";
	if(id == ""){
		document.getElementById("warning").value = "No Key!!\n";
	}
	check(author,"author");
	check(title,"title");
	check(journal,"journal");
	check(volume,"volume");
	check(number,"number");
	check(year,"year");
	check(abs,"abstract");
	document.getElementById("output").value += "}\n";
	
    alert(popup_message);
}

function startOver()
{
	document.getElementById("output").value = "";
	document.getElementById("warning").value = "";
}