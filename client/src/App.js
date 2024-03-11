import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateRecipies from "./pages/CreateRecipies";
import SavedRecipies from "./pages/SavedRecipies";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/create-recipies" element={<CreateRecipies/>}/>
          <Route path="/saved-recipies" element={<SavedRecipies/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
