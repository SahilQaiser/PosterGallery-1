//元素获取
function $(selector) {
    var method = selector.substr(0, 1) == '.' ? 'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
}
//生成随机数
function random(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);
    var diff = max - min;
    var number = Math.floor(Math.random() * diff + min);
    return number;
}
//内容输出
var data = data;

function addPhotos() {
    var template = $('#container').innerHTML;
    var html = [];
    var nav = [];
    for (i in data) {
        var _html = template
            .replace('{{index}}', i)
            .replace('{{img}}', data[i].img)
            .replace('{{caption}}', data[i].caption)
            .replace('{{desc}}', data[i].desc);
        html.push(_html)
        nav.push('<span id="nav_'+i+'" class="icon" onclick="turn($(\'#photo_'+i+'\'))"></span>')
    }
    html.push('<div class="nav">'+nav.join('')+'</div>')
    $('#container').innerHTML = html.join('');
    console.log(random([0, data.length]))
    sort(random([0, data.length]))
}
addPhotos();

//排序
function sort(n) {
    var _photo = $('.photo');
    var photos = [];
    for (var i = 0; i < _photo.length; i++) {
        _photo[i].className = _photo[i].className.replace(/\s*photo-center\s*/, '');
        _photo[i].className = _photo[i].className.replace(/\s*photo-front\s*/, '');
        _photo[i].className = _photo[i].className.replace(/\s*photo-back\s*/, '');
        _photo[i].className += ' photo-front ';
        _photo[i].style.left = '';
        _photo[i].style.top = '';
        _photo[i].style['transform'] = 'rotate(360deg) scale(1.3)';
        photos.push(_photo[i]);
    }
    var photo_center = $('#photo_' + n);
    photo_center.className += ' photo-center';
    photo_center = photos.splice(n, 1)[0];
    var photos_left = photos.splice(0, Math.ceil(photos.length / 2));
    var photos_right = photos;
    var ranges = range();
    for (i in photos_left) {
        var photo = photos_left[i];
        photo.style["transform"] = "rotate(" + random([-60, 60]) + "deg) scale(.8) translate(600px)";
    }
    for (i in photos_right) {
        var photo = photos_right[i];
        photo.style["transform"] = "rotate(" + random([-60, 60]) + "deg) scale(.8) translate(-600px)";
    }
    var navs = $('.icon');
    for(var i = 0; i < navs.length; i++){
        navs[i].className = navs[i].className.replace(/\s*icon_current\s*/,' ')
        navs[i].className = navs[i].className.replace(/\s*icon_back\s*/,' ')
    }
    $('#nav_'+n).className += ' icon_current '
}

//计算左右分区的范围
function range() {
    var range = {
        left: { x: [], y: [] },
        right: { x: [], y: [] }
    }
    var wrap = {
        w: $('#container').clientWidth,
        h: $('#container').clientHeight
    }
    var photo = {
        w: $('.photo')[0].clientWidth,
        h: $('.photo')[0].clientHeight
    }
    range.wrap = wrap;
    range.photo = photo;
    range.left.x = [0 - photo.w, wrap.w / 2 - photo.w / 2];
    range.left.y = [0, photo.h*2];
    range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w + photo.w];
    range.right.y = range.left.y;
    return range;
}
//翻转控制
function turn(ele) {
    var clas = ele.className;
    var n = ele.id.split('_')[1];
    if(! /photo-center/.test(clas)){
        return sort(n)
    }
    if (/photo-front/.test(clas)) {
        clas = clas.replace(/photo-front/, 'photo-back')
        $('#nav_'+n).className += 'icon_back'
    } else {
        clas = clas.replace(/photo-back/, 'photo-front')
        $('#nav_'+n).className = $('#nav_'+n).className.replace(/icon_back/,'')
    }
    return ele.className = clas;
}
