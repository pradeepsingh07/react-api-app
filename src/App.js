import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {Route,Router,Routes,useParams} from "react-router-dom";
import Allmyuser from "./Allusers";
import Adduser from "./Adduser";
import Edituser from "./Useredit";




function App() {

return(
<>

<Routes>  
  <Route exact path="/" Component={Allmyuser}/>
  <Route exact path="/Adduser" Component={Adduser}/>
  <Route exact path="/Useredit/:id" Component={Edituser}/>
</Routes>

</>

)



}

export default App;
