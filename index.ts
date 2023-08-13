// Import stylesheets
import './style.css';


//review sync and async
async function searchDictionary() {
    //https://developer.mozilla.org/en-US/docs/Web/API/Document review Documents, DOM tree,
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    const form: HTMLFormElement = document.querySelector('#defineform');

    //creates new object which allows us to access the values in the form fields
    const formData = new FormData(form);
    //gets the values that is inputted in defineform which in this case will be the word we can to insert via api call
    const wordInput = formData.get('defineword') as string;
    // selects an HTML element with the id attribute set to 'result'. This is where the definition of the searched word will be displayed.
    const resultDiv = document.getElementById('result') as HTMLDivElement;

    if (!wordInput) {
        alert('Please enter a word.');
        return;
    }

    //the input that is typed in the form is converted to string and passed to this api call
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`;

    //bunch of api and json stuff i need to look into more
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length === 0) {
            resultDiv.innerHTML = 'No results found.';
        } else {
            const definition = data[0].meanings[0].definitions[0].definition;
            //const definition1 = data[1].definition;
            //const definition1 = data[1];
            resultDiv.innerHTML = `<h2>Definition:</h2><p>${definition}</p>`;
            //resultDiv.innerHTML = `<h3>Definition:</h3><p>${definition1}</p>`;
            const jsonOutputDiv = document.getElementById('jsonOutput');
            jsonOutputDiv.textContent = JSON.stringify(data, null, 2);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    }
}

//ask how to debug html in browser when inputting data into forms
//how to check what kind of data is being passed in through debugger?