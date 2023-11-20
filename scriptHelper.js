require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    if (testInput.trim() === "") {
        return "Empty";
    } else if (isNaN(Number(testInput))) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    list.style.visibility = "visible";
    document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").textContent = `Co-pilot ${copilot} is ready for launch`;

    let launchStatus = document.getElementById("launchStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    if (fuelLevel < 10000) {
        fuelStatus.textContent = "Fuel level too low for launch";
        launchStatus.textContent = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else {
        fuelStatus.textContent = "Fuel level high enough for launch";
    }

    if (cargoLevel > 10000) {
        cargoStatus.textContent = "Cargo mass too heavy for launch";
        launchStatus.textContent = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else {
        cargoStatus.textContent = "Cargo mass low enough for launch";
    }

    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        launchStatus.textContent = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then(function (response) {
            return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
