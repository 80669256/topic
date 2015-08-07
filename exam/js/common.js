/**
 * Function: common function and interface writing. 
 * Author: Liang Jingxian
 * */
define(function(require,exports,module){
    require("zepto");
    /**
     * Initialization test paper
     * */
	exports.examConfig = {
			questionList : [
				{
					id : "1",
					question : "下面哪个不属于常见编程语言？",
					answers : ["PHP","Java","Vaja","C++"],
					answer : "2" 
				},
								{
					id : "2",
					question : "jquery是由下面哪种语言编写的？",
					answers : ["javascript","java","php","c"],
					answer : "0" 
				},
				{
					id : "3",
					question : "在javascript中根据元素ID获取当前元素的函数是？",
					answers : ["getElementById","getElementByTagName","getElementByClassName","getById"],
					answer : "0" 
				},
								{
					id : "4",
					question : "有一段java 应用程序，它的主类名是a1，那么保存它的源文件名可以是?",
					answers : ["a1.css","a1.class","a1.js","a1.java"],
					answer : "3" 
				},
								{
					id : "5",
					question : "在java中创建对象时必须先",
					answers : ["先声明对象，然后才能使用对象","先声明对象，为对象分配内存空间，然后才能使用对象","先声明对象，为对象分配内存空间，对对象初始化，然后才能使用对象","上述说法都对 "],
					answer : "2" 
				},
								{
					id : "6",
					question : "css中让一个input的背景颜色变成红色",
					answers : ["background:#000;","background:red;","backgroundcolor:red;","color:red;"],
					answer : "1" 
				},
								{
					id : "7",
					question : "关闭linux系统（不重新启动）可使用命令?",
					answers : ["Ctrl+Alt+Del","halt","shutdown -r now","reboot"],
					answer : "1" 
				},			{
					id : "8",
					question : "如果想配置一台匿名ftp服务器，应修改文件？",
					answers : [" /etc/gateway","/etc/ftpservers","/etc/ftpusers","/etc/inetd.conf"],
					answer : "2" 
				},			{
					id : "9",
					question : "JS中请选择结果为真的表达式：",
					answers : ["null instanceof Object","null === undefined","null == undefined","NaN == NaN"],
					answer : "2" 
				},			{
					id : "10",
					question : "在CSS中，关于BOX的margin属性的叙述正确的是?",
					answers : ["边距margin只能取一个值","margin属性的参数有margin-left、margin-right、margin-top、margin-bottom","margin属性的值不可为auto","margin属性的参数值不能全部设置成0px"],
					answer : "1" 
				}
			],
			comments : ["你离程序员还有十万八千里，该干啥，把啥干！","你离初级程序员仅有一步之遥了，加把劲~","你是一个合格的程序猿，在屌丝路上准备逆袭吧~","大神，我对您的崇拜如滔滔黄河之水连绵不绝，您已是行业的泰山北斗了~"],
			randomTurn : true,//判断每次是否随机出题
			setTime : true,  //是否需要定时
			timeout : 90,  //定时总时间
			showAnswer : 1, 		//是否提示答案正确与否，0代表不提示，1代表提示
	};
	/**
	 * Array random order
	 * */
	exports.randomsort = function(a, b) {  
        return Math.random()>.5 ? -1 : 1;  
	} 
	/**
	 * Calculation results
	 * */
	exports.getScore = function(iRight,aLen){
		return Math.ceil(iRight/aLen*100);
	}
	/*
	 *To determine whether the string is empty
	 * */
	exports.isEmpty = function(str){
		return str == null || str == "";
	}
	/**
	 * To determine whether the current browser is WeiXin
	 * */
	exports.isWeixn = function(){  
	    var ua = navigator.userAgent.toLowerCase();  
	    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
	        return true;  
	    } else {  
	        return false;  
	    }  
	}
	/**
	 *Compares the two strings are equal
	 * */
    exports.eq=function(str1, str2) {
        return str1 == str2;
    }
    /**
     * Char type conversion to int type
     * */
    exports.charToInt = function(unames) {
	    if (unames == null || unames == "") {
	        return "";
	    }
	    var arr = {};
	    var rtn = "";
	    arr[0] = unames.charAt(0);
	    rtn = arr[0].charCodeAt();
	    for (var i = 1; i < unames.length; i++) {
	        arr[i] = unames.charAt(i);
	        rtn = rtn + "," + arr[i].charCodeAt();
	    }
	    return rtn;
	}
})
