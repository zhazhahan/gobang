function ajax(url, fnSucc, fuFaild){
	//1.创建ajax对象
	if(window.XMLHttpRequest){
		//正常情况
		var oAjax = new XMLHttpRequest();
		
	}
	else if(window.ActiveXObject){
		//IE6
		var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else{
        alert("你的浏览器不支持Ajax!");
    }
	//2.连接服务器
	//open(方法,文件名,异步传输)
	//+'?t='+new Date()getTime()
	oAjax.open('GET',url+'?t='+new Date().getTime(),true);
	//3.发送请求
	oAjax.send();
	//4.接收返回值
	oAjax.onreadystatechange = function(){
		//0还没open，1正在send，2完成send，3解析内容，4完成解析
		if(oAjax.readyState == 4){
			//status是http状态码
			if(oAjax.status == 200){
				fnSucc(oAjax.responseText);
			}
			else{
				fnFaild(oAjax.status);
			}
		}
	};
};