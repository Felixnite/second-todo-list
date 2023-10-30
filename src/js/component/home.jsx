import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
let URL_BASE= "https://playground.4geeks.com/apis/fake/todos/user/naoli"
//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState({ label: "", done: false },)
	const [todos, setTodos] = useState([])



	const deleteTask = async(id) => {
		let newArray = todos.filter((item, index) => index !== id);
	 try {
		let response = await fetch(URL_BASE, {
			method : "PUT",
			headers :{
				"Content-Type" : "application/json"
			},
			body : JSON.stringify(newArray)
		})
		if(response.ok){getTask()}
	 } catch (error) {
		console.log(error)
		
	 }	
	}
	const handleChange = (event) => {
		setInputValue({
			...inputValue, 
			label : event.target.value
		})
	}
	const getTask = async() => {
		try {
			let response = await fetch(URL_BASE)
			if (response.ok){
				let data = await response.json()
				setTodos (data)
			}
			if (response.status == 404){
				createUser()
			}

		} catch(error){
			console.log(error)
		}
		
			
	}
	const createUser = async() => {
		try {
			let response = await fetch(URL_BASE, {
				method: "POST", 
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			})
			if(response.ok){
				getTask()
			}
		} 
		catch(error){
			console.log(error)
		}
	}
	

	async function updateList(event) {
		if (event.key == "Enter") {
			try {
				let response = await fetch(URL_BASE, {
					method : "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body : JSON.stringify([...todos, inputValue])
				})
				if (response.ok) {
					getTask()
					setInputValue({
						label: "", done: false
					})
				}
			} catch (error) {
				console.log(error)
			}
		}
	
	}
	const deleteAllTasks = async () => {
		try {
			let response = await fetch(URL_BASE, {
				method: "DELETE"

			})
			if (response.ok) {
				getTask()
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect
		(() => {
			getTask();
		}, []);
	return (
		<div className="container">
			<h1> My To-Do List </h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={handleChange}
						value={inputValue.label}
						onKeyDown={updateList}
						placeholder="Ingresa la tarea"
					/>
				</li>
				{todos.map((item, index) => (
					<li key={item.label} className="item">
						<span className="task">
							{item.label}
							<i className="fas fa-trash" onClick={() => deleteTask(index)}></i>
						</span>
					</li>

				))}


			</ul>
			<p>
			{todos.length > 0 ? `There are ${todos.length} tasks` : 'There are no tasks'}
			</p>
			<p>
				<button className= "btn btn-danger mt-5" onClick= {() => deleteAllTasks()}>Delete All</button>
			</p>
		</div>
	);
};

export default Home;
