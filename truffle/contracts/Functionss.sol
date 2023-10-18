// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0; 
pragma experimental ABIEncoderV2; 
contract Functionss {
address public Admin = 0x09ba91900Eb758c8Ae5cB2f1430B7645A65a7a62;
    mapping(string => uint) public carPositions;
    mapping(address => _Account) public listAccount;
   // mapping(address => string) public addressToLogin;
  //  mapping(address => string) public addressToPassword;

    _Account[] public Accounts;
    _client[] public Clients;
    _mechanic[] public Mechanics;
    _car [] public Cars;
    _request[] public requests;
    struct _request {
       string nomcar;
       string registration;
       string clientname;
       uint clientnumber;
       string status;
       bool available; // new field for availability status
       address client_id;
    }
    struct _Account {
        string login;
        string password;
        string role;
    }   
    struct _mechanic {
        address mechanic_id;
        string mechanicname;
        uint32 phonenumber;
        string governorate;
    }
     struct _client {
        address client_id;
        string clientname;
        uint32 phonenumber;
        string governorate;
    }
    struct _car {
        string nomcar;
        string owner ;
        string registration;
        uint32 Mileage;
        string maintenancedetails;
        string DateMaintenance;
        uint position; // new variable to store car position  //store the position of each car based on its registration
        address mechanic_id; // added field to store mechanic's address
    }
     /********************************************************************************************
    ******************************************************************************************************* */
modifier onlyAdmin() {
        require(msg.sender == Admin, "Only the admin can perform this action");
        _;
    }
     /********************************************************************************************
    ******************************************************************************************************* */
   
modifier onlyMechanic() {
    bool mechanicExists = false;
    for (uint i = 0; i < Mechanics.length; i++) {
        if (Mechanics[i].mechanic_id == msg.sender) {
            mechanicExists = true;
            break;
        }
    }
    require(mechanicExists, "Only registered mechanics can perform this action");
    _;
}
 /********************************************************************************************
    ******************************************************************************************************* */
modifier onlyClient() {
    bool clientExists = false;
    for (uint i = 0; i < Clients.length; i++) {
        if (Clients[i].client_id == msg.sender) {
            clientExists = true;
            break;
        }
    }
    require(clientExists, "Only registered mechanics can perform this action");
    _;
}
 /********************************************************************************************
    ******************************************************************************************************* */
function getClient() public view returns (_client[] memory) {
        _client[] memory cln = new _client[](Clients.length);
        for (uint i=0; i<Clients.length; i++) {
            cln[i] = Clients[i];
        }
        return cln;
    }
 /********************************************************************************************
    ******************************************************************************************************* */
 function getMechanic() public view returns (_mechanic[] memory) {
        _mechanic[] memory mec = new _mechanic[](Mechanics.length);
        for (uint i=0; i<Mechanics.length; i++) {
            mec[i] = Mechanics[i];
        }
        return mec;
    }
     /********************************************************************************************
    ******************************************************************************************************* */
      function getCar() public view returns (_car[] memory) {
    _car[] memory kar = new _car[](Cars.length);
    for (uint i=0; i<Cars.length; i++) {
        kar[i] = Cars[i];
    }
    return kar;
}
 /********************************************************************************************
    ******************************************************************************************************* */
function getCarPosition(string memory _registration) public view returns (int) {
    for (uint i = 0; i < Cars.length; i++) {
        if (keccak256(abi.encodePacked(Cars[i].registration)) == keccak256(abi.encodePacked(_registration))) {
            return int(Cars[i].position);
        }
    }
    return -1; // Return a value indicating that the car does not exist
}
 /********************************************************************************************
    ******************************************************************************************************* */
function updateMaintenance(
        string memory registration,
        string memory maintenancedetails,
        string memory DateMaintenance
    ) public {
        require(bytes(maintenancedetails).length > 0 && bytes(DateMaintenance).length > 0, "Invalid input");

        bool carFound = false;
        for (uint256 i = 0; i < Cars.length; i++) {
            if (keccak256(abi.encodePacked(Cars[i].registration)) == keccak256(abi.encodePacked(registration))) {
                carFound = true;
                require(
                    Cars[i].mechanic_id == msg.sender,
                    "Only the mechanic who added the car can update its maintenance details"
                );
                Cars[i].maintenancedetails = maintenancedetails;
                Cars[i].DateMaintenance = DateMaintenance;
                break;
            }
        }

        require(carFound, "Car not found");
    }
     /********************************************************************************************
    ******************************************************************************************************* */
    function carExists(string memory _nomcar, string memory _registration) public view returns (bool) {
    for (uint i = 0; i < Cars.length; i++) {
        if (keccak256(abi.encodePacked(_nomcar)) == keccak256(abi.encodePacked(Cars[i].nomcar)) &&
            keccak256(abi.encodePacked(_registration)) == keccak256(abi.encodePacked(Cars[i].registration))) {
            return true;
        }
    }
    return false;
}
 /********************************************************************************************
    ******************************************************************************************************* */
function requestslist() public view returns (_request[] memory) {
    _request[] memory Req = new _request[](requests.length);
    for (uint i=0; i<requests.length; i++) {
         Req[i] = requests[i];
    }
    return Req;
}
 /********************************************************************************************
    ******************************************************************************************************* */
  function updateRequestAvailability(uint index, bool _available) public {
        require(index < requests.length, "Invalid request index");
        require(
            Cars[carPositions[requests[index].registration]].mechanic_id == msg.sender,
            "Only the mechanic who added the car can update the request availability"
        );
        requests[index].available = _available;
        requests[index].status = _available ? "accepted" : "refused";
    }
}




























 /*modifier onlyMechanic() {
    string memory login = addressToLogin[msg.sender];
    string memory password = addressToPassword[msg.sender];
    require(
        keccak256(abi.encodePacked(login)) == keccak256(abi.encodePacked(msg.sender)) &&
        keccak256(abi.encodePacked(password)) == keccak256(abi.encodePacked(msg.sender)),
        "Only registered mechanics can perform this action"
    );
    _;
}
*/