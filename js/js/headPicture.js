function postAvatar() {  
    var petimage = $("#changeAvatar > img").attr("src");//此时取到的图片已经是base64形式  
        //你的处理代码，改post到服务器了，服务器接收同接收普通post参数一样，只是，存图片的字段改成ntext，这是sql的数据类型，其他数据库同类型，jq的getJSON可能会不执行，因为getJSON是get模式，图片转成base64后，很容易超出最大长度，其实，经过压缩后，一般不会超出的，具体压缩方法下文有  
}  



function getImage() {  
    var cmr = plus.camera.getCamera();  
    cmr.captureImage(function(p) {  
        plus.io.resolveLocalFileSystemURL(p, function(entry) {  
            var localurl = entry.toLocalURL(); //  
            $("#report").html('<img src="/static/css/default/img/default.jpg" data-original="' + localurl + '">');  
            cutImg();  
            mui('#picture').popover('toggle');  
        });  
    });  
}  
//相册选取  
function galleryImgs() {  
    plus.gallery.pick(function(e) {  
        //alert(e);  
        $("#readyimg").attr("src", e);  
        cutImg();  
        mui('#picture').popover('toggle');  
    }, function(e) {  
        //outSet( "取消选择图片" );  
    }, {  
        filter: "image"  
    });  
}  
//照片裁剪类  
function cutImg() {  
    $(".mui-content").hide();  
    $("#showEdit").fadeIn();  
    var $image = $('#report > img');  
    $image.cropper({  
        checkImageOrigin: true,  
        aspectRatio: 1 / 1,  
        autoCropArea: 0.3,  
        zoom: -0.2  
    });  
    //                  $image.cropper('zoom',-0.5);  
}  
//确认照片，展示效果  
function confirm() {  
    $("#showEdit").fadeOut();  
    var $image = $('#report > img');  
    var dataURL = $image.cropper("getCroppedCanvas");  
//              var imgurl = dataURL.toDataURL("image/png", 0.5);  
    //换成下边的方法，转成jpeg，但是把质量降低，  
    //经测试51k的png，转成0.3质量，大小为3k多，0.5质量大小为4k多，  
    //这回应该不会出现卡的情况了，  
    //既然差别1k多，还是用0.5的质量，还是要兼顾下显示效果的。  
    var imgurl = dataURL.toDataURL("image/jpeg", 0.5);  
    $("#changeAvatar > img").attr("src", imgurl);  
    //              $("#divbtn").show();  
    $(".mui-content").show();  
}  
//旋转照片  
function rotateimg() {  
    $("#readyimg").cropper('rotate', 90);  
}  
  
function rotateimgleft() {  
    $("#readyimg").cropper('rotate', -90);  
}  
  
function closepop() {  
    $("#showEdit").fadeOut();  
    var $image = $('#report > img');  
    $image.cropper('destroy');  
    $(".mui-content").show();  
}  
  
function showActionSheet() {  
    var bts = [{  
        title: "拍照"  
    }, {  
        title: "从相册选择"  
    }];  
    plus.nativeUI.actionSheet({  
            cancel: "取消",  
            buttons: bts  
        },  
        function(e) {  
            if (e.index == 1) {  
                getImage();  
            } else if (e.index == 2) {  
                galleryImgs();  
            }  
            //outLine( "选择了\""+((e.index>0)?bts[e.index-1].title:"取消")+"\"");  
        }  
    );  
}  