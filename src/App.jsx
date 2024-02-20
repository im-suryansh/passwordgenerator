import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
	const [length, setLength] = useState(8);
	const [number, setNumber] = useState(false);
	const [special, setSpecial] = useState(false);
	const [password, setPassword] = useState("");

	const passwordGenerator = useCallback(() => {
		let tempPassword = "";
		let tempString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (number) tempString += "0123456789";
		if (special) tempString += "!@#$%^&*()_+";
		for (let i = 1; i < length; i++) {
			let char = Math.floor(Math.random() * tempString.length + 1);
			tempPassword += tempString.charAt(char);
		}
		setPassword(tempPassword);
	}, [length, number, special, setPassword]);

	const passwordRef = useRef(null);

	const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    
    window.navigator.clipboard.writeText(password);
  }, [password]);


	useEffect(() => {
		passwordGenerator();
	}, [length, number, special, passwordGenerator]);

	return (
		<div className="App">
			<h1 className="text-4xl text-center text-cyan-200">
				{" "}
				Password Generator
			</h1>
			<div className="w-full max-w-md mx-auto p-4 m-5 text-orange-400 bg-gray-800">
				<div className="flex shadow rounded-lg overflow-hidden mb-4">
					<input
						type="text"
						value={password}
						className="outline-none w-full p-2"
						placeholder="password"
						readOnly
						ref={passwordRef}
					/>
					<button
						className="outline-none bg-orange-400 text-white px-3 py-0.5 shrink-0"
						onClick={copyPasswordToClipboard}
            
					>
						copy
					</button>
				</div>
				<div className="flex text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={8}
							max={24}
							value={length}
							onChange={(e) => setLength(e.target.value)}
							className="cursor-pointer"
						/>
						<label> Lenght: {length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							checked={number}
							onChange={(e) => setNumber(e.target.checked)}
						/>
						<label> Number</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							checked={special}
							onChange={(e) => setSpecial((prev) => !prev)}
						/>
						<label> Special</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
