const characters = [];
async function fetchCharacter(id) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const responseJson = await response.json();
    if (responseJson) {
        characters.push(responseJson);
    }
}
const listaDeCards = [];
function createCards(character) {
    const cardSection = document.getElementById('ListaDeCartoes');
    const card = document.createElement('div');
    card.classList.add('cartao');
    const imageCard = document.createElement('img');
    imageCard.classList.add('imagemCard');
    imageCard.src = character.image;
    const divisionCard = document.createElement('div');
    divisionCard.classList.add('cartaoDivisao');
    const nameText = character.name.length > 20 ? character.name.substring(0, 17) + '...' : character.name;
    const nameCard = document.createElement('h1');
    nameCard.classList.add('nomeCard');
    nameCard.innerText = nameText;
    const statusCard = document.createElement('p');
    statusCard.classList.add('statusCard');
    const statusDot = document.createElement('span');
    statusDot.classList.add('statusDot');
    if (character.status === 'Alive') {
        statusDot.classList.add('alive');
    }
    else if (character.status === 'Dead') {
        statusDot.classList.add('dead');
    }
    else if (character.status === "unknown") {
        statusDot.classList.add('unknow');
    }
    statusCard.appendChild(statusDot);
    statusCard.innerHTML += `${character.status} - ${character.species} `;
    const lastKnowLocation = document.createElement('p');
    lastKnowLocation.classList.add('lastKnow');
    lastKnowLocation.innerText = 'Last Know Location';
    const location = document.createElement('p');
    location.classList.add('location');
    location.innerText = character.location.name;
    const numberId = document.createElement('p');
    numberId.classList.add('identificacao');
    numberId.innerText = `${character.id}° - Personagem`;
    card.append(imageCard, divisionCard);
    divisionCard.append(nameCard, statusCard, lastKnowLocation, location, numberId);
    cardSection.append(card);
    listaDeCards.push(card);
}
async function showCharacter() {
    const promises = [];
    for (let i = 1; i <= 8; i++) {
        promises.push(fetchCharacter(i));
    }
    await Promise.all(promises);
}
async function showCard() {
    await showCharacter();
    characters.forEach(character => {
        createCards(character);
    });
}
showCard();
async function searchCharacters() {
    const inputPesquisa = document.getElementById('inputPesquisa');
    const termoPesquisa = inputPesquisa.value.toLowerCase();
    const cardsContainer = document.getElementById('ListaDeCartoes');
    cardsContainer.innerHTML = '';
    characters.forEach(character => {
        if (character.name.toLowerCase().includes(termoPesquisa)) {
            createCards(character);
        }
    });
}
const buttonPesquisa = document.getElementById('pesquisa');
buttonPesquisa.addEventListener('click', searchCharacters);
