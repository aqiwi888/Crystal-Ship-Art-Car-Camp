// --- GPS Location Map Code --- 

// Global variables for map and marker
let map;
let crystalShipMarker;

// Placeholder for Trak-4 API details - YOU WILL UPDATE THESE
const TRAK4_API_ENDPOINT = 'YOUR_TRAK4_API_ENDPOINT_HERE'; // e.g., https://gps.trak-4.com/api/v3_01/reports/last_known_extended
const TRAK4_API_KEY = 'YOUR_TRAK4_API_KEY_HERE';
const TRAK4_DEVICE_ID = 'YOUR_TRAK4_DEVICE_ID_HERE'; // Or however Trak-4 identifies your specific device in the API call

// Sample starting coordinates (e.g., somewhere on the playa or a default location) 
let currentLat = 39.9075; // Replace with a sensible default
let currentLng = -119.2079; // Replace with a sensible default

// Function to initialize the Google Map
function initMap() {
    if (document.getElementById('map')) { // Only run if the map div exists on the current page
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: currentLat, lng: currentLng },
            zoom: 14, // Adjust zoom level as needed
            mapTypeId: 'satellite' // Or 'roadmap', 'hybrid', 'terrain'
        });

        crystalShipMarker = new google.maps.Marker({
            position: { lat: currentLat, lng: currentLng },
            map: map,
            title: 'The Crystal Ship',
            // You can use a custom icon for the Crystal Ship later if you want
            // icon: 'images/crystal_ship_icon.png' 
        });

        updateLocationInfo(currentLat, currentLng, 'Map Initialized with default location');
        fetchCrystalShipLocation(); // Fetch initial location

        // Fetch location every 30 seconds (adjust interval as needed - 30000ms = 30s)
        setInterval(fetchCrystalShipLocation, 30000);
    }
}

// Function to fetch location data from Trak-4 API (Placeholder)
async function fetchCrystalShipLocation() {
    console.log('Attempting to fetch Crystal Ship location...');
    // ** IMPORTANT: This is a placeholder. You will need to replace this with the actual Trak-4 API call **
    // Consult the Trak-4 API documentation for the correct endpoint, headers, and parameters.
    // You might need to include TRAK4_DEVICE_ID in the endpoint URL or as a parameter.

    // --- SIMULATED API CALL FOR NOW ---
    // Once you have your Trak-4 API key and endpoint, you'll replace this simulation.
    // For testing, let's simulate new coordinates slightly offset from the previous ones.
    // In a real scenario, you'd parse the response from Trak-4.
    const simulateNewLocation = true; // Set to false when you implement the real API call

    if (simulateNewLocation && TRAK4_API_KEY === 'YOUR_TRAK4_API_KEY_HERE') { // Only simulate if API key is still placeholder
        console.log('Simulating API response as Trak-4 API details are placeholders.');
        currentLat += (Math.random() - 0.5) * 0.001; // Tiny random movement for simulation
        currentLng += (Math.random() - 0.5) * 0.001;
        const simulatedData = {
            latitude: currentLat,
            longitude: currentLng,
            timestamp: new Date().toISOString()
        };
        updateMapLocation(simulatedData.latitude, simulatedData.longitude, simulatedData.timestamp);
        return;
    }
    // --- END SIMULATED API CALL ---

    // If API details are not placeholders, but you haven't implemented the fetch yet
    if (TRAK4_API_KEY === 'YOUR_TRAK4_API_KEY_HERE') {
        console.warn('Trak-4 API details are placeholders. Live tracking will not work until updated.');
        updateLocationInfo(currentLat, currentLng, 'Using default location. Update API details.');
        return;
    }

    try {
        // Example: Adjust this fetch call based on Trak-4 API docs
        // You might need to use query parameters for device ID, or include it in the path.
        // Headers will likely include your API key.
        const response = await fetch(`${TRAK4_API_ENDPOINT}?deviceId=${TRAK4_DEVICE_ID}`, { // This is an EXAMPLE endpoint structure
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TRAK4_API_KEY}`, // Or 'X-API-Key', etc. - check Trak-4 docs
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Trak-4 API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Trak-4 API Response:', data);

        // ** IMPORTANT: Parse the 'data' object according to Trak-4's API response structure **
        // The following are common names, but Trak-4 might use different field names.
        // For example, data might be an array, or location might be nested.
        const newLat = data.latitude; // Or data.lat, data.location.latitude, data[0].latitude etc.
        const newLng = data.longitude; // Or data.lon, data.location.longitude, data[0].longitude etc.
        const timestamp = data.timestamp; // Or data.deviceTime, data.lastReportedAt etc.

        if (newLat !== undefined && newLng !== undefined) {
            updateMapLocation(newLat, newLng, timestamp);
        } else {
            console.error('Latitude or Longitude not found in Trak-4 API response:', data);
            updateLocationInfo(currentLat, currentLng, 'Error fetching location. Using last known.');
        }

    } catch (error) {
        console.error('Error fetching Crystal Ship location:', error);
        updateLocationInfo(currentLat, currentLng, 'Error fetching location. Using last known.');
    }
}

// Function to update the map marker and info
function updateMapLocation(lat, lng, timestamp) {
    currentLat = lat;
    currentLng = lng;

    const newPosition = { lat: currentLat, lng: currentLng };
    if (crystalShipMarker) {
        crystalShipMarker.setPosition(newPosition);
    }
    if (map) {
        map.setCenter(newPosition);
    }
    
    const lastUpdatedTime = timestamp ? new Date(timestamp).toLocaleString() : 'N/A';
    updateLocationInfo(currentLat, currentLng, lastUpdatedTime);
}

// Function to update the text display of location and time
function updateLocationInfo(lat, lng, lastUpdatedText) {
    const coordsDisplay = document.getElementById('current-coords');
    const lastUpdatedDisplay = document.getElementById('last-updated');
    const googleMapsLink = document.getElementById('google-maps-link');
    const appleMapsLink = document.getElementById('apple-maps-link');

    if (coordsDisplay) {
        coordsDisplay.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
    if (lastUpdatedDisplay) {
        lastUpdatedDisplay.textContent = lastUpdatedText;
    }
    if (googleMapsLink) {
        googleMapsLink.href = `https://maps.google.com/?q=${lat},${lng}`;
    }
    if (appleMapsLink)  {
        appleMapsLink.href = `http://maps.apple.com/?ll=${lat},${lng}`;
    }
}

// Ensure initMap is globally accessible for the Google Maps API callback
window.initMap = initMap;

// --- End GPS Location Map Code ---
