import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import Galeria from "./Galeria"


const Inicio = () => {
    return (
        <div>
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/photos'>
                    <Galeria/>
                </Route>
            </Switch>
        </BrowserRouter>
        

        </div>
    );
};

export default Inicio;