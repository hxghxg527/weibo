/**
 * Created by hxghxg527 on 15/12/2.
 */

function ProgressBar() {

}

ProgressBar.prototype.setWidth = function (width) {
    if ($('.progress-bar').length == 0) return;
    $('.progress-bar').animate({
        width: width
    }, time - 10, function () {
        console.log(pb_origin_width);
        if (pb_origin_width == 101) {
            $(this).css({
                borderRadius: 0
            })
        }
    });
};

var progressBar = new ProgressBar();

var pb_origin_width = 5;
var time = 50;
var timer = null;


function setWidthByLoadProgress() {
    window.setTimeout(function () {
        progressBar.setWidth(pb_origin_width++ + '%');
        if (pb_origin_width <= 100) {
            setWidthByLoadProgress();
        }
    }, time);
}

setWidthByLoadProgress();

window.onload = function () {
    pb_origin_width = 100;
    time = 1000;
    progressBar.setWidth(pb_origin_width + '%');
};

window.onunload = function () {
    if (timer) clearTimeout(timer);
    timer = null;
};
