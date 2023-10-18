import { EthProvider } from "./contexts/EthContext";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import AdministratorComp from "./components/AdministratorComp/AdministratorComp";
import Mechanic from "./components/AdministratorComp/Mechanic";
import MechanicList from "./components/AdministratorComp/MechanicList"
import Client from "./components/AdministratorComp/Client";
import ClientList from "./components/AdministratorComp/ClientList"

import ClientComp from "./components/ClientComp/ClientComp";
import SelectaCar from "./components/ClientComp/SelectaCar";

import MechanicComp from "./components/MechanicComp/MechanicComp";
import AddaCar from "./components/MechanicComp/AddaCar";
import CarsList from "./components/MechanicComp/CarsList";
import RequestsList from "./components/MechanicComp/RequestsList";

import ClientsList from "./components/List/ClientsList";
import CarssList from "./components/List/CarssList";
import MechanicssList from "./components/List/MechanicssList";

import HomeComp from "./components/HomeComp/HomeComp";

function App() {
  return (
    <div className="container">
    <EthProvider>
    <BrowserRouter>
<Routes>
<Route path="/" element={<HomeComp />} />

    <Route path="/AdministratorComp" element={<AdministratorComp />} />
    <Route path="/AdministratorComp/Mechanic" element={<Mechanic />} />
    <Route path="/Client" element={<Client />} />
    <Route path="/ClientList" element={<ClientList />}/>
    <Route path="/Mechanic" element={<Mechanic />} />
    <Route path="/MechanicList" element={<MechanicList/>}/>


    <Route path="/MechanicComp" element={<MechanicComp />} />
    <Route path="/MechanicComp/AddaCar" element={<AddaCar />} />
    <Route path="/AddaCar" element={<AddaCar />} />
    <Route path="/CarsList" element={<CarsList />} />
    <Route path="/ClientsList" element={<ClientsList />} />
    <Route path="/RequestsList" element={<RequestsList />} />


    <Route path="/ClientComp" element={<ClientComp />} />
    <Route path="/ClientComp/CarssList" element={<CarssList />} />
    <Route path="/CarssList" element={<CarssList />} />
    <Route path="/SelectaCar" element={<SelectaCar />} />
     <Route path="/MechanicssList" element={<MechanicssList />} />   
           
           
            </Routes>
</BrowserRouter>
    </EthProvider>
    </div>
  );
}
  
export default App;

            




  


