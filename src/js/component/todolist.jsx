import React, { useState } from "react";

const TodoList2 = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	const handleAddTodo = (e) => {
		if (e.key === "Enter") {
			if (newTodo.trim() !== "") {
				setTodos([...todos, { text: newTodo.trim(), checked: false }]);
				setNewTodo("");
			};
		};
	};

	const handleDeleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	}

	const done = () => {
		setTodos([]);
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

export default TodoList2;
