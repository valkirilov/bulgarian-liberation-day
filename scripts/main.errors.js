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
var scrollTimer = 0;

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

function errorHandle(e) {
    alert(e);
}

var gOldOnError = window.onerror;
// Override previous handler.
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  if (gOldOnError)
    // Call previous handler.
    alert(lineNumber + ": " + errorMsg);
    return gOldOnError(errorMsg, url, lineNumber);

  // Just let default handler run.
  return false;
}

function start() {
    musicTheme.play();
    
    function tickSound() {
        if (scrollTimer > SONG_LENGTH) {
            return;
        }
        scrollTimer += 1000;   
    }
    setInterval(tickSound, 1000);
        
    // Start  scrolling the page and the text
    function scrollBody() {
        if (scrollTimer > SONG_LENGTH) {
            return;
        }
        
        var container = $('#content')[0];
        var pageHeight = container.scrollHeight - 800;
        $('body, html').animate({scrollTop: pageHeight+"px"}, SONG_LENGTH-scrollTimer, 'swing');
        
        console.log('Scroll to there in ' + (SONG_LENGTH-scrollTimer));
    };
    scrollTimeout = setTimeout(scrollBody, 1000);
    
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