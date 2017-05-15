import NavBar from './../NavBar/NavBar';

export default function({ children }) {
    return <div>
        <NavBar/>
        <main>
            {children}
        </main>
    </div>
}