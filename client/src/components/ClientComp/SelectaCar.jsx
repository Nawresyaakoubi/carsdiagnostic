import React, {useState, useEffect} from 'react';
import "antd/dist/antd.css";
import useEth from "../../contexts/EthContext/useEth";
import {  Button,Input,Card,Form,Space,message,Table, Tag} from "antd";
import ClientComp from './ClientComp';
function SelectaCar () {
      const { state: { contract, accounts } } = useEth();
      const [requests, setRequests] = useState([]);
    const [inputNomcar, setInputNomcar] = useState("");
    const [inputRegistration, setInputRegistration] = useState("");
    const [inputNomclient, setInputNomclient] = useState("");
    const [inputclientnumber, setInputclientnumber] = useState("");
   // const [errorMessage, setErrorMessage] = useState(""); // <-- Define the state here
   useEffect(() => {
    /*const ListRequests = async () => {
      try {
        const requests = await contract.methods.requestslist().call({ from: accounts[0] });
        setRequests(requests);
      } catch (error) {
        message.error("Failed to get requests, please try again later");
        console.log(error);
      }
    };*/
    const ListRequests = async () => {
      try {
        const requests = await contract.methods.requestslist().call({ from: accounts[0] });
        console.log("Requests:", requests); // Log the result
        setRequests(requests);
      } catch (error) {
        message.error("Failed to get requests, please try again later");
        console.log(error);
      }
    };
    
  
    ListRequests();
  }, [contract, accounts]);
  const AddRequest = async () => {
   /* const ListRequests = async () => {
      try {
        const requests = await contract.methods.requestslist().call({ from: accounts[0] });
        setRequests(requests);
      } catch (error) {
        message.error("Failed to get requests, please try again later");
        console.log(error);
      }
    };*/
    const ListRequests = async () => {
      try {
        const requests = await contract.methods.requestslist().call({ from: accounts[0] });
        console.log("Requests:", requests); // Log the result
        setRequests(requests);
      } catch (error) {
        message.error("Failed to get requests, please try again later");
        console.log(error);
      }
    };
    
    if (inputNomcar && inputRegistration) {
      try {
          const carExists = await contract.methods.carExists(inputNomcar, inputRegistration).call({ from: accounts[0] });
          if (carExists) {
              // Check if the car has already been selected or has a pending request
              const existingRequests = await contract.methods.requestslist().call({ from: accounts[0] });
              const existingRequest = existingRequests.find(request =>
                  request.registration === inputRegistration
              );
              if (existingRequest) {
                  if (existingRequest.status === "waiting") {
                      message.error("Car request is already in waiting ");
                  } else if (existingRequest.status === "accepted") {
                      message.error("Car request has been accepted");
                  } else if (existingRequest.status === "refused") {
                    message.error("Car request has been refused");
                  }
              } else {
                  await contract.methods.addRequest(inputNomcar, inputRegistration, inputNomclient, inputclientnumber).send({ from: accounts[0] });
                  message.success("Car selected successfully");
                  ListRequests();
                //  message.error(""); // Clear error message on successful request
              }
          } else {
            message.error("Car not found");
          }
      } catch (error) {
          message.error("Failed to select car, please try again later");
          console.log(error);
          console.log("Error in AddRequest:", error); // Affichez l'erreur dans la console

      }
  } else {
      message.error("Please fill in all fields");
  }
};
  return (
    <>
   <ClientComp></ClientComp>
     
    
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
          <legend>Select A Car :</legend>
          <Form
            labelCol={{ span: 6}} wrapperCol={{ span: 16, }} initialValues={{ remember: true, }}
            autoComplete="off" >
               <Form.Item label="Car name "  >
              <Input name="nomcar" onChange={ (t) => { setInputNomcar(t.target.value); }} /> 
              </Form.Item>
            
               <Form.Item label="Registration  "  >
              <Input name="registration" onChange={ (t) => { setInputRegistration(t.target.value); }} />
               </Form.Item>
               <Form.Item label="Client name "  >
              <Input name="clientname" onChange={ (t) => { setInputNomclient(t.target.value); }} /> 
              </Form.Item>
            
               <Form.Item label="Client phone number  "  >
              <Input name="clientnumber" onChange={ (t) => { setInputclientnumber(t.target.value); }} />
               </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Space size={3}>
              <Button type="primary"  onClick={AddRequest}>Send</Button>
                {/*<Button >Cancel</Button>*/}
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Card
          style={{
            position: "relative",
            width: "80%",
            left: "265px",
            top: "80px",
            borderRadius: "7px",
            backgroundColor:"#B7CED8"
          }}
        >
          <legend>Requests List:</legend>
          <Table dataSource={requests}>
  
  <Table.Column title="Car name" dataIndex="nomcar" key="nomcar" />
  <Table.Column title="Registration" dataIndex="registration" key="registration" />
  <Table.Column title="Client name" dataIndex="clientname" key="clientname" />
  <Table.Column title="Client phone number" dataIndex="clientnumber" key="clientnumber" />
   <Table.Column title="Status" dataIndex="status" key="status" render={ (text) => (
       // <Tag color={text === "waiting" ? "blue" : text === "accepted" ? "green" : text === "refused" ? "red"}> {text} </Tag>
      <Tag color={text === "waiting" ? "blue" : text === "accepted" ? "green" : "red"}> {text} </Tag>

      )}/>
</Table>
 
        </Card>
      </>
  );
    
}
export default SelectaCar;



















   /* if (inputNomcar && inputRegistration) {
      try {
        const carExists = await contract.methods.carExists(inputNomcar, inputRegistration).call({ from: accounts[0] });
        if (carExists) {
          await contract.methods.addRequest(inputNomcar, inputRegistration, inputNomclient, inputclientnumber).send({ from: accounts[0] });
          message.success("Car selected successfully");
          ListRequests();
        } else {
          message.error("Car not found");
        }
      } catch (error) {
        message.error("Failed to select car, please try again later");
        console.log(error);
      }
    } else {
      message.error("Please fill in all fields");
    }
  };*/