const table = document.getElementById('myTable').getElementsByTagName('tbody')[0]
const pagination = document.getElementById('pagination')
const pagination2 = document.getElementById('pagination2')
const searchBar = document.getElementById('searchBar')
const popup = document.getElementById('popup')

let characterList;

let contenuPopup = ""

let selectorResult = 20
let counter = 0
let counterEnd = selectorResult

let searchBarResearchOn = "namefullname"
let searchBarIE = "include"

const changeSearchBar = (param) => {
    searchBarResearchOn = param
}

const changeSearchBarIE = (param) => {
    searchBarIE = param
}

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    if (searchBar != null) {
        const filteredCharacters = characterList.filter((character) => {
            if (searchBarResearchOn == "namefullname") {
                if (searchBarIE == "include") {
                    return (character.name.toLowerCase().includes(searchString) || character.biography.fullName.toLowerCase().includes(searchString));
                } else if (searchBarIE == "exclude") {
                    return (!character.name.toLowerCase().includes(searchString) && !character.biography.fullName.toLowerCase().includes(searchString));
                }
            } else if (searchBarResearchOn == "race") {
                if (character.appearance.race != null) {
                    if (searchBarIE == "include") {
                        return (character.appearance.race.toLowerCase().includes(searchString));
                    } else if (searchBarIE == "exclude") {
                        return (!character.appearance.race.toLowerCase().includes(searchString)); 
                    }
                }
            } else if (searchBarResearchOn == "gender") {
                if (searchBarIE == "include") {
                    return (character.appearance.gender.toLowerCase().includes(searchString));
                } else if (searchBarIE == "exclude") {
                    return (!character.appearance.gender.toLowerCase().includes(searchString));
                }
            } else if (searchBarResearchOn == "pob") {
                if (searchBarIE == "include") {
                    return (character.biography.placeOfBirth.toLowerCase().includes(searchString));
                } else if (searchBarIE == "exclude") {
                    return (!character.biography.placeOfBirth.toLowerCase().includes(searchString));
                }
            } else if (searchBarResearchOn == "alignement") {
                if (searchBarIE == "include") {
                    return (character.biography.alignment.toLowerCase().includes(searchString));
                } else if (searchBarIE == "exclude") {
                    return (!character.biography.alignment.toLowerCase().includes(searchString));
                }
            } else if (searchBarResearchOn == "all") {
                if (character.appearance.race != null) {
                    if (searchBarIE == "include") {
                        return (character.name.toLowerCase().includes(searchString) 
                        || character.biography.fullName.toLowerCase().includes(searchString)
                        || character.appearance.race.toLowerCase().includes(searchString)
                        || character.appearance.gender.toLowerCase().includes(searchString)
                        || character.biography.placeOfBirth.toLowerCase().includes(searchString)
                        || character.biography.alignment.toLowerCase().includes(searchString))
                    } else if (searchBarIE == "exclude") {
                        return (!character.name.toLowerCase().includes(searchString) 
                        && !character.biography.fullName.toLowerCase().includes(searchString)
                        && !character.appearance.race.toLowerCase().includes(searchString)
                        && !character.appearance.gender.toLowerCase().includes(searchString)
                        && !character.biography.placeOfBirth.toLowerCase().includes(searchString)
                        && !character.biography.alignment.toLowerCase().includes(searchString))
                    }
                } else {
                    if (searchBarIE == "include") {
                        return (character.name.toLowerCase().includes(searchString) 
                        || character.biography.fullName.toLowerCase().includes(searchString)
                        || character.appearance.gender.toLowerCase().includes(searchString)
                        || character.biography.placeOfBirth.toLowerCase().includes(searchString)
                        || character.biography.alignment.toLowerCase().includes(searchString))
                    } else if (searchBarIE == "exclude") {
                        return (!character.name.toLowerCase().includes(searchString) 
                        && !character.biography.fullName.toLowerCase().includes(searchString)
                        && !character.appearance.gender.toLowerCase().includes(searchString)
                        && !character.biography.placeOfBirth.toLowerCase().includes(searchString)
                        && !character.biography.alignment.toLowerCase().includes(searchString))
                    }
                }
            }
        });
        displayCharacters(filteredCharacters)
    } else if (searchBar == null) {
        console.log("TEST")
        table.innerHTML = ""
        loadData(characterList)
    }
});

