const myInfo = new URLSearchParams(window.location.search);

document.querySelector('#results').innerHTML = `
<p>${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Proxy ${myInfo.get('ordinance')} on ${myInfo.get('date')} in the ${myInfo.get('location')} Temple</p>
<p>Contact Info: Phone: ${myInfo.get('phone')} | Email: ${myInfo.get('email')}</p>
`;