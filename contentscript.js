// import './assets/css/test.css';
const highlight_class = "simpread-highlight-selector";
/**
 * Highlight
 * 
 * @return {promise} promise
 */

function start() {
    let $prev;
    const dtd            = $.Deferred(),
          mousemoveEvent = event => {
            if ( !$prev ) {
                $( event.target ).addClass( highlight_class );
            } else {
                $prev.removeClass( highlight_class );
                $( event.target ).addClass( highlight_class );
            }
            $prev = $( event.target );
    };
    $( "body" ).one( "click", event => {
        if ( !$prev ) return;
        $( event.target ).removeClass( highlight_class );
        $( "body"       ).off( "mousemove", mousemoveEvent );
        $prev = undefined;
        dtd.resolve( event.target );
    });
    $( "body" ).one( "keydown", event => {
        if ( event.keyCode == 27 && $prev ) {
            $( event.target ).find( `.${highlight_class}` ).removeClass( highlight_class );
            $( "body"       ).off( "mousemove", mousemoveEvent );
            $prev = undefined;
        }
    });
    $( "body" ).on( "mousemove", mousemoveEvent );
    return dtd;
}

function download( data, name ) {
    const $a   = $( `<a style="display:none" href=${data} download="${name}"></a>` ).appendTo( "body" );
    $a[0].click();
    $a.remove();
}
document.getHTML= function(who, deep){
    if(!who || !who.tagName) return '';
    var txt, ax, el= document.createElement("div");
    el.appendChild(who.cloneNode(false));
    txt= el.innerHTML;
    if(deep){
        ax= txt.indexOf('>')+1;
        txt= txt.substring(0, ax)+who.innerHTML+ txt.substring(ax);
    }
    el= null;
    return txt;
}
var $focus = []

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    // if(message == 'Hello'){
    //     alert('Hello from background.');
    // }
    start().done(result => {
        var turndownService = new TurndownService()
        var markdown = turndownService.turndown(document.getHTML(result, true))
        base64 = "data:text/plain;charset=utf-8," + encodeURIComponent( markdown );
        download( base64, 'asda.md' )
    });
});
