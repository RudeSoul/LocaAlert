import React from 'react';

// import HomePage from './src/Pages/Home';
import HomePage from '@Pages/Home';
import MyStatusBar from '@Components/MyStatusBar';
import './assets/css/output.css';
export default function App() {
	return (
		<>
			<HomePage />
			<MyStatusBar />
		</>
	);
}

