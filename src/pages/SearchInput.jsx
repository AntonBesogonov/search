import { useEffect, useState } from "react";
import axios from 'axios';
import '../style/MainPage.scss';
import searchIcon from '../icon/iconSearch.svg';
import clearIcon from '../icon/inputClose.svg';
import spinner from '../icon/spinner.gif';

export function PeopleSearch() {

	const [valueInput, setValueInput] = useState('');
	const [results, setResults] = useState([]);
	const [timeoutId, setTimeoutId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [placeholder, setPlaceholder] = useState('search for people');
	const [engRusOutput, setEnglishOutput] = useState('');

	async function searchPeople(search) {
		try {
			if (search) {
				setLoading(true);
				const res = await axios.get(`https://swapi.dev/api/people/`, {
					params: {
						search
					}
				});
				setResults(res.data.results);
			}
		} catch (error) {
			setValueInput('');
			setPlaceholder('data retrieval error');
			setLoading(false);
			setEnglishOutput('');
		} finally {
			setLoading(false);
			setEnglishOutput('');
		}
	}

	function transliterate(text) {
		const transliterationMap = {
			а: 'a',
			б: 'b',
			в: 'v',
			г: 'g',
			д: 'd',
			е: 'e',
			ё: 'yo',
			ж: 'zh',
			з: 'z',
			и: 'i',
			й: 'y',
			к: 'k',
			л: 'l',
			м: 'm',
			н: 'n',
			о: 'o',
			п: 'p',
			р: 'r',
			с: 's',
			т: 't',
			у: 'u',
			ф: 'f',
			х: 'h',
			ц: 'ts',
			ч: 'ch',
			ш: 'sh',
			щ: 'sch',
			ъ: '',
			ы: 'y',
			ь: '',
			э: 'e',
			ю: 'yu',
			я: 'ya',
		};

		const transliteratedText = text
			.toLowerCase()
			.split('')
			.map((char) => transliterationMap[char] || char)
			.join('');

		return transliteratedText;
	}

	function handleInputChange(event) {
		const { value } = event.target;
		setValueInput(value);
		const englishText = transliterate(value);
		setEnglishOutput(englishText);
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter' && valueInput) {
			searchPeople(valueInput);
		}
	}

	useEffect(() => {
		if (engRusOutput) {
			clearTimeout(timeoutId);
			const timeout = setTimeout(() => {
				searchPeople(engRusOutput);
			}, 500);
			setTimeoutId(timeout);
		} else {
			setResults([]);
		}
	}, [valueInput]);

	function inputClear() {
		if (valueInput) {
			setValueInput('');
			setResults([]);
		}
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

	return (
		<div className="container">
			<div className="searchBox">
				<span className="icon search">
					{loading ? <img src={spinner} className="animatedIcon spinner" /> : <img className="animatedIcon" src={searchIcon} />}
				</span>
				<input
					className="inputSearch"
					onChange={handleInputChange}
					onKeyDown={handleKeyPress}
					value={valueInput}
					placeholder={placeholder}
				/>
				<span className="icon clear" onClick={inputClear}>
					{valueInput ? <img className="animatedIcon" src={clearIcon} /> : null}
				</span>
			</div>
			{results.length > 0 && <ul className="dropDown">{renderDropdown()}</ul>}
		</div>
	)
}