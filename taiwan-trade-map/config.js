var config = {
    style: 'mapbox://styles/ilabmedia/cm1qz0uqh00wg01p63as5gfip',
    accessToken: 'pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw',
    showMarkers: true,
    markerColor: '#3FB1CE',
    projection: 'globe',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: false,
    theme: 'dark',
    use3dTerrain: true, //set true for enabling 3D maps.
    auto: false,
    title: 'How much Trade Transit the Taiwan Strait?',
    alignment: 'right',
    subtitle: '',
    byline: '',
    footer: 'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
    chapters: [
        {
            id: 'slug-style-id',
            alignment: 'center',
            hidden: true,
            title: 'Slide 1',
            image: '',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            location: {
                center: [120.74709, 23.97749],
                zoom: 6.5,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: 'addPolygonLayer',
            onChapterEnter: [
                {
                    layer: 'trade_lines',
                    opacity:0
                }],
            onChapterExit: [
                {
                    layer: 'trade_lines',
                    opacity:0
                }]
        },
        {
            id: 'second-identifier',
            alignment: 'center',
            hidden: false,
            title: false,
            image: '',
            description: 'Maritime trade is the lifeblood of the global economy.',
            location: {
                center: [120.74709, 23.97749],
                zoom: 2.5,
                pitch: 0,
                bearing: 0,
                // flyTo additional controls-
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                speed: 1, // make the flying slow
                //curve: 1, // change the speed at which it zooms out
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: 'spinGlobe',
            callback: 'removePolygonLayer',
            onChapterEnter: [
                {
                    layer: 'trade_lines',
                    opacity:0,
                }],
            onChapterExit: [
                {
                    layer: 'trade_lines',
                    opacity:1, 
                }]
        },
        {
            id: 'third-identifier',
            alignment: 'center',
            hidden: false,
            title: false,
            image: '',
            description: 'Each year, thousands of massive containerships and tankers ferry more than $10 trillion in goods and energy across the world’s oceans.',
            location: {
                center: [120.74709, 23.97749],
                zoom: 2.5,
                pitch: 0,
                bearing: 0.00,
                speed: 1,
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: 'addTaiwanStraitPolygon',
            callback:'spinGlobe',
            onChapterEnter: [
                {
                    layer: 'trade_lines',
                    opacity:1
                }],
            onChapterExit: [
                {
                    layer: 'trade_lines',
                    opacity:1,
                    callback: 'stopGlobeSpin',
                    callback: 'showPointers'
                }]
        },
        {
            id: 'fourth-chapter',
            alignment: 'fully',
            hidden: false,
            title: false,
            image: '',
            description: 'These vessels follow well-established routes that converge at strategic chokepoints where maritime traffic is especially vulnerable to disruption.',
            location: {
                center: [54.20712, 13.29486],
                zoom: 2,
                pitch: 0,
                bearing: 0,
                speed: 0.5
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: 'stopGlobeSpin',
            onChapterEnter: [
                {
                    layer: 'trade_lines',
                    opacity:1
                }],
            onChapterExit: [
                {
                    layer: 'trade_lines',
                    opacity:1
                }]
        },
        {
            id: 'fifth-chapter',
            alignment: 'fully',
            hidden: false,
            title: false,
            image: '',
            description: 'Asia’s geography, and its centrality to global commerce, have heightened the importance of chokepoints like the Strait of Malacca and, increasingly, the Taiwan Strait.',
            location: {
                center: [120.74709, 23.97749],
                zoom: 2.5,
                pitch: 0,
                bearing: 0,
                speed: 0.5
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'trade_lines',
                    opacity:1
                }],
            onChapterExit: [
                {
                    layer: 'trade_lines',
                    opacity:0
                }]
        },
        {
            id: 'sixth-chapter',
            alignment: 'fully',
            hidden: false,
            title: false,
            image: '',
            description: 'China’s rising assertiveness has sparked fears that it may soon use force to bring Taiwan under its control.<br><br>While a major conflict over Taiwan would have catastrophic consequences for the global economy, less severe actions taken by Beijing would also destabilize trade through the Taiwan Strait.',
            location: {
                center: [120.74709, 23.97749],
                zoom: 6.5,
                pitch: 0,
                bearing: 0,
                speed: 0.5
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: 'addRadarLayer',
            onChapterEnter: [
                {
                    layer: 'trade_lines',
                    opacity:0,
                    callback: 'addRadarLayer',
                }],
            onChapterExit: [
                {
                    layer: 'trade_lines',
                    opacity:0, 
                    callback:'removeRadarLayer'
                }]
        },
        {
            id: 'seventh-chapter',
            alignment: 'fully',
            hidden: false,
            title: false,
            image: '',
            description: 'New research from CSIS estimates that approximately $2.45 trillion worth of goods—over one-fifth of global maritime trade—transited the Taiwan Strait in 2022.<br><br>Disruptions to this trade would send shockwaves well beyond Taiwan and China, impacting key U.S. allies and broad swaths of the Global South.',
            location: {
                center: [120.74709, 23.97749],
                zoom: 2.5,
                pitch: 0,
                bearing: 0,
                speed: 0.5
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: 'removeRadarLayer',
            onChapterEnter: [
                {
                    layer: 'trade_lines',
                    opacity:0
                }],
            onChapterExit: [
                {
                    layer: 'trade_lines',
                    opacity:0
                }]
        },





    ]
};
