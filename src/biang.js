const $ = require('jquery');

//事件委托
$(function(){
	console.log('hello');
    $('body').on('click', '.biang-shutdown-icon,.biang-mask', function(){
        toggle($(this).parents('.biang'));  
    });
});

var instance =null;
function getInstance(){
    
    //如果还没初始化，则初始化
    if(instance == null){
        instance = getBiangTemplate();
        $('body').prepend(instance);
    }
    return instance;
}

const defaultConfig = {
	title:'提示',
	button:[{text:'确认', type:'shutdown'}],
};

function readConfig(config){
	if(config != null)return config;
	var configFinal = defaultConfig;
	for(var key in defaultConfig){
		if(config[key]!=null){
			configFinal[key] = config[key];
		}
	}
	return configFinal;
}

function show(biang){
    biang = $(biang);
    biang.css('display', 'block');
    biang.find('.biang-mask').addClass('mask-show').removeClass('mask-hide');
    biang.find('.biang-main').addClass('biang-show').removeClass('biang-hide');
    biang.attr('biang', 'biang');
}

function empty(biang){
    biang.find('.biang-header-title').text('');
    biang.find('.biang-content').html('');
    biang.find('.biang-footer').html('');
}
function hide(biang){
    biang = $(biang);
    biang.find('.biang-mask').addClass('mask-hide').removeClass('mask-show');
    biang.find('.biang-main').addClass('biang-hide').removeClass('biang-show');
    setTimeout((function(){
        var biangLocal = biang;
        return function(){
            biang.css('display', 'none');
            //清空内容;
            empty(biang);
        }
    })(), 300);
    biang.attr('biang', 'idle');
}
function isBiangBiang(biang){
    return $(biang).attr('biang')=='biang'?true:false;
}
function toggle(biang){
    biang = $(biang);
    if(isBiangBiang(biang))
        hide(biang);
    else show(biang);
}

function modifyBiang(biang , config){
    //config/content
    if(config.url!=null){
        var iframe = $('<iframe style="width:100%;height:100%" src="'+config.url+'" frameborder="0"></iframe>');
        biang.find('.biang-content').append(iframe);
    }else{
        if(config.content!=null){
            biang.find('.biang-content').append($(config.content));
        }
    }
    
    //title
    if(config.title!=null){
        biang.find('.biang-header-title').text(config.title);
    }

    //footer buttons
    renderFooter(config.button, config.callback, biang);
}

function getBiangTemplate(){
    return  $('    <div class="biang">'+
'        <div class="biang-mask"></div>'+
'        <div class="biang-main">'+
'            <div class="biang-header biang-clear">'+
'                <div class="biang-header-left"><span class="biang-header-title"></span></div>'+
'                <div class="biang-header-right"><span class="biang-shutdown-icon">X</span></div>'+
'            </div>'+
'            <div class="biang-content"></div>'+
'            <div class="biang-footer biang-clear"></div>'+
'        </div>'+
'    </div>');
}
    
function getButtonTemplate(text){
    return $('<button>'+text+'</button>')
}

function renderFooter(buttonsConfig,callbacksConfig, biang){
    if(buttonsConfig ==null)return;
    //button
    var footer = biang.find('.biang-footer')
    footer.css('display', 'block');
    for(var i=0;i<buttonsConfig.length;++i){
        var  buttonConfig= buttonsConfig[i];
        var text = buttonConfig;
        var type = '';
        if(typeof(buttonConfig)!='string'){
            var text = buttonConfig.text;
            var type = buttonConfig.type;
        }
        var button = getButtonTemplate(text);
        if(type =='shutdown'){
            button.click((function(){
                var biangLocal = biang;
                return function(){
                    hide(biangLocal); 
                }
            })());
        }
        if(callbacksConfig!=null && callbacksConfig[i]!=null){
            button.click((function(){
                var biangLocal = biang;
                var callback = callbacksConfig[i];
                return function(){
                    callback(biangLocal);
                }
            })());      
        }
        footer.append(button);
    }
}



/*config {
url:''//iframe
content://div content(dom element)
title://title of the modal
button://[{'yes', {text:'no', type:'shutdown'}, 'button1']array
callback://[function(){console.log('yes')}, function(){console.log('no')}, function(){console.log('button1')}]array
}*/
function biang(config){
	config = readConfig(config);

	//url不为空，添加iframe
	//url空，content不空，添加content
		//content为字符串，添加html否则，append content
	//content空，则空弹出
    
    var biang = getInstance();
    modifyBiang(biang, config);
    show(biang);
}
module.exports ={
    biang:biang
};