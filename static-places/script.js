
window.onload = () => {
    // setTimeout is a temporary fix
    setTimeout(() => {
        let places = staticLoadPlaces();
        renderPlaces(places);
    }, 3000);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                lat: 44.496470,
                lng: 11.320180,
            }
        },
    ];
}

var models = [
    './assets/magnemite/scene.gltf',
    './assets/articuno/scene.gltf',
    './assets/mew/scene.gltf',
];
var modelIndex = 0;

var clickListener = function(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    const el = ev.detail.intersection && ev.detail.intersection.object.el;

    if (el && el === ev.target) {
        // at every click, we switch to another Pokémon model
        modelIndex++;
        var index = modelIndex % models.length;
        model.setAttribute('gltf-model', models[index]);
    }
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', models[modelIndex]);
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        model.addEventListener('click', clickListener);

        scene.appendChild(model);
    });
}
