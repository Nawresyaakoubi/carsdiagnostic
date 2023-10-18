import React, {useState, useEffect} from 'react';
import "antd/dist/antd.css";
import useEth from "../../contexts/EthContext/useEth";
import {Card,message, Table} from "antd";
import MechanicComp from "../MechanicComp/MechanicComp"
function ClientsList() {
const { state: { contract, accounts } } = useEth();
const [clients, setClientss] = useState([]);
useEffect(() => {
    const ListClients = async () => {
      try {
        const clients = await contract.methods.getClient().call({ from: accounts[0] });
        setClientss(clients);
      } catch (error) {
        message.error("Failed to get clients, please try again later");
        console.log(error);
      }
    };
    ListClients();
  }, [contract, accounts]);
  return (
    <>
   <MechanicComp></MechanicComp>
    <Card
          style={{
            position: "relative",
            width: "80%",
            left: "265px",
            top: "70px",
            borderRadius: "7px",
            backgroundColor:"#B7CED8"

          }}
        >
          <legend>Clients List:</legend>
          <Table dataSource={clients}>
  <Table.Column title="Ethereum Address" dataIndex="client_id" key="client_id" />
  <Table.Column title="Name and Surname" dataIndex="clientname" key="clientname" />
  <Table.Column title="Governorate" dataIndex="governorate" key="governorate" />
  <Table.Column title="Phone Number" dataIndex="phonenumber" key="phonenumber" />
</Table>
        </Card>
         </>
  );
}
export default ClientsList;