//div where profile information will appear
const overview = document.querySelector(".overview");
// github username
const username = "leahcarlin";
const repoSection = document.querySelector(".repos"); 
// ul for repo list to display
const repoList = document.querySelector(".repo-list");
const repoData = document.querySelector(".repo-data");

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
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
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
    overview.append(div);
    getRepos();
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

// display info about each repo
const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add(".repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        getSpecificRepoInfo(repoName);
    }
});

const getSpecificRepoInfo = async function (repoName) {
    const getRepo = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await getRepo.json();
    //console.log(repoInfo);

    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    // make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        //console.log(languages);
    }
    displaySpecificRepoInfo(repoInfo, languages);
    };

// display the specific repo information.
const displaySpecificRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoData.append(newDiv);
};

