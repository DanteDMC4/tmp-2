import React, { useEffect, useState } from 'react';
import PlanetCard from './componetns/PlanetCard';
import './App.css';

function App() {
  const [mammalPlanets, setMammalPlanets] = useState([]);

  async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
  }

  useEffect(() => {
    async function fetchPlanetsWithMammal() {
      try {
        const planetsResponse = await fetch('https://swapi.dev/api/planets');
        const planetsData = await planetsResponse.json();
        const planets = planetsData.results;

        const planetsInFilms = planets.filter(planet => planet.films.length > 0);

        const residentUrls = [...new Set(planetsInFilms.flatMap(planet => planet.residents))];
        const residents = await Promise.all(residentUrls.map(url => fetchData(url)));

        const speciesUrls = [...new Set(residents.flatMap(resident => resident.species))];
        const speciesList = await Promise.all(speciesUrls.map(url => fetchData(url)));

        const mammalSpeciesUrls = new Set(
          speciesList
            .filter(species => species.classification.toLowerCase() === 'mammal')
            .map(species => species.url)
        );

        const filteredPlanets = planetsInFilms
          .map(planet => {
            const mammalResident = planet.residents.some(residentUrl =>
              residents.some(resident =>
                resident.url === residentUrl && resident.species.some(speciesUrl =>
                  mammalSpeciesUrls.has(speciesUrl)
                )
              )
            );
            return mammalResident ? Promise.resolve(planet) : null;
          })
          .filter(Boolean);

        return filteredPlanets;

      } catch (error) {
        console.error('error while fetching data:', error);
        return [];
      }
    }

    fetchPlanetsWithMammal().then(planetPromises => {
      Promise.all(planetPromises).then(planets => {
        console.log('Planets with mammals: ', planets);
        setMammalPlanets(planets)
      });
    });
  }, []);

  return (
    <div className=''>
      <h1 className="text-4xl font-bold text-center text-white m-8">Planets with Mammal Residents</h1>
      <div className="min-h-screen flex flex-col flex-wrap flex-auto justify-center items-center p-4 max-w-screen-lg mx-auto">
        {mammalPlanets.length > 0 ? mammalPlanets.map((planet, index) => (
          <PlanetCard key={index} planet={planet} />
        )) : <div className='text-white'>Loading...</div>}
      </div>
    </div>
  );
}

export default App;
