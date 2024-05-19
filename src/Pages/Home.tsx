import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';

import Button from '../components/Button';
import Filter from '../components/Filter';
import ThemeSelector from '../components/ThemeSelector';

type TodoType = {
	id: number;
	title: string;
	completed: boolean;
};
interface ITodo {
	task: TodoType;
	onPress: (id: TodoType['id']) => void;
	onLongPress: (id: TodoType['id']) => void;
}

const TodoTask = (props: ITodo) => {
	const { id, title, completed } = props.task;
	const { onPress, onLongPress } = props;
	const style = completed ? 'line-through' : '';

	const deleteTask = (id: TodoType['id']) => {
		onLongPress(id);
	};

	return (
		<View
			className={`flex flex-row justify-between m-1 border border-green-500 ${style}`}
		>
			<Text
				className="self-center p-2 bg-yellow-50"
				onPress={() => onPress(id)}
			>
				{title}
			</Text>
			<Button
				text="Delete"
				onPress={() => deleteTask(id)}
				style="bg-red-500 w-20"
				textStyle="text-white"
			/>
		</View>
	);
};

export default function HomePage() {
	const [task, setTask] = useState<TodoType['title']>('');
	const [tasks, setTasks] = useState<TodoType[]>([]);

	const handleTask = (value: string) => setTask(value);

	const toggleTask = (id: TodoType['id']) => {
		console.log(id);
		setTasks([
			...tasks.map((t) => (id === t.id ? { ...t, completed: !t.completed } : t))
		]);
	};

	const deleteTask = (id: TodoType['id']) => {
		setTasks([...tasks.filter((t) => id !== t.id)]);
	};

	const addTask = () => {
		if (task === '') return;

		const newTask: TodoType = {
			id: tasks.length,
			title: task,
			completed: false
		};
		setTasks([...tasks, newTask]);
		setTask('');
	};

	return (
		<View className="h-full bg-yellow-100 dark:bg-slate-800">
			<Text className="text-black font-bold self-center mt-8">Todo App</Text>
			<TextInput
				className="p-1 m-2 border border-green-500"
				onChangeText={handleTask}
				value={task}
				placeholder="Insert a Task"
				keyboardType="default"
			/>
			<Button
				onPress={addTask}
				text="Add Task"
			/>
			{tasks.map((task, index) => (
				<TodoTask
					key={index}
					task={task}
					onPress={toggleTask}
					onLongPress={deleteTask}
				/>
			))}
			{/* <StatusBar
				// style="auto"
				translucent={true}
			/> */}
			<Filter />
			<ThemeSelector />
		</View>
	);
}
