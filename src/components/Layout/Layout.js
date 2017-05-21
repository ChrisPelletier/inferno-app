import Component from 'inferno-component';
import NavBar from './../NavBar/NavBar';

class Layout extends Component {
    render(props, state) {
        return (
            <div>
                <NavBar/>
                <main>
                    <div className="App-content">
                        {props.children}
                    </div>
                </main>
            </div>
        );
    }
}

export default Layout;