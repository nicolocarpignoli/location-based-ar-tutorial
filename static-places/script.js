
window.onload = () => {
    // setTimeout is a temporary fix
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

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
                // via lucchini
                // lat: 44.496470,
                // lng: 11.320180,

                lat: 44.492222,
                lng: 11.325090,
            },
        },
    ];
}

var models = [
    './assets/magnemite/scene.gltf',
    './assets/articuno/scene.gltf',
    './assets/mew/scene.gltf',
];
var modelIndex = 0;

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', models[modelIndex]);
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.75 0.75 0.75');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');

            modelIndex++;
            var newIndex = modelIndex % models.length;
            entity.setAttribute('gltf-model', models[newIndex]);
        });

        scene.appendChild(model);
    });
}
