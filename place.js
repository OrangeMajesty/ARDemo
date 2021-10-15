const loadPlaces = function (coords) {

    const PLACES = [
        {
            name: "Село Сарыажар1",
            location: {
                lat: 50.5152041, // add here latitude if using static data
                lng: 56.9183306, // add here longitude if using static data
            }
        },
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
    return navigator.geolocation.getCurrentPosition(function (position) {
        getPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    console.log(place);
                    const latitude = place.lat;
                    const longitude = place.lng;

                    console.log("Your location: lat:" + latitude + ", long: " + longitude + "\n");

                    // add place icon
                    const icon = document.createElement('a-image');
                    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                    icon.setAttribute('name', place.name);
                    icon.setAttribute('src', 'assets/map-marker.png');

                    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                    icon.setAttribute('scale', '20', '20');

                    icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

                    const clickListener = function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();

                        const name = ev.target.getAttribute('name');

                        const el = ev.detail.intersection && ev.detail.intersection.object.el;

                        if (el && el === ev.target) {
                            const label = document.createElement('span');
                            const container = document.createElement('div');
                            container.setAttribute('id', 'place-label');
                            label.innerText = name;
                            container.appendChild(label);
                            document.body.appendChild(container);

                            setTimeout(() => {
                                container.parentElement.removeChild(container);
                            }, 1500);
                        }
                    };

                    icon.addEventListener('click', clickListener);
                    
                    scene.appendChild(icon);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
// window.onload = () => {
//     const scene = document.querySelector('a-scene');
//     return navigator.geolocation.getCurrentPosition(function (position) {
//         getPlaces(position.coords)
//             .then((places) => {
//                 places.forEach((place) => {
//     showMessage("Start get geopos");
    

//     // first get current user location
//             showMessage("geops was getted");
//          showMessage(
//                         "acc:" + position.coords.accuracy +
//                         " lat:" + position.coords.latitude +
//                         " lon:" + position.coords.longitude
//                     );
//         // than use it to load from remote APIs some places nearby
//         showMessage("places is loading");
//         loadPlaces(position.coords)
//             .then((places) => {
//             showMessage("places was getted");
//                 places.forEach((place) => {
//                     showMessage(
//                         "acc:" + position.coords.accuracy +
//                         " lat:" + position.coords.latitude +
//                         " lon:" + position.coords.longitude
//                     );
//                     console.log(position.coords);
                    
//                     const latitude = place.location.lat;
//                     const longitude = place.location.lng;

//                     // add place name
//                     const text = document.createElement('a-image');
//                     text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
//                     text.setAttribute('title', place.name);
//                     text.setAttribute('src', 'assets/map-marker.png');
// //                     text.setAttribute('href', `https://www.google.ru/search?q=${place.name}`);
//                     text.setAttribute('scale', '20', '20');

//                      text.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

//                     const clickListener = function(ev) {
//                         ev.stopPropagation();
//                         ev.preventDefault();

//                         const name = ev.target.getAttribute('name');

//                         const el = ev.detail.intersection && ev.detail.intersection.object.el;

//                         if (el && el === ev.target) {
//                             const label = document.createElement('span');
//                             const container = document.createElement('div');
//                             container.setAttribute('id', 'place-label');
//                             label.innerText = name;
//                             container.appendChild(label);
//                             document.body.appendChild(container);

//                             setTimeout(() => {
//                                 container.parentElement.removeChild(container);
//                             }, 1500);
//                         }
//                     };

//                     text.addEventListener('click', clickListener);                   
//                     scene.appendChild(text);
//                 });
//             })
//     },
//         (err) => console.error('Error in retrieving position', err),
//         {
//             enableHighAccuracy: true,
//             maximumAge: 0,
//             timeout: 27000,
//         }
//     );
// };

function showMessage(message)
{
    document.querySelector('#current-coor').innerText = JSON.stringify(message);
}
