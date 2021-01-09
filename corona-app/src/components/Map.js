import React, {useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl'
import InfoHeader from './InfoHeader'

mapboxgl.accessToken = "pk.eyJ1IjoibGVob3VkaW5pIiwiYSI6ImNram43b3FhZTNzYWUydnNjd21zcmJ1d2QifQ.ouLhKn6B6pzmbZJtymQIcg"

const Map = ({data}) => {

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
    })

    const addMarkerToMap = async (mapData, map) =>  {
        if(Object.keys(mapData).length) {
            mapData.forEach(el => {
                const {countryInfo, country, cases, population, recovered, deaths} = el
                const {lat, long, flag} = countryInfo
                console.log(el)
                const marker = new mapboxgl.Marker()
                .setLngLat([long, lat])
                .setPopup(new mapboxgl.Popup().setHTML(
                    `<img style="width: 100%" src=${flag} alt="flag"/> <h1 style="text-align:center; color: #fcfcfc">${country}</h1>
                    <p>Population: ${population}</p>
                    <p>Number of cases: ${cases}</p>
                    <p>Deaths: ${deaths}
                    <p>Recovered: ${recovered}</p>
                `))
                .addTo(map)
                marker.getElement().addEventListener('click', () => {
                    alert(country)
                })
            })
        }
    }

    return(
        <div className="map-wrapper">
            <InfoHeader/>
            <div className="map-container" ref={mapRef}>

            </div>
        </div>
    )
}

export default Map