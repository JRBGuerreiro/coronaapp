import React, {useEffect, useRef, useState} from 'react'
import mapboxgl from 'mapbox-gl'
import InfoHeader from './InfoHeader'

mapboxgl.accessToken = "pk.eyJ1IjoibGVob3VkaW5pIiwiYSI6ImNram43b3FhZTNzYWUydnNjd21zcmJ1d2QifQ.ouLhKn6B6pzmbZJtymQIcg"

const Map = React.memo(({data}) => {

    const mapRef = useRef(null)

	const [loading, setLoading] = useState(true)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current,

            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-104.9876, 39.7405],
            zoom: 1.5,
        })

       //Marker logic in async func 
       addMarkerToMap(data, map)
        

          // add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

		const loadingScreen = document.querySelector(".loader-container")
		setTimeout(() => {
			if(loadingScreen && loading){
				loadingScreen.remove()
				setLoading(false)
			}	
		}, 4000);
        return () => {
            //cleanup when unmounting
            map.remove()
        }
    }, [data])
    
    //state to be passed to InfoHeader
    const [population, setPopulation] = useState(0)
    const [infected, setInfected] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [deaths, setDeaths] = useState(0)
    const [active, setActive] = useState(0)

    const addMarkerToMap = async (mapData, map) =>  {
        map.on('load', function() {
            map.addLayer(
              {
                id: 'country-boundaries',
                source: {
                  type: 'vector',
                  url: 'mapbox://mapbox.country-boundaries-v1',
                },
                'source-layer': 'country_boundaries',
                type: 'fill',
                paint: {
                  'fill-color': '#3fb1ce',
				  'fill-opacity': 0.4,
                },
              },
              'country-label'
            );
        });

		/**
		 * Here we pick pick up events for each polygon (country)
		 * Once we do we grab data from the api and trigger the click event for the country with the same iso code
		 */
        map.on('click', (event) => {
            if(Object.keys(mapData).length) {
              	var features= map.queryRenderedFeatures(event.point, {layers: ['country-boundaries']})
              	if(!features.length) {
                	return;
				}
				  
				mapData.forEach(el => {
					var feature = features[0]
					const {countryInfo, country, cases, population, recovered, deaths, active} = el
					const {lat, long, flag, iso2} = countryInfo
					if(feature.properties.iso_3166_1 === iso2) {
						var popup = new mapboxgl.Popup()
						popup
							.setLngLat([long, lat])
							.setHTML(
								`<img style="width: 100%" src=${flag} alt="flag"/> 
								<p style="text-align:center; color: #fcfcfc">${country}</p>
							`)
							.addTo(map)

						setPopulation(population)
						setInfected(cases)
						setRecovered(recovered)
						setDeaths(deaths)
						setActive(active)
					}
				})
			}
		})
		
		///make sure we signal the user this is a clickable polygon
		// map.on('mousemove', (event) => {
		// 	var features= map.queryRenderedFeatures(event.point, {layers: ['country-boundaries']})
		// 	map.getCanvas().style.cursor = (features.length) ? 'pointer' : ''
		// })
    }

    return(
        <div className="map-wrapper">
            <InfoHeader
                population = {population}
                infected = {infected}
                recovered = {recovered}
                deaths = {deaths}
                active = {active}
            />
            <div className="map-container" ref={mapRef}>

            </div>
        </div>
    )
})

export default Map