import React, {useState} from 'react';
import "antd/dist/antd.css";
import useEth from "../../contexts/EthContext/useEth";
import { Button,Input,Card,Form,Space,message} from "antd";
import AdministratorComp from './AdministratorComp';
function Mechanic(){ 
  const { state: { contract, accounts } } = useEth();
  const [inputAddress, setInputAddress] = useState("");
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputGovernorate, setInputGovernorate] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [inputPhonenumber, setInputPhonenumber] = useState("");

 
  
  const AddMechanic = async () => {

    if (inputAddress&& inputLogin&& inputPassword&& inputName&& inputGovernorate&& inputRole&& inputPhonenumber) {
      try {
        await contract.methods.addMechanic(inputAddress, inputLogin, inputPassword, inputName, inputGovernorate , inputRole, inputPhonenumber  ).send({ from: accounts[0] });
        message.success("Mechanic added successfully");
      } catch (error) {
        message.error("Failed to add Mechanic, please try again later");
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
          <legend>Add a Mechanic :</legend>
          <Form
            labelCol={{ span: 6}} wrapperCol={{ span: 16, }} initialValues={{ remember: true, }}
            autoComplete="off" > <Form.Item label="Ethereum Adress "  >
              <Input name="Mechanic_id" onChange={ (t) => { setInputAddress(t.target.value); }} /> </Form.Item>
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
                name="mechanicname"
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
               <Space size={3} style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary" onClick={AddMechanic}><b>Send</b></Button>
            {/*  <Button><b>Cancel</b></Button>*/}
            </Space>
            </Form.Item>
          </Form>
        </Card>
      
          </>
  );
    
}
export default Mechanic;





































  /*const AddMechanic = async () => {
    if (inputAddress && inputLogin && inputPassword) {
      try {
        const checkMechanic = await contract.methods.checkMechanic(inputAddress, inputLogin, inputPassword).call({ from: accounts[0] });
        if (checkMechanic) {
          message.error("Mechanic with the same data already exists");
        } else {
          if (inputAddress&& inputLogin&& inputPassword&& inputName&& inputGovernorate&& inputRole&& inputPhonenumber) {

          await contract.methods.addMechanic(inputAddress, inputLogin, inputPassword, inputName, inputGovernorate, inputRole, inputPhonenumber).send({ from: accounts[0] });
          message.success("Mechanic added successfully");
          //ListMechanics();
        }}
      } catch (error) {
        message.error("Failed to add Mechanic, please try again later");
        console.error(error);
      }
    } else {
      message.error("Please fill in all fields");
    }
};*/











  /*const AddMechanic = async () => {
    if (inputAddress && inputLogin && inputPassword && inputName && inputGovernorate && inputRole && inputPhonenumber) {
      try {
        await contract.methods.addMechanic(inputAddress, inputLogin, inputPassword, inputName, inputGovernorate, inputRole, inputPhonenumber).send({ from: accounts[0] });
        message.success("Mechanic added successfully");
      } catch (error) {
        if (error.message.includes("Login or password is already used by an actor")) {
          message.error("Login or password is already used by an actor");
        } else if (error.message.includes("Mechanic with the same address already exists")) {
          message.error("Mechanic with the same address already exists");
        } else {
          message.error("Failed to add Mechanic, please try again later");
        }
        console.log(error);
      }
    } else {
      message.error("Please fill in all fields");
    }
  };*/
  