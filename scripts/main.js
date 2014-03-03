var musicTheme = null;
var musicExtra = null;

var SONG_MAIN = "sounds/bulgarian-national-anthem.wav";
var SONG_SECOND = "sounds/bon-bon-moya-strana.wav";

var SONG_LENGTH = 137*1000; // 2 min 17 secs
var SONG_SECOND_LENGTH = 285*100; // 4 min 45 sec

var she = null;
var he = null;
var songText = null;
var final = null;

var BACKGROUND_CHANGE_DURATION = 1000;
var ELEMENT_STEP_DURATION = 3000;

var isStarted = false;
var scrollTimeout = null;

function init() {
    $(".loading").fadeOut();
    
    // Load and play the song
    musicTheme = new Audio();
    musicTheme.setAttribute('src', SONG_MAIN);
    musicTheme.setAttribute('type', 'audio/mpeg');
    musicTheme.load();
    
    musicTheme.addEventListener('canplay', function() { 
        start();
    }, false);
    
    setTimeout(function() {
       if (isStarted == false)
           start();
    }, 3000);
    
    // Prepare the nect song
    musicExtra = new Audio();
    musicExtra.setAttribute('src', SONG_SECOND);
    musicExtra.load();
    
};

function start() {
    musicTheme.play();
        
    // Start  scrolling the page and the text
    function scrollBody() {
        var container = $('#content')[0];
        var pageHeight = container.scrollHeight - 800;
        $('body, html').animate({scrollTop: pageHeight+"px"}, SONG_LENGTH, 'swing');
    };
    scrollTimeout = setTimeout(scrollBody, 1000);
    
    var textHeight = $('.text-muted')[0].scrollHeight - 120;
    $('#footer .row').animate({scrollTop: textHeight+"px"}, SONG_LENGTH);
    
    setTimeout(function() {
        $("#footer").fadeOut('slow');
        $("body").css( "background-color", "#e5e5e5");
    }, SONG_LENGTH - 9000);
    
    // When the user tryes to scroll
    document.addEventListener('mousewheel', function() {
        clearTimeout(scrollTimeout);
        $('body, html').stop();
        scrollTimeout = setTimeout(scrollBody, 1000);
    }, false);
    
    isStarted = true;
};

function nextSong() {
    musicExtra.play();
    musicTheme.pause();
};

function playHimn() {
    musicTheme.play();
    musicExtra.pause();
}