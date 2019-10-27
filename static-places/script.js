
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
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.75 0.75 0.75',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.01 0.01 0.01',
    },
];
var modelIndex = 0;

var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    // if (model.rotation) {
    //     model.object3D.rotation.set(model.rotation.x, model.rotation.y, model.rotation.z);
    // }

    // if (model.position) {
    //     model.object3D.position.set(model.position.x, model.position.y, model.position.z);
    // }

    entity.setAttribute('gltf-model', model.url);
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');

            alert(JSON.stringify(entity.getAttribute('scale')))

            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
