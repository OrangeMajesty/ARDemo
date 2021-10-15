const loadPlaces = function (coords) {

    const PLACES = [
        {
            name: "Село Сарыажар",
            location: {
                lat: 50.515204, // add here latitude if using static data
                lng: 56.918331, // add here longitude if using static data
            }
        },
        {
            name: "Акимат г.Актобе",
            location: {
                lat: 50.299853, // add here latitude if using static data
                lng: 57.153119, // add here longitude if using static data
            }
        },
        {
            name: "Актюбинский Рельсо-Балочный завод",
            location: {
                lat: 50.388076, // add here latitude if using static data
                lng: 57.153119, // add here longitude if using static data
            }
        },
        {
            name: "Казанский собор",
            location: {
                lat: 55.798745, // add here latitude if using static data
                lng: 49.115037, // add here longitude if using static data
            }
        },

    ];

    return Promise.resolve(PLACES);
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                     document.querySelector('#current-coor').innerText = JSON.stringify(position.coords);
                    
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place name
                    const text = document.createElement('a-link');
                    text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    text.setAttribute('title', place.name);
                    text.setAttribute('href', `https://www.google.ru/search?q=${place.name}`);
                    text.setAttribute('scale', '20 20 20');

                    text.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(text);
                });
            })
    },
        (err) => {  
                    document.querySelector('#current-coor').innerText = JSON.stringify(err);
                    console.error('Error in retrieving position', err)
                 },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
