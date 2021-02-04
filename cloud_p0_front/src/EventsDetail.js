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

			</div>
		);
	}
}

export default EventsDetail;