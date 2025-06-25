document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const placeName = urlParams.get('name');
    document.getElementById('place-name').textContent = placeName;

    // Example data for attractions, reviews, and businesses
    const data = {
        attractions: [
            
           ],
        reviews: [
            { reviewer: 'John Doe', rating: 5, comment: 'Great place!' },
            { reviewer: 'Jane Smith', rating: 4, comment: 'Nice experience.' },
        ],
        businesses: [
            { name: 'PVP Mall', rating: 4, image: 'images/pvp.jpg' },
            { name: 'Trend Set', rating: 3, image: 'images/trendset.jpg' },
        ]
    };

    const attractionsContent = document.getElementById('attractions-content');
    const reviewsContent = document.getElementById('reviews-content');
    const businessesContent = document.getElementById('businesses-content');

    if (attractionsContent) {
        data.attractions.forEach(attraction => {
            const attractionElement = document.createElement('div');
            attractionElement.className = 'attraction';
            attractionElement.innerHTML = `
                <h3>${attraction.name}</h3>
                <img src="${attraction.image}" alt="${attraction.name}">
                <p>${attraction.description}</p>
            `;
            attractionsContent.appendChild(attractionElement);
        });
    }

    if (reviewsContent) {
        data.reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <h3>${review.reviewer}</h3>
                <p>Rating: ${review.rating} stars</p>
                <p>${review.comment}</p>
            `;
            reviewsContent.appendChild(reviewElement);
        });
    }

    if (businessesContent) {
        data.businesses.forEach(business => {
            const businessElement = document.createElement('div');
            businessElement.className = 'business';
            businessElement.innerHTML = `
                <h3>${business.name}</h3>
                <img src="${business.image}" alt="${business.name}">
                <p>Rating: ${business.rating} stars</p>
            `;
            businessesContent.appendChild(businessElement);
        });
    }
});