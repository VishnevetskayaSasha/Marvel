import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404 } from "../pages"; // ищет поумолчанию index.js


// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));
// marvelService.getCharacterById(1011052).then(res => console.log(res));

const App = () => { 
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;