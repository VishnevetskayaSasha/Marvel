import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages"; // ищет поумолчанию index.js


// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));
// marvelService.getCharacterById(1011052).then(res => console.log(res));

const App = () => { 
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;