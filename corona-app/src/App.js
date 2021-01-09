import React, {useEffect, useState} from 'react'
import Map from './components/Map'

const App = () => {

	const [coronaData, setCoronaData] = useState({})

	useEffect(() => {
		fetch("https://corona.lmao.ninja/v2/countries")
			.then(response => response.json())
			.then(data => {
				setCoronaData(data)
			})
			.catch((error) => {
				console.log(error)
			})
	},[])

	return (
		<Map
			data={coronaData}
		/>
	)
}

export default App
