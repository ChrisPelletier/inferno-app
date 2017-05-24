// src/components/Loading/Loading.js

// eslint-disable-next-line
import Inferno from 'inferno';
import Component from 'inferno-component';
import loading from './raptor-loading.gif';
import './Loading.css';

class Loading extends Component {
	render(props) {
		return(
			<div className="Loading">
				{
					!props.error ? (
						<img className="Loading-img" src={loading} alt="Loading..." />
					) : (
						<p className="alert alert-danger"><strong>Error:</strong> {props.error}</p>
					)
				}
			</div>
		);
	}
}


export default Loading;