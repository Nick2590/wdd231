// thankyou.js – Display submitted form data

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    
    const data = {
        firstName: params.get('first_name'),
        lastName: params.get('last_name'),
        email: params.get('email'),
        phone: params.get('phone'),
        organization: params.get('organization'),
        timestamp: params.get('timestamp')
    };
    
    return data;
}

function displayData() {
    const data = getQueryParams();

    const container = document.getElementById("submitted-info");
    container.innerHTML = `
        <p><strong>First Name:</strong> ${data.firstName}</p>
        <p><strong>Last Name:</strong> ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mobile Phone:</strong> ${data.phone}</p>
        <p><strong>Organization:</strong> ${data.organization}</p>
        <p><strong>Submission Time:</strong> ${data.timestamp}</p>
    `;
}

// Load on page render
displayData();
