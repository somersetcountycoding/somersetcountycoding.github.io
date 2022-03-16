var coords = [{
        lat: 40.498934, //H-M
        long: -74.6471734
    },
    {
        lat: 40.5988692, //GB
        long: -74.4857985
    },
    {
        lat: 40.5958152, //BW
        long: -74.7417936
    },
];

var finalLoc = "";

function findNearestMarker(coords) {
    var minDist = 1000,
        nearest_text = '*None*',
        markerDist,
        // get all objects added to the map
        objects = map.getObjects(),
        len = map.getObjects().length,
        i;

    // iterate over objects and calculate distance between them
    for (i = 0; i < len; i += 1) {
        markerDist = objects[i].getGeometry().distance(coords);
        if (markerDist < minDist) {
            minDist = markerDist;
            nearest_text = objects[i].getData();
        }
    }
    finalLoc = `The nearest marker is: ' + ${nearest_text}`
    logEvent(finalLoc);
}

function addClickEventListenerToMap(map) {
    map.addEventListener('tap', function (evt) { // add 'tap' listener
        var coords = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
        findNearestMarker(coords);
    }, false);
}


var platform = new H.service.Platform({
    apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map
var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map, {
        center: {
            lat: 60.1697,
            lng: 24.8292
        },
        zoom: 16,
        pixelRatio: window.devicePixelRatio || 1
    });
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 4: create custom logging facilities
var logContainer = document.createElement('ul');
logContainer.className = 'log';
logContainer.innerHTML = '<li class="log-entry">Try clicking on the map</li>';
map.getElement().appendChild(logContainer);

// Helper for logging events
function logEvent(str) {
    var entry = document.createElement('li');
    entry.className = 'log-entry';
    entry.textContent = str;
    logContainer.insertBefore(entry, logContainer.firstChild);
}