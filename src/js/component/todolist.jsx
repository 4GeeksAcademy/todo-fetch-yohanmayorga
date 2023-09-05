import React, { useEffect, useState } from "react";

const URL = "https://playground.4geeks.com/apis/fake/todos/user/yohanmayorga"

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	const handleAddTodo = (e) => {
		if (e.key === "Enter") {
			if (newTodo.trim() !== "") {
				setTodos([...todos, { text: newTodo.trim(), done: false }]);
				setNewTodo("");

				// CARGA LA FUNCIÓN UPDATE LIST
				updateList()
			};
		};
	};

	const handleDeleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
		deleteElement(index);
	}

	const done = () => {
		setTodos([])
		deleteUser()
	}

	// CODIGO FETCH

	useEffect(() => {
		fetch(URL)
			.then((response) => {
				if (!response.ok) {
					createUser()
				}
			})
			.catch((error) => console.log(error))
	})

	// Método GET (obener listado)
	const getList = () => {
		fetch(URL)
			.then((response) => response.json())
			.then((json) => console.log(json))
			.catch((error) => console.log(error))
	}

	// Método POST (crear usuario)
	const createUser = () => {
		fetch(URL, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json))
			.catch((error) => console.log(error))
	}

	// Método PUT (actualizar listado)
	const updateList = () => {
		fetch(URL, {
			method: "PUT",
			body: JSON.stringify(
				[...todos, { text: newTodo.trim(), done: false }]
			),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((response) => { getList() })
			.catch((error) => console.log(error))
	}

	// Método PUT (borrar elemento)
	const deleteElement = (index) => {
		const updatedTodos = todos.filter((todo, i) => i !== index);

		fetch(URL, {
			method: "PUT",
			body: JSON.stringify(
				updatedTodos
			),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((response) => { getList() })
			.catch((error) => console.log(error))
	}

	// Método DELETE (borrar usuario)
	const deleteUser = () => {
		fetch(URL, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json))
			.catch((error) => console.log(error))
	}

	return (
		<>
			<div id="container">
				<h1>To Do List</h1>
				<input type="text" placeholder="What needs to be done?" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={handleAddTodo}></input>
				<ul id="fullTodoList">
					{todos.map((todo, index) => (
						<li id="todoitem" key={index}>{todo.text}<p id="deleteTask" onClick={() => handleDeleteTodo(index)}>X</p></li>
					)
					)}
				</ul>
				<div id="itemsCount">
					{todos.length ? todos.length + " items left" : "No tasks"}
				</div>
				<div>
					{todos.length > 1 ? <button onClick={done} id="doneButton">Mark all as done</button> : ""}
				</div>
				<p id="creator">Made by Yohan Mayorga for 4Geeks Academy</p>

			</div>
			<div id="container2"></div>
			<div id="container3"></div>
		</>
	);
}

export default TodoList;
