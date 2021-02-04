import React from 'react';
import {Link} from "react-router-dom";

class CreateEvent extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
		}

		this.handleAddEvent = this.handleAddEvent.bind(this);
	}

    handleAddEvent() {
        const name = document.getElementById('name').value;
		const place = document.getElementById('place').value;
		const address = document.getElementById('address').value;
		const initialDate = document.getElementById('initialDate').value;
		const endDate = document.getElementById('endDate').value;
		const initialHour = document.getElementById('initialHour').value;
		const endHour = document.getElementById('endHour').value;
		const type = document.getElementById('type').value;
		const category = document.getElementById('category').value;

		if (name !== null && place !== null && address!== null && initialDate !== null && endDate !== null && initialHour !== null && endHour !== null && type !== null && category !== null) {
		    let formData = new FormData();
            formData.append('name', name);
            formData.append('category', category);
            formData.append('place', place);
            formData.append('address', address);
            formData.append('initial_date', initialDate+"T"+initialHour);
            formData.append('end_date', endDate+"T"+endHour);
            formData.append('type', type);

            fetch(this.props.backURL + "/events", {
                method: "POST",
                headers: {"Authorization": 'Bearer ' + this.props.token},
                body: formData,
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        return(
            <div className="CreateEvent">
                <h3>Crear evento</h3>
                <hr/>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input type="text" className="form-control-sm" id="name"
                               aria-describedby="name" required={true} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Categoría</label>
                         <select id="category" className="form-select form-select-sm" aria-label="Default select example">
                            <option selected={true} value="CONFERENCIA">CONFERENCIA</option>
                            <option value="SEMINARIO">SEMINARIO</option>
                             <option value="CONGRESO">CONGRESO</option>
                            <option value="CURSO">CURSO</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="place" className="form-label">Lugar</label>
                        <input type="text" className="form-control-sm" id="place" required={true} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <input type="text" className="form-control-sm" id="address" required={true} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="initialDate" className="form-label">Fecha y hora de inicio: </label>
                        <input type="date" className="form-control-sm" id="initialDate" required={true} />
                        <input type="time" className="form-control-sm" id="initialHour" required={true} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">Fecha y hora de fin</label>
                        <input type="date" className="form-control-sm" id="endDate" required={true} />
                        <input type="time" className="form-control-sm" id="endHour" required={true} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Tipo</label>
                        <select id="type" className="form-select form-select-sm" aria-label="Default select example">
                            <option selected={true} value="VIRTUAL">VIRTUAL</option>
                            <option value="PRESENCIAL">PRESENCIAL</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success mb-2"
                        onClick={this.handleAddEvent}>
                        Crear evento
                    </button>
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

export default CreateEvent;