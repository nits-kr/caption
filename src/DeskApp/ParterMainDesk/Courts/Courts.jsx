import React, { useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import {
  addCourt,
  changeCourtStatus,
  createTournament,
  getCourtById,
  getCourts,
  getSports,
  staffStatus,
  updateCourt,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Button, Modal, Placeholder } from "rsuite";
import { default as ReactSelect } from "react-select";
import { Slider, RangeSlider, Row, Col } from "rsuite";
import "rsuite/dist/rsuite.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import { useForm } from "react-hook-form";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";
import { Paginate } from "../pagination/Paginate";
import InfiniteScroll from "react-infinite-scroll-component";

function Courts() {
  const [mapper, setMapper] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [loadersss, setLoadersss] = useState(false);
  const [itemId, setItemId] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const venueId = localStorage?.getItem("venueId");

  const [endTime, setEndTime] = useState(null);
  const [selectedHand, setSelectedHand] = useState(null);
  const [ageRange, setAgeRange] = useState([25, 75]);
  const [playerLevel, setPlayerLevel] = useState([2, 3]);
  const [sports, setSports] = useState([]);

  const [courtPage, setcourtPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const formattedEndTime = endTime ? endTime.format("h:mm A") : "None";

  const handleTimeChange = (value) => {
    setEndTime(value);
  };

  const [startTime, setStartTime] = useState(null);

  const formattedStartTime = startTime ? startTime.format("h:mm A") : "None";

  const handleTimeChangestart = (value) => {
    // 'value' will be a moment.js object representing the selected time
    setStartTime(value);
  };
  console.log("venueId", venueId);

  const handleAgeRangeChange = (value) => {
    setAgeRange(value);
  };

  const handlePlayerLevelChange = (value) => {
    setPlayerLevel(value);
  };

  console.log("selectedHand", selectedHand);

  const handleHandSelection = (hand) => {
    setSelectedHand(hand);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    handleSports();
  }, []);

  useEffect(() => {
    if (venueId) {
      handleCourts(venueId);
    }
  }, [venueId, currentPage]);

  const handleCourts = async (id) => {
    setLoader(true);
    const datas = { id, page: currentPage, pageSize: 10 };
    const res = await getCourts(datas);

    setLoader(false);
    setMapper(res?.data?.results?.courts);
    setcourtPage(res?.data?.results);
  };

  const totalPages = mapper?.results?.totalPages || 1;
  const users = mapper?.results?.users?.data;
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // handleCourts();
  };
  const handleSports = async (id) => {
    const res = await getSports({ id });
    console.log("res", res);

    setSports(res?.data?.results?.sports);
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
    const response = await changeCourtStatus(editStatus);
    toast.success(response?.data?.message);
    setLoaders(false);
    if (response) {
      handleCourts(venueId);
      document.getElementById("closestatus").click();
    }
  };

  const onSubmit = async (data) => {
    const alldata = new FormData();

    // if (formData.uploadImage) {
    //   alldata.append("image", formData.uploadImage);
    // }

    if (data.name) {
      alldata.append("name", data.name);
    }

    if (data.price) {
      alldata.append("price", data.price);
    }

    alldata.append(
      "sport",
      selectedCategoryId ? selectedCategoryId : itemId?.sport?._id
    );

    if (data.roofing) {
      alldata.append("roofing", data.roofing);
    }

    if (data.flooring) {
      alldata.append("flooring", data.flooring);
    }

    alldata.append("lighting", data?.lighting ? true : false);

    console.log("data?.lighting", data?.lighting);

    if (data.sport) {
      alldata.append("sport", data.sport);
    }
    if (itemId?._id) {
      alldata.append("courtId", itemId?._id);
    }

    setLoadersss(true);
    const { datas } = itemId?._id
      ? await updateCourt(alldata)
      : await addCourt(alldata);
    setLoadersss(false);

    if (!datas?.error) {
      handleCourts(venueId);
      setOpen(false);
    }
  };
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const [details, setDetails] = useState("");
  const courtBylId = async (ite) => {
    setLoaders(true);
    const { data } = await getCourtById({
      id: ite?._id,
    });
    if (!data.error) {
      // setDetails(data?.results?.events);
      setLoaders(false);
      const CourtData = data?.results?.court;
      setDetails(data?.results?.court);
      reset({
        name: CourtData?.name,
        selectedCategoryId: CourtData?.sport?._id,
        roofing: CourtData?.roofing,
        price: CourtData?.price,
        flooring: CourtData?.flooring,
        lighting: CourtData?.lighting,
      });
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
                <section class="bookings-container px-0 mb-5">
                  <h2 class="bookings-title">All Courts</h2>
                  <div class="add-booking-button">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb614a51014fcf838754465a6c3fbfecd2bd4135bc1afff89d15c2afa4fe9d38?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                      alt="Add Booking Icon"
                      class="add-booking-icon"
                    />
                    <div class="add-booking-text" onClick={handleOpen}>
                      Add Courts
                    </div>
                  </div>
                </section>

                <div className="row">
                  <div className="col-10  px-2">
                    <div className="row table_head">
                      <div className="col-1 head-container ">
                        <span class="duration-text ">Name</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Sports</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Roofing</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Flooring</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Lighting</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-1 head-container ">
                        <span class="duration-text">Price</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-1 head-container ">
                        <span class="duration-text">Rating</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                    </div>

                    {mapper?.length > 0 ? (
                      mapper?.map((ite) => (
                        <div className="row table_rows">
                          <div className="col-1">
                            <div class="row-container">
                              <span class="td_data">{ite?.name || ""} </span>
                            </div>
                          </div>
                          <div className="col-2">
                            <div class="row-container">
                              <span class="td_data">
                                {ite?.sport?.name_en || ""}{" "}
                              </span>
                            </div>
                          </div>
                          <div className="col-2">
                            <div class="row-container">
                              <span class="td_data">{ite?.roofing || ""} </span>
                            </div>
                          </div>

                          <div className="col-2">
                            <div class="row-container">
                              <span class="td_data">
                                {ite?.flooring || ""}{" "}
                              </span>
                            </div>
                          </div>
                          <div className="col-2">
                            <div class="row-container">
                              <span
                                style={{
                                  position: "relative",
                                  left: "30px",
                                }}
                                class="td_data"
                              >
                                {ite?.lighting === true ? (
                                  <img
                                    src="/resources/imgs/light.svg"
                                    alt="Star icon"
                                    class="gps-icon"
                                  />
                                ) : (
                                  "..."
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="col-1 text-center">
                            <div class="row-container">
                              <span
                                style={{
                                  position: "relative",
                                  left: "30px",
                                }}
                                class="td_data"
                              >
                                {ite?.price ? `$${ite.price}` : "..."}
                              </span>
                            </div>
                          </div>
                          <div className="col-2 text-center">
                            <div class="row-container">
                              <span class="td_data">
                                {ite?.rating ? ite?.rating : "..."}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="d-flex align-items-center justify-content-center text-danger mt-5">
                        <strong>No Data Found In This Venue</strong>
                      </div>
                    )}
                  </div>

                  <div className="col-2  px-2">
                    <div className="row table_head">
                      <div className="col-6 head-container ">
                        <span class="duration-text">Action</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-6 head-container ">
                        <span class="duration-text">Status</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                    </div>
                    {mapper?.map((ite) => (
                      <div className="row table2_rows bg-light">
                        <div className="col-6 text-center">
                          <div class="row-container">
                            <div
                              style={{
                                position: "relative",
                                left: "10px",
                              }}
                              class="image-wrapper"
                              onClick={() => {
                                courtBylId(ite);
                                handleOpen();
                                setItemId(ite);
                              }}
                            >
                              <img
                                src="/resources/imgs/editIcon.svg"
                                alt=""
                                class="image"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6 ">
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
                                className="switchUser"
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
                                  data-bs-target="#exampleModalcourt"
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
                      totalPages={courtPage?.totalPages || 1}
                      handlePageChange={handlePageChange}
                      hotel={mapper?.length}
                      hotalList={courtPage?.total}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalcourt"
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
                  <Spinner
                    style={{
                      height: "1rem",
                      width: "1rem",
                    }}
                  />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal size={"md"} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <strong>{itemId?._id ? "Update Court" : "Add Courts"} </strong>{" "}
          </Modal.Title>
          <span className="custom-close" onClick={handleClose}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="row form-design desk_modals p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group col-6">
              <label htmlFor="name" className="input-label font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter name..."
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>
            <div className="form-group col-6">
              <label htmlFor="sports" className="input-label font-semibold">
                Sports
              </label>
              <select
                className="form-select py-2 "
                aria-label="Default select example"
                value={selectedCategoryId}
                {...register("selectedCategoryId", {
                  required: "Sports is Required*",
                })}
                onChange={handleCategoryChange}
                style={{
                  height: "50px",
                  backgroundColor: "rgba(247, 248, 249, 1)",
                  marginTop: "12px",
                }}
              >
                <option value="">Select Sports</option>
                {sports?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name_en}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-6">
              <label htmlFor="roofing" className="input-label font-semibold">
                Roofing
              </label>
              <input
                type="text"
                id="roofing"
                name="roofing"
                className="form-control"
                placeholder="Enter roofing..."
                {...register("roofing", { required: "Roofing is required" })}
              />
              {errors.roofing && (
                <p className="text-danger">{errors.roofing.message}</p>
              )}
            </div>
            <div className="form-group col-6">
              <label htmlFor="flooring" className="input-label font-semibold">
                flooring
              </label>
              <input
                type="text"
                id="flooring"
                name="flooring"
                className="form-control"
                placeholder="Enter flooring..."
                {...register("flooring", { required: "Flooring is required" })}
              />
              {errors.flooring && (
                <p className="text-danger">{errors.flooring.message}</p>
              )}
            </div>

            <div className="form-group col-6">
              <label htmlFor="price" className="input-label font-semibold">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className="form-control"
                placeholder="Enter price..."
                {...register("price", {
                  required: "Price is required",
                })}
              />
              {errors.price && (
                <p className="text-danger">{errors.price.message}</p>
              )}
            </div>

            <div className="form-group col-6">
              <label htmlFor="lighting" className="input-label font-semibold">
                Lighting
              </label>
              <div class="row-container form-control bg-white">
                <div className="">
                  <label htmlFor="status" className="switchUser">
                    <input
                      className="d-none"
                      defaultChecked={details?.lighting}
                      type="checkbox"
                      name="status"
                      id="status"
                      {...register("lighting")}
                    />
                    <span class="sliderUser round"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* <div className="form-group col-12">
              <label
                htmlFor="playerLevel"
                className="input-label font-semibold mb-4"
              >
                Level Range (Optional)
              </label>
              <RangeSlider
                min={1}
                step={0.5}
                max={7}
                defaultValue={[1, 2]}
                horizontal
                graduated
                onChange={handlePlayerLevelChange}
              />
            </div>

            <div className="form-group col-12">
              <label
                htmlFor="ageRange"
                className="input-label font-semibold mb-4"
              >
                Age Range (Optional)
              </label>
              <div>
                <RangeSlider value={ageRange} onChange={handleAgeRangeChange} />
              </div>
            </div> */}

            {/* <div className="form-group col-12">
              <label htmlFor="date" className="input-label font-semibold">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="text-danger">{errors.date.message}</p>
              )}
            </div>

            <div className="form-group col-6">
              <label htmlFor="startTime" className="input-label font-semibold">
                Start Time
              </label>
              <TimePicker
                className="form-control"
                format="h:mm a"
                showSecond={false}
                inputReadOnly={true}
                onChange={handleTimeChangestart}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="endTime" className="input-label font-semibold">
                End Time
              </label>
              <TimePicker
                className="form-control"
                format="h:mm a"
                showSecond={false}
                inputReadOnly={true}
                onChange={handleTimeChange}
              />
            </div> */}

            <div className="form-group col-3">
              <button
                type={loadersss ? "button" : "submit"}
                className="login-button w-100"
                style={{ cursor: loadersss ? "not-allowed" : "pointer" }}
              >
                {loadersss ? (
                  <div className="icon-example-list">
                    Wait{" "}
                    <SpinnerIcon
                      pulse
                      style={{ fontSize: "1.5em" }}
                      className="ms-1"
                    />
                  </div>
                ) : (
                  <>{itemId?._id ? "Update" : "Send Request"}</>
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default Courts;
