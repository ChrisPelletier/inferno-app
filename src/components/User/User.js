import Component from 'inferno-component';
import AuthService from './../../utils/AuthService';

class User extends Component {
	constructor() {
		super();

		this.state = {
			profile: AuthService.getProfile()
		};
	}

	render(props, state) {
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="panel panel-default">
  						<div className="panel-heading">User Profile</div>
  						<div className="panel-body">
    						<div className="row">
								<div className="col-xs-3">
									<img className="img-thumbnail" 
										 src={state.profile.picture} 
										 alt={state.profile.name} />
								</div>
								<div className="col-xs-9">
									<div className="row">
										Name: {state.profile.name}
									</div>
									<div className="row">
										Nickname: {state.profile.nickname}
									</div>
									<div className="row">
										Last Updated: {state.profile.updated_at}
									</div>
								</div>
							</div>
  						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default User;