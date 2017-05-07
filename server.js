
var cheerio=require('cheerio');

var request=require('request');

function entry(title,points,comments,rank){
	this.title=title;
	this.points=points;
	this.comments=comments;
	this.rank=rank;
}

var data=[];

url="https://news.ycombinator.com/";
request(url,function(error,request,html){	
		var $=cheerio.load(html);
		$('span.comhead').each(function() {
			var a=$(this).prev();
			var rank=parseInt(a.parent().parent().text());
			var title =a.text();
			var subtext=a.parent().parent().next().children('.subtext').children();
			var points=parseInt($(subtext).eq(0).text());
			var comments=parseInt($(subtext).eq(2).text());
			var element=new entry(title,points,comments,rank)
			data.push(element);
    	});
    	console.log("array:"+data.length);
    	var test1 = data.filter(moreThanFive);
    	test1.sort(function(a,b){
    		if(a.comments>b.comments){
    			return 1;
    		}
    		if(a.comments<b.comments){
    			return -1;
    		}
    		return 0;
    	});
    	console.log(test1);
    	
    	console.log("==================================================");

    	var test2 = data.filter(lessThanFive);
    	test2.sort(function(a,b){
    		if(a.points>b.points){
    			return 1;
    		}
    		if(a.points<b.points){
    			return -1;
    		}
    		return 0;
    	});
    	console.log(test2);
    	
});


function moreThanFive(element){
	var count = element.title.split(" ").length;
	return count > 5;
}

function lessThanFive(element){
	var count = element.title.split(" ").length;
	return count <= 5;
}


