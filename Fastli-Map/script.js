const WARSAW_CENTER = [52.2297, 21.0122]
const INITIAL_ZOOM = 13

const map = L.map('map').setView(WARSAW_CENTER, INITIAL_ZOOM)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

const offerData = [
    {
        id: 1,
        title: "Javascript Developer",
        location: [52.2355, 21.0067],
        rating: 4.5,
        company: "RandomTechCompany"
    },
    {
        id: 1,
        title: "UX/UI Designer",
        location: [52.245, 20.98],
        rating: 4,
        company: "MyTechCompany"
    },
    {
        id: 3,
        title: "Python Developer",
        location: [52.20, 21.03],
        rating: 5.0,
        company: "YourTechCompany."
    }
]


const getStarRatingHtml = (rating) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
    let html = ' '
    html += '<span class="star-rating">' + '★'.repeat(fullStars) + (halfStar ? '½' : '') + '</span>'
    html += '<span class="star-rating" style="opacity: 0.3;">' + '★'.repeat(emptyStars) + '</span>'
    html += ` (${rating})`
    return html
}

offerData.forEach(offer => {
    const animatedIcon = L.divIcon({
        className: 'animated-marker',   
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        html: '<div class="animated-marker-inner"></div>'
})

    const marker = L.marker(offer.location, {icon: animatedIcon}).addTo(map)
    const markerElement = marker.getElement();
    const popupContent = `
        <div class="mini-profile">
            <h4>${offer.title}</h4>
            <p><strong>Company:</strong> ${offer.company}</p>
            <p><strong>Reviews:</strong> ${getStarRatingHtml(offer.rating)}</p>
            <button onclick="console.log('Open Offer Details: ${offer.id}')">See Details</button>
        </div>
    `

    marker.bindPopup(popupContent, {
        closeButton: false,
        className: 'custom-popup'
    })

    marker.on('click', function (e){
        document.querySelectorAll('.animated-marker').forEach(el => {
            el.classList.remove('active')
        })

        if (markerElement) {
             markerElement.querySelector('.animated-marker-inner').classList.add('active');
        }
        map.panTo(e.latlng)
    })

    marker.on('popupclose', function (e){
        if (markerElement) {
             markerElement.querySelector('.animated-marker-inner').classList.remove('active');
        }
    })
})