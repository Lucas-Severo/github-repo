const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const infoElement = document.querySelector(".info");
const repoElement = document.querySelector(".repo");

searchBtn.addEventListener("click", getUser);
searchBox.addEventListener("keyup", (event) => {
    if(event.keyCode == 13)
    {
        searchBtn.click();
    }
})

function getUser() {
    const user = searchBox.value;
    getInfo(user);
    getRepo(user);
}

function getInfo(user) {
    fetch(`https://api.github.com/users/${user}`)
        .then( response => {
            if (!response.ok) throw Error("user not found");
            return response.json();
        })
        .then( response => {
            console.log(response);
        })
        .catch( err => console.log(err));
}

function getRepo(user) {
    fetch(`https://api.github.com/users/${user}/repos`)
        .then( response => {
            if (!response.ok) throw Error("user not found");
            return response.json();
        })
        .then( response => {
            console.log(response);
        })
        .catch( err => console.log(err));
}