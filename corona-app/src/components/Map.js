import React, {useEffect, useRef, useState} from 'react'
import mapboxgl from 'mapbox-gl'
import InfoHeader from './InfoHeader'

mapboxgl.accessToken = "pk.eyJ1IjoibGVob3VkaW5pIiwiYSI6ImNram43b3FhZTNzYWUydnNjd21zcmJ1d2QifQ.ouLhKn6B6pzmbZJtymQIcg"

const Map = React.memo(({data}) => {

    const mapRef = useRef(null)

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
        if(Object.keys(mapData).length) {
            mapData.forEach(el => {
                const {countryInfo, country, cases, population, recovered, deaths, active} = el
                const {lat, long, flag} = countryInfo
                console.log(el)
                const marker = new mapboxgl.Marker()
                .setLngLat([long, lat])
                
                .addTo(map)

                var popup = new mapboxgl.Popup()
                marker.getElement().addEventListener('click', () => {
                    setPopulation(population)
                    setInfected(cases)
                    setRecovered(recovered)
                    setDeaths(deaths)
                    setActive(active)
                })

                marker.getElement().addEventListener('mouseenter', () => {
                    popup
                    .setLngLat([long, lat])
                    .setHTML(
                        `<img style="width: 100%" src=${flag} alt="flag"/> 
                        <h1 style="text-align:center; color: #fcfcfc">${country}</h1>
                    `)
                    .addTo(map)
                })

                marker.getElement().addEventListener("mouseleave", () => {
                    popup.remove()
                })
            })
        }
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