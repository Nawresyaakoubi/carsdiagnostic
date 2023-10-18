import React, {useState} from 'react';
import "antd/dist/antd.css";
import useEth from "../../contexts/EthContext/useEth";
import {  Button,Input,Card,Form,Space,message, DatePicker} from "antd";
import MechanicComp from './MechanicComp';
function AddaCar () {
      const { state: { contract, accounts } } = useEth();
    const [inputNomcar, setInputNomcar] = useState("");
    const [inputRegistration, setInputRegistration] = useState("");
    const [inputOwner, setInputOwner] = useState("");
    const [inputMileage, setInputMileage] = useState("");
    const [inputMaintenanceDetails, setInputMaintenanceDetails] = useState("");
    const [inputDateMaintenance, setInputDateMaintenance] = useState("");
    const NewCar = async () => {
      if (inputNomcar&& inputRegistration&& inputOwner&& inputMileage&& inputMaintenanceDetails&& inputDateMaintenance ) {
        try {
          await contract.methods.addCar(inputNomcar, inputRegistration, inputOwner, inputMileage, inputMaintenanceDetails, inputDateMaintenance).send({ from: accounts[0] });

          message.success("Car added successfully");
        } catch (error) {
          message.error("Failed to add car, please try again later");
          console.log(error);
        }
      } else {
        message.error("Please fill in all fields");
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
          <legend>Add New Car :</legend>
          <Form
            labelCol={{ span: 6}} wrapperCol={{ span: 16, }} initialValues={{ remember: true, }}
            autoComplete="off" >
               <Form.Item label="Car name "  >
              <Input name="nomcar" onChange={ (t) => { setInputNomcar(t.target.value); }} /> 
              </Form.Item>
            
               <Form.Item label="Registration  "  >
              <Input name="registration" onChange={ (t) => { setInputRegistration(t.target.value); }} />
               </Form.Item>
               <Form.Item label="Owner name  "  >
              <Input name="owner" onChange={ (t) => { setInputOwner(t.target.value); }} />
               </Form.Item>
               <Form.Item
              label="Mileage in KM">
              <Input
                name="Mileage"
                onChange={(t) => { setInputMileage(t.target.value); }}
              />
            </Form.Item>
            <Form.Item
              label="Maintenance details " >
              <Input
                name="maintenancedetails"
                onChange={(t) => { setInputMaintenanceDetails(t.target.value); }}
              />
            </Form.Item>
        <Form.Item label="Maintenance Date">
  <DatePicker
    onChange={(t) => { setInputDateMaintenance(t.format("DD/MM/YYYY")); }} 
    style={{ width: "100%" }}
    format={"DD/MM/YYYY"}
  />
</Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Space size={3}>
              <Button type="primary"  onClick={NewCar}><b>Send</b></Button>
                {/*<Button ><b>Cancel</b></Button>*/}
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </>
  );
    
}
export default AddaCar;