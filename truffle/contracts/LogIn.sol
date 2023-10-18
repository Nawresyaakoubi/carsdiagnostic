// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0; 
pragma experimental ABIEncoderV2; 
import "./Functionss.sol";
contract LogIn is Functionss {
constructor() {
        Accounts.push(_Account("nawres", "yaa", "Admin"));
              }
    /********************************************************************************************
    ******************************************************************************************************* */
     function getRole(string memory _login, string memory _password) external view returns (string memory) {
        string memory role = "false";
        for (uint i=0; i<Accounts.length; i++) {
            if ((keccak256(abi.encodePacked(_login))) == (keccak256(abi.encodePacked(Accounts[i].login)))) {
                if ((keccak256(abi.encodePacked(_password))) == (keccak256(abi.encodePacked(Accounts[i].password)))) {
                    role = Accounts[i].role;
                }
        }
        }    
        return role;
    }
    /********************************************************************************************
    ******************************************************************************************************* */
   function isClientExists() external view returns (string memory) {
    bool clientExists = false;
    for (uint i = 0; i < Clients.length; i++) {
        if (Clients[i].client_id == msg.sender) {
            clientExists = true;
            break;
        }
    }
    if (clientExists) {
        return "true";
    } else {
        return "false";
    }
}
/********************************************************************************************
    ******************************************************************************************************* */
function isMechanicExists() external view returns (string memory) {
    bool mechanicExists = false;
    for (uint i = 0; i < Mechanics.length; i++) {
        if (Mechanics[i].mechanic_id == msg.sender) {
            mechanicExists = true;
            break;
        }
    }
    if (mechanicExists) {
        return "true";
    } else {
        return "false";
    }
}
/********************************************************************************************
    ******************************************************************************************************* */
  function isAdminExists() external view returns (string memory) {
        if (msg.sender == Admin) {
            return "true";
        } else {
            return "false";
        }
    }
/********************************************************************************************
    ******************************************************************************************************* */
 function addClient(
        address client_id,
         string memory _login,
          string memory _password,
           string memory _clientname,
            string memory _governorate,
             string memory _role, uint32 _phonenumber) 
    public onlyAdmin{
        for (uint i = 0; i < Clients.length; i++) {
        require(Clients[i].client_id != client_id, "Client with the same address already exists");
    }
    for (uint i = 0; i < Accounts.length; i++) {
        require(
            keccak256(abi.encodePacked(_login)) != keccak256(abi.encodePacked(Accounts[i].login)) &&
            keccak256(abi.encodePacked(_password)) != keccak256(abi.encodePacked(Accounts[i].password)),
            "Login or password is already used by a client"
        );
    }
        Clients.push(_client(client_id, _clientname, _phonenumber, _governorate));
        Accounts.push(_Account(_login, _password, _role));
    }
/********************************************************************************************
    ******************************************************************************************************* */
    function addMechanic(
    address mechanic_id,
    string memory _login,
    string memory _password,
    string memory _mechanicname,
    string memory _governorate,
    string memory _role,
    uint32 _phonenumber
) public onlyAdmin {
   /* for (uint i = 0; i < Mechanics.length; i++) {
        require(Mechanics[i].mechanic_id != mechanic_id, "Mechanic with the same address already exists");
    }
    for (uint i = 0; i < Accounts.length; i++) {
        require(
            keccak256(abi.encodePacked(_login)) != keccak256(abi.encodePacked(Accounts[i].login)) &&
            keccak256(abi.encodePacked(_password)) != keccak256(abi.encodePacked(Accounts[i].password)),
            "Login or password is already used by a mechanic"
        );
    }*/
    Mechanics.push(_mechanic(mechanic_id, _mechanicname, _phonenumber, _governorate));
    Accounts.push(_Account(_login, _password, _role));
}
    /********************************************************************************************
    ******************************************************************************************************* */
/*function checkMechanic(address mechanic_id, string memory _login, string memory _password) public view returns (bool) {
    for (uint i = 0; i < Mechanics.length; i++) {
        if (Mechanics[i].mechanic_id == mechanic_id) {
            return true; // Mechanic with the same address exists
        }
    }
    for (uint i = 0; i < Accounts.length; i++) {
        if (keccak256(abi.encodePacked(_login)) == keccak256(abi.encodePacked(Accounts[i].login)) &&
            keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(Accounts[i].password)) &&
            keccak256(abi.encodePacked(Accounts[i].role)) == keccak256(abi.encodePacked("mechanic"))) {
            return true; // Login or password is already used by a mechanic
        }
    }
    return false; // No matching mechanic found
} */ 
    /********************************************************************************************
    ******************************************************************************************************* */
function addCar(
        string memory _nomcar,
        string memory _registration,
        string memory _owner,
        uint32 _Mileage,
        string memory _maintenancedetails,
        string memory _DateMaintenance
    ) public  onlyMechanic (){
        _maintenancedetails = string(abi.encodePacked(_maintenancedetails, "\n"));
        _DateMaintenance = string(abi.encodePacked(_DateMaintenance, "\n"));
        Cars.push(_car(_nomcar, _owner, _registration, _Mileage, _maintenancedetails, _DateMaintenance, Cars.length, msg.sender));
        carPositions[_registration] = Cars.length - 1;
    }
/********************************************************************************************
    ******************************************************************************************************* */
function addRequest(string memory _nomcar, string memory _registration, string memory _clientname, uint _clientnumber) public onlyClient returns (bool)  {
    if (carExists(_nomcar, _registration)) {
        requests.push(_request(_nomcar, _registration, _clientname, _clientnumber, "waiting", true, msg.sender));
        return true;
    } else {
        return false;
    }
}
    /********************************************************************************************
    ******************************************************************************************************* */
function setMileage(string memory _registration, uint32 _Mileage) public {
    bool carFound = false;
    for (uint i = 0; i < Cars.length; i++) {
        if (keccak256(abi.encodePacked(Cars[i].registration)) == keccak256(abi.encodePacked(_registration))) {
            Cars[i].Mileage = _Mileage;
            carFound = true;
            break;
        }
    }
    require(carFound, "Car not found.");
}
}














