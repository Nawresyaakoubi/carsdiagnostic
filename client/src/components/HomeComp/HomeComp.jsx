//import { React, useState } from "react";
import React, { useState } from "react";

import useEth from "../../contexts/EthContext/useEth";
import { useNavigate } from "react-router-dom";
import { Typography, Layout, message } from "antd";
//import Web3 from "web3";

const { Header } = Layout;
const { Title } = Typography;

function HomeComp() {
//  const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");

  const { state: { contract, accounts } } = useEth();
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
 // const [inputUseraddress, set] = useState("");
  
  const navigate = useNavigate();
  //const adminAddress ="0x90EC032aAfEBF53f2510ec6E467848Efb16603E6" ;

  const Login = async () => {
      console.log('les paramètres sont', inputLogin)
      console.log('les paramètres sont ', inputPassword)
     // console.log('les paramètres sont ', inputUseraddress)
      let result = await contract.methods.getRole(inputLogin, inputPassword).call({ from: accounts[0] });
      console.log('le resultat est',result)
      let result1 = await contract.methods.isAdminExists( ).call({ from: accounts[0] });
      console.log('le resultat est',result1)
      let result2 = await contract.methods.isMechanicExists().call({ from: accounts[0] });
      console.log('le resultat est',result2)
      let result3 = await contract.methods.isClientExists().call({ from: accounts[0] });
      console.log('le resultat est',result3)


  if (!inputLogin || !inputPassword) {
    message.error("Please fill in all fields");
    return;
  }

  try {
    let result = await contract.methods.getRole(inputLogin, inputPassword).call({ from: accounts[0] });
    if (result === "Admin" ) {
      if (result1 === "true") {
        setTimeout(() => {
         message.success("Welcome, Administrator!");
       }, 500);
       setTimeout(() => {
         navigate("/Administratorcomp/Mechanic");
       }, 1000);
     } else {
       message.error("Invalid authentication");
     }
    }
    else if (result === "Client") {
      if (result3 === "true") {
        setTimeout(() => {
          message.success("Welcome our Client!");
        }, 500);
        setTimeout(() => {
          navigate("ClientComp/CarssList");
        }, 1000);
      } else {
        message.error("Invalid authentication");
      }
    }else if (result === "Mechanic") {
    if (result2 === "true") {
        setTimeout(() => {
          message.success("Welcome our Mechanic!");
        }, 500);
        setTimeout(() => {
          navigate("MechanicComp/AddaCar");
        }, 1000);
      } else {
        message.error("Invalid authentication");
      }
    }
   
  } catch (error) {
    message.error("Failed to authenticate, please try again later");
    console.log(error);
  }
};
  return (
    <div >
       <Header style={{ zIndex: 1, width: "100%", backgroundColor: "#00b4d8" }}>
        <img
          style={{ float: "left", width: "60px", height: "60px" }}
          alt=""
         src="/caars.jpg"

          width="35"
          height="35"
          className="d-inline-block align-top"
        />
        <Title
          level={3}
          style={{
            position: "relative",
            color: "white",
            float: "left",
            top: "15px",
            marginLeft: "7px",
          }}
        >
          Cars Diagnostic
        </Title>
      </Header>
      <div className="interface">
        <div className="form" >
          <h1>Sign In</h1>
          <label>
           <h2>Login :</h2> 
            <input className="input" type="text" name="unit" placeholder="Enter your  name" 
            onChange={(t) => { setInputLogin(t.target.value); }} />
          </label>
          <br />
          
          <label>
            <h2>Password :</h2> 
            
            <input className="input"  name="unit" type="password" placeholder="************"  onChange={(t) => { setInputPassword(t.target.value); }} />
          </label>
          <br />
          <br />
          <button className="loginbtn" style={{    background: "#162938" ,color: "white"}}onClick={Login}>
            <b>LogIn</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeComp;







/* if (result === "Admin" ) {
      if (result1 === "true") {
        setTimeout(() => {
         message.success("Welcome, Administrator!");
       }, 500);
       setTimeout(() => {
         navigate("/Administratorcomp/Mechanic");
       }, 1000);
     } else {
       message.error("Invalid authentication");
     }
    
    } else if (result === "Client") {
     if (result3 === "true") {
        setTimeout(() => {
          message.success("Welcome our Client!");
        }, 500);
        setTimeout(() => {
          navigate("ClientComp/CarssList");
        }, 1000);
      } else {
        message.error("Invalid authentication");
      }
    } else if (result === "Mechanic") {
     if (result2 === "true") {
        //  if (result2) { // Compare avec true

        setTimeout(() => {
          message.success("Welcome our Mechanic!");
        }, 500);
        setTimeout(() => {
          navigate("MechanicComp/AddaCar");
        }, 1000);
      } else {
        message.error("Invalid authentication");
      }
    } */









    /*} else if (result === "Client") {
  // Check if the provided address matches the client's address
  if (accounts[0] === "<client_id>") {
    setTimeout(() => {
      message.success("Welcome, Client!");
    }, 500);
    setTimeout(() => {
      navigate("ClientComp/ClientDashboard");
    }, 1000);
  } else {
    message.error("Invalid address for Client");
  }
} else if (result === "Mechanic") {
  // Check if the provided address matches the mechanic's address
  if (accounts[0] === "<mechanic_id>") {
    setTimeout(() => {
      message.success("Welcome, Mechanic!");
    }, 500);
    setTimeout(() => {
      navigate(" MechanicComp/MechanicDashboard");
    }, 1000);
  } else {
    message.error("Invalid address for Mechanic");
  }
} else {
  message.error("Invalid authentication");
}
} catch (error) {
message.error("Failed to authenticate, please try again later");
console.log(error);
}
};*/