// Write your JavaScript code here!

window.addEventListener("load", function() {
    let form = document.querySelector("form");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let pilotNameInput = document.querySelector("input[name=pilotName]");
        let copilotNameInput = document.querySelector("input[name=copilotName]");
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
        let cargoMassInput = document.querySelector("input[name=cargoMass]");

        let pilotName = pilotNameInput.value;
        let copilotName = copilotNameInput.value;
        let fuelLevel = fuelLevelInput.value;
        let cargoMass = cargoMassInput.value;

        let list = document.getElementById("faultyItems");

        if (validateInput(pilotName) === "Empty" || validateInput(copilotName) === "Empty" || 
            validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
            alert("All fields are required!");
            return;
        }

        if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number") {
            alert("Fuel level and Cargo mass should be numbers!");
            return;
        }

        if (validateInput(pilotName) === "Is a Number" || validateInput(copilotName) === "Is a Number") {
            alert("Pilot and Co-pilot names should be strings!");
            return;
        }

        formSubmission(document, list, pilotName, copilotName, fuelLevel, cargoMass);
    });

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        // console.log(listedPlanets);
    }).then(function () {
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
    });
});
