import {  Outlet, useNavigate } from "react-router";
import React, { useState } from "react";
import {
  DatabaseOutlined,
  DeploymentUnitOutlined,
  FundOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";


import { routeNames } from "../../routes/routeNames";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
const navigate =useNavigate();

  return (
    <>
      {/* <p className="bg-dark text-white p-3">Snail Tech</p>  */}

      <Layout className="min-vh-100" >
        <Sider trigger={null} collapsible collapsed={collapsed} >
          <div className="logo" />
          <Menu
            style = {{fontSize:"16px"}}
            onClick ={({key})=>{
              if (key === "logout") {
                navigate(routeNames.auth.logout)
              } else {
                navigate(key)
              }
            }
          }
            theme="dark"
            mode="inline" 
            defaultSelectedKeys={[`${routeNames.dashboard}${routeNames.synaltech}`]}
            items={[
              {
                key:`${routeNames.dashboard}${routeNames.synaltech}`,
                icon:<DeploymentUnitOutlined />,
                label: "Synal Tech",
              },
              {
                key: `${routeNames.dashboard}${routeNames.device}`,
                icon: <DatabaseOutlined />,
                label: "Device",
              },
              {
                key: `${routeNames.dashboard}${routeNames.switchbox}`,
                icon: <PieChartOutlined />,
                label: "SwitchBox",
              },
              {
                key: `${routeNames.dashboard}${routeNames.mapping}`,
                icon: <FundOutlined />,
                label: "Mapping",
              },
              {
                key: `${routeNames.dashboard}${routeNames.settings}`,
                icon: <SettingOutlined/>,
                label: "Settings",
              },
              {
                key: `${routeNames.auth.logout}`,
                icon: <LogoutOutlined />,
                label: "Logout",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              margin:0,
              paddingLeft:3,
              fontSize:25,
              background: colorBgContainer,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 385,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    {/* <p className="bg-dark text-white p-3">Footer</p>  */}
    </>
  );
};

export default Dashboard;
