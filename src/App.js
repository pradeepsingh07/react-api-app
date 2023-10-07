import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {Route,Router,Routes} from "react-router-dom";
import Allmyuser from "./Allusers";
import Adduser from "./Adduser";



function App() {

return(
<>

<Routes>  
  <Route exact path="/" Component={Allmyuser}/>
  <Route exact path="/Adduser" Component={Adduser}/>
</Routes>

</>

)



}

export default App;
