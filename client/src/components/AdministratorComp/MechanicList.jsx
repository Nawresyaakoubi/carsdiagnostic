import React, {useState, useEffect} from 'react';
import "antd/dist/antd.css";
import useEth from "../../contexts/EthContext/useEth";
import {Card,message, Table} from "antd";
import AdministratorComp from './AdministratorComp';
function MechanicssList() {
  const { state: { contract, accounts } } = useEth();
const [mechanics, setMechanics] = useState([]); 
useEffect(() => {
  const ListMechanics = async () => {
      try {
          const mechanics = await contract.methods.getMechanic().call({ from: accounts[0] });
          console.log("Mechanics:", mechanics); // Log the result
          setMechanics(mechanics);
      } catch (error) {
          message.error("Failed to get mechanics, please try again later");
          console.log("Error:", error); // Log the error
      }
  };
  ListMechanics();
}, [contract, accounts]);
  return (
    <>
   <AdministratorComp></AdministratorComp>
    <Card
          style={{
            position: "relative",
            width: "75%",
            left: "265px",
            top: "70px",
            borderRadius: "7px",
            backgroundColor:"#B7CED8"
          }}
        >
          <legend>Mechanics List:</legend>
          <Table dataSource={mechanics}>
  <Table.Column title="Ethereum Address" dataIndex="mechanic_id" key="mechanic_id" />
  <Table.Column title="Name and Surname" dataIndex="mechanicname" key="mechanicname" />
  <Table.Column title="Governorate" dataIndex="governorate" key="governorate" />
  <Table.Column title="Phone Number" dataIndex="phonenumber" key="phonenumber" />
</Table>
        </Card>
         </>
  );
    
}
export default MechanicssList;










/*useEffect(() => {
    const ListMechanics = async () => {
      try {
        const mechanics = await contract.methods.getMechanic().call({ from: accounts[0] });
        setMechanics(mechanics);
      } catch (error) {
        message.error("Failed to get mechanics, please try again later");
        console.log(error);
      }
    };
    ListMechanics();
  }, [contract, accounts]);*/