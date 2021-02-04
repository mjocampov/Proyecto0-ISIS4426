import React from 'react';

class LogIn extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			msg:"OK",
		}

		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleSingUp = this.handleSingUp.bind(this);
	}

	handleLogIn(event) {
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		let formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);

		fetch(this.props.backURL+"/login", {
			  method: "POST",
			  body: formData,
			})
			.then(response => response.json())
			.then(json => {
				this.props.setToken(json.token);
				console.log(json);
			})
			.catch(err => console.log(err));
	}

	handleSingUp(event) {
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		let formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);

		fetch(this.props.backURL+"/signup", {
			  method: "POST",
			  body: formData,
			  headers : {
			  	"Access-Control-Allow-Origin": "*"
			  }
			})
			.then(response => response.json())
			.then(json => {

				fetch(this.props.backURL+"/login", {
				  method: "POST",
				  body: formData,
				})
				.then(response => response.json())
				.then(json => {
					this.props.setToken(json.token);
					console.log(json);
				})
				.catch(err => console.log(err));

				console.log(json);
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="LogIn">
				<div className="container-sm card">
					<form>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">Correo electrónico</label>
							<input type="email" className="form-control" id="email"
								   aria-describedby="emailHelp" required={true} />
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">Contraseña</label>
							<input type="password" className="form-control" id="password" required={true} />
						</div>
						<button
							type="submit"
							className="btn btn-primary mb-2"
							onClick={this.handleLogIn}>
                            Iniciar sesión
						</button>
                        <button
							type="submit"
							className="btn btn-primary mb-2"
							onClick={this.handleSingUp}>
                            Registrarse
						</button>
					</form>
					<div className="row justify-content-center">
						<p className="error">{this.state.msg !== "OK" ? this.state.msg : ""}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default LogIn;