import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import "../../assests/css/global.css";
import { apiNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";
import "./Device.css";

function Device() {
  const [newDeviceLists, setNewDeviceLists] = useState([]);
  const [availableDevicesPopup, setAvailableDevicesPopup] = useState(false);
  const [id, setId] = useState("");
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [lines, setLines] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    newDevices();
  }, []);

  const newDevices = () => {
    Apiservice.getLists(apiNames.deviceLists) //newDeviceLists
      .then((res) => {
        console.log(res);
        if (res.length === 0) {
          setNewDeviceLists([]);
        } else {
          setNewDeviceLists(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateSwitchType = () => {
    // let descObj = {
    //   description: {
    //     lines: lines,
    //   },
    // };
    // Apiservice.addLines(`${apiNames.lines}${id}`, descObj)
    //   .then((response) => {
    //     //console.log(response);
    //     setShowDeviceDetails(false);
    //     newDevices();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const showDeviceData = (details, desc, Id, index) => {
    if (details.deviceName !== null) {
      setDeviceName(details.deviceName);
    } else if (details.deviceName === null) {
      setDeviceName(`Device ${index + 1}`);
    }

    setId(Id);
    setShowDeviceDetails(true);
    let json = JSON.parse(desc);
    let description = JSON.parse(details.description);
    setLines(json.lines);
    setModalData(description);
  };

  const onChangeType = (e, inputIndex) => {
    const { value } = e.target;
    setLines((type) =>
      type?.map((list, index) =>
        index === inputIndex ? { ...list, type: value } : list
      )
    );
  };

  const onChangeName = (e, inputIndex) => {
    const { value } = e.target;
    setLines((name) =>
      name?.map((list, index) =>
        index === inputIndex ? { ...list, name: value } : list
      )
    );
  };

  const changeDeviceName = (e) => {
    setDeviceName(e.target.value);
  };

  const changeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <label className="ModuleHeading">Device lists</label>
        </div>

        <div className="col-6 text-end">
          <div>
            <Icon
              icon="fa:plus-circle"
              color="#2596be"
              width="35"
              height="35"
              className="pointer"
              onClick={() => {
                setAvailableDevicesPopup(true);
              }}
            />
          </div>
        </div>
      </div>

      <div className="row text-center">
        {newDeviceLists &&
          newDeviceLists.map((deviceDetails, index) => (
            <div
              key={`${deviceDetails.id}${index}`}
              className="col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3 mt-3"
            >
              <div
                onClick={() =>
                  showDeviceData(
                    deviceDetails,
                    deviceDetails.description,
                    deviceDetails.id,
                    index
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <div className="card mt-3">
                  <div className="card-body FormContent">
                    <p>ID : {deviceDetails.deviceId}</p>
                    {deviceDetails.deviceName ? (
                      <p>Name : {deviceDetails.deviceName}</p>
                    ) : (
                      <p>Name : Device {index + 1}</p>
                    )}
                    <p>Mac ID : {JSON.parse(deviceDetails.description)?.mac}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Modal
        title={<label className="FormHeading">Device details</label>}
        centered
        open={showDeviceDetails}
        onOk={() => setShowDeviceDetails(false)}
        onCancel={() => setShowDeviceDetails(false)}
        width={600}
        footer={null}
        maskClosable={false}
        //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
      >
        <div className="row col-12">
          <div className="form-group">
            <>
              <div>
                <div
                  className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-3"
                  style={{ cursor: "pointer" }}
                >
                  <div className="card mt-1">
                    <div className="card-body FormContent">
                      {modalData && (
                        <>
                          <div className="row mt-2 align-items-center">
                            <div className="col-3 FormContent">
                              Device name :
                            </div>
                            <div className="col-9 FormContent">
                              <input
                                type={"text"}
                                value={deviceName}
                                placeholder="Enter device name"
                                className="form-control"
                                onChange={changeDeviceName}
                              />
                            </div>
                          </div>

                          <div className="row mt-3 align-items-center">
                            <div className="col-3 FormContent">Channels :</div>
                            <div className="col-9 FormContent">
                              {modalData.name}
                            </div>
                          </div>

                          <div className="row mt-2 align-items-center">
                            <div className="col-3 FormContent">Room name :</div>
                            <div className="col-9 FormContent">
                              <input
                                type={"text"}
                                value={roomName}
                                placeholder="Enter room name"
                                className="form-control"
                                onChange={changeRoomName}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* {Object.keys(lines).map((item, index) => (
                        <div
                          key={`${lines[item].Id}${index}`}
                          className="row mt-3 mb-3 align-items-center"
                        >
                          <div className="col-2 mt-2">Line {index + 1} :</div>
                          <div className="col-4 mt-2">
                            <input
                              name="line"
                              value={lines[item].type}
                              type="text"
                              className="form-control"
                              onChange={(e) => onChangeType(e, index)}
                            />
                          </div>
                          <div className="col-2 mt-2">Place :</div>
                          <div className="col-4 mt-2">
                            <input
                              name="line"
                              value={lines[item].name}
                              type="text"
                              className="form-control"
                              onChange={(e) => onChangeName(e, index)}
                            />
                          </div>
                        </div>
                      ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>

          <div className="text-center mt-2 pt-2">
            <button
              type="button"
              onClick={updateSwitchType}
              className="btn btn-sm btn-outline-primary"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        title={<label className="FormHeading">Add device</label>}
        centered
        open={availableDevicesPopup}
        onOk={() => setAvailableDevicesPopup(false)}
        onCancel={() => setAvailableDevicesPopup(false)}
        width={300}
        footer={null}
        maskClosable={false}
        //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
      >
        <div className="row pb-1 color text-center">
          <div className="card">
            <div className="card-body">
              {/* {newDeviceLists.length === 0 ? ( */}
              {/* <div className="col-12">
                  <p className="FormContent">No devices found</p>
                </div> */}
              {/* ) : ( */}
              <>
                <div className="col-12">
                  <div className="FormContent">ID: {newDeviceLists.id}</div>
                  <div className="mt-1 FormContent">
                    Name: {newDeviceLists.name}
                  </div>
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-sm btn-outline-primary">
                    Setup
                  </button>
                </div>
              </>
              {/* )} */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Device;
