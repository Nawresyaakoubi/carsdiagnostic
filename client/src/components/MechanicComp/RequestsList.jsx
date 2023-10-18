import React, {useState, useEffect} from 'react';
import "antd/dist/antd.css";
import useEth from "../../contexts/EthContext/useEth";
import { Card,message, Table, Tag} from "antd";
import MechanicComp from './MechanicComp';
function CarssList () {
  const { state: { contract, accounts } } = useEth();
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const ListRequests = async () => {
      try {
        const requests = await contract.methods.requestslist().call({ from: accounts[0] });
        setRequests(requests);
      } catch (error) {
        message.error("Failed to get requests, please try again later");
        console.log(error);
      }
    };
  
    ListRequests();
  }, [contract, accounts]);
 const updateRequestAvailability = async (index, availability) => {
    try {
      await contract.methods.updateRequestAvailability(index, availability).send({ from: accounts[0] });
      const updatedRequests = [...requests];
      updatedRequests[index] = {
        ...updatedRequests[index],
        available: availability,
        status: availability ? 'Accepted' : 'Refused'
      };
      setRequests(updatedRequests);
      message.success(`Car availability updated to ${availability ? 'Accepted' : 'Refused'}`);
    } catch (error) {
      message.error(`Failed to update car availability: ${error.message}`);
      console.error(error);
    }
  };
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
   <legend>Requests List:</legend>
          <Table dataSource={requests}>
  <Table.Column title="Car Name" dataIndex="nomcar" key="nomcar" />
  <Table.Column title="Registrartion" dataIndex="registration" key="registration" />
  <Table.Column title="Client name" dataIndex="clientname" key="clientname" />
  <Table.Column title="Client phone number" dataIndex="clientnumber" key="clientnumber" />
  <Table.Column
  title="Available"
  key="available"
  render={( text, record, index) => (
    <>
      <button style={{ marginRight: '10px' }} onClick={() => updateRequestAvailability(index, true)}>
        Accept
      </button>
      <button onClick={() => updateRequestAvailability(index, false)}>
        Refuse
      </button>
    </>
  )}
/>
    <Table.Column title="Status" dataIndex="status" key="status" render={ (text) => (
        <Tag color={text === "waiting" ? "blue" : text === "accepted" ? "green" : "red"}> {text} </Tag>
      )}/>
</Table>
</Card>
         </>
  );
    
}
export default CarssList;