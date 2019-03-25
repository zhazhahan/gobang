/*
粒子动画插件
author：渣渣涵97
接口文档（函数原型）
zzh_cellAct(num,fps,radius,s,r,g,b,a,direction)
num：粒子的数量，默认为根据窗口大小(1536*728时为99)；
fps：每秒的帧数，默认为10；
radius：粒子的半径，默认为50(px)；
s：粒子的移动速度，默认为2(级)；
r：粒子的红色值，默认为255；
g：粒子的绿色值，默认为255；
b：粒子的蓝色值，默认为255；
a：粒子的不透明度，默认为0.5；
direction：粒子的移动方向，2下 4左 6右 8上 5无序，默认为2；
*/

//粒子接口
function zzh_cellAct(num,fps,radius,s,r,g,b,a,direction,userNum){
	//设置canvas同body一个大小
	var zzh_canvas = document.getElementById("zzh_canvas");
	var zzh_ctx = zzh_canvas.getContext("2d");
	var zzh_bgW = document.body.clientWidth;
	var zzh_bgH = document.body.clientHeight-5;
	zzh_canvas.width = zzh_bgW;
	zzh_canvas.height = zzh_bgH;
	//设置默认参数值
	if(num == null)
		num = zzh_bgW*zzh_bgH/11295;
	if(fps == null)
		fps = 20;
	if(radius == null)
		radius = 5;
	if(s == null)
		s = 10;
	if(r == null)
		r = 255;
	if(g == null)
		g = 255;
	if(b == null)
		b = 255;
	if(a == null)
		a = 0.5;
	if(direction == null)
		direction = 2;
	if(userNum == null)
		userNum = 200;
	//构造对象
	function zzh_Cell(){
		//1-4，用于无序移动
		this.temp = Math.round(Math.random()*3+1);
		//坐标
		this.x = Math.round(Math.random()*zzh_bgW);
		this.y = Math.round(Math.random()*zzh_bgH);
		//半径
		this.r = Math.round(Math.random()*(radius-1)+1);
		//步长（速度）
		this.step = this.r/(10/s);
		//rgba颜色
		this.red = r;
		this.green = g;
		this.blue = b;
		this.alphy = a;
		//绘制方法
		this.paint = function(){
			if(direction == 2){
				this.y += this.step;
				if(this.y > zzh_bgH+this.r){
					this.y = 0;
				}
			}
			else if(direction == 4){
				this.x -= this.step;
				if(this.x < 0){
					this.x = zzh_bgW+this.r;
				}
			}
			else if(direction == 6){
				this.x += this.step;
				if(this.x > zzh_bgW+this.r){
					this.x = 0;
				}
			}
			else if(direction == 8){
				this.y -= this.step;
				if(this.y < 0){
					this.y = zzh_bgH+this.r;
				}
			}
			else if(direction == 5){
				switch(this.temp){
					case 1:
						this.y -= this.step;
						if(this.y < 0){
							this.y = zzh_bgH+this.r;
						}
					break;
					case 2:
						this.y += this.step;
						if(this.y > zzh_bgH+this.r){
							this.y = 0;
						}
					break;
					case 3:
						this.x -= this.step;
						if(this.x < 0){
							this.x = zzh_bgW+this.r;
						}
					break;
					case 4:
						this.x += this.step;
						if(this.x > zzh_bgW+this.r){
							this.x = 0;
						}
					break;
					default:
						alert("变量temp出错");
					break;
				}
			}
			else{
				alert("direction参数出错");
			}
			zzh_ctx.fillStyle = 'rgba('+this.red+','+this.green+','+this.blue+','+this.alphy+')';
			zzh_ctx.beginPath();
			zzh_ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
			zzh_ctx.fill();
		}
	}
	//创建对象
	var zzh_cell = [];
	for(i=0; i<num; i++){
		zzh_cell[i] = new zzh_Cell();
	}
	var zzh_userCell = [];
	var zzh_x;
	var zzh_y;
	var zzh_index = 0;
	/*//交互式设计
	zzh_canvas.onclick= function(e){
		zzh_x = e.clientX;
		zzh_y = e.clientY;
		zzh_userCell[zzh_index] = new zzh_Cell();
		zzh_userCell[zzh_index].x = zzh_x;
		zzh_userCell[zzh_index].y = zzh_y
		zzh_index++;
	}*/
	//交互式设计
	var zzh_mouseOff = false;
	document.onmousedown = function(e){
		zzh_x = e.clientX;
		zzh_y = e.clientY;
		zzh_userCell[zzh_index] = new zzh_Cell();
		zzh_userCell[zzh_index].x = zzh_x;
		zzh_userCell[zzh_index].y = zzh_y
		zzh_index++;
		zzh_mouseOff = true;
	}
	document.onmouseup= function(){
		zzh_mouseOff = false;	
	}
	document.onmousemove= function(e){
		if(zzh_mouseOff){
			zzh_x = e.clientX;
			zzh_y = e.clientY;
			zzh_userCell[zzh_index] = new zzh_Cell();
			zzh_userCell[zzh_index].x = zzh_x;
			zzh_userCell[zzh_index].y = zzh_y
			zzh_index++;
		}
	}
	//粒子动画
	var zzh_zxc;
	setInterval(function(){
		//清屏
		zzh_ctx.clearRect(0,0,zzh_bgW,zzh_bgH);
		//绘制粒子
		for(j=0; j<num; j++){
			zzh_cell[j].paint();
		}
		if(zzh_index-userNum>0)
			zzh_zxc = zzh_index-userNum;
		else
			zzh_zxc = 0;
		for(z=zzh_zxc; z<zzh_index; z++){
			zzh_userCell[z].paint();
		}
	},1000/fps);
}