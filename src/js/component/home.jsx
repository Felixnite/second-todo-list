import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState({ label: "", done: false },)
	const [todos, setTodos] = useState([])



	const deleteTask = (id) => {
		let newArray = todos.filter((item, index) => index !== id);
		setTodos(newArray);
	}
	const addTask = () => {

		fetch("https://playground.4geeks.com/apis/fake/todos/user/naoli")
			.then((response) => response.json())
			.then((data) => setTodos(data));
	}
	useEffect
		(() => {
			addTask();
		}, []);

	function updateList(updatedList) {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/naoli", {
			method: "PUT",
			body: JSON.stringify(updatedList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				return resp.json();
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return (
		<div className="container">
			<h1> My To-Do List </h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setTodos(todos.concat(inputValue));
								setInputValue("");
							}
						}}
						placeholder="Ingresa la tarea"
					/>
				</li>
				{todos.map((item, index) => (
					<li key={item.label} className="item">
						<span>
							<i className="fas fa-trash" onClick={() => deleteTask(index)}></i>
							{item.label}
						</span>
					</li>

				))}


			</ul>
		</div>
	);
};

export default Home;
