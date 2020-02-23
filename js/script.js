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
    infoElement.innerHTML = "";
    repoElement.innerHTML = "";
    repoElement.style.backgroundColor = "white";
    const user = searchBox.value;
    searchBox.value = "";
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
            showInfo(response);
        })
        .catch( err => infoElement.innerHTML = "User not Found");
}

function getRepo(user) {
    fetch(`https://api.github.com/users/${user}/repos`)
        .then( response => {
            if (!response.ok) throw Error("user not found");
            return response.json();
        })
        .then( response => {
            repoElement.style.backgroundColor = "rgba(233, 233, 233, 0.4)";
            showRepo(response);
        })
        .catch( err => console.log(err));
}

function showInfo(data) {
    const imgElement = document.createElement("img");
    imgElement.src = data.avatar_url;
    imgElement.style.height = "250px";

    const a = document.createElement("a");
    a.href = data.html_url;
    a.target = "_blank";
    a.innerHTML = data.name;

    infoElement.appendChild(imgElement);
    infoElement.appendChild(a);
}

function showRepo(data) {
    for (repo of data) {
        const a = document.createElement("a");
        a.href = repo.html_url;
        a.innerHTML = repo.name;
        a.style.width = "300px";
        a.target = "_blank";
        repoElement.appendChild(a);
    }
}