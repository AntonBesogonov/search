import { useEffect, useState } from "react";
import axios from 'axios';
import style from '../style/MainPage.module.css';


export function PeopleSearch() {
	const [value, setValue] = useState('')
	const [results, setResults] = useState([])
	const [dropdown, setDropdown] = useState(false)
	const { drop, inputSearch } = style

	useEffect(() => {
		if (value) {
			searchPeople(value).then(() => setDropdown(true))
		} else {
			setResults([])
		}

	}, [value])

	async function searchPeople(search) {
		if (search) {
			const res = await axios.get(`https://swapi.dev/api/people/`, {
				params: {
					search
				}
			})
			setResults(res.data.results)
		}

	}

	function changeHandler(event) {
		setValue(event.target.value)
	}

	function renderDropdown() {
		if (results.length === 0 && value) {
			return <p>Нет результатов по вашему запросу</p>
		}
		return results.map(people => (
			<li
				key={people.url}
				onClick={() => { window.open(people.url) }}
			>
				{people.name}</li>
		))
	}


	return (
		<div>
			<input
				className={inputSearch}
				onChange={changeHandler}
				value={value}
				placeholder="Search for people"
			/>

			{dropdown && <ul className={drop}>
				{renderDropdown()}
			</ul>}
		</div>
	)
}
