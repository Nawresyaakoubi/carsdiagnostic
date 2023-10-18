import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserOutlined, UserAddOutlined } from "@ant-design/icons/lib/icons";
import { Layout,  Typography, Avatar, Button } from "antd";
const { Sider, Header } = Layout;
const { Title } = Typography;

const AdministratorComp = ({Children}) => {

 const menuItem=[
    
    {
      path:"/Mechanic",
      name:<b>Mechanic</b>,
      key:'1',

      icon:<UserAddOutlined/>
    },
    {
      path:"/MechanicList",
      name:<b>Mechanics List</b>,
      key:'2',

      icon:<UserAddOutlined/>
    },
    {
      path:"/Client ",
      name:<b>Client</b>,
      key:'3',

      icon:<UserAddOutlined/>,
    },
    {
      path:"/ClientList",
      name:<b>Clients List</b>,
      key:'4',

      icon:<UserAddOutlined/>
    },
   
  ]
  return (
    <>
   <div >
    <Header
        style={{
          zIndex: 999,
          width: "100%",
          backgroundColor: "#00b4d8",
          position: "fixed",
          top: 0, 

        }}
      >
        <img
         style={{ float: "left", width: "60px", height: "60px" }}
          alt=""
          src="/caars.jpg"
          width="35"
          height="35"
          className="d-inline-block align-top"
        />
        <Title
          level={3}
          style={{
            position: "relative",
            color: "white",
            float: "left",
            top: "15px",
            marginLeft: "7px",
          }}
        >
          Cars Diagnostic
        </Title>
        <NavLink to="/">
          <Button
            className='btnLogin-popup'
           
          >
            LogOut
          </Button>
        </NavLink>
      </Header>
      <div className='admin'>
        <div className='sidebar'>
        <div className='top-section'>
     
          <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: "64px",
                bottom: 0,
                backgroundColor: "#00b4d8",
              }}
              width={"255px"}
            >
              <br />
              <Avatar size={120} icon={<UserOutlined />} style={{marginLeft: "20px"}} />
              <br />
              <br />
              <h2 style={{ color: "white" ,marginLeft:"20px"}} >
                Administrator :
              </h2>
  <hr></hr>

              
    
    {
      menuItem.map((item, index)=>(
        <NavLink to={item.path} key={index} className='link' activeclassename='active' >
         <div><div className='icontext' >          </div>
          <div className='icon'>{item.icon}</div></div>
          <div className='link-text'>{item.name} </div>
        </NavLink>
      ))
      }    
 </Sider>
 
    </div>
    <main>{Children}</main>
    </div>
    </div>
 </div>
    </>
  );
}
export default AdministratorComp;
