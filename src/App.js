import React, {useState, useEffect} from 'react'
import './style.css';
import Die from './Components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import useWindowSize from './useWindowSize'

function App() {

	const [diceArray, setDiceArray] = useState(allNewDice())
	const [tenzies, setTenzies] = useState(false)

	const diceElements = diceArray.map(die => 
		<Die 
			key={nanoid()}
			value={die.value} 
			isHeld={die.isHeld} 
			handleClick={holdDice}
			id={die.id}
		/>
	)

	useEffect(() => {
		let winningNumber = diceArray[0].value

		if (diceArray.every(die => die.isHeld && die.value === winningNumber)) {
			setTenzies(true)
		}
	}, [diceArray])

	function oneNewDice() {
		return {
			value: Math.ceil(Math.random() * 6), 
			isHeld: false,
			id: nanoid()
		}
	}

	function allNewDice() {
		const diceArray = []
		for (let i = 0; i < 10; i++) {
			diceArray.push(oneNewDice())
		}
		return diceArray
	}

	function handleRoll() {
		setDiceArray((prevArray) => {
			return prevArray.map(die =>
				die.isHeld ? die : oneNewDice())
		})
	}

	function holdDice(id) {
		setDiceArray((prevArray) => {
			return prevArray.map(die =>
				die.id === id ? {...die, isHeld: !die.isHeld} : die)
		})
	}

	function newGame() {
		setTenzies(false)
		setDiceArray(allNewDice())
	}

	const { width, height } = useWindowSize()

    return (
		<main>
			{tenzies && <Confetti width={width} height={height} />}
			<div className="background">
				<div className="text-container">
					<h1 className="title">Tenzies</h1>
					<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
				</div>
				<div className="dice-container">
					{diceElements}
				</div>
				<button className="roll btn" onClick={tenzies ? newGame : handleRoll}>{tenzies ? "New Game" : "Roll"}</button>
			</div>
		</main>
	)
}

export default App;
