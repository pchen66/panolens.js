(function(){

    let currentRoute = 'Home';
    let selection = document.querySelector( '.item.selected' );

    const assetPath = 'examples/asset/textures/equirectangular';
    const routePanoramas = {
        Home: { 
            panorama: new PANOLENS.ImagePanorama( assetPath + '/view.jpg' ), 
            initialLookPosition: new THREE.Vector3( -5000.00, 167.06, 3449.90 )
        },
        Example: { 
            panorama: new PANOLENS.ImagePanorama( assetPath + '/planet.jpg' ),
            //initialLookPosition: new THREE.Vector3( 0, 0, -5000 )
        }
    };

    const nav = document.querySelector( 'nav' );
    const container = document.querySelector( 'section.background' );
    const title = document.querySelector( 'section.title' );
    const exampleSection = document.querySelector( 'section.example' );
    const menuIcon = document.querySelector( '.menu-icon' );
    const items = document.querySelectorAll( '.item' );
    const progressElement = document.getElementById( 'progress' );

    const viewer = new PANOLENS.Viewer( { container: container, controlBar: false } );

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

        switch ( name ) {

        case 'Home': 
            title.classList.remove( 'hide' ); 
            exampleSection.classList.add( 'hide' );
            break;
          
        case 'Example':
            title.classList.add( 'hide' ); 
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

    async function loadExamples() {

        const { examples } = await fetch('./data.json').then(result => result.json());
        const fragment = document.createDocumentFragment();
        const flexBasis = 250 + 16 * 2;
        const hiddenCards = [];
        const onWindowResize = () => {

            const columns = ~~(window.innerWidth / flexBasis);
            const fragment = document.createDocumentFragment();
            const remainings = Math.ceil(examples.length / columns) * columns - examples.length;

            hiddenCards.forEach( card => exampleSection.removeChild(card) );
            hiddenCards.length = 0;

            for(let i = 0; i < remainings; i++) {
                const figure = document.createElement('figure');
                figure.classList.add('card', 'hidden');
                hiddenCards.push(figure);
                fragment.append(figure);
            }

            exampleSection.append(fragment);
        
        };

        examples.forEach(({title, description, type, url}) => {
            
            const figure = document.createElement('figure');
            const figcaption = document.createElement('figcaption');
            const h4 = document.createElement('h4');
            const p = document.createElement('p');
            const openTab = () => window.open( url, '_blank');

            figure.classList.add('card', type);
            figure.addEventListener('click', openTab);
            figure.addEventListener('auxclick', openTab);
            h4.textContent = title;
            p.textContent = description;
            figcaption.append(h4, p);
            figure.append(figcaption);
            fragment.append(figure);
        });

        exampleSection.append(fragment);

        onWindowResize();

        window.addEventListener( 'resize', onWindowResize);
    }

    addDomEvents();
    setUpInitialState();
    loadExamples();

})();