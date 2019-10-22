
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
            name: 'Magnemite, LV.99',
            location: {
                lat: 44.496470, // add here latitude if using static data
                lng: 11.320180, // add here longitude if using static data
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', '#animated-asset');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}
