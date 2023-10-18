import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import useEth from "../../contexts/EthContext/useEth";
import { Card, message, Table, Modal, Form, Input,Button } from "antd";
import MechanicComp from './MechanicComp';
function CarsList () {
  const { state: { contract, accounts } } = useEth();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [updateMaintenanceVisible, setUpdateMaintenanceVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchRegistration, setSearchRegistration] = useState('');
  const handleSearch = async () => {
    try {
      const carPosition = await contract.methods.getCarPosition(searchRegistration).call({ from: accounts[0] });
      if (carPosition >= 0) {
        // Car exists, handle the position
        alert(`The car with registration ${searchRegistration} is at position ${carPosition}`);
      } else {
        // Car does not exist
        throw new Error(`The car with registration ${searchRegistration} does not exist. Go back to add new car `);
      }
    } catch (error) {
      // Display the error message
      alert(error.message);
    }
  };
  

 
  useEffect(() => {
    const listCars = async () => {
      try {
        const cars = await contract.methods.getCar().call({ from: accounts[0] });
        setCars(cars);
      } catch (error) {
        message.error("Failed to get cars, please try again later");
        console.log(error);
      }
    };
  
    listCars();
  }, [contract, accounts]);

  const handleUpdateMaintenance = (car) => {
    setSelectedCar(car);
    setUpdateMaintenanceVisible(true);
    form.resetFields();
  };
 
  const handleUpdateMaintenanceOk = async () => {
    try {
      const values = await form.validateFields();
      const currentMaintenanceDetails = selectedCar.maintenancedetails;
      const currentMaintenanceDate = selectedCar.DateMaintenance;
      const updatedMaintenanceDetails = currentMaintenanceDetails +' '+values.maintenancedetails;
        const updatedMaintenanceDate = currentMaintenanceDate +' '+values.DateMaintenance;

      // Update maintenance details on the blockchain and wait for the transaction to be mined
      await contract.methods.updateMaintenance(
        selectedCar.registration,
        updatedMaintenanceDetails,
        updatedMaintenanceDate
      ).send({ from: accounts[0] });
  
      // Create a new array of cars with the updated car
      const updatedCars = cars.map((car) =>
        car.registration === selectedCar.registration
          ? { ...car, maintenancedetails: updatedMaintenanceDetails, DateMaintenance: updatedMaintenanceDate }
          : car
      );
  
      // Set the new array of cars to the state
      setCars(updatedCars);
  
      setUpdateMaintenanceVisible(false);
      message.success("Maintenance details updated successfully");
      setSelectedCar(null);
   
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateMaintenanceCancel = () => {
    setUpdateMaintenanceVisible(false);
    setSelectedCar(null);
  };
  return (
    
    <>
      <MechanicComp />
    
      <Card
        style={{
          position: "relative",
          width: "90%",
          left: "265px",
          top: "70px",
          borderRadius: "7px",
          backgroundColor:"#B7CED8"

        }}
      >
        
        <Input
    value={searchRegistration}
    onChange={(e) => setSearchRegistration(e.target.value)}
    placeholder="Enter car registration"
    style={{ width: '300px', marginRight: '10px' }}

/>

<Button type="primary" onClick={handleSearch} style={{ marginTop: '10px' }}>
    Search
</Button>
        <legend>Cars list:</legend>

        <Table dataSource={cars}>
  <Table.Column title="Car Name" dataIndex="nomcar" key="nomcar" />
  <Table.Column title="Registration " dataIndex="registration" key="registration" />
  <Table.Column title="Owner name " dataIndex="owner" key="owner" />
  <Table.Column title="Mileage in KM" dataIndex="Mileage" key="Mileage" />
  <Table.Column title="Maintenance details" dataIndex="maintenancedetails" key="maintenancedetails" />
  <Table.Column title="Maintenance Date" dataIndex="DateMaintenance" key="DateMaintenance" />
  <Table.Column title="Position" dataIndex="position" key="position" />

  <Table.Column title="Action" dataIndex="action" key="action"
      render= {(_, record) => (
        <button onClick={() => handleUpdateMaintenance(record)}>Update maintenance</button>
      )} 
  />
</Table>

      </Card>

      <Modal
  title="Update maintenance"
  open={updateMaintenanceVisible}
  onOk={handleUpdateMaintenanceOk}
  onCancel={handleUpdateMaintenanceCancel}
>
  <Form form={form}>
    <Form.Item
      label="Maintenance details"
      name="maintenancedetails"
      rules={[{ required: true, message: 'Please input maintenance details' }]}
      initialValue={selectedCar?.maintenancedetails}
    >
      <Input />
    </Form.Item>
    <Form.Item
    
      label="Maintenance date"
      name="DateMaintenance"
      rules={[{ required: true, message: 'Please input maintenance date' }]}
      initialValue={selectedCar?.DateMaintenance}

    >
          <Input type="date" />

    
    </Form.Item>
    
  </Form>
</Modal>
</>
  );
    
}
export default CarsList;