import React, { useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import {
  addStaff,
  editStaff,
  getStaff,
  staffStatus,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import { Spinner } from "react-bootstrap";
import { Button, Modal, Placeholder } from "rsuite";
import { toast } from "react-toastify";
import "rsuite/Modal/styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { default as ReactSelect } from "react-select";
import { Link } from "react-router-dom";
import { Pagination } from "rsuite";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";
import { Paginate } from "../pagination/Paginate";

function Staff() {
  const [activePage, setActivePage] = React.useState(5);
  const [mapper, setMapper] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [loaders, setLoaders] = useState(false);
  const [loaderss, setLoaderss] = useState(false);
  const [loadersss, setLoadersss] = useState(false);
  const [formData, setFormData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [details, setDetails] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectEditOptions1, setSelectEditOptions1] = useState([]);
  const [staffPage, setStaffPage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [loader, setLoader] = useState(false);
  const [venue, setVenue] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm();

  useEffect(() => {
    staffDetail();
  }, [currentPage]);

  const staffDetail = async () => {
    setLoader(true);
    const { data } = await getStaff({
      page: currentPage,
      pageSize: 10,
      active: false,
    });
    if (!data.error) {
      setMapper(data?.results?.subAdmins);
      setStaffPage(data?.results);
      setLoader(false);
    }
  };

  const totalPages = mapper?.results?.totalPages || 1;
  const users = mapper?.results?.users?.data;
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // staffDetail();
  };

  const [ite, setIte] = useState("");

  const handleCheckboxChange = async (e, ite) => {
    e.preventDefault();

    const newStatus = e.target.checked;

    const editStatus = {
      id: ite?._id,
      // status: newStatus,
    };
    setLoaders(true);
    const response = await staffStatus(editStatus);
    toast.success(response?.data?.message);
    setLoaders(false);
    if (response) {
      staffDetail();
      document.getElementById("closestatus").click();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFormData({ ...formData, uploadImage: event.target.files[0] });
  };

  const options = [
    { value: "dashboard", label: "Dashboard" },
    { value: "Schedule", label: "Schedule" },
    { value: "Booking", label: "Booking" },
    { value: "Courts", label: "Courts" },
    { value: "Customers", label: "Customers" },
    { value: "Events", label: "Events" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Billings", label: "Billings" },
    { value: "Staff", label: "Staff" },
    { value: "Venue Profile", label: "Venue Profile" },
  ];

  const handleChange = (selected) => {
    setSelectOptions({
      optionSelected: selected,
    });
  };

  const onSubmit = async (data) => {
    console.log(data, selectOptions);

    const alldata = new FormData();
    if (formData.uploadImage) {
      alldata.append("image", formData.uploadImage);
    }
    alldata.append("name", data.fullName);
    alldata.append("email", data.email);
    alldata.append("gender", "Male");
    alldata.append("phone_number", data.phoneNumber);
    alldata.append("country_code", "+91");
    alldata.append("password", data.newPassword);
    const optionsSelected = (selectOptions.optionSelected || []).map(
      (item) => item?.value
    );
    alldata.append("modules", JSON.stringify(optionsSelected));

    setLoaderss(true);

    const { datas } = await addStaff(alldata);
    if (!datas?.error) {
      setLoaderss(false);
      staffDetail();
      setOpen(false);
    }
  };

  useEffect(() => {
    reset2({
      fullName: ite.name,
      email: ite.email,
      phoneNumber: ite.phone_number,
    });
    let types = [];
    ite?.modules?.map((itm) => {
      types.push({ value: itm, label: itm });
    });
    setSelectEditOptions1({
      optionSelected: types,
    });
  }, [ite]);

  const handleChangeEdit1 = (selected) => {
    setSelectEditOptions1({
      optionSelected: selected,
    });
  };

  const onSubmit2 = async (data) => {
    console.log(data, selectOptions);
    // setLoading(true);

    const formData = new FormData();

    const alldata = new FormData();
    if (formData.uploadImage) {
      alldata.append("image", formData.uploadImage);
    }
    if (ite?._id) {
      alldata.append("subAdminId", ite._id);
    }
    if (data.fullName) {
      alldata.append("name", data.fullName);
    }
    if (data.email) {
      alldata.append("email", data.email);
    }
    alldata.append("gender", "Male");
    if (data.phoneNumber) {
      alldata.append("phone_number", data.phoneNumber);
    }
    alldata.append("country_code", "+91");
    if (data.newPassword) {
      alldata.append("password", data.newPassword);
    }
    // if (selectEditOptions1.optionSelected.length > 0) {
    //   alldata.append(
    //     "modules",
    //     (selectEditOptions1.optionSelected || []).map((item) => item?.value)
    //   );
    // }
    const optionsSelected = (selectEditOptions1.optionSelected || []).map(
      (item) => item?.value
    );
    alldata.append("modules", JSON.stringify(optionsSelected));
    // alldata.append(
    //   "modules",
    //   (selectEditOptions1.optionSelected || []).map((item) => item?.value)
    // );

    setLoadersss(true);

    const { response } = await editStaff(alldata);

    if (!response?.error) {
      setLoadersss(false);
      staffDetail();
      setOpen2(false);
    }
  };

  return (
    <div className="admin_main ">
      <div className="row">
        <div className="col-2">
          <DeskSidebar />
        </div>

        <div className="admin_main_inner col-10 bg-light p-0">
          <DeskHead />

          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center ">
              <div className="col-12">
                <section class="bookings-container px-0 mb-4">
                  <h2 class="bookings-title">Sub-Admin Management</h2>
                  <div class="emergency-alert-container">
                    <p class="emergency-alert-text" onClick={handleOpen}>
                      {" "}
                      + Sub Admin
                    </p>
                  </div>
                </section>
                <div className="row">
                  <div className="col-10  px-2">
                    <div className="row table_head">
                      <div className="col head-container ">
                        <span class="duration-text ">Name</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col head-container ">
                        <span class="duration-text">Email</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col head-container ">
                        <span class="duration-text">Module</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col head-container ">
                        <span class="duration-text">Phone Number</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                    </div>

                    {loader ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <Spinner className="me-2" />
                        Loading...
                      </div>
                    ) : mapper?.length > 0 ? (
                      mapper?.map((ite) => (
                        <div className="row table_rows">
                          <div className="col">
                            <div class="row-container">
                              <span class="td_data d-flex">
                                <div class="img-icon-container">
                                  <div class="icon-bar"></div>
                                  <div class="icon-circle"></div>
                                </div>
                                {ite?.name}
                              </span>
                            </div>
                          </div>
                          <div className="col">
                            <div class="row-container">
                              <span class="td_data">{ite?.email || ""} </span>
                            </div>
                          </div>
                          {/* <div className="col">
                            <div class="row-container">
                              <span class="td_data">
                                <labels class="modules_label mx-1">
                                  {ite?.modules?.[0]}
                                </labels>
                              </span>
                            </div>
                          </div> */}
                          <div className="col px-0">
                            <div className="row-container">
                              {ite && ite.modules && ite.modules.length > 2 ? (
                                <>
                                  {ite.modules
                                    .slice(0, 2)
                                    .map((module, index) => (
                                      <span className="td_data" key={index}>
                                        <labels className="modules_label mx-1">
                                          {module}
                                        </labels>
                                      </span>
                                    ))}
                                  <span className="td_data">
                                    <labels
                                      className="modules_label mx-1"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      +{ite.modules.length - 2}
                                    </labels>
                                    <ul
                                      class="dropdown-menu"
                                      style={{
                                        listStyleType: "disc",
                                        paddingLeft: "30px",
                                      }}
                                    >
                                      {ite?.modules
                                        ?.slice(2)
                                        ?.map((module, index) => (
                                          <li>
                                            <div class="dropdown-item">
                                              {module}
                                            </div>
                                          </li>
                                        ))}
                                    </ul>
                                  </span>
                                </>
                              ) : (
                                <>
                                  {ite &&
                                    ite.modules &&
                                    ite.modules.map((module, index) => (
                                      <span className="td_data" key={index}>
                                        <labels className="modules_label mx-1">
                                          {module}
                                        </labels>
                                      </span>
                                    ))}
                                </>
                              )}
                            </div>
                          </div>

                          <div className="col text-center">
                            <div class="row-container">
                              <span class="td_data">
                                +91 {ite?.phone_number || ""}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="d-flex align-items-center justify-content-center text-danger mt-5">
                        <strong>No Sub-Admin Found In This Venue...</strong>
                      </div>
                    )}
                  </div>

                  <div
                    className="col  px-2"
                    style={{ display: loader ? "none" : "" }}
                  >
                    <div className="row table_head">
                      <div className="col-6 head-container ">
                        <span class="duration-text">Edit</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col head-container ">
                        <span class="duration-text">Status</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                    </div>
                    {mapper?.map((ite) => (
                      <div
                        className="row table2_rows bg-light"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="col text-center"
                          onClick={() => {
                            handleOpen2();
                            setIte(ite);
                          }}
                        >
                          <div class="row-container">
                            <div
                              style={{
                                position: "relative",
                                left: "10px",
                              }}
                              class="image-wrapper"
                            >
                              <img
                                src="/resources/imgs/editIcon.svg"
                                alt=""
                                class="image"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col ">
                          <div class="row-container">
                            <div
                              style={{
                                position: "relative",
                                left: "30px",
                              }}
                              className=""
                            >
                              <label
                                htmlFor={`status_${ite?._id}`}
                                class="switchUser"
                              >
                                <input
                                  className="d-none"
                                  checked={ite?.status === true}
                                  type="checkbox"
                                  name={`status_${ite?._id}`}
                                  id={`status_${ite?._id}`}
                                  // onChange={(e) => handleCheckboxChange(e, ite)}
                                  onClick={() => setIte(ite)}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModalstaff"
                                />
                                <span class="sliderUser round"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`d-${
                      loader ? "none" : "flex"
                    } align-items-center justify-content-xl-between flex-wrap justify-content-center mt-5 p-3 bg-white`}
                    style={{
                      borderRadius: "2px",
                      // width: "99%",
                      // left: "-14px",
                      position: "relative",
                    }}
                  >
                    <Paginate
                      currentPage={currentPage}
                      totalPages={staffPage?.totalPages || 1}
                      handlePageChange={handlePageChange}
                      hotel={mapper?.length}
                      hotalList={staffPage?.total}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size={"md"} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Sub Admin</Modal.Title>
          <span className="custom-close" onClick={handleClose}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="row form-design desk_modals p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-md-auto" style={{ position: "relative" }}>
              <div
                className="userdetails_img"
                style={{
                  border: "none",
                  borderRadius: "50%",
                  backgroundColor: "#F7F7F8",
                }}
              >
                {selectedImage !== null ? (
                  <img
                    className="rounded-circle"
                    src={selectedImage !== null ? selectedImage : ""}
                    alt=""
                  />
                ) : (
                  <img
                    className="rounded-circle"
                    src={details?.profile_image ? details?.profile_image : ""}
                    alt=""
                  />
                )}
              </div>
              <label
                className="icon-wrapper2"
                htmlFor="upload"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  height: "30px",
                  width: "100px",
                  // background: "#fff",
                  color: "#A39FA4",
                  textAlign: "center",
                  lineHeight: "30px",
                  borderRadius: "50%",
                  // boxShadow: "0 0 6px 3px rgba(68, 102, 242, 0.1)",
                }}
              >
                Add Image
              </label>

              <input
                type="file"
                id="upload"
                name="upload"
                className="d-none"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "uploadImage")}
              />
            </div>

            <div className="form-group col-12">
              <label htmlFor="fullName" className="input-label font-semibold">
                Full Name
              </label>
              <input
                type="text"
                // defaultValue=""
                // disabled={!read}
                name="fullName"
                id="fullName"
                placeholder="Enter Full Name"
                className={classNames("form-control", {
                  "is-invalid": errors?.fullName,
                })}
                {...register("fullName", {
                  // required: "Enter Name*",
                  pattern: {
                    value: /^(?! )[A-Za-z ]+(?<! )$/,
                    message:
                      "Full Name must contain only letters, and should not start or end with white space",
                  },
                  minLength: {
                    value: 3,
                    message: "minimium 3 charcarters",
                  },
                  maxLength: {
                    value: 50,
                    message: "maximum 50 characters allowed",
                  },
                })}
              />
              {errors?.fullName && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.fullName?.message}
                </small>
              )}
            </div>
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold">
                Email
              </label>
              <input
                className={classNames("form-control mb-1  ", {
                  "is-invalid": errors.email,
                })}
                type="text"
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "Email is Required*",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.email?.message}
                </small>
              )}
            </div>
            <div className="form-group col-6">
              <label
                htmlFor="phoneNumber"
                className="input-label font-semibold"
              >
                Phone Number(optional)
              </label>
              <input
                type="text"
                // className="form-control"
                className={classNames("form-control  ", {
                  "is-invalid": errors.companyPhoneNumber,
                })}
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone Number is Required*",
                  pattern: {
                    value: /^[0-9]+$/,
                    message:
                      "Phone number must contain only digits between [0-9]",
                  },
                  maxLength: {
                    value: 10,
                    message: "maximium 10 Charcarters",
                  },
                  minLength: {
                    value: 10,
                    message: "minimium 10 Charcarters",
                  },
                })}
              />
              {errors.phoneNumber && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.phoneNumber?.message}
                </small>
              )}
            </div>
            <div className="form-group col-12">
              <label
                htmlFor="newPassword"
                className="input-label font-semibold"
              >
                Password
              </label>
              <input
                className={classNames("form-control mb-1", {
                  "is-invalid": errors.newPassword,
                })}
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter Your New Password"
                {...register("newPassword", {
                  required: "New Password is required*",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be maximum 20 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]+$/,
                    message:
                      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                  },
                })}
              />
              {errors?.newPassword && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.newPassword?.message}
                </small>
              )}
            </div>
            <div className="form-group col-12">
              <label
                htmlFor="confirmPassword"
                className="input-label font-semibold"
              >
                Confirm Password
              </label>
              <input
                className={classNames("form-control", {
                  "is-invalid": errors.confirmPassword,
                })}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm New Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password*",
                  validate: (value) =>
                    value === watch("newPassword", "") ||
                    "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <small className="errorText mx-1 fw-bold text-danger">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Module
              </label>
              <ReactSelect
                options={options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                // components={{
                //   Option,
                // }}
                onChange={handleChange}
                allowSelectAll={true}
                value={selectOptions?.optionSelected}
              />
            </div>

            <div className="form-group col-3">
              <button
                type={loaderss ? "button" : "submit"}
                className="login-button w-100"
                style={{ cursor: loaderss ? "not-allowed" : "pointer" }}
              >
                {loaderss ? <Spinner /> : <>Save</>}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal size={"md"} open={open2} onClose={handleClose2}>
        <Modal.Header>
          <Modal.Title>Edit Sub Admin</Modal.Title>
          <span className="custom-close" onClick={handleClose2}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="row form-design desk_modals p-4"
            onSubmit={handleSubmit2(onSubmit2)}
          >
            <div className="col-md-auto" style={{ position: "relative" }}>
              <div
                className="userdetails_img"
                style={{
                  border: "none",
                  borderRadius: "50%",
                  backgroundColor: "#F7F7F8",
                }}
              >
                {selectedImage !== null ? (
                  <img
                    className="rounded-circle"
                    src={selectedImage !== null ? selectedImage : ""}
                    alt=""
                  />
                ) : (
                  <img
                    className="rounded-circle"
                    src={ite?.profile_image ? ite?.profile_image : ""}
                    alt=""
                  />
                )}
              </div>
              <label
                className="icon-wrapper2"
                htmlFor="upload"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  height: "30px",
                  width: "100px",
                  // background: "#fff",
                  color: "#A39FA4",
                  textAlign: "center",
                  lineHeight: "30px",
                  borderRadius: "50%",
                  // boxShadow: "0 0 6px 3px rgba(68, 102, 242, 0.1)",
                }}
              >
                Add Image
              </label>

              <input
                type="file"
                id="upload"
                name="upload"
                className="d-none"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "uploadImage")}
              />
            </div>

            <div className="form-group col-12">
              <label htmlFor="fullName" className="input-label font-semibold">
                Full Names
              </label>
              <input
                type="text"
                // defaultValue=""
                // disabled={!read}
                name="fullName"
                id="fullName"
                placeholder="Enter Full Name"
                className={classNames("form-control", {
                  "is-invalid": errors?.fullName,
                })}
                {...register2("fullName", {
                  // required: "Enter Name*",
                  pattern: {
                    value: /^(?! )[A-Za-z ]+(?<! )$/,
                    message:
                      "Full Name must contain only letters, and should not start or end with white space",
                  },
                  minLength: {
                    value: 3,
                    message: "minimium 3 charcarters",
                  },
                  maxLength: {
                    value: 50,
                    message: "maximum 50 characters allowed",
                  },
                })}
              />
              {errors?.fullName && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.fullName?.message}
                </small>
              )}
            </div>
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold">
                Email
              </label>
              <input
                className={classNames("form-control mb-1  ", {
                  "is-invalid": errors.email,
                })}
                type="text"
                placeholder="Enter Your Email"
                {...register2("email", {
                  required: "Email is Required*",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.email?.message}
                </small>
              )}
            </div>
            <div className="form-group col-6">
              <label
                htmlFor="phoneNumber"
                className="input-label font-semibold"
              >
                Phone Number(optional)
              </label>
              <input
                type="text"
                // className="form-control"
                className={classNames("form-control  ", {
                  "is-invalid": errors.companyPhoneNumber,
                })}
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                {...register2("phoneNumber", {
                  required: "Phone Number is Required*",
                  pattern: {
                    value: /^[0-9]+$/,
                    message:
                      "Phone number must contain only digits between [0-9]",
                  },
                  maxLength: {
                    value: 10,
                    message: "maximium 10 Charcarters",
                  },
                  minLength: {
                    value: 10,
                    message: "minimium 10 Charcarters",
                  },
                })}
              />
              {errors.phoneNumber && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors.phoneNumber?.message}
                </small>
              )}
            </div>
            <div className="form-group col-12">
              <label
                htmlFor="newPassword"
                className="input-label font-semibold"
              >
                Password
              </label>
              <input
                className={classNames("form-control mb-1", {
                  "is-invalid": errors.newPassword,
                })}
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter Your New Password"
                {...register2("newPassword", {
                  // required: "New Password is required*",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be maximum 20 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]+$/,
                    message:
                      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                  },
                })}
              />
              {errors?.newPassword && (
                <small className="errorText mx-0 fw-bold text-danger">
                  {errors?.newPassword?.message}
                </small>
              )}
            </div>
            <div className="form-group col-12">
              <label
                htmlFor="confirmPassword"
                className="input-label font-semibold"
              >
                Confirm Password
              </label>
              <input
                className={classNames("form-control", {
                  "is-invalid": errors.confirmPassword,
                })}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm New Password"
                {...register("confirmPassword", {
                  // required: "Please confirm your password*",
                  validate: (value) =>
                    value === watch("newPassword", "") ||
                    "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <small className="errorText mx-1 fw-bold text-danger">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold mb-2">
                Module
              </label>
              <ReactSelect
                options={options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={handleChangeEdit1}
                allowSelectAll={true}
                value={selectEditOptions1?.optionSelected}
              />
            </div>

            <div className="form-group col-3">
              <button
                type={loadersss ? "button" : "submit"}
                className="login-button w-100"
                style={{ cursor: loadersss ? "not-allowed" : "pointer" }}
              >
                {loadersss ? <Spinner /> : <>Save</>}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div
        className="modal fade"
        id="exampleModalstaff"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Status Change Confirmation
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closestatus"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to change the status?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary mt-0"
                data-bs-dismiss="modal"
                style={{ borderRadius: "12px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="login-button mt-0"
                onClick={(e) => !loaders && handleCheckboxChange(e, ite)}
                style={{ cursor: loaders ? "not-allowed" : "pointer" }}
              >
                {loaders ? (
                  <>
                    Wait{" "}
                    <SpinnerIcon
                      pulse
                      style={{ fontSize: "1.5em" }}
                      className="ms-1"
                    />
                    {/* <Spinner
                      style={{
                        height: "1rem",
                        width: "1rem",
                      }}
                    /> */}
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
