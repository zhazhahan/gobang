/*
轮播banner插件
author：渣渣涵97
接口文档（函数原型）
zzh_banner(num,time,autoTime)
num：轮播图的数量，默认为5张
time：切换一下所需要的时间，默认为300毫秒
autoTime：自动轮播的间隔时间，默认为3000毫秒
*/
function zzh_banner(num,time,autoTime){
	//默认参数
	if(num == null){
		num = 4;
	}
	if(time == null){
		time = 300;
	}
	if(autoTime == null){
		autoTime = 3000;
	}
	var zzh_pic = $(".zzh_pic"); //轮播的图片
	var zzh_indexNow = 0; //当前序列号
	var zzh_indexBefore = 0; //上一个序列号
	var zzh_indexMax = num-1; //一共几张
	var zzh_index = $(".zzh_banner ul li"); //下方的序列号
	switch(num){
		case 3:
			zzh_pic.eq(num).remove();
			zzh_pic.eq(num+1).remove();
			zzh_index.eq(num).remove();
			zzh_index.eq(num+1).remove();
			$(".zzh_banner ul").css("marginLeft",-3.5+'rem');
		break;
		case 4:
			zzh_pic.eq(num).remove();
			zzh_pic.eq(num+1).remove();
			zzh_index.eq(num).remove();
			zzh_index.eq(num+1).remove();
			$(".zzh_banner ul").css("marginLeft",-4.5+'rem');
		break;
		case 5:
		break;
		default:
			alert("num参数出错");
		break;
	}
	//撑开父元素的空间
	$(".zzh_banner").css("height",zzh_pic.css("height"));
	//初始化轮播图的位置
	zzh_pic.eq(0).css("left","0");
	//序列号点击事件
	zzh_index.click(function(){
		$(this).addClass("zzh_choose").siblings().removeClass("zzh_choose");
		zzh_indexBefore = zzh_indexNow;
		zzh_indexNow = $(this).index();
		if(zzh_indexNow > zzh_indexBefore){
			zzh_next();
		}
		if(zzh_indexNow < zzh_indexBefore){
			zzh_back();
		}
	});
	//前后区域点击事件
	$(".zzh_banner .zzh_next").click(function(){
		zzh_indexBefore = zzh_indexNow;
		zzh_indexNow++;
		if(zzh_indexNow > zzh_indexMax){
			zzh_indexNow = 0;
		}
		zzh_index.eq(zzh_indexNow).addClass("zzh_choose").siblings().removeClass("zzh_choose");
		zzh_next();
	});
	$(".zzh_banner .zzh_back").click(function(){
		zzh_indexBefore = zzh_indexNow;
		zzh_indexNow--;
		if(zzh_indexNow < 0){
			zzh_indexNow = zzh_indexMax;
		}
		zzh_index.eq(zzh_indexNow).addClass("zzh_choose").siblings().removeClass("zzh_choose");
		zzh_back();
	});
	//切换函数
	function zzh_next(){
		zzh_pic.eq(zzh_indexNow).css("left","100%");
		zzh_pic.eq(zzh_indexBefore).animate({"left":"-100%"},time);
		zzh_pic.eq(zzh_indexNow).animate({"left":"0"},time);
	}
	function zzh_back(){
		zzh_pic.eq(zzh_indexNow).css("left","-100%");
		zzh_pic.eq(zzh_indexBefore).animate({"left":"100%"},time);
		zzh_pic.eq(zzh_indexNow).animate({"left":"0"},time);
	}
	setInterval(function(){
		zzh_indexBefore = zzh_indexNow;
		zzh_indexNow++;
		if(zzh_indexNow > zzh_indexMax){
			zzh_indexNow = 0;
		}
		zzh_index.eq(zzh_indexNow).addClass("zzh_choose").siblings().removeClass("zzh_choose");
		zzh_next();
	},autoTime);
}

