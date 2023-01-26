import { Card, Col, Tabs } from "antd";
import { Icon } from "@iconify/react";
import { useState } from "react";
import "../../assests/css/global.css";
import "./Bottommenu.scss";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../routes/routeNames";

const App = () => {
  const [listShow, setListShow] = useState(false);
  const [addLists, setAddList] = useState([
    "Add Device",
    "Add new Room/Zone",
    "Sort Zone/Room",
  ]);
  const [icons, setIcons] = useState([
    <Icon icon="ic:round-device-hub" inline={true} />,
    <Icon icon="ic:baseline-meeting-room" inline={true} />,
    <Icon icon="mdi:sort-calendar-descending" inline={true} />,
  ]);
  const [settingLists, setSettingList] = useState([
    "Account",
    "Device List",
    "Bridge Details",
  ]);
  const [settingIcons, setSettingIcons] = useState([
    <Icon icon="ic:baseline-account-circle" />,
    <Icon icon="ic:round-device-hub" inline={true} />,
    <Icon icon="tabler:list-details" />,
  ]);
  const navigate = useNavigate();

  const showAddList = () => {
    setListShow(!listShow);
  };

  const addDevice = () => {
    alert("device list page");
  };

  const showDeviceList = (id, list) => {
    console.log(list, id);
    navigate(routeNames.device);
    // navToDeviceList(`${routeNames.dashboard}${routeNames.device}`)
  };

  const items = [
    {
      label: "Home",
      key: 1,
      children: (
        <div className="container">
          <div className=" mt-3">
            <h3 className="ModuleHeading" style={{ cursor: "pointer" }}>
              SynalTech
            </h3>
          </div>
          <div className="row ">
            <div className="col-12">
              <div className="text-end">
                <Icon
                  icon="fa:plus-circle"
                  color="#2596be"
                  width="35"
                  height="35"
                  className="pointer"
                  onClick={showAddList}
                />
              </div>
              {listShow ? (
                <div className="row">
                  {icons.map((icon, iconIndex) => (
                    <div key={iconIndex} className="col-sm-12 col-md-4 mt-3">
                      {addLists.map(
                        (list, listIndex) =>
                          iconIndex === listIndex && (
                            <Card
                              key={listIndex}
                              cover
                              hoverable
                              style={{
                                width: 350,
                              }}
                              onClick={addDevice}
                            >
                              <div className="row">
                                <div className="col-9">
                                  <p className="hoverLink FormContent m-0">
                                    {icon}&nbsp;&nbsp;&nbsp;{list}
                                  </p>
                                </div>
                                <div className="col-3 text-end">
                                  {/* <Icon
                                    icon="fa:plus-circle"
                                    color="#2596ba"
                                    width="25"
                                    height="25"
                                    className="pointer"
                                  /> */}
                                </div>
                              </div>
                            </Card>
                          )
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Automation",
      key: 2,
      children: (
        <div className="container">
          <div className=" mt-3">
            <h3 className="ModuleHeading" style={{ cursor: "pointer" }}>
              Automation
            </h3>
          </div>
        </div>
      ),
    },
    {
      label: "Settings",
      key: 3,
      children: (
        <div className="container">
          <div className=" mt-3">
            <h3 className="ModuleHeading" style={{ cursor: "pointer" }}>
              Settings
            </h3>
          </div>
          <div className="row">
            {settingLists.map((settingList, listIndex) => (
              <div
                key={listIndex}
                className="col-sm-12 col-md-4 mt-3"
                onClick={(e) => showDeviceList(listIndex, settingList)}
              >
                {settingIcons.map(
                  (settingIcon, iconIndex) =>
                    listIndex === iconIndex && (
                      <Card
                        key={iconIndex}
                        cover
                        hoverable
                        style={{
                          width: 350,
                        }}
                      >
                        <p className="hoverLink FormContent m-0">
                          {settingIcon}&nbsp;&nbsp;&nbsp;{settingList}
                        </p>
                      </Card>
                    )
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Tabs
        className="min-vh-100"
        tabPosition="bottom"
        size="large"
        centered
        items={items}
      />
    </>
  );
};
export default App;