import React from "react"

class MemeGenerator extends React.Component {
	constructor(){
		super()
		this.state = {
			topText: "",
			bottomText: "",
			randomImg: "https://i.imgflip.com/26br.jpg",
			allMemeImgs: []
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		fetch("https://api.imgflip.com/get_memes").then(response => response.json()).then(
			response => 
				this.setState(
					{
						allMemeImgs: response.data.memes
					}
			))
	}
	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]:value})
	}
	handleSubmit(event){
		event.preventDefault()
		const imgArr = this.state.allMemeImgs
		const randUrl = imgArr[Math.floor(Math.random()*imgArr.length)].url
		this.setState({randomImg: randUrl})
	}
	render(){
		return (
			<div>
				<form className="meme-form" onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						name="topText" 
						value={this.state.topText}
						placeholder="Top text"
						onChange={this.handleChange}
					/>
					<input 
						type="text" 
						name="bottomText" 
						value={this.state.bottomText}
						placeholder="Bottom text"
						onChange={this.handleChange}
					/>
					<button>Gen</button>
				</form>
				<div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
			</div>
		)
	}
}

export default MemeGenerator