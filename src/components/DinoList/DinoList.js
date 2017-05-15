// eslint-disable-next-line
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from './../../utils/ApiService';
import Loading from './../Loading/Loading';
import DinoDetail from './../DinoDetail/DinoDetail';
import './DinoList.css';

function getDinoById(obj) {
	const id = obj.id;
	const instance = obj.instance;

	instance.setState({
		loading: true,
		active: id
	});

	ApiService.getDino(id)
		.then(
			res => {
				instance.setState({
					detail: res,
					loading: false,
					error: false
				})
			},
			error => {
				instance.setState({
					error: true,
					loading: false
				})
			}
		);
}

class DinoList extends Component {
	constructor () {
		super();

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
	    ApiService.getDinoList()
	      .then(
	        (res) => {
	          this.setState({
	            dinos: res
	          });
	        },
	        (err) => {
	          this.setState({
	            error: err
	          });
	        }
	      );
	  }

	render(props, state) {
		return (
			<div className="App-content">
				<div className="DinoList">
			        <div className="col-sm-3">
			        	<ul className="DinoList-list">
			            	{
			            		state.dinos ? (
				              		state.dinos.map((dino) => (
				                		<li key={dino.id}>
					                  		<a className={state.active === dino.id ? 'active' : ''}
					                    	   onClick={linkEvent({id: dino.id, instance: this}, getDinoById)}>
					                    		{dino.name}
					                  		</a>
				                		</li>
				              		))
				              	) : ("")
			            	}
			          	</ul>
			        </div>
			        <div className="col-sm-9">
			        	{
			            	!state.loading && !state.error ? (
			            		<DinoDetail dino={state.detail} />
			            	) : (
			            		<Loading error={state.error} />
			            	)
			          	}
			        </div>
			    </div>
			</div>
		);
	}
}

export default DinoList;