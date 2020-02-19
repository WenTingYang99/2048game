// JavaScript Document


var nums=new Array();
var words=new Array();
var changed=new Array();
var scores=0;
var selection=0;

$(document).ready(function(){
	newgame();	
});


function typeofgame(){
		selection=$("#selected").val();
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				words[i][j]=showWord(selection,nums[i][j]);
			}
		}
	updateView();
	$("#selected").blur();
}




//开始新游戏
function newgame(){
	scores=0;
	$("#score").text(scores);
	init();//初始化网格
}



//初始化页面，设置网格位置
function init(){
	for(var i=0;i<4;i++){
		words[i]=new Array();
		nums[i]=new Array();
		changed[i]=new Array();
		for(var j=0;j<4;j++){
			words[i][j]="0"
			nums[i][j]=0;
			var grids=$("#g"+i+"-"+j);
			grids.css('top',getPosTop(i));
			grids.css('left',getPosLeft(j));
		}
	}
	
	typeofgame();
	//动态更新上层单元格并初始化
	updateView();	
	
	//创建两个随机数
	randomnumber(selection,nums,words);
	randomnumber(selection,nums,words);
}


//更新上层单元格
function updateView(){
	if($(".grid-cell-1").length!=0){
		$(".grid-cell-1").remove();
	}
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#game").append('<div class="grid-cell-1" id="content-'+i+'-'+j+'"></div>');
			changed[i][j]=false;
			var newcell=$("#content-"+i+"-"+j);
			if(nums[i][j]==0){
				newcell.css('width','0px');
				newcell.css('height','0px');
				newcell.text("");
				newcell.css('top',getPosTop(i)+50);
				newcell.css('left',getPosLeft(j)+50);
			}else{
				newcell.css('width','100px');
				newcell.css('height','100px');
				newcell.css('top',getPosTop(i));
				newcell.css('left',getPosLeft(j));
				newcell.css('color',settextcolor(nums[i][j]));
				newcell.css('background',setbgcolor(nums[i][j]));
				console.log(nums);
				console.log(words);
				newcell.text(words[i][j]);
			}
		}
	}
}


$(document).keydown(function(evevt){
	switch(evevt.keyCode){
		case 37://左
			if(canMoveLeft(nums)){
				MoveLeft();		
				setTimeout(updateView,200);
			//	console.log(nums);
				randomnumber(selection,nums,words);
			}
			break;
		case 38://上
			if(canMoveUp(nums)){
				MoveUp();
				setTimeout(updateView,200);
				//console.log(nums);
				randomnumber(selection,nums,words);
			}
			break;
		case 39://右
			if(canMoveRight(nums)){
				MoveRight();
				setTimeout(updateView,200);
				//console.log(nums);
				randomnumber(selection,nums,words);
			}			
			break;
		case 40://下
			if(canMoveDown(nums)){
				MoveDown();
				setTimeout(updateView,200);
				//console.log(nums);
				randomnumber(selection,nums,words);
			}			
			break;
		default:break;
	}
});

function canMoveLeft(num){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(num[i][j]!=0){
				if(num[i][j-1]==0||num[i][j-1]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveUp(num){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(num[i][j]!=0){
				if(num[i-1][j]==0||num[i-1][j]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;	
}
function canMoveRight(num){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(num[i][j]!=0){
				if(num[i][j+1]==0||num[i][j+1]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;	
}
function canMoveDown(num){
	for(var j=0;j<4;j++){
		for(var i=0;i<3;i++){
			if(num[i][j]!=0){
				if(num[i+1][j]==0||num[i+1][j]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;	
}

function MoveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				var blocknum=0;
				for(var k=0;k<j;k++){
					if(nums[i][k]==0 && isBlockleft(i,j,k,nums)){
						blocknum=k;	
						break;
					}
					if(nums[i][k]==nums[i][j] && isBlockleft(i,j,k,nums) && !changed[i][k]){
						blocknum=k;
						changed[i][k]=true;
						scores+=nums[i][k];
						$("#score").text(scores);
						break;
					}
					if(nums[i][k]!=0){
						blocknum++;
					}
				}			
				if(blocknum!=j){
					mleft(i,j,blocknum);
					nums[i][blocknum]+=nums[i][j];
					nums[i][j]=0;	
					words[i][blocknum]=showWord(selection,nums[i][blocknum]);
					words[i][j]=showWord(selection,nums[i][j]);
				}
			}
		}
	}	
}
function MoveUp(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(nums[i][j]!=0){
				var blocknum=0;
				for(var k=0;k<i;k++){
					if(nums[k][j]==0 && isBlockup(i,j,k,nums)){
						blocknum=k;	
						break;
					}
					if(nums[k][j]==nums[i][j] && isBlockup(i,j,k,nums) && !changed[k][j]){
						blocknum=k;
						changed[k][j]=true;
						scores+=nums[k][j];
						$("#score").text(scores);
						break;
					}
					if(nums[k][j]!=0){
						blocknum++;
					}
				}			
				if(blocknum!=i){
					mup(i,j,blocknum);
					nums[blocknum][j]+=nums[i][j];
					nums[i][j]=0;
					words[blocknum][j]=showWord(selection,nums[blocknum][j]);
					words[i][j]=showWord(selection,nums[i][j]);
				}
			}
		}
	}	
}
function MoveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(nums[i][j]!=0){
				var blocknum=0;
				for(var k=3;k>j;k--){
					if(nums[i][k]==0 && isBlockright(i,j,k,nums)){
						blocknum=3-k;	
						break;
					}
					if(nums[i][k]==nums[i][j] && isBlockright(i,j,k,nums) && !changed[i][k]){
						blocknum=3-k;	
						changed[i][k]=true;
						scores+=nums[i][k];
						$("#score").text(scores);
						break;
					}
					if(nums[i][k]!=0){
						blocknum++;
					}
				}		
				var n=3-blocknum;
				if(n!=j){
					mright(i,j,n);
					nums[i][n]+=nums[i][j];
					nums[i][j]=0;
					words[i][n]=showWord(selection,nums[i][n]);
					words[i][j]=showWord(selection,nums[i][j]);
				}
			}
		}
	}
}
function MoveDown(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!=0){
				var blocknum=0;
				for(var k=3;k>i;k--){
					if(nums[k][j]==0 && isBlockdown(i,j,k,nums)){
						blocknum=3-k;	
						break;
					}
					if(nums[k][j]==nums[i][j] && isBlockdown(i,j,k,nums) && !changed[k][j]){
						blocknum=3-k;	
						changed[k][j]=true;
						scores+=nums[k][j];
						$("#score").text(scores);						
						break;
					}
					if(nums[k][j]!=0){
						blocknum++;
					}
				}	
				var n=3-blocknum;
				if(n!=i){
					mdown(i,j,n);
					nums[n][j]+=nums[i][j];
					nums[i][j]=0;
					words[i][j]=showWord(selection,nums[i][j]);
					words[n][j]=showWord(selection,nums[n][j]);
				}
			}
		}
	}
}