function makeFullScreen() {
    let fullImage = document.getElementById('imgContainer');
    fullImage.requestFullscreen();
    $('#full').html('<i class="fa-sharp fa-solid fa-minimize fa-beat fa-2xl" style="color: #00c8ff;"></i>');
    $('#full').attr('onclick','exitFull()');
};
function exitFull() {
    document.exitFullscreen()
    $('#full').html('<i class="fa-solid fa-maximize fa-beat fa-2xl" style="color: #00c8ff;"></i>');
    $('#full').attr('onclick','makeFullScreen()');
};

let num = 0
images = [
    'https://w.forfun.com/fetch/79/79b27ca60f849940e1355ce8315b0d33.jpeg?w=1470&r=0.5625',
    'https://w.forfun.com/fetch/e6/e6044cb0b978ce39ff76b57402ebd1de.jpeg',
    'https://w.forfun.com/fetch/c8/c89f39607cfaef9c8e4babeb12c4f8ed.jpeg',
    'https://w.forfun.com/fetch/2f/2fb6e5fc8c9b9754fcd15ecbf87bd6db.jpeg?w=1470&r=0.5625',
    'https://w.forfun.com/fetch/fe/fe881c72ec4f03014ac6786e566adf84.jpeg?w=1470&r=0.5625',
    'https://w.forfun.com/fetch/de/de0c6457e0fb02a74a5b80a81cabf8ae.jpeg?w=1470&r=0.5625',
    'https://w.forfun.com/fetch/96/96803f87b53eeb2a76dde3193f4f7b0e.jpeg?w=1470&r=0.5625',
    'https://w.forfun.com/fetch/0d/0dcf976f5d675e0372aea5c19f4bef1d.jpeg?w=1470&r=0.5625',
    'https://w.forfun.com/fetch/9b/9be54706813eea2587c05fe8abe0be70.jpeg?w=1470&r=0.5625',
    'https://w.forfun.com/fetch/72/727a3ca5f3774c288c7c54a720a257d3.jpeg?w=1470&r=0.5625'

]

let btns = ''
for (let i = 0; i < images.length; i++) {
    btns += `<button id="${i}" class="btnCircle" onclick="clickCircle(this.id)"></button>`
}
$('.circles').html(btns)
$('#0').css('background-color', 'green')

function clickCircle(id) {
    $('.btnCircle').css('background-color', 'white')
    $(`#${id}`).css('background-color', 'green')
    num = Number(id)
    $('#theImage').attr('src', images[num]);
    activeDeactive(num)
}

$('#theImage').attr('src', images[0])
$("#fLeft").prop("disabled",true);
$("#left").prop("disabled",true);

function left(){
    setTimeout(function() {
    $('#animation').attr('id', 'theImage');
    }, 1500);
    if (num <= 1){
        num = 0;
        activeDeactive(num);
        $('#theImage').attr('src', images[num]);
        $('#theImage').attr('id', 'animation');
        clickCircle(num);
        return
    }
    num -= 1
    activeDeactive(num);
    $('#theImage').attr('src', images[num]);
    $('#theImage').attr('id', 'animation');
    clickCircle(num);
}

function fastLeft(){
    setTimeout(function() {
        $('#animation').attr('id', 'theImage');
        }, 1500);
    num = 0
    $('#theImage').attr('src', images[num]);
    $('#theImage').attr('id', 'animation');
    activeDeactive(num);
    clickCircle(num);
}

function fastRight(){
    setTimeout(function() {
        $('#animation').attr('id', 'theImage');
        }, 1500);
    num = images.length - 1
    $('#theImage').attr('src', images[num]);
    $('#theImage').attr('id', 'animation');
    activeDeactive(num);
    clickCircle(num);
}

function right(){
    setTimeout(function() {
        $('#animation').attr('id', 'theImage');
        }, 1500);
    if (num >= images.length - 2){
        num = images.length - 1
        activeDeactive(num);
        $('#theImage').attr('src', images[num]);
        $('#theImage').attr('id', 'animation');
        clickCircle(num)
        return
    }
    num += 1
    $('#theImage').attr('src', images[num]);
    $('#theImage').attr('id', 'animation');
    activeDeactive(num);
    clickCircle(num)
};

$('html').keydown(function(e){
    if(e.keyCode == 37) {
        left();
      }
      else if(e.keyCode == 39) {
        right()
      }
});

let plays;

function play(){
    if (plays){
        $('#playStop').html('<i class="fa fa-play">');
        plays = false;
    }else if (!plays){
        $('#playStop').html('<i class="fa-solid fa-pause"></i>');
        plays = true;
        goPlay();
    }
}

function goPlay() {
    if (plays) {
        setTimeout(function() {
            if (num >= images.length - 2){
                $('#playStop').html('<i class="fa fa-play">');
                plays = false;
                goPlay();
                right();
                return
            }
            goPlay();
            right();
        }, 3000);
    }    
}

function activeDeactive(num){
    if (num == 0){
        $("#fLeft").prop("disabled", true);
        $("#left").prop("disabled", true);
        $("#fRight").prop("disabled", false);
        $("#right").prop("disabled", false);
    } else if(num > 0 && num < images.length - 1){
        $("#fLeft").prop("disabled", false);
        $("#left").prop("disabled", false);
        $("#fRight").prop("disabled", false);
        $("#right").prop("disabled", false);
    } else if(num == images.length - 1){
        $("#fLeft").prop("disabled", false);
        $("#left").prop("disabled", false);
        $("#fRight").prop("disabled", true);
        $("#right").prop("disabled", true);
    }
}
