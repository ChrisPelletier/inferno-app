import NavBar from './../NavBar/NavBar';

export default function({ children }) {
    return <div>
        <NavBar/>
        <main>
            <div className="App-content">
                {children}
            </div>
        </main>
    </div>
}