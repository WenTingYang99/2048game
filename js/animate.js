// JavaScript Document
function showAnimate(i,j,nums,words){
	var cell=$("#content-"+i+"-"+j);
	cell.css('color',settextcolor(nums[i][j]));
	cell.css('background',setbgcolor(nums[i][j]));
	cell.text(words[i][j]);
	cell.animate({
		'width':'100px',
		'height':'100px',
		'top':getPosTop(i),
		'left':getPosLeft(j)
	},200);
}

function mleft(i,j,blocknum){
	var cell=$("#content-"+i+"-"+j);
	cell.animate({
		'left':getPosLeft(blocknum)
	},200);		
}

function mup(i,j,blocknum){
	var cell=$("#content-"+i+"-"+j);
	cell.animate({
		'top':getPosTop(blocknum)
	},200);		
	
}

function mright(i,j,blocknum){
	var cell=$("#content-"+i+"-"+j);
	cell.animate({
		'left':getPosLeft(blocknum)
	},200);		
	
}

function mdown(i,j,blocknum){
	var cell=$("#content-"+i+"-"+j);
	cell.animate({
		'top':getPosTop(blocknum)
	},200);		
}