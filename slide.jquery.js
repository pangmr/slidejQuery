/**
*@fileName:slide.jquery
*@author:pangmiaoran
*@time:2017/3/8
*@disc:
*/
;(function ($) {
    var Plugin = function (ele,opt) {
            this.$ele=ele;
            this.defaults={
                interval: 4000,
                startAt: 0,
                width: 0,
                height: 0,
                pagination: true,
                paginationClass: 'active',
                preNext: true
            };
            this.options = $.extend({},this.defaults,opt);
            this.index = 0;
            this.sildes = $(ele).find('.slides li');
            this.sildeBox = $(ele).find('.slides');
            this.length = this.sildes.length;
            this.timer = null,
            this.width = this.options.width || this.sildes.eq(0).width();
            this.height = this.options.height || this.sildes.eq(0).height();
    };
    Plugin.prototype = {
        init: function () {
            var _self = this,
                _ele = this.$ele.css({'height': this.height , 'width': this.width}),
                _opt = this.options;
            _self.sildes.css({'height': this.height , 'width': this.width});
            if(_opt.pagination){
                _self._createPagination();
            }
            if(_opt.preNext){
                _self._createPreNext();
            }
            _self.sildeBox.animate({left: -(_self.index * _self.width)});
            _self.changePaginationClass(_self.index);
            _self.play();
        },
        _createPagination: function () {
            var _self = this,
                _ele = this.$ele,
                _opt = this.options,
                _slideP = this.sildeBox,
                _pagination = $('<ul></ul>').addClass('pagination').appendTo(_ele);
            _self.index = _opt.startAt || 0;
            $('.pagination li').eq(_self.index).addClass('active');
            for(var i = 0 ; i < _self.length ; i++){
                (function (n) {
                    $('<li><span></span></li>').appendTo(_pagination)
                        .on('click', function () {
                            _self.stop();
                            _self.index = n;
                            _slideP.animate({left: -(_self.index * _self.width)});
                            _self.changePaginationClass(n);
                            _self.play();
                        });
                })(i);
            }
        },
        changePaginationClass: function (i) {
             $('.pagination li').eq(i).addClass('active').siblings().removeClass('active');
        },
        _createPreNext: function () {
            var _self = this,
                _ele = this.$ele,
                _pre = $('<div></div>').addClass('pre').appendTo(_ele).on('click',function () {
                    _self.pre();
                }),
                _next = $('<div></div>').addClass('next').appendTo(_ele).on('click',function () {
                    _self.next();
                });
        },
        pre: function () {
            this.stop();
            this.slide(false);
            this.play();
        },
        next: function () {
            this.stop();
            this.slide(true);
            this.play();
        },
        stop: function () {
            clearInterval(this.timer);
        },
        play: function () {
            var _self = this;
            _self.timer = setInterval(function () {
                _self.slide(true);
            },_self.options.interval);
        },
        slide: function (isPlus) {
            var _self = this,
                _ele = this.$ele,
                _slideP = this.sildeBox;
            if(isPlus){
                _self.index++;
            }
            else{
                _self.index--;
            }
            if(_self.index < 0 || _self.index >= _self.length){
                _self.index = 0;
            }
            _slideP.animate({left: -(_self.index * _self.width)});
            $('.pagination li').eq(_self.index).addClass('active').siblings().removeClass('active');
        }
    };
    $.fn.swiper = function (options) {
        return new Plugin(this, options).init();
    };
})(window.jQuery);





