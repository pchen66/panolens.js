(function(){

    let viewer, container, title, docSection, docIframe, exampleSection, routePanoramas, assetPath, items, selection, cards, menuIcon, nav, progressElement, progress;

    let currentRoute = 'Home';

    assetPath = 'examples/asset/textures/equirectangular';
    selection = document.querySelector( '.item.selected' );

    routePanoramas = {
        Home: { 
            panorama: new PANOLENS.ImagePanorama( assetPath + '/view.jpg' ), 
            initialLookPosition: new THREE.Vector3( -5000.00, 167.06, 3449.90 )
        },
        Documentation: { 
            panorama: new PANOLENS.GoogleStreetviewPanorama( '-OiczBjHvoJdQVTg9tGUTQ' ),
            initialLookPosition: new THREE.Vector3( -5000.00, -901.09, -74.03 ) 
        },
        Example: { 
            panorama: new PANOLENS.ImagePanorama( assetPath + '/planet.jpg' ),
            initialLookPosition: new THREE.Vector3( 0, 0, -5000 )
        }
    };

    nav = document.querySelector( 'nav' );
    container = document.querySelector( 'section.background' );
    title = document.querySelector( 'section.title' );
    docSection = document.querySelector( 'section.documentation' );
    docIframe = docSection.querySelector('iframe');
    exampleSection = document.querySelector( 'section.example' );
    cards = document.querySelectorAll( '.card' );
    menuIcon = document.querySelector( '.menu-icon' );
    items = document.querySelectorAll( '.item' );
    progressElement = document.getElementById( 'progress' );

    viewer = new PANOLENS.Viewer( { container: container, controlBar: false } );

    const showDocIframe = () => {
        if(currentRoute === 'Documentation') docSection.classList.remove( 'hide' );
    };

    docIframe.addEventListener('load', showDocIframe);

    window.addEventListener( 'orientationchange', function () {
        nav.classList.remove('animated');
        setTimeout(function(){
            viewer.onWindowResize(window.innerWidth, window.innerHeight);
        }, 200);
    
    }, false );

    function onEnter () {

        progressElement.style.width = 0;
        progressElement.classList.remove( 'finish' );

    }

    function onProgress ( event ) {

        progress = event.progress.loaded / event.progress.total * 100;
        progressElement.style.width = progress + '%';
        if ( progress === 100 ) {
            progressElement.classList.add( 'finish' );
        }

    }

    function addDomEvents () {

        container.addEventListener( 'mousedown', function(){
            this.classList.add( 'mousedown' );
        }, false );

        container.addEventListener( 'mouseup', function(){
            this.classList.remove( 'mousedown' );
        }, false );

        menuIcon.addEventListener( 'click', function () {
            this.classList.toggle( 'open' );
            nav.classList.toggle( 'open' );
        }, false );

        nav.classList.add( 'animated' );

        // Add click events
        for ( var i = 0; i < cards.length; i++ ) {

            cards[i].addEventListener( 'click', function(){

                window.location.assign( this.getAttribute( 'data-url' ) );

            }, false );

        }

        // Routing
        for ( var i = 0, hash; i < items.length; i++ ) {

            hash = items[ i ].getAttribute( 'data-hash' );

            if ( hash ) {

                items[ i ].addEventListener( 'click', function ( event ) {

                    if(event.target.tagName !== 'LI') return;

                    routeTo( this.getAttribute( 'name' ), this );

                }, false );

            }      

            if ( hash === window.location.hash ) {

                routeTo( hash.replace( '#', '' ), items[ i ] );

            }

        }

    }

    function setUpInitialState () {

        if ( routePanoramas ) {

            for ( var routeName in routePanoramas ) {

                if ( routePanoramas.hasOwnProperty( routeName ) ) {

                    var route = routePanoramas[ routeName ];

                    route.panorama.addEventListener( 'progress', onProgress );
                    route.panorama.addEventListener( 'enter', onEnter );

                    if ( route.initialLookPosition ) {
                        route.panorama.addEventListener('enter-fade-start', function( position ){
                            viewer.setControlCenter( position );
                        }.bind( this, route.initialLookPosition ));
                    }

                    viewer.add( route.panorama );
                }

            }

        }

    }

    function routeTo ( name, element ) {

        currentRoute = name;

        window.location.hash = '' + name;

        const sections = [ title, docSection, exampleSection ];

        sections.forEach( section => section.classList.add( 'hide' ) );

        switch ( name ) {

        case 'Home': 
            title.classList.remove( 'hide' ); 
            break;

        case 'Documentation':
            if(!docIframe.src) {
                docIframe.src = './docs/';
            } else {
                showDocIframe();
            }
            break;
          
        case 'Example':
            exampleSection.classList.remove( 'hide' );
            break;

        }

        menuIcon.classList.remove( 'open' );
        nav.classList.remove( 'open' );

        selection.classList.remove( 'selected' );
        selection = element;
        selection.classList.add( 'selected' );

        viewer.setPanorama( routePanoramas[ name ].panorama );    

    }

    addDomEvents();
    setUpInitialState();

})();