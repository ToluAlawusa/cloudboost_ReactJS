import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

alertPrompt("please enter number of rows");
alertPrompt("please enter number of columns");



class Box extends React.Component {
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col);
	}

	render() {
		return(
			<div 
				className={this.props.boxClass}
				id={this.props.id}
				onClick={this.selectBox}
			/>	
		)
	}
}

class Grid extends React.Component {
	render() {
		const width = (this.props.cols * 52) + 1;

		var rowsArr = [];
		var boxClass = "";

		for (var i = 0; i < this.props.rows; i++) {
			for (var j = 0; j < this.props.cols; j++) {
				let boxId = i + "_" + j;

				boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
				rowsArr.push(
					<Box
						boxClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						col={j}
						selectBox={this.props.selectBox}
					/>
				)
		    }
		}
		return(
			<div className="grid" style={{ width: width}}> 
				{rowsArr}
			</div>

		)
	}
}

class Main extends React.Component {
	constructor(){
		super();
			this.speed = 100;
			this.rows = 10;
			this.cols = 10;

			this.state = {
				score : 0,
				gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
				
			}
	}

	selectBox = (row, col) => {
		
		let gridCopy = arrayClone(this.state.gridFull);
		if (gridCopy[row][col]) {
			gridCopy[row][col] = !gridCopy[row][col];
		}
		this.setState({
			gridFull: gridCopy,
			
		}) 
	}

	seed = () => {
		
		let gridCopy = arrayClone(this.state.gridFull);
		for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
						if (Math.floor(Math.random() * 4) === 1){
							gridCopy[i][j] = true;

						}
				}
		}


		
		this.setState({
			gridFull: gridCopy,
			
		}) 	
	}


	componentDidMount(){
		this.seed();

	}

	render() {
		return(
			<div> 
				<h1> CloudBoost Game </h1>
				<h3> Click on each box containing a mushroom to gather points. </h3>
				<Grid
					
					gridFull={this.state.gridFull}
					cols={this.cols}
					rows={this.rows}
					selectBox={this.selectBox}
				/>
				

			</div>
			
		);
	}
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

function alertPrompt($altprompt) {
	return prompt($altprompt);
}

function showAlert($shwalert) {
	return alert($shwalert);
} 

ReactDOM.render(<Main /> , document.getElementById('root'));
