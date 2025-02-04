import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404, SingleComicLayout, SingleCharacterLayout, SinglePage } from "../pages"; // ищет поумолчанию index.js


// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));
// marvelService.getCharacterById(1011052).then(res => console.log(res));

const App = () => { 
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/Marvel" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route 
                            path="/comics/:id" 
                            element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                        <Route 
                            path="/characters/:id" 
                            element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;