import Header from "./components/Header/Header.tsx";
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import PageNotFound from "./containers/PageNotFount/PageNotFount.tsx";
import CategoriesControl from "./containers/CategoriesControl/CategoriesControl.tsx";



const App = () => (
    <>
        <Header/>
        <Container maxWidth="lg">
            <Routes>
                <Route path="/" element={(<Home/>)}/>
                <Route path="/categories" element={(<CategoriesControl/>)}/>

                <Route path="*" element={(<PageNotFound/>)}/>
            </Routes>
        </Container>
    </>
);

export default App
