/**
 * Function: effect and common function realization. 
 * Author: Liang Jingxian
 * */
define(function(require,exports,module){
	require("zepto");
	var common = require("common");
	var con = common.examConfig.questionList;
	var comments = common.examConfig.comments;
	var iNowScore = {};
	var lS = window.localStorage;
	/**
	 * Determine whether the problem is random
	 * */
	exports.randomAnswer = function(){
		if(common.examConfig.randomTurn){
			return con.sort(common.randomsort);
		}else{
			return con;
		}
	}
	/**
	 * Executive randomAnswer;
	 * */
	exports.randomAnswer();
	/**
	 * The home page information is loaded into the topic and time number
	 * */
	exports.writeInWelcome = function(){
		if(common.examConfig.setTime){
			$(".upinfo .msg span").eq(0).html(con.length);
			$(".upinfo .msg span").eq(1).html(common.examConfig.timeout);
		}else{
			$(".upinfo .msg span").eq(0).html(con.length);
			$(".upinfo .msg strong").css("line-height","1.8rem");
			$(".upinfo .msg strong").eq(1).css("display","none");
		}
	}
	/**
	 * Click the answer button to trigger the test page
	 * */
	 exports.clickWelcome = function(){
	 	$(".begin button").on("touchend",function(event){
	 		if(common.isEmpty(lS.lTel)){
	 			$(".login , .dbg").css("display","block");
	 			return false;
	 		}else{
		 		exports.toQuestion();
	 		}
	 	});
	 }
	 /**
	  * Enter the answer list
	  * */
	 exports.toQuestion = function(){
	 	$(".login , .dbg").css("display","none");
 		$("body").addClass("bgdouble");
 		$(".welcome").css("display","none");
 		$(".question").css("display","block");
 		$("#nameMsg").html(lS.lName);
 		$("#telMsg").html(lS.lTel);
 		exports.writeInPaper();
		exports.answerClick();
	 	exports.timer();
	 }
	 /**
	  * Name, telephone temporary
	  * */
	 exports.insertLocal = function(){
	 	$(".login .close").on("touchend",function(event){
	 		$(".login , .dbg").css("display","none");
	 		event.preventDefault();
	 	});
	 	$(".lBtn").on("touchend",function(event){
	 		var name = $(".lName").val();
	 		var tel = $(".lTel").val();
	 		if(common.isEmpty(name)||!name.match(/^[\u0391-\uFFE5]+$/)){
	 			alert("姓名输入有误！");
	 			return false;
	 		}
	 		if(common.isEmpty(tel)||!tel.match(/^[0-9]{11}$/)){
	 			alert("电话号码有误！");
	 			return false;
	 		}
	 		lS.lName = name;
	 		lS.lTel = tel;
	 		exports.toQuestion();
	 		event.preventDefault();
	 	});
	 }
	/**
	 * Examination paper topic loading
	 * */ 
	exports.writeInPaper = function(){
		iNow = 1;
		con = con[0];
		$(".question").find(".question_title").html(iNow+":"+con.question);
		$(".question").find(".answers").each(function(index,ele){
			$(this).html(con.answers[index]);
		});
		$(".question").find("ol").attr("data-right",con.answer);
	}
	/**
	 *Click on the question sentence
	 * */
	exports.answerClick = function(){
		var iNow = 1;
		var anJson = [];
		var aCode = ["A","B","C","D"];
		var iRight = 0;
		var con = common.examConfig.questionList;
	  	$("ol li").on("touchend",function(event){
			//Save answer record
			var json = {};
			json.id = iNow-1;
			json.question = con[iNow-1].question;
			json.clickAnswer = aCode[$(this).attr("data-index")]+":"+con[iNow-1].answers[$(this).attr("data-index")];
			json.rightAnswer = aCode[con[iNow-1].answer]+":"+con[iNow-1].answers[$(this).parent().attr("data-right")];
			anJson.push(json);
			//Display correct answer and wrong answer
			$(".question ol li").eq(con[iNow-1].answer).addClass("right");
			if($(this).attr("data-index")!=con[iNow-1].answer){
				$(this).addClass("error");
			}
			if($(this).attr("data-index")==con[iNow-1].answer){
				iRight++;
			}
			iNowScore = { iRight:iRight,iNum:con.length };
			//250ms after the turn
			setTimeout(function(){
				if(iNow == con.length){
					exports.finish(iNowScore);
					return false;
				}
				$(".question").find(".question_title").html(iNow+1+":"+con[iNow].question);
				$(".question").find(".answers").each(function(index,ele){
					$(this).html(con[iNow].answers[index]);
				});
				$(".question ol li").each(function(index,ele){
					$(this).removeClass();
				})
				$(".question").find("ol").attr("data-right",con[iNow].answer);
				
				iNow++;
				event.preventDefault();	 
			},250);
		 });
		 /**
		  * Answer countdown function
		  * */
		exports.timer = function(){
			if(common.examConfig.setTime){
				var num = parseInt(common.examConfig.timeout);
				var timer = null;
				$(".info .timer").html(num);
				clearInterval(timer);
				timer=setInterval(function(){
					num--;
					$(".info .timer").html(num);
					if(num ==0){
						clearInterval(timer);
						exports.finish(iNowScore);
					}
				},1000);
			}
		}
		/**
		 * The answer information, the presence of a JSON inside information
		 */
		exports.intoJson = function(){
			var score = common.getScore(iNowScore.iRight,iNowScore.iNum);
			var jsonInfo = {};
			jsonInfo.name = lS.lName;
			jsonInfo.tel = lS.lTel;
			jsonInfo.score = score;
			jsonInfo.correct = iNowScore.iRight;
			jsonInfo.questionNum =iNowScore.iNum; 
			anJson.push(jsonInfo);
			
			console.log(anJson);
			//http://localhost:8080/feedBack.jspx?name=24352,19977&phoneNo=49,51,56,50,57,50,56,50,57,50,56&type=24494,20449,21453,39304&feedBack=24494,20449,21453,39304
			var url = "http://m.xhd.cn/feedBack.jspx?callbak=?&";
			var param ="";
			param += "name="+common.charToInt(lS.lName)+ "&";
			param += "phoneNo="+common.charToInt(lS.lTel)+ "&";
			param += "type="+common.charToInt("程序员评测")+ "&";
			var sJson = "";
			for(var i =0;i<anJson.length-1;i++){
				sJson+=(parseInt(anJson[i].id)+1)+" :<strong> 题目：</strong>"+anJson[i].question+"<br/><strong>所选答案:</strong>  "+anJson[i].clickAnswer+" <br /> <strong>正确答案:</strong>"+anJson[i].rightAnswer+"<br /><br />";
			}
			var info_iQues = anJson[anJson.length-1].questionNum;
			var info_iRight = anJson[anJson.length-1].correct;
			var info_iScore = anJson[anJson.length-1].score;
			sJson+="<h3 style=\"color:red\">总结   题目总数:"+info_iQues +" , 回答正确个数:"+info_iRight +", 通过率为:"+info_iScore +"%</h3>"
		//	sJson="<p style=\"text-indent:2em\">"+sJson+"</p>";
			param += "feedBack="+common.charToInt(sJson);
			url += param;
			$.getJSON(url,function(data) {
                if (data.success) {
                 // alert("您的预约已提交，我们会尽快与您取得联系！");
                } else {
                    if (data.status == 3) {
                      //  alert("预约提交失败，此手机号已预约！");
                    } else {
                      //  alert("预约提交失败，请重试！");
                    }
                }
            });
		}
		/**
		 * Answer business
		 * **/
		exports.finish = function(iNowScore){
			var score = common.getScore(iNowScore.iRight,iNowScore.iNum);
			if(isNaN(score)){
				score= 0;
			}
			exports.intoJson();
			if(common.isWeixn()){
				$(".shareWx").css("display","block");
			}
//			$(".shareWx").css("display","block");
			//alert("答题完毕，你获得的分数是："+score);
			setTimeout(function(){
				$(".question").css("display","none");
				$(".finish").css("display","block");
				$("body").addClass("findshBg");
			},300);
			$(".rightAnster").html(iNowScore.iRight);
			$(".endScore").html(score);
			var getMsg = "";
			if(score<=30&&score>0){
				getMsg = comments[0];
			}else if(score<60&&score>31){
				getMsg = comments[1];
			}else if(score<91&&score>=60){
				getMsg = comments[2];
			}else if(score==100){
				getMsg = comments[3];
			}
			$(".comments").html(getMsg);
			exports.wxShare();
		}
		/**
		 * weixin share function
		 * */
		exports.wxShare = function(){
			$(".shareWx").on("touchend",function(event){
				$(".dbg,.weixin").css("display","block");
				event.preventDefault();
			});
			$(".dbg").on("touchend",function(event){
				$(".dbg,.weixin").css("display","none")
				event.preventDefault();
			});
		}
	}
})
