// JavaScript Document

//获取距离上面的位置
function getPosTop(i){
	return 20+120*i;
}

//获取距离左边的位置
function getPosLeft(j){
	return 20+120*j;
}

function setbgcolor(nums){
	switch(nums){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
		default:alert("error");
	}
}

function settextcolor(nums){
	switch(nums){
		case 2:return "#776e65";break;
		case 4:return "#776e65";break;
		case 8:return "#fff";break;
		case 16:return "#fff";break;
		case 32:return "#fff";break;
		case 64:return "#fff";break;
		case 128:return "#fff";break;
		case 256:return "#fff";break;
		case 512:return "#fff";break;
		case 1024:return "#fff";break;
		case 2048:return "#fff";break;
		case 4096:return "#fff";break;
		case 8192:return "#fff";break;
		default:alert("error");
	}
}

function showWord(selected,number){
	if(selected==0){
		switch(number){
		case 0:return "";break;
		case 2:return number;break;
		case 4:return number;break;
		case 8:return number;break;
		case 16:return number;break;
		case 32:return number;break;
		case 64:return number;break;
		case 128:return number;break;
		case 256:return number;break;
		case 512:return number;break;
		case 1024:return number;break;
		case 2048:return number;break;
		case 4096:return number;break;
		case 8192:return number;break;
		default:alert("error");
	}
	}
	
	if(selected==1){
		switch(number){
		case 0:return "";break;
		case 2:return "淑女";break;
		case 4:return "选侍";break;
		case 8:return "贵人";break;
		case 16:return "才人";break;
		case 32:return "美人";break;
		case 64:return "婕妤";break;
		case 128:return "昭容";break;
		case 256:return "昭仪";break;
		case 512:return "嫔";break;
		case 1024:return "妃";break;
		case 2048:return "贵妃";break;
		case 4096:return "皇贵妃";break;
		case 8192:return "皇后";break;
		default:alert("error");
	}
	}
	
	if(selected==2){
		switch(number){
		case 0:return "";break;				
		case 2:return "夏";break;
		case 4:return "商";break;
		case 8:return "周";break;
		case 16:return "秦";break;
		case 32:return "汉";break;
		case 64:return "三国";break;
		case 128:return "东西晋";break;
		case 256:return "南北朝";break;
		case 512:return "隋唐";break;
		case 1024:return "宋";break;
		case 2048:return "元";break;
		case 4096:return "明";break;
		case 8192:return "清";break;
		default:alert("error");		
	}
	}
	
}


//判断是否无空格
function nospace(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

//创建一个随机数
function randomnumber(selected,nums,words){
	//判断是否还有空位
	if(nospace(nums)){
		return;
	}else{
		//随机一个空位置
		var count=0;
		var temp=new Array();
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(nums[i][j]==0){
					temp[count]=i*4+j;
					count++;
				}
			}
		}
		var result=Math.floor(Math.random()*count);
		var resulti=Math.floor(temp[result]/4);
		var resultj=Math.floor(temp[result]%4);
		//随机一个数字
		nums[resulti][resultj]=Math.random()<0.5?2:4;
		words[resulti][resultj]=showWord(selected,nums[resulti][resultj]);
		showAnimate(resulti,resultj,nums,words);
	}
}


//判断左边是否无障碍
function isBlockleft(i,j,j1,nums){
	var num=j-j1;
	if(num==1){
		return true;
	}
	for(var k=j1+1;k<j;k++){
		if(nums[i][k]!=0){
			return false;
		}
	}
	return true;
}

//判断上边是否无障碍
function isBlockup(i,j,i1,nums){
	var num=i-i1;
	if(num==1){
		return true;
	}
	for(var k=i1+1;k<i;k++){
		if(nums[k][j]!=0){
			return false;
		}
	}
	return true;
}

//判断右边是否无障碍
function isBlockright(i,j,j1,nums){
	var num=j1-j;
	if(num==1){
		return true;
	}
	for(var k=j1-1;k>j;k--){
		if(nums[i][k]!=0){
			return false;
		}
	}
	return true;
}

//判断下边是否无障碍
function isBlockdown(i,j,i1,nums){
	var num=i1-i;
	if(num==1){
		return true;
	}
	for(var k=i1-1;k>i;k--){
		if(nums[k][j]!=0){
			return false;
		}
	}
	return true;
}