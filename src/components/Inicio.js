import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import Galeria from "./Galeria"
import SignUp from "./SignUp";
import Notas from "./Notas";


const Inicio = () => {
    return (
        <div>
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path='/sign-in'>
                    <Login/>
                </Route>
                <Route path='/sign-up'>
                    <SignUp/>
                </Route>
                <Route path='/photos'>
                    <Galeria/>
                </Route>
                <Route path='/notes'>
                    <Notas/>
                </Route>
            </Switch>
        </BrowserRouter>
        

        </div>
    );
};

export default Inicio;