const displayCharacters = (characters) => {
    table.innerHTML = ""
    // const htmlString = characters
    for (let i = 0; i < selectorResult; i++) {
        const newRow = table.insertRow(table.rows.length)
        newRow.innerHTML = "<img src="+characters[i].images.sm+">"
        const nameCell = newRow.insertCell()
        nameCell.innerHTML = characters[i].name
        const fullNameCell = newRow.insertCell()
        fullNameCell.innerHTML = characters[i].biography.fullName
        const powerstatsCell = newRow.insertCell()
        powerstatsCell.innerHTML = "Intelligence : " + characters[i].powerstats.intelligence + "<br> Force : " + characters[i].powerstats.strength + "<br> Vitesse : " + characters[i].powerstats.speed + "<br> Durabilité : " + characters[i].powerstats.durability + "<br> Puissance : " + characters[i].powerstats.power + "<br> Combat : " + characters[i].powerstats.combat
        const raceCell = newRow.insertCell()
        raceCell.innerHTML = characters[i].appearance.race
        const genderCell = newRow.insertCell()
        genderCell.innerHTML = characters[i].appearance.gender
        const heightCell = newRow.insertCell()
        heightCell.innerHTML = characters[i].appearance.height
        const weightCell = newRow.insertCell()
        weightCell.innerHTML = characters[i].appearance.weight
        const pobCell = newRow.insertCell()
        pobCell.innerHTML = characters[i].biography.placeOfBirth
        const alignmentCell = newRow.insertCell()
        alignmentCell.innerHTML = characters[i].biography.alignment
    }
    pages(characters.length)
};

function change (param) {
    if (param == 10) {
        selectorResult = 10
    } else if (param == 20) {
        selectorResult = 20
    } else if (param == 50) {
        selectorResult = 50
    } else if (param == 100) {
        selectorResult = 100
    } else if (param == 1000) {
        selectorResult = 100000
    }
    table.innerHTML = ""
    counter = 0
    counterEnd = selectorResult 
    loadData(characterList)
    pagination.innerHTML = ""
    pages(characterList.length)
}

function pages (param) {
    pagination.innerHTML = ""
    if (selectorResult === 100000) {
        return
    }
    let nbPage = Math.round(param / selectorResult)
    let pageCounter = 1
    if (selectorResult === 100) {
        pageCounter = 0
        for (let i = 0; i <= nbPage; i++) {
            const newPageA = document.createElement('div')
            newPageA.innerHTML = `<a href='javascript:changePage(${pageCounter})' id="${pageCounter}" class='pages'>${pageCounter}</a>`
            pageCounter += 1
            pagination.appendChild(newPageA)
        }
    } else if (selectorResult === 10) {
        for (let i = 0; i <= nbPage; i++) {
            const newPageA = document.createElement('div')
            const secondPageA = document.createElement('div')
            if (i <= 38) {
                newPageA.innerHTML = `<a href='javascript:changePage(${pageCounter})' id="${pageCounter}" class='pages'>${pageCounter}</a>`
                pageCounter += 1
                pagination.appendChild(newPageA)
            } else {
                secondPageA.innerHTML = `<a href='javascript:changePage(${pageCounter})' id="${pageCounter}" class='pages2'>${pageCounter}</a>`
                pageCounter += 1
                pagination2.appendChild(secondPageA)
            }
        }
    } else {
        for (let i = 0; i <= nbPage; i++) {
            const newPageA = document.createElement('div')
            newPageA.innerHTML = `<a href='javascript:changePage(${pageCounter})' id="${pageCounter}" class='pages'>${pageCounter}</a>`
            pageCounter += 1
            pagination.appendChild(newPageA)
        }
    }
}

