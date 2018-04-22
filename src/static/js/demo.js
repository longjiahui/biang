const $ = require('jquery');
var biang = require('../../biang.js');

$(function(){
    console.log('hello 2');
    $('#btn-demo').click(function(){
            biang.biang({
                title:'haha',
                url:'http://baidu.com',
                button:['yes', {text:'no', type:'shutdown'}, 'haha'],
                callback:[function(){console.log('yes')}, null, function(){console.log('haha')}]
            });
    });
});