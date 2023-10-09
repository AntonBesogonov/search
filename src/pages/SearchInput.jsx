import { useEffect, useState } from "react";
import axios from 'axios';



export function PeopleSearch() {
	const [value, setValue] = useState('')
	const [results, setResults] = useState([])
	const [dropdown, setDropdown] = useState(false)
	console.log(results)
	useEffect(() => {
		if (value) {
			searchPeople(value).then(() => setDropdown(true))
		}

	}, [value])

	async function searchPeople(search) {
		const res = await axios.get(`https://swapi.dev/api/people/`, {
			params: {
				search
			}
		})
		setResults(res.data.results)
	}

	function changeHandler(event) {
		setValue(event.target.value)
	}

	function renderDropdown() {
		if (results.length === 0) {
			return <p >Нет результатов по вашему запросу</p>
		}

		return results.map(people => (

			<li
				key={people.id}				
				/* onClick={() => { people.url }} */
			>
				{people.name}</li>
		))
	}

	return (
		<div className="mb-4 relative">
			<input
				className="border px-4 py-2 w-full outline-0 h-[42px]"
				type="text"
				onChange={changeHandler}
				value={value}
				placeholder="Search for people..."
			/>

			{dropdown && <ul>
				{renderDropdown()}
			</ul>}
		</div>
	)
}
