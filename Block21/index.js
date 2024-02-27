const baseURL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/';
const cohortName = '2311-FTB-MT-WEB-PT';

// Function to fetch all parties
const fetchAllParties = async () => {
    try {
        const response = await fetch(`${baseURL}${cohortName}/events`);
        const data = await response.json();
        return data.data; // Assuming the array of parties is under the 'data' key
    } catch (error) {
        console.error('Error fetching parties:', error);
        return [];
    }
};

// Function to delete a party by ID
const deleteParty = async (partyId) => {
    try {
        const response = await fetch(`${baseURL}${2311-FTB-MT-WEB-PT}/events/${partyId}`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting party:', error);
        return false;
    }
};

// Function to add a new party
const addParty = async (partyData) => {
    try {
        const response = await fetch(`${baseURL}${cohortName}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partyData)
        });
        const data = await response.json();
        return data.data; 
    } catch (error) {
        console.error('Error adding party:', error);
        return null;
    }
};

// Function to render all parties
const renderAllParties = async () => {
    const parties = await fetchAllParties();
    const partyList = document.getElementById('party-list');

    partyList.innerHTML = '';

    parties.forEach(party => {
        const partyItem = document.createElement('li');
        partyItem.textContent = `${party.name} - ${party.date}, ${party.time}, ${party.location}, ${party.description}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            const deleted = await deleteParty(party.id);
            if (deleted) {
                renderAllParties(); 
                alert('Failed to delete party');
            }
        });

        partyItem.appendChild(deleteButton);
        partyList.appendChild(partyItem);
    });
};

const handleAddPartyFormSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById('party-name').value;
    const date = document.getElementById('party-date').value;
    const time = document.getElementById('party-time').value;
    const location = document.getElementById('party-location').value;
    const description = document.getElementById('party-description').value;

    const partyData = { name, date, time, location, description };

    const addedParty = await addParty(partyData);
    if (addedParty) {
        renderAllParties(); // Refresh party list after adding a new party
    } else {
        alert('Failed to add party');
    }

    // Clear form fields after submission
    event.target.reset();
};

// Initialize the page
const init = () => {
    renderAllParties();

    const addPartyForm = document.getElementById('add-party-form');
    addPartyForm.addEventListener('submit', handleAddPartyFormSubmit);
};

init();
