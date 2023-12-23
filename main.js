const usernameInput = document.querySelector('#username');
const providerInput = document.querySelector('#provider');
const passwordInput = document.querySelector('#password');
const submitBtn = document.querySelector('#submit-btn');

let emptyMessage = '<p id="emptyMessage" class="text-center p-4">Nothing to display</p>';
// appending elements to table
const passwordContainer = document.querySelector('.passwords-container table tbody');
const appendEntry = ({ provider, username, password }) => {
    if (passwordContainer.innerHTML === emptyMessage) {
        console.log(passwordContainer.lastChild)
    };
    let tr = document.createElement('tr')
    tr.classList = 'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
    tr.innerHTML = `
<th scope="row"
    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    ${provider}
</th>
<td class="px-6 py-4">
    ${username}
</td>
<td class="px-6 py-4">
    ${password}
</td>
`
        // for copy logic
//         `<td class="px-6 py-4 copy">
//     <span href="#"
//         class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Copy</span>
// </td>`
    passwordContainer.prepend(tr)
};

// onload logic
const populateOnLoad = () => {
    let storedData = localStorage.getItem('data');
    if (storedData) {
        storedData = JSON.parse(storedData);
        for (let i = 0; i < storedData.length; i++) {
            const entry = storedData[i];
            appendEntry(entry)
        }
    } else {
        // will add empty message logic
    }
}

document.onload = populateOnLoad();




// setting to localStorage
const addToStorage = (newData) => {
    let data = [];
    let storedData = localStorage.getItem('data');
    if (storedData) {
        data = JSON.parse(storedData);
    }
    data.push(newData);
    data = JSON.stringify(data);
    localStorage.setItem('data', data);
}

// taking inputs
let username, password, provider;
submitBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    password = passwordInput.value.trim();
    provider = providerInput.value.trim();

    if (password === '' || username === '' || provider === '') {
        alert("Please fill all the details properly");
    } else {
        const data = {
            provider: provider,
            username: username,
            password: password
        }
        appendEntry(data);
        addToStorage(data);
    }
    usernameInput.value = '';
    passwordInput.value = '';
    providerInput.value = '';
})





