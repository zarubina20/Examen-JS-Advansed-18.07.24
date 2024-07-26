$(document).ready(function() {
    let countries = JSON.parse(localStorage.getItem('visitedCountries')) || [];

    const countryInput = document.getElementById('countryInput');
    const addCountryBtn = document.getElementById('addCountryBtn');
    const messageBox = document.getElementById('message');
    const countryList = document.getElementById('countryList');

    function displayCountries() {
        countryList.innerHTML = '';
        countries.forEach(country => {
            const li = document.createElement('li');
            li.textContent = country;
            countryList.appendChild(li);
        });
    }

    displayCountries();

    addCountryBtn.addEventListener('click', function() {
        const newCountry = countryInput.value.trim();
        if (newCountry === '') {
            showMessage('Please enter a country name.', 'error');
        } else if (countries.includes(newCountry)) {
            showMessage('Country already exists in the list.', 'error');
        } else {
            countries.push(newCountry);
            localStorage.setItem('visitedCountries', JSON.stringify(countries));
            displayCountries();
            showMessage('Country added successfully.', 'success');
            countryInput.value = '';
        }
    });

    function showMessage(message, type) {
        Swal.fire({
            text: message,
            icon: type,
            timer: 1500,
            showConfirmButton: false
        });
    }
});