//div where profile information will appear
const overview = document.querySelector(".overview");
// github username
const username = "leahcarlin";
// ul for repo list to display
const repoList = document.querySelector(".repo-list");


// async function to fetch info from github profile
const githubProfile = async function (){
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const user = await res.json();
    //console.log(user);
    displayUserInfo(user);
};
githubProfile();

// display the fetched user information on the page
const displayUserInfo = function (user) {
    const userInfo = document.createElement("div");
    userInfo.classList.add(".user-info");
    userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${user.avatar_url}/>
        </figure>
        <div>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Bio:</strong> ${user.bio}</p>
            <p><strong>Location:</strong> ${user.location}</p>
            <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
        </div>
        `;
    overview.append(userInfo);
}

// async function to fetch info repos
const getRepos = async function () {
    const myRepos = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const repoData = await myRepos.json();
    //console.log(repoData);
    displayRepoInfo(repoData);
};

getRepos();

// display info about each repo
const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add(".repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem);
    }
};