/*function isMechanicExists() public view returns (string memory) {
    string memory login = addressToLogin[msg.sender];
    string memory password = addressToPassword[msg.sender];
    if (                     
        keccak256(abi.encodePacked(login)) == keccak256(abi.encodePacked(msg.sender)) &&
        keccak256(abi.encodePacked(password)) == keccak256(abi.encodePacked(msg.sender))
    ) {
        return "true";
    } else {
        return "false";
    }
}*/

 
/*function addMechanic(
    address mechanic_id,
    string memory _login,
    string memory _password,
    string memory _mechanicname,
    string memory _governorate,
    string memory _role,
    uint32 _phonenumber
) public onlyAdmin {
       for (uint i = 0; i < Mechanics.length; i++) {
        require(Mechanics[i].mechanic_id = mechanic_id, "Mechanic with the same address already exists");
    }
     for (uint i = 0; i < Accounts.length; i++) {
        require(
            keccak256(abi.encodePacked(_login)) != keccak256(abi.encodePacked(Accounts[i].login)) &&
            keccak256(abi.encodePacked(_password)) != keccak256(abi.encodePacked(Accounts[i].password)) &&
            keccak256(abi.encodePacked(Accounts[i].role)) == keccak256(abi.encodePacked("mechanic"))),
            "Login or password is already used by an actor");
     }
     /*for (uint i = 0; i < Mechanics.length; i++) {
        if (Mechanics[i].mechanic_id == mechanic_id) {
            return true; // Mechanic with the same address exists
        }
    }*/

    /*for (uint i = 0; i < Accounts.length; i++) {
        if (keccak256(abi.encodePacked(_login)) == keccak256(abi.encodePacked(Accounts[i].login)) &&
            keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(Accounts[i].password)) &&
            keccak256(abi.encodePacked(Accounts[i].role)) == keccak256(abi.encodePacked("mechanic"))) {
            return true; // Login or password is already used by a mechanic
        }
    }
    return false; // No matching mechanic found*/
       // Mechanics.push(_mechanic(mechanic_id, _mechanicname, _phonenumber, _governorate));
      //  Accounts.push(_Account(_login, _password, _role));
    




 /*function addMechanic(
        address mechanic_id,
         string memory _login,
          string memory _password, 
           string memory _mechanicname,
            string memory _governorate, 
             string memory _role, 
              uint32 _phonenumber) 
     public  onlyAdmin{
            for (uint i = 0; i < Mechanics.length; i++) {
        require(Mechanics[i].mechanic_id != mechanic_id, "Mechanic with the same address already exists");
    }
     for (uint i = 0; i < Accounts.length; i++) {
        require(
            keccak256(abi.encodePacked(_login)) != keccak256(abi.encodePacked(Accounts[i].login)) &&
            keccak256(abi.encodePacked(_password)) != keccak256(abi.encodePacked(Accounts[i].password)),
            "Login or password is already used by an actor"
        );
    }
Mechanics.push(_mechanic(mechanic_id, _mechanicname, _phonenumber, _governorate));
        Accounts.push(_Account(_login, _password, _role));

       // addressToLogin[mechanic_id] = _login;
       // addressToPassword[mechanic_id] = _password;

        }*/
/*function checkMechanic(address mechanic_id, string memory _login, string memory _password) public view returns (bool) {
    for (uint i = 0; i < Mechanics.length; i++) {
        if (Mechanics[i].mechanic_id == mechanic_id) {
            return true; // Mechanic with the same address exists
        }
    }

     for (uint i = 0; i < Accounts.length; i++) {
        if (keccak256(abi.encodePacked(_login)) == keccak256(abi.encodePacked(Accounts[i].login)) &&
            keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(Accounts[i].password)) &&
            keccak256(abi.encodePacked(Accounts[i].role)) == keccak256(abi.encodePacked("mechanic"))) {
            return true; // Login or password is already used by a mechanic
        }
    }
    return false; // No matching mechanic  found
}*/