function changePage (param) {
    counterEnd = param * selectorResult 
    counter = param * selectorResult - selectorResult
    table.innerHTML = ""
    loadData(characterList)
}

const loadData = heroes => { 
    pages(heroes.length)
    heroes.forEach((element, index) => {
        if (counter < counterEnd && index >= counter) {
            const newRow = table.insertRow(table.rows.length)
            newRow.innerHTML = `<a href="#popup${element.id}"><img src="${element.images.sm}"></a>`
            const nameCell = newRow.insertCell()
            nameCell.innerHTML = element.name
            const fullNameCell = newRow.insertCell()
            fullNameCell.innerHTML = element.biography.fullName
            const powerstatsCell = newRow.insertCell()
            powerstatsCell.innerHTML = "Intelligence : " + element.powerstats.intelligence + "<br> Force : " + element.powerstats.strength + "<br> Vitesse : " + element.powerstats.speed + "<br> Durabilité : " + element.powerstats.durability + "<br> Puissance : " + element.powerstats.power + "<br> Combat : " + element.powerstats.combat
            const raceCell = newRow.insertCell()
            raceCell.innerHTML = element.appearance.race
            const genderCell = newRow.insertCell()
            genderCell.innerHTML = element.appearance.gender
            const heightCell = newRow.insertCell()
            heightCell.innerHTML = element.appearance.height
            const weightCell = newRow.insertCell()
            weightCell.innerHTML = element.appearance.weight
            const pobCell = newRow.insertCell()
            pobCell.innerHTML = element.biography.placeOfBirth
            const alignmentCell = newRow.insertCell()
            alignmentCell.innerHTML = element.biography.alignment
            counter += 1
        } 
    });
    heroes.map(element => {
        contenuPopup += `
            <div id="popup${element.id}" class="overlay">
            <div class="popup">
              <img src=${element.images.sm} alt="img" class="popupimg">
              <h2>${element.name}</h2>
              <a class="close" href="#">&times;</a>
              <div class="content">
                <div class="power">
                  <p>Powerstate :</p>
                  <p>Intelligence : ${element.powerstats.intelligence}</p>
                  <p>Strenght : ${element.powerstats.strength}</p>
                  <p>Speed : ${element.powerstats.speed}</p>
                  <p>Durability : ${element.powerstats.durability}</p>
                  <p>Power : ${element.powerstats.power}</p>
                  <p>Combat : ${element.powerstats.combat}</p>
                  <p>Durability : ${element.powerstats.durability}</p>
                  <p>Height : ${element.appearance.height}</p>
                  <p>Weight : ${element.appearance.weight}</p>
                  <p>PlaceOfBirth : ${element.biography.placeOfBirth}</p>
                </div>
                <div class="bio">
                  <p>Biography :</p>
                  <p>Name : ${element.biography.fullName}</p>
                  <p>First apparition : ${element.biography.firstAppearance}</p>
                  <p>Publisher : ${element.biography.publisher}</p>
                  <p>Alignment : ${element.biography.alignment}</p>
                </div>
                <div class="Work:">
                  <p>Work :</p>
                  <p>Occupation : ${element.work.occupation}</p>
                  <p>Bases : ${element.work.base}</p>
                </div>
                <div class="connections">
                  <p>Connections :</p>
                  <p>GroupAffiliation : ${element.connections.groupAffiliation}</p>
                  <p>Relatives : ${element.connections.relatives}</p>
                </div>
              </div>
            </div>
          
          </div>`
    })
    popup.innerHTML = contenuPopup
}

fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
.then((response) => response.json())
.then(jsonRes => {
    characterList = jsonRes
    loadData(characterList)
})