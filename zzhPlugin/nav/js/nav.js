/*
二级导航栏插件
author：渣渣涵97
接口文档（函数原型）
zzh_nav(max,show,away,color,hColor,tColor)
max：二级菜单中li的最大值，默认为5个
action：二级菜单的出现方式，默认为2（1直接，2动画）
color：导航栏的颜色，默认为'#555'
hColor：鼠标经过的颜色，默认为'#666'
tColor：文字的颜色，默认为'#fff'
*/
function zzh_nav(max,show,away,color,hColor,tColor){
	//默认参数
	if(max == null){
		max = 5;
	}
	if(show == null){
		show = 2;
	}
	if(away == null){
		away = 1;
	}
	if(color == null){
		color = '#555';
	}
	if(hColor == null){
		hColor = '#666';
	}
	if(tColor == null){
		tColor = '#fff';
	}
	//获取节点
	var li1 = $(".zzh_nav .zzh_ul1 .zzh_li1");
	var ul2 = $(".zzh_nav .zzh_ul1 .zzh_li1 .zzh_ul2");
	var li2 = $(".zzh_nav .zzh_ul1 .zzh_li1 .zzh_ul2 li");
	//颜色设置
	li1.css("background",color);
	li2.css("background",color);
	li1.hover(function(){
		$(this).css("background",hColor);
	},function(){
		$(this).css("background",color);
	});
	li2.hover(function(){
		$(this).css("background",hColor);
	},function(){
		$(this).css("background",color);
	});
	li1.css("color",tColor);
	//二级菜单的出现
	li1.mouseenter(function(){
		//获取一级索引
		var index = $(this).index();
		//获取一级li的宽度
		var width = $(this).css("width");
		//设置二级菜单的位置
		ul2.eq(index).css({display:'block',height:0,left:parseInt(width)*index});
		//出现
		switch(show){
			case 1:
				ul2.eq(index).css({height:max*5+'rem',});
			break;
			case 2:
				ul2.eq(index).animate({height:max*5+'rem',},300);
			break;
		}
	});
	//二级菜单的消失
	li1 .mouseleave(function(){
		//获取一级索引
		var index = $(this).index();
		//消失
		switch(away){
			case 1:
				ul2.eq(index).css({display:'none',});
			break;
			case 2:
				ul2.eq(index).animate({height:0,},300);
			break;
		}
	});
};