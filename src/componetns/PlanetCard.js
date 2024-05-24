import React from 'react';

const PlanetCard = ({ planet }) => {
    return (
        <div className="flex justify-center items-stretch bg-c-gray-dark text-white px-4 md:px-10 py-3 md:py-6 rounded-lg shadow-lg mb-4 w-full">
            <div className="flex-1 justify-between items-center mb-4">
                <span className="text-sm text-c-orange md:hidden">
                    {new Date(planet.created).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <div className='flex items-center'>
                    <div className='bg-c-gray-light self-start rounded-full md:rounded-lg text-center content-normal w-8 h-8 md:w-auto md:h-auto md:p-2 mt-2 md:mt-0'>
                        <img src="/icon.png" alt="planet icon" className="w-8 h-8 hidden md:inline-block" />
                        <span className='text-xl md:hidden'>
                            {planet.name.charAt(0)}
                        </span>
                    </div>
                    <div className='px-4'>
                        <h2 className="inline-block text-xl font-bold">{planet.name}</h2>
                        <p className="text-c-gray-light mb-0 md:hidden">Climate: {planet.climate}</p>
                        <div>
                            <h3 className="text-md font-semibold text-gray-300">Films:</h3>
                            <ul className="list-none list-inside">
                                {planet.films.map((film, index) => (
                                    <li key={index} className=" text-gray-300 md:text-c-gray-light">
                                        <a href={film} target='_blank'>
                                            {film}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col basis-2/12 sm:basis-3/12'>
                <span className="text-sm text-c-orange text-right hidden md:inline-block">
                    {new Date(planet.created).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <p className="text-gray-300 text-right mb-4 mt-8 hidden md:inline-block">Climate: {planet.climate}</p>
                <img src="/icon.png" alt="planet icon" className="w-12 h-12 self-end mt-8 md:hidden" />
            </div>
        </div>
    );
};

export default PlanetCard;