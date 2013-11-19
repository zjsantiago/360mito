define([ 'tab', 'likescrollbar', 'lazyload'], function(){

'use strict';

    var mitoTab = $( '#mitoTab' ),
        channels = ["meinv", "bagua", "bizhi"],
        lazyload = $.ui.Lazyload,
        tab, likeScrollbar, hoverTimer1, hoverTimer2, scrollbarElem, imgs, loader, index

        tabInit = function( tabBox, index){
            tabBox = tabBox || $( 'div.tab_box', this ).eq( 0 ); 
            index = index?index:0;

            //获取当前日期
            var date = new Date();
            date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            $("div.tab_box .date").eq(index).text(date);

            //显示图片
            getImg(tabBox, index);
        };

        //获取图片数据
        var getImg = function (tabBox, index) {
            $.ajax({
                url: "http://fk.ext.image.so.com/index.php?c=Extension&a=jsonp&type="+channels[index],
                type: "GET",
                dataType: "json",
                success: showImg
            });
        };

        //显示图片
        var showImg = function(data) {

        };

        //填充DOM
        var fillDom = function() {

        };

        //延迟加载
        var lazyLod = function() {

        };

        //重置滚动条
        var setScroll = function() {

        };


        
    // //获取图片刷新tab
    // var showImg = function (tabBox, index) {
    //     $.ajax({
    //         url: "http://fk.ext.image.so.com/index.php?c=Extension&a=jsonp&type="+channels[index],
    //         type: "GET",
    //         dataType: "json",
    //         success: function(data){

    //             var currentList = $(".img_list").eq(index);
    //             currentList.empty();
    //             $(data.list).each(function(){
    //                 var item = '<li>\
    //                             <p><a target="_blank" href="'+this.click_url+'" class="img_tit">'+this.group_title+'</a></p>\
    //                             <a target="_blank" href="'+this.click_url+'" class="img_box" width="'+this.qhimg_width+'px" height="'+this.qhimg_height+'px">\
    //                                 <img width="'+this.qhimg_width+'px" height="'+this.qhimg_height+'px" src="img/placeholder.png" data-lazysrc="'+this.qhimg_thumb_url+'">\
    //                                 <span class="img_count">'+this.total_count+'张</span>\
    //                             </a>\
    //                             <ul class="img_bar">\
    //                                 <li><a class="setup" href="zhushou360://quiet=1&src=leidian&dtype=wallpaper&op=0&type=jpg&name='+this.group_title+'&url='+this.downurl+'"><s class="icon_mobile"></s>发送到手机</a></li>\
    //                                 <li class="img_share">\
    //                                     <a href="javascript:;"><s class="icon_share"></s>分享</a>\
    //                                     <ul class="share_list" data-title="'+this.group_title+'" data-imgsrc="'+this.qhimg_url+'">\
    //                                         <li><a title="分享到 新浪微博" class="share_link weibo" href="#" target="_blank">新浪微博</a></li>\
    //                                         <li><a title="分享到 腾讯微博" class="share_link tweibo" href="#" target="_blank">腾讯微博</a></li>\
    //                                         <li><a title="分享到 QQ空间" class="share_link qzone" href="#" target="_blank">QQ空间</a></li>\
    //                                         <li><a title="分享到 人人网" class="share_link renren" href="#" target="_blank">人人网</a></li>\
    //                                         <li><a title="分享到 豆瓣网" class="share_link douban" href="#" target="_blank">豆瓣网</a></li>\
    //                                     </ul>\
    //                                 </li>\
    //                             </ul>\
    //                             </li>';
    //                 currentList.append(item); 
    //             });
                
    //             //延迟加载
    //             imgs = $( '.tab_box:eq('+index+') .img_box img' ),
    //             loader = new lazyload( imgs, {
    //                 container : '.tab_box:eq('+index+')',
    //                 threshold : 10,
    //             });

    //             //初始化滚动条
    //             if( likeScrollbar ){
    //                 likeScrollbar.destroy();
    //                 likeScrollbar = null;
    //             }

    //             likeScrollbar = new $.ui.LikeScrollbar( tabBox, {
    //                 left : 4
    //             });
    //         }
    //     });
    // }
        
    // Tab 组件实例化    
    tab = new $.ui.Tab( mitoTab, {
        init : tabInit
    });
    
    // Tab初始化的时候，加载数据
    tab.on('init', function(e){
        index = e.index;
        tabInit( e.target, e.index); 
    });
    // 切换 Tab 面板的时候需要重新初始化滚动条
    tab.on( 'change', function( e ){
        //tabInit( e.target);
    });
    
    // hover时显示滚动条
    mitoTab.find( 'div.tab_wrapper' ).on( 'mouseenter', function(){
        hoverTimer1 = setTimeout(function(){
            scrollbarElem = $( 'div.ecope_likescrollbar' );
            
            if( scrollbarElem.length ){
                scrollbarElem.css({
                        visibility : 'visible', 
                        display : 'none'
                    })
                    .fadeIn( 100 );
            }
        }, 50 );
    });
        
    // mouseleave时隐藏滚动条    
    $( document.body ).on( 'mouseleave', function(){    
        if( hoverTimer1 ){
            clearTimeout( hoverTimer1 );
            hoverTimer1 = null;
        }
        
        if( scrollbarElem && scrollbarElem.length ){
            scrollbarElem.fadeOut( 100, function(){
                scrollbarElem.css({
                    visibility : 'hidden', 
                    display : 'block'
                });
            });
        }
    });

    // 显示分享菜单
    mitoTab.on( 'mouseenter', '.img_share', function( e ){
            var self = this;
            hoverTimer2 = setTimeout(function(){
                var shareList = $( self ).find( 'ul.share_list' );           
                shareList.show();
            }, 50 );
            
            e.stopPropagation();
        })
        .on( 'mouseleave', '.img_share', function( e ){
            clearTimeout( hoverTimer2 );
            hoverTimer2 = null;
            
            var shareList = $( this ).find( 'ul.share_list' );            
            shareList.hide();
            
            e.stopPropagation();
        });
        
    // ---------------------------------------------
    // ------------------ 分享 ---------------------
    // ---------------------------------------------  
    var rShare = /\!\!([a-z]+)\!\!/g,
        shareData = {
            weibo : 'http://service.weibo.com/share/share.php?url=!!url!!&appkey=&title=!!title!!!!text!!&pic=!!pic!!&language=zh_cn',
            tweibo : 'http://share.v.t.qq.com/index.php?c=share&a=index&title=!!title!!!!text!!&url=!!url!!&pic=!!pic!!',
            douban : 'http://shuo.douban.com/%21service/share?image=!!pic!!&href=!!url!!&name=!!title!!&text=!!text!!',
            qzone : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=!!url!!&title=!!title!!&pics=!!pic!!&summary=!!text!!',
            renren : 'http://widget.renren.com/dialog/share?resourceUrl=!!url!!&srcUrl=!!url!!&title=!!title!!&pic=!!pic!!&description=!!text!!'
        };
        
    mitoTab.on( 'click', '.share_link', function( e ){
        var elem = $( this ),
            parent = elem.parents( '.share_list' ),
            shareTitle = parent.attr( 'data-title' ),
            shareImg = parent.attr( 'data-imgsrc' ),
            className = this.className.replace( 'share_link ', '' ),
            url = shareData[ className ],
            encode = function( str, type ){
                if( className === 'weibo' && type === 'text' ){
                    str += '( 来自@360搜索官方 )';
                }

                return encodeURIComponent( str );
            },

            newUrl;
            
        newUrl = url.replace( rShare, function( str, s ){
            switch( s ){
                case 'url' :
                    return encode( window.location.href, 'url' );
                
                case 'title' :
                    return encode( '#360图片#我在看【' + shareTitle + '】', 'title' );
                    
                case 'pic' :
                    return encode( shareImg );
                    
                case 'text' :
                    return encode( '一起来看看吧。', 'text' );
            }        
        });   

        this.href = newUrl;
    }); 
    
    //发送到手机
    chrome.tabs.getSelected(null, function(tab) {
        mitoTab.on( 'click', '.setup', function( e ){           
            chrome.tabs.update( tab.id, {
                url : this.href                
            });
            
            e.preventDefault();
        });
    });
    
});