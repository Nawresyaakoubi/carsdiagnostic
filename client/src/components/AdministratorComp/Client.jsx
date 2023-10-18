import React, {useState} from 'react';
import "antd/dist/antd.css";
import useEth from "../../contexts/EthContext/useEth";
import {  Button,Input,Card,Form,Space,message} from "antd";
import AdministratorComp from './AdministratorComp';
function Client(){ 
  const { state: { contract, accounts } } = useEth();
  const [inputAddress, setInputAddress] = useState("");
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputGovernorate, setInputGovernorate] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [inputPhonenumber, setInputPhonenumber] = useState("");

  
  
  const AddClient = async () => {
   

    if (inputAddress&& inputLogin&& inputPassword&& inputName&& inputGovernorate&& inputRole&& inputPhonenumber) {
      try {
        await contract.methods.addClient(inputAddress, inputLogin, inputPassword, inputName, inputGovernorate , inputRole, inputPhonenumber ).send({ from: accounts[0] });
      //  sendEmailToAdmin(inputLogin, inputPassword); // Call a function to send the email

        message.success("Client added successfully");
      } catch (error) {
        message.error("Failed to add client, please try again later");
        console.log(error);
      }
    } else {
      message.error("Please fill in all fields");
    }
  };
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
          <legend>Add a Client :</legend>
          <div>
          <Form
            labelCol={{ span: 6}} wrapperCol={{ span: 16, }} initialValues={{ remember: true, }}
            autoComplete="off" > 
            <Form.Item label="Ethereum Adress " >
              <Input name="client_id" onChange={ (t) => { setInputAddress(t.target.value); }} /> </Form.Item>
              <Form.Item
              label="Login"
            >
              <Input
                name="login"
                onChange={(t) => { setInputLogin(t.target.value); }}

              />
            </Form.Item>
            <Form.Item
              label="Password"
             
            >
              <Input
                name="password"
                onChange={(t) => { setInputPassword(t.target.value); }}
              />
            </Form.Item>
            <Form.Item
              label="Name and Surname"
              
            >
              <Input
                name="clientname"
                onChange={(t) => { setInputName(t.target.value); }}
              />
            </Form.Item>
            <Form.Item
              label="Governorate"
             
            >
              <Input
                name="governorate"
                onChange={(t) => { setInputGovernorate(t.target.value); }}
              />
            </Form.Item>
            <Form.Item
              label="Role"
             
            >
              <Input
                name="role"
                onChange={(t) => { setInputRole(t.target.value); }}
              />
            </Form.Item>
            <Form.Item
              label="Telephone Number"
              
            >
              <Input
                name="phonenumber"
                onChange={(t) => { setInputPhonenumber(t.target.value); }}
              />
            </Form.Item>
           
         
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Space size={3}>
              <Button type="primary"  onClick={AddClient}><b>Send</b></Button>
              {/*<Button onClick={handleReset}>Cancel</Button>*/}

              </Space>
            </Form.Item>
          </Form>
          </div>
        </Card>
        
       
</>
  );
    
}
export default Client;

































 /* message.success("Client added successfully");
  } catch (error) {
    if (error.message.includes("Client with the same login already exists")) {
      message.error("Client with the same login already exists");
    } else if (error.message.includes("Client with the same password already exists")) {
      message.error("Client with the same password already exists");
    } else if (error.message.includes("Client with the same address already exists")) {
      message.error("Client with the same address already exists");
    } else {
      message.error("Failed to add client, please try again later");
    }
    console.log(error);
  }
}
  };*/


















  
  //const sendEmailToAdmin = (login, password) => {
    // Use your email sending service here to send the email to the admin
    // You would provide the admin's email, subject, content, etc.
    // Example using a fictional email service
    //emailService.send({
     // to: 'nawres.yaakoubi@isimg.tn',
      //subject: 'New Client Added',
      //text: `A new client has been added with login: ${login} and password: ${password}`,
   // });
 // };
 /*const handleReset = () => {
  setInputAddress("");
  setInputLogin("");
  setInputPassword("");
  setInputName("");
  setInputGovernorate("");
  setInputRole("");
  setInputPhonenumber("");
};*/