import Header from "./components/Header";
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
    <div className=" dark">
      <div className='app'>

      <Header />
      <Routes>
      <Route path='' element={<Dashboard />} />
      {/* <Route path='/note/:id' element={<NotePage />} /> */}
            
   </Routes>
      </div>
   </div>
   </Router>
  );
}

export default App;
