import React from 'react';
import {Link} from "react-router-dom";

class EventsDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			eventId:this.props.match.params.eventId,
			event: {},
		}

		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
	    fetch(this.props.backURL+"/events/"+this.state.eventId, {
			  method: "GET",
			  headers: {"Authorization": 'Bearer ' + this.props.token}
			})
			.then(response => response.json())
			.then(json => {
				this.setState({
					event: json,
				});
				console.log(json);
			})
			.catch(err => console.log(err));
    }

    handleUpdate() {
	    const name = document.getElementById('name').value;
		const place = document.getElementById('place').value;
		const address = document.getElementById('address').value;
		const initialDate = document.getElementById('initialDate').value;
		const endDate = document.getElementById('endDate').value;
		const initialHour = document.getElementById('initialHour').value;
		const endHour = document.getElementById('endHour').value;
		const type = document.getElementById('type').value;
		const category = document.getElementById('category').value;

		let formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('place', place);
        formData.append('address', address);
        formData.append('initial_date', initialDate+"T"+initialHour);
        formData.append('end_date', endDate+"T"+endHour);
        formData.append('type', type);

        fetch(this.props.backURL+"/events/"+this.state.event.id, {
			  method: "PUT",
			  headers: {"Authorization": 'Bearer ' + this.props.token},
              body: formData,
			})
			.then(response => response.json())
			.then(json => {
				this.setState({
					event: json,
				});
				console.log(json);
			})
			.catch(err => console.log(err));
    }

    handleDelete() {
        fetch(this.props.backURL+"/events/"+this.state.event.id, {
			  method: "DELETE",
			  headers: {"Authorization": 'Bearer ' + this.props.token}
			})
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(err => console.log(err));
    }


    render() {
        return(
            <div className="CreateEvent">
                <h3>Ver detalle y editar evento</h3>
                <hr/>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input type="text" className="form-control-sm" id="name"
                               aria-describedby="name" required={true} defaultValue={this.state.event.name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Categoría</label>
                         <select id="category" className="form-select form-select-sm" aria-label="Default select example">
                            <option selected={this.state.event.category === "CONFERENCIA"? true: false} value="CONFERENCIA">CONFERENCIA</option>
                            <option selected={this.state.event.category === "SEMINARIO"? true: false} value="SEMINARIO">SEMINARIO</option>
                             <option selected={this.state.event.category === "CONGRESO"? true: false} value="CONGRESO">CONGRESO</option>
                            <option selected={this.state.event.category === "CURSO"? true: false} value="CURSO">CURSO</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="place" className="form-label">Lugar</label>
                        <input type="text" className="form-control-sm" id="place" required={true} defaultValue={this.state.event.place}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <input type="text" className="form-control-sm" id="address" required={true} defaultValue={this.state.event.address}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="initialDate" className="form-label">Fecha y hora de inicio: </label>
                        <input type="date" className="form-control-sm" id="initialDate" required={true} defaultValue={this.state.event.initial_date}/>
                        <input type="time" className="form-control-sm" id="initialHour" required={true} defaultValue={this.state.event.initial_date}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">Fecha y hora de fin</label>
                        <input type="date" className="form-control-sm" id="endDate" required={true} />
                        <input type="time" className="form-control-sm" id="endHour" required={true} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Tipo</label>
                        <select id="type" className="form-select form-select-sm" aria-label="Default select example">
                            <option selected={this.state.event.type === "VIRTUAL"? true: false} value="VIRTUAL">VIRTUAL</option>
                            <option selected={this.state.event.type === "PRESENCIAL"? true: false} value="PRESENCIAL">PRESENCIAL</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success mb-2"
                        onClick={this.handleUpdate}>
                        Guardar cambios
                    </button>
					<Link to="/eventslist"><button
                        type="submit"
                        className="btn btn-danger mb-2"
                        onClick={this.handleDelete}>
                        Eliminar
                    </button></Link>
                    <Link to="/eventslist">
                        <button
                        type="submit"
                        className="btn btn-primary mb-2">
                        Volver al listado
                    </button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default EventsDetail;