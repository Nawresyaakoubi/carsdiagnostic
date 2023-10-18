import React, {useState, useEffect} from 'react';
import "antd/dist/antd.css";
import useEth from "../../contexts/EthContext/useEth";
import { Card, message, Table} from "antd";
import ClientComp from '../ClientComp/ClientComp'
function CarssList () {
  const { state: { contract, accounts } } = useEth();
  const [cars, setCars] = useState([]);
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
  <legend>Cars list:</legend>
 
 <Table dataSource={cars}>
<Table.Column title="Car Name" dataIndex="nomcar" key="nomcar" />
<Table.Column title="Registration " dataIndex="registration" key="registration" />
<Table.Column title="Owner name " dataIndex="owner" key="owner" />
<Table.Column title="Mileage in KM" dataIndex="Mileage" key="Mileage" />
<Table.Column title="Maintenance details" dataIndex="maintenancedetails" key="maintenancedetails" />
<Table.Column title="Maintenance Date" dataIndex="DateMaintenance" key="DateMaintenance" />
<Table.Column title="Position" dataIndex="position" key="position" />
</Table>
</Card>
         </>
  );
    
}
export default CarssList;