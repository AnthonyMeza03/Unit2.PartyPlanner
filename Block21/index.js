const baseURL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/';
const cohortName = '2311-FTB-MT-WEB-PT';


const fetchAllParties = async () => {
    try {
        const response = await fetch(`${baseURL}${cohortName}/events`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching parties:', error);
        return [];
    }
};
const deleteParty = async (partyId) => {
    try {
        const response = await fetch(`${baseURL}${cohortName}/events/${partyId}`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting party:', error);
        return false;
    }
};
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
const renderAllParties = async () => {
    const parties = await fetchAllParties();
    const partyList = document.querySelector('#party-list'); 

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
            } else {
                alert('Failed to delete party');
            }
        });

        partyItem.appendChild(deleteButton);
        partyList.appendChild(partyItem);
    });
};

const handleAddPartyFormSubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#party-name').value; 
    const date = document.querySelector('#party-date').value; 
    const time = document.querySelector('#party-time').value; 
    const location = document.querySelector('#party-location').value; 
    const description = document.querySelector('#party-description').value; 

    const partyData = { name, date, time, location, description };

    const addedParty = await addParty(partyData);
    if (addedParty) {
        renderAllParties();
    } else {
        alert('Failed to add party');
    }

   
    event.target.reset();
};


const init = () => {
    renderAllParties();

    const addPartyForm = document.querySelector('#add-party-form'); 
    addPartyForm.addEventListener('submit', handleAddPartyFormSubmit);
};

init();
