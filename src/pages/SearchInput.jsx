import { useEffect, useState } from "react";
import axios from 'axios';
import '../style/MainPage.scss';
import searchIcon from '../icon/iconSearch.svg'
import clearIcon from '../icon/inputClose.svg'

export function PeopleSearch() {

	const [value, setValue] = useState('')
	const [results, setResults] = useState([])

	useEffect(() => {
		if (value) {
			searchPeople(value)
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
		return results.map(people => (
			<li
				key={people.url}
				onClick={() => { window.open(people.url) }}
			>
				{people.name}</li>
		))
	}

	function inputClear() {
		if (value) {
			setValue('')
			setResults([])
		}
	};

	return (
		<div>
			<span className="icon search"><img src={searchIcon} onClick={searchPeople} /></span>
			<input
				className="inputSearch"
				onChange={changeHandler}
				value={value}
				placeholder="search for people"
			/>
			<span className="icon clear">{value ? <img style={{ opacity: '0.3' }} src={clearIcon} onClick={inputClear} /> : null}</span>
			{results.length > 0 && <ul className="drop">
				{renderDropdown()}
			</ul>}
		</div>
	)
}
