/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function( w ){

	// Enable strict mode
	"use strict";

	function picturefill() {
		var ps = w.document.getElementsByTagName( "span" );

		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){
			if( ps[ i ].getAttribute( "data-picture" ) !== null ){

				var sources = ps[ i ].getElementsByTagName( "span" ),
					matches = [];

				// See if which sources match
				for( var j = 0, jl = sources.length; j < jl; j++ ){
					var media = sources[ j ].getAttribute( "data-media" );
					// if there's no media specified, OR w.matchMedia is supported 
					if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
						matches.push( sources[ j ] );
					}
				}

        // Find any existing img element in the picture element
        var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

        if( matches.length ){
          var matchedEl = matches.pop();
          if( !picImg || picImg.parentNode.nodeName === "NOSCRIPT" ){
            picImg = w.document.createElement( "img" );
            picImg.alt = ps[ i ].getAttribute( "data-alt" );
          }
          else if( matchedEl === picImg.parentNode ){
            // Skip further actions if the correct image is already in place
            continue;
          }

          picImg.src =  matchedEl.getAttribute( "data-src" );
          matchedEl.appendChild( picImg );
          picImg.removeAttribute("width");
          picImg.removeAttribute("height");
        }
        else if( picImg ){
          picImg.parentNode.removeChild( picImg );
        }
      }
		}
  }	

	// Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "resize", picturefill, false );
		w.addEventListener( "DOMContentLoaded", function(){
			picturefill();
			// Run once only
			w.removeEventListener( "load", picturefill, false );
		}, false );
		w.addEventListener( "load", picturefill, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", picturefill );
	}

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS, just export
    module.exports = picturefill;
  } else if (typeof define === 'function' && define.amd) {
    // AMD support
    define(function () { return picturefill; });
  } else if (typeof window === 'object') {
    // If no AMD and we are in the browser, attach to window
    window.picturefill = picturefill;
  }

}( window ));
