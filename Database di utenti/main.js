const ENDPOINT = `https://jsonplaceholder.typicode.com/users`;

const textElement = document.getElementById("text");
const filterSelect = document.getElementById("filterSelect");

const input = document.getElementById("input");
const button = document.getElementById("button");



const loadData = async () => {
    const response = await fetch(ENDPOINT);
    const result = await response.json();
    console.log(result);

   
    window.userData = result;
};


const displayCards = (data, filter) => {

    textElement.innerHTML = '';

    data.forEach(loginData => {
        const { email, name, username } = loginData;
       
        


        if (filter === 'email' && email) {
            card(`Email: ${email}`, textElement);
        } else if (filter === 'username' && username) {
            card(`Username: ${username}`, textElement);
        } else if (filter === 'name' && name) {
            card(`Name: ${name}`, textElement);
        }
    });
};


const card = (cardData, divToAppend) => {
    if (cardData && divToAppend) {
        const divCard = document.createElement("div");
        divCard.classList.add("card", "col-12");
        divCard.innerText = cardData;
        divToAppend.appendChild(divCard);
    }
};


filterSelect.addEventListener('change', () => {
    const selectedValue = filterSelect.value;
    if (window.userData) {
        displayCards(window.userData, selectedValue);
    }
    
});


button.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedValue = filterSelect.value;
    const searchTerm = input.value.trim().toLowerCase();
    if (window.userData) {
       const filteredData = window.userData.filter(user => {
            if (selectedValue === 'email') {
                return user.email.toLowerCase().includes(searchTerm);
            } else if (selectedValue === 'username') {
                return user.username.toLowerCase().includes(searchTerm);
            } else if (selectedValue === 'name') {
                return user.name.toLowerCase().includes(searchTerm);
            }
            return false;
        });
        displayCards(filteredData, selectedValue);
    }
});


loadData();









