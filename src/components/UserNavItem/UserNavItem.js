import { Link } from 'inferno-router';
import Component from 'inferno-component';
import './UserNavItem.css';

class UserNavItem extends Component {
	render(props) {
		let profile = props.profile;
		let idp = profile.sub.split('|')[0];
		
		return (
			<Link to="/user" className="User-nav-item" title={idp}>
				<img className="img-circle" src={profile.picture} alt={profile.name} />
				<span>{profile.name}</span>
			</Link>
		)
	}
}

export default UserNavItem;