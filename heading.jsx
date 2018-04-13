var myTextFrames = app.activeDocument.textFrames;  
var myTextFramesNo = myTextFrames.length; 
var i=0;
var array_all = new Array();
var myDoc = app.documents[0];
var myText;
var myTextPrev = null;
var count = 0;

while (i < myTextFramesNo) 
{
    var paras=myTextFrames[i].parentStory.paragraphs;
    var j = -1;
	myTextPrev = paras.item(0);
    while (j < paras.count() && myTextFrames[i].parentStory!= myTextFrames[i-1].parentStory)
    {
		myText = paras.item(j);
		if (myTextPrev == null || myText!=myTextPrev)
		{
			if (myText.pointSize > 8)    
			{
				var styname = count.toString();
				var add = {text : myText , size : myText.pointSize , heading : 0 , style : myDoc.paragraphStyles.add({name : styname, spaceAfter : myText.spaceAfter , spaceBefore : myText.spaceBefore , fontStyle : myText.fontStyle , pointSize : myText.pointSize , fillColor : myText.fillColor , alignToBaseline : myText.alignToBaseline , digitsType : myText.digitsType , index : myText.index , leftIndent : myText.leftIndent , paragraphDirection : myText.paragraphDirection , position : myText.position , parent : myText.parent , properties : myText.properties , startParagraph : myText.startParagraph , underline : myText.underline , underlineColor : myText.underlineColor , underlineType : myText.underlineType , underlineWeight : myText.underlineWeight , justification : myText.justification})};
				array_all.push(add); 
				count++;
			}
		}
        // myText.contents will give me the text
        // mtText.pointSize gives font size
        j++;
		myTextPrev = myText;
    }

    i++;
}

function avg (arr)
{
	var avg=0;
	for (var i=0; i<arr.length; i++)
	{
		avg+=arr[i].pointSize;
	}
	return avg/arr.length;
}

var levels = new Array(6);
for (var i = 0; i < 6; i++) {
  levels[i] = new Array();
}

var i = 1;

levels[0].push(array_all[0]); // assuming that the first word/text frame is the title and hence h1
array_all[0].heading=0;

while (array_all[i]!=null)
{
	if (array_all[i].size == array_all[i-1].size)
	{
        // add conditions for color, bold etc.
		levels[array_all[i-1].heading].push(array_all[i]);
		array_all[i].heading = array_all[i-1].heading;
		i++;
	}
	else if (array_all[i].size > array_all[i-1].size)
	{
		if (array_all[i-1].heading == 0) 
        {
            array_all[i].heading = array_all[i-1].heading;
            levels[array_all[i-1].heading].push(array_all[i]);
            i++;
         }
        else
        {
            array_all[i].heading = array_all[i-1].heading - 1;
            levels[array_all[i-1].heading - 1].push(array_all[i]);
            i++;
         }             
	}
	else 
	{
		if (array_all[i-1].heading == 5) 
        {
            array_all[i].heading = array_all[i-1].heading;
            levels[array_all[i-1].heading].push(array_all[i]);
            i++;
         }
        else
        {
            array_all[i].heading = array_all[i-1].heading + 1;
            levels[array_all[i-1].heading + 1].push(array_all[i]);
            i++;
         }             
	}
}

for (var i=0;i<6;i++)
{
	for (var j=0; j<levels[i].length;j++)
	{
		levels[i][j].text.appliedParagraphStyle = myDoc.paragraphStyles.item (levels[i][j].style.name);
        if (i==0)
		{
			var h1 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h1.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h1", exportClass: "", exportAttributes: ""});
            h1.styleExportTagMaps.add({exportType: "PDF", exportTag: "H1", exportClass: "", exportAttributes: ""});  
		}
		else if (i==1) 
		{
			var h2 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h2.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h2", exportClass: "", exportAttributes: ""});
            h2.styleExportTagMaps.add({exportType: "PDF", exportTag: "H2", exportClass: "", exportAttributes: ""});
		}
		else if (i==2) 
		{
			var h3 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h3.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h3", exportClass: "", exportAttributes: ""});
            h3.styleExportTagMaps.add({exportType: "PDF", exportTag: "H3", exportClass: "", exportAttributes: ""});
		}
		else if (i==3) 
		{
			var h4 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h4.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h4", exportClass: "", exportAttributes: ""});
            h4.styleExportTagMaps.add({exportType: "PDF", exportTag: "H4", exportClass: "", exportAttributes: ""});
		}
		else if (i==4) 
		{
			var h5 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h5.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h5", exportClass: "", exportAttributes: ""});
            h5.styleExportTagMaps.add({exportType: "PDF", exportTag: "H5", exportClass: "", exportAttributes: ""});
		}
		else 
		{
			var h6 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h6.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h6", exportClass: "", exportAttributes: ""});
            h6.styleExportTagMaps.add({exportType: "PDF", exportTag: "H6", exportClass: "", exportAttributes: ""});
		}
	}
}

alert ("done");				