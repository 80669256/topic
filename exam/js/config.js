// JavaScript Document
/**
*  Function: seajs core configuration file
*  Author: Liang Jingxian
**/

seajs.config({
	// 别名配置
    alias: {
        "zepto": "sitePath/zepto.min.js",
		"common": "sitePath/common.js",
		"effect": "sitePath/effect.js",
        "main":"sitePath/main.js" 
    },
	// 路径配置
    paths: {
      'sitePath': './js'
    },
	// Sea.js 的基础路径
  	base: './js'
});
