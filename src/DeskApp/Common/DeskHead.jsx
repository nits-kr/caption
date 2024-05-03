import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAdminData } from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import { Button, Modal, Placeholder } from "rsuite";
import { toast } from "react-toastify";

export const DeskHead = () => {
  const [imageFile, setImageFile] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAdminValue();
  }, []);

  const getAdminValue = async () => {
    const { data } = await getAdminData();
    if (!data.error) {
      if (data?.results?.partner?.profile_image) {
        setImageFile(data?.results?.partner?.profile_image);
      }
    }
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("*");
  };
  return (
    <>
      <div class="navbar">
        <div class="">
          <div class="d-flex">
            <img
              src="/resources/imgs/search.svg"
              alt="Search icon"
              class="search-icon "
            />
            <input class="effect-9" type="text" placeholder="Search or type" />
            <span class="focus-border" />
            <i></i>
          </div>
        </div>
        <div class="user-actions">
          <img
            src="/resources/imgs/message.svg"
            alt="Notification icon"
            class="settings-icon"
          />
          <img
            src="/resources/imgs/bell.svg"
            alt="Settings icon"
            class="settings-icon"
          />

          <div class="dropdown">
            <img
              src={
                imageFile
                  ? imageFile
                  : "https://cdn.builder.io/api/v1/image/assets/TEMP/50a8ccbfabcffeae982bd79087e1c067eec180be9faae3d25074ad038c6930d3?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
              }
              alt="User profile picture"
              className="user-profile-picture dropdown-toggle rounded-circle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              height={48}
              width={48}
            />
            <ul class="dropdown-menu">
              <li>
                <Link class="dropdown-item" to="/app/partner/profile">
                  My Profile
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/app/partner/setting">
                  Settings
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/app/partner/changelanguage">
                  Choose Language
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/app/partner/aboutus">
                  About Us
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/app/partner/terms">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/app/partner/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/app/partner/help">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="#" onClick={handleOpen}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal
        size={"sm"}
        open={open}
        onClose={handleClose}
        // style={{ width: "537px" }}
      >
        <Modal.Header>
          <Modal.Title></Modal.Title>
          <span className="custom-close" onClick={handleClose}>
            {/* <img width={60} src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body className="d-flex align-items-center justify-content-center">
          <div className="">
            <h1 className="appModalHeader">
              <img width={350} src="/resources/imgs/appCome.svg" />
            </h1>
            <form className="  mt-5 logout_modal">
              <div className=" text-center title">Comeback Soon!</div>
              <div className=" text-center info">
                You are about to logout. Are you sure this is what you want?
              </div>
              <div className="form-group col-12 mt-4 d-flex justify-content-between">
                <button
                  onClick={() => setOpen(false)}
                  className="comman_btn2"
                  style={{ width: "46%" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="login-button"
                  style={{ width: "46%" }}
                >
                  Confirm Logout
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
