/**
 * Function: all function core call class. 
 * Author: Liang Jingxian
 * */
define(function(require,exports,module){
	require("zepto");
	var effect = require("effect");
	exports.main = function(){
		 effect.writeInWelcome();
		 effect.clickWelcome();
		 effect.insertLocal();
	}	
})

