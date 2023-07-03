const API_KEY = "111965de5f0842bc8ad2e3d2a6934d71";
const url = "https://newsapi.org/v2/everything?q=";

//runs when window is loading
//we are fetchng news from india at beginning using fetchNews() bydefault
window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles)
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        // we're cloning card now
        //we will do deep cloning now---all elements(div) inside class="card" we want all divs should be cloned
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        //now clone is made and we want to put that cardClone in cardsContainer class
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: 'Asia/Jakarta'
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;

    // when u click on any element then u need to open url from where this news comes & _blank means new tab
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank")
    })

}

// FOR NAVLIBNKS IPL,FINANCE,POLITICS
function onNavItemClick(id) {
    fetchNews(id); //fetches news as per query and binds them as well
}

// when u click on any of them ipl,finance,politics the selected item should be in blue color

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    // curSelectedNav? means if it is not null
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active') //active class styling will come
}

// handling search input and button
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return; //means without giving input if user serach then nothing will happen
    fetchNews(query);
    curSelectedNav?.classList.remove('active')//if IPl is selected then remove that selected color from there if someone has searched something
    curSelectedNav = null;
})