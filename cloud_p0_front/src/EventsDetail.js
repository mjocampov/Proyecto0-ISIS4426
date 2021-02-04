import React from 'react';

class EventsDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			eventId:this.props.match.params.eventId,
		}
	}

	componentDidMount() {
	    fetch(this.props.backURL+"/events/"+this.state.eventId, {
			  method: "GET",
			  headers: {"Authorization": 'Bearer ' + this.props.token}
			})
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(err => console.log(err));
    }

    handleUpdate() {
        fetch(this.props.backURL+"/events/<event_id>", {
			  method: "PUT",
			  headers: {"Authorization": 'Bearer ' + this.props.token}
			})
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(err => console.log(err));
    }

    handleDelete() {
        fetch(this.props.backURL+"/events/<event_id>", {
			  method: "DELETE",
			  headers: {"Authorization": 'Bearer ' + this.props.token}
			})
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(err => console.log(err));
    }


    render() {
		return (
			<div className="EventDetail">
				<div className="container-sm card">
					<div className="row">
						<div className="col-md-6">
							Correo electrónico
						</div>
						<div className="col-md-6">
							<input type="text"
								id="email"
								className="form-control">
							</input>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							Contraseña
						</div>
						<div className="col-md-6">
							<input type="password"
								id="password"
								className="form-control">
							</input>
						</div>
					</div>
					<div className="row justify-content-center">
						<button
							type="submit"
							className="btn btn-primary mb-2"
							onSubmit={this.handleLogIn}>
                            Iniciar sesión
						</button>
                        <button
							type="submit"
							className="btn btn-primary mb-2"
							onSubmit={this.handleSingUp}>
                            Registrarse
						</button>
					</div>
					<div className="row justify-content-center">
						<p className="error">{this.state.msg !== "OK" ? this.state.msg : ""}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default EventsDetail;