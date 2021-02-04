import React from 'react';
import {Link} from "react-router-dom";

class EventsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			events:[],
			modal: false,
		}

		this.renderEvents = this.renderEvents.bind(this);
		this.handleAddEvent = this.handleAddEvent.bind(this);
	}

	toggle() {
		if(this.state.modal === true) this.setState({modal: false});
		else this.setState({modal: true});
	}

	componentDidMount() {
	    fetch(this.props.backURL+"/events", {
			  method: "GET",
			  headers: {"Authorization": 'Bearer ' + this.props.token}
			})
			.then(response => response.json())
			.then(json => {
				this.setState({
					events:json
				});
				console.log(json);
			})
			.catch(err => console.log(err));
    }

    handleAddEvent() {
	    fetch(this.props.backURL+"/events", {
			  method: "POST",
			  headers: {"Authorization": 'Bearer ' + this.props.token}
			})
			.then(response => response.json())
			.then(json => {
				const temp_events = {...this.state.events};
				temp_events.add(json);
				this.setState({
					events:temp_events,
				});
				console.log(json)
			})
			.catch(err => console.log(err));
    }

    renderEvents() {
		this.state.events.map((event, id) => {
			return (
				<div className="col">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">{event.name}</h5>
							<p className="card-subtitle">{event.category}</p>
							<p className="card-text"> Lugar: {event.place}</p>
							<Link to={"/eventdetail/"+event.id}> <a href="#" className="card-link">Ver más</a> </Link>
						</div>
					</div>
				</div>
			);
		})
    }


    render() {
		return (
			<div className="EventsList">
				<div className="row">
					<button
						type="submit"
						className="btn btn-primary mb-2"
						onClick={this.toggle}>
						Crear evento
					</button>
				</div>
				<div className="row row-cols-1 row-cols-md-2 g-4">
					{this.renderEvents()}
				</div>
				<div id="modal_aside_right" className="modal fixed-left fade" tabIndex="-1" role="dialog">
				  <div className="modal-dialog modal-dialog-aside" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title">Crear evento</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
						<form>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">Nombre</label>
								<input type="text" className="form-control" id="name"
									   aria-describedby="emailHelp" required={true}> </input>
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">Password</label>
								<input type="password" className="form-control" id="password" required={true}> </input>
							</div>
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
						</form>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.toggle}>Cerrar</button>
				        <button type="button" className="btn btn-success" onClick={this.handleAddEvent}>Crear evento</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}

export default EventsList;