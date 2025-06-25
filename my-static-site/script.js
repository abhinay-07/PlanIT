function search() {  
    const query = document.getElementById('search-input').value;  
    alert(`Searching for: ${query}`);  
    // Implement actual search functionality here  
}  

function openReviewModal(attraction) {  
    document.getElementById('modal-title').textContent = attraction;  
    document.getElementById('review-modal').style.display = "block";  
}  

function closeReviewModal() {  
    document.getElementById('review-modal').style.display = "none";  
}  

function submitReview() {  
    const review = document.getElementById('review-input').value;  
    const title = document.getElementById('modal-title').textContent;  

    alert(`Review for ${title}: ${review}`);  
    closeReviewModal();  
    document.getElementById('review-input').value = ''; // Clear input  
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof L === 'undefined') {
        console.error('Leaflet library is not loaded.');
        return;
    }

    const map = L.map('map').setView([12.9716, 79.1587], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const places = [
        // Example data
        { name: 'Place 1', lat: 12.9716, lng: 79.1587, rating: 4, reviews: 100 },
        { name: 'Place 2', lat: 12.9726, lng: 79.1597, rating: 3, reviews: 50 },
        // Add more places as needed
    ];

    function filterPlaces() {
        const rating = document.getElementById('rating').value;
        const reviews = document.getElementById('reviews').value;

        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        places.forEach((place) => {
            if ((rating === 'all' || place.rating >= rating) &&
                (reviews === 'all' || place.reviews >= reviews)) {
                const marker = L.marker([place.lat, place.lng]).addTo(map)
                    .bindPopup(`<b>${place.name}</b><br>Rating: ${place.rating}<br>Reviews: ${place.reviews}`);
                
                marker.on('click', () => {
                    showDetails(place);
                });
            }
        });
    }

    function showDetails(place) {
        const existingDetailsBox = document.querySelector('.details-box');
        if (existingDetailsBox) {
            existingDetailsBox.remove();
        }

        const detailsBox = document.createElement('div');
        detailsBox.className = 'details-box';
        detailsBox.innerHTML = `
            <h3>${place.name}</h3>
            <p>Rating: ${place.rating}</p>
            <p>Reviews: ${place.reviews}</p>
            <button onclick="window.location.href='attractions.html?name=${place.name}'">Attractions</button>
            <button onclick="window.location.href='reviews.html?name=${place.name}'">Reviews</button>
            <button onclick="window.location.href='businesses.html?name=${place.name}'">Businesses</button>
        `;
        document.body.appendChild(detailsBox);
    }

    document.getElementById('rating').addEventListener('change', filterPlaces);
    document.getElementById('reviews').addEventListener('change', filterPlaces);

    document.getElementById('search').addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
            .then(response => response.json())
            .then(data => {
                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker) {
                        map.removeLayer(layer);
                    }
                });

                data.forEach((place) => {
                    const lat = place.lat;
                    const lon = place.lon;
                    const marker = L.marker([lat, lon]).addTo(map)
                        .bindPopup(`<b>${place.display_name}</b>`);
                    
                    marker.on('click', () => {
                        showDetails({
                            name: place.display_name,
                            lat: lat,
                            lng: lon,
                            rating: 'N/A',
                            reviews: 'N/A'
                        });
                    });
                });
            });
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            const userMarker = L.marker([userLat, userLng]).addTo(map)
                .bindPopup('You are here').openPopup();

            const nearbyPlaces = places.filter((place) => {
                const distance = getDistance(userLat, userLng, place.lat, place.lng);
                return distance <= 10; // 10 km radius
            });

            nearbyPlaces.forEach((place) => {
                const marker = L.marker([place.lat, place.lng]).addTo(map)
                    .bindPopup(`<b>${place.name}</b><br>Rating: ${place.rating}<br>Reviews: ${place.reviews}`);
                
                marker.on('click', () => {
                    showDetails(place);
                });
            });
        });
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    filterPlaces();

    // AI Assistant Toggle
    const openAiAssistantButton = document.getElementById('open-ai-assistant');
    const chatContainer = document.getElementById('chat-container');
    const chatBox = document.getElementById('chat-box');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendChatButton = document.getElementById('send-chat');

    if (openAiAssistantButton && chatContainer) {
        openAiAssistantButton.addEventListener('click', () => {
            chatContainer.style.display = 'block';
            openAiAssistantButton.style.display = 'none';
        });
    }

    if (sendChatButton && chatInput && chatMessages) {
        sendChatButton.addEventListener('click', () => {
            const userMessage = chatInput.value;
            if (userMessage.trim() === '') return;

            // Display user message
            const userMessageElement = document.createElement('div');
            userMessageElement.className = 'chat-message user-message';
            userMessageElement.textContent = userMessage;
            chatMessages.appendChild(userMessageElement);

            // Clear input
            chatInput.value = '';

            // Call OpenAI API
            fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    max_tokens: 150
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.choices && data.choices.length > 0) {
                    const aiMessage = data.choices[0].text.trim();

                    // Display AI message
                    const aiMessageElement = document.createElement('div');
                    aiMessageElement.className = 'chat-message ai-message';
                    aiMessageElement.textContent = aiMessage;
                    chatMessages.appendChild(aiMessageElement);

                    // Scroll to the bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                } else {
                    console.error('No response from OpenAI API');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});