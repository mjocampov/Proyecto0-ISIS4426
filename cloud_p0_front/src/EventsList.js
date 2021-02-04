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



    renderEvents() {
		return this.state.events.map((event, i) => {
			return (
				<div className="col" key={i}>
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
					<Link to="/createevent">
						<button
							type="submit"
							className="btn btn-primary mb-2">
							Crear evento
						</button>
					</Link>
				</div>
				<div className="row row-cols-1 row-cols-md-2 g-4">
					{this.renderEvents()}
				</div>
			</div>
		);
	}
}

export default EventsList;