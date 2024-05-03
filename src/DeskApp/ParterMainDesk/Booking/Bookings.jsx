import React, { useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import {
  createEmergencyAlert,
  gameEmergencyAlert,
  getBookingById,
  getBookings,
  getUpcomingMatches,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { Button, Modal, Placeholder } from "rsuite";
import { toast } from "react-toastify";
import "rsuite/Modal/styles/index.css";
import { useForm } from "react-hook-form";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";
import { DateRangePicker, Stack } from "rsuite";
import { Paginate } from "../pagination/Paginate";

function Bookings() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [loaderss, setLoaderss] = useState(false);
  const [loadersss, setLoadersss] = useState(false);
  const [booking, setBooking] = useState([]);
  const [details, setDetails] = useState("");
  const [upcomingMatches, setUpcomingMatch] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingPage, setbookingPage] = useState("");

  const initialRenderData = booking?.[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const allData = {
      name_en: "Paddle Championship",
      name_gr: "Paddle Championship",
      level: 1,
      date: "04-22-2024",
      start_time: "12:00 PM",
      end_time: "02:00 PM",
      venueId: "660bdd300d222b56980b9ab5",
      organizer_name: "Abc",
      organizer_contact: "",
      gender: "All",
      age_range: [10, 20],
    };
    console.log(data);
    const res = await createEmergencyAlert(allData);
    console.log("res", res);
  };

  useEffect(() => {
    bookingDetail();
    getUpcomingMatchesdetails();
  }, [currentPage]);

  const bookingDetail = async () => {
    setLoader(true);
    const { data } = await getBookings({ page: currentPage, pageSize: 10 });
    if (!data.error) {
      setBooking(data?.results?.matches);
      setbookingPage(data?.results);
      setLoader(false);
    }
  };

  const totalPages = booking?.results?.totalPages || 1;
  const users = booking?.results?.users?.data;
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // bookingDetail();
  };
  const getUpcomingMatchesdetails = async () => {
    setLoaderss(true);
    const { data } = await getUpcomingMatches();
    if (!data.error) {
      setUpcomingMatch(data?.results?.matches);
      setLoaderss(false);
    }
  };

  // const handleClick = (ite) => {
  //   setcustomerid(ite?._id);
  // };

  // const [customerid, setcustomerid] = useState("");
  // useEffect(() => {
  //   if (customerid) {
  //     customerDetailId(customerid);
  //   }
  // }, [customerid]);

  const customerDetailId = async (ite) => {
    setLoaders(true);
    const { data } = await getBookingById({
      id: ite?._id,
    });
    if (!data.error) {
      setDetails(data?.results?.match);
      setLoaders(false);
    }
  };

  const handleSend = async (selectedValue) => {
    setLoadersss(true);
    if (!selectedValue) {
      toast.error("Please select an option");
      return;
    }
    setSelectedOption(selectedValue);

    const { res } = await gameEmergencyAlert({ matchId: selectedValue });

    if (!res?.error) {
      setOpen(false);
      setLoadersss(false);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpen1 = () => {
    setShowModal(true);
  };

  const handleClose1 = () => {
    setShowModal(false);
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
              <div className="col-9 ">
                <section class="bookings-container">
                  <h2 class="bookings-title">Bookings</h2>
                  <div class="emergency-alert-container">
                    <p class="emergency-alert-text" onClick={handleOpen}>
                      Emergency Alert
                    </p>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/596d3320f6cbeadf3af157c57f9a764d36f64ebe91d7e03138c3ec8cc9d51602?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                      alt=""
                      class="emergency-alert-icon"
                      // onClick={handleOpen1}
                    />
                  </div>
                </section>
                <div class=" row">
                  <article class="padel-card col-1">
                    <div class="padel-card-content">
                      <header class="padel-card-header">
                        <h3 class="padel-card-title">Padel</h3>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e62b7be967d6927228e80d0d62a3e499ebeda95e56cf68e0b8cf1dd063cb9d2f?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Padel icon"
                          class="padel-card-icon"
                        />
                      </header>
                    </div>
                  </article>
                  <article class="padel-card col-1">
                    <div class="padel-card-content">
                      <header class="padel-card-header">
                        <h3 class="padel-card-title">Padel</h3>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e62b7be967d6927228e80d0d62a3e499ebeda95e56cf68e0b8cf1dd063cb9d2f?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Padel icon"
                          class="padel-card-icon"
                        />
                      </header>
                    </div>
                  </article>
                  <article class="padel-card col-1">
                    <div class="padel-card-content">
                      <header class="padel-card-header">
                        <h3 class="padel-card-title">Padel</h3>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e62b7be967d6927228e80d0d62a3e499ebeda95e56cf68e0b8cf1dd063cb9d2f?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Padel icon"
                          class="padel-card-icon"
                        />
                      </header>
                    </div>
                  </article>
                  <article class="padel-card col-1">
                    <div class="padel-card-content">
                      <header class="padel-card-header">
                        <h3 class="padel-card-title">Padel</h3>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e62b7be967d6927228e80d0d62a3e499ebeda95e56cf68e0b8cf1dd063cb9d2f?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Padel icon"
                          class="padel-card-icon"
                        />
                      </header>
                    </div>
                  </article>
                  <article class="padel-card col-1">
                    <div class="padel-card-content">
                      <header class="padel-card-header">
                        <h3 class="padel-card-title">Padel</h3>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e62b7be967d6927228e80d0d62a3e499ebeda95e56cf68e0b8cf1dd063cb9d2f?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Padel icon"
                          class="padel-card-icon"
                        />
                      </header>
                    </div>
                  </article>
                </div>
                <div className="col-12 comman_table_design px-0 ">
                  <div className="">
                    <div className="row table_head">
                      <div className="col-2 head-container ">
                        <span class="duration-text">Type</span>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d191f671357fe0e0ef691f50e92f6a7d3e6f1002e8c32e60ae0b1eb5f335033?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Courts</span>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d191f671357fe0e0ef691f50e92f6a7d3e6f1002e8c32e60ae0b1eb5f335033?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Date</span>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d191f671357fe0e0ef691f50e92f6a7d3e6f1002e8c32e60ae0b1eb5f335033?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Duration</span>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d191f671357fe0e0ef691f50e92f6a7d3e6f1002e8c32e60ae0b1eb5f335033?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Status</span>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d191f671357fe0e0ef691f50e92f6a7d3e6f1002e8c32e60ae0b1eb5f335033?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Price</span>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d191f671357fe0e0ef691f50e92f6a7d3e6f1002e8c32e60ae0b1eb5f335033?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
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
                    ) : booking?.length > 0 ? (
                      booking?.map((ite, ind) => {
                        return (
                          <div
                            className="row table_rows pointer"
                            key={ind}
                            onClick={() => {
                              customerDetailId(ite);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="col-2">
                              <div class="row-container">
                                <span class="td_data">
                                  {ite?.bookingType || ""}{" "}
                                </span>
                              </div>
                            </div>
                            <div className="col-2">
                              <div class="row-container">
                                <span class="td_data">
                                  {ite?.courts?.name || "..."}{" "}
                                </span>
                              </div>
                            </div>
                            <div className="col-2">
                              <div class="row-container">
                                <span class="td_data">
                                  {moment(ite?.date).format("DD MMMM YYYY")}
                                </span>
                              </div>
                            </div>

                            <div className="col-2">
                              <div class="row-container">
                                <span class="td_data">
                                  {ite?.start_time} - 12:30Am
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
                                  {ite?.status === true
                                    ? "Checkeed In"
                                    : "Checkeed Out"}
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
                                  ${ite?.entry_price || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="d-flex align-items-center justify-content-center text-danger mt-5">
                        <strong>No Data Found In This Venue</strong>
                      </div>
                    )}
                  </div>
                  <div
                    className={`d-${
                      loader ? "none" : "flex"
                    } align-items-center justify-content-xl-between flex-wrap justify-content-center mt-5 p-3 bg-white`}
                    style={{
                      borderRadius: "2px",
                      // width: "99%",
                      left: "-14px",
                      position: "relative",
                    }}
                  >
                    <Paginate
                      currentPage={currentPage}
                      totalPages={bookingPage?.totalPages || 1}
                      handlePageChange={handlePageChange}
                      hotel={booking?.length}
                      hotalList={bookingPage?.total}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 bg-white sideBar_book">
                <div className="card-side">
                  <h1 class="battledore-center-heading">Battledore Center</h1>
                  <div class="location-container">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/621ed4c12b06dd6565b9ce8dc179424de973df1f5fa0a8cc7c85e151619e5b9b?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                      alt="Location icon"
                      class="location-icon"
                    />
                    <p class="location-text">Achaias Street Tripoli, Greece</p>
                  </div>
                </div>

                <section class="date-time-container">
                  <div class="date-container mb-4">
                    <div class="date-label">
                      <h3 class="date-title">More Info</h3>
                    </div>
                  </div>

                  <div class="time-container">
                    <p class="time-label">Name</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.name_en || "..."
                        : initialRenderData?.name_en || "..."}
                    </time>
                  </div>

                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">Sports</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.sports?.name_en || "..."
                        : initialRenderData?.sports?.name_en || "..."}
                    </time>
                  </div>

                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">Price</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : "Euro " +
                          (details
                            ? details?.entry_price || 0
                            : initialRenderData?.entry_price || 0)}
                    </time>
                  </div>
                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">Mode</p>
                    <time class="time-value">Cash </time>
                  </div>

                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">Player</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.players?.length || 0
                        : initialRenderData?.players?.length || 0}
                    </time>
                  </div>
                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">Review</p>
                    <time class="time-value">...</time>
                  </div>
                </section>

                <section class="date-time-container">
                  <div class="date-container mb-4">
                    <div class="date-label">
                      <h3 class="date-title">Date & Time</h3>
                    </div>
                  </div>

                  <div class="time-container">
                    <p class="time-label">Date</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? moment(details?.createdAt).format("DD MMMM YYYY") || 0
                        : moment(initialRenderData?.createdAt).format(
                            "DD MMMM YYYY"
                          ) || 0}
                    </time>
                  </div>

                  {/* <hr class="separator" /> */}

                  <div class="time-container">
                    <p class="time-label">Start Time</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.start_time || "..."
                        : initialRenderData?.start_time || "..."}
                    </time>
                  </div>

                  <hr class="separator" />

                  <div class="time-container">
                    <p class="time-label">End Time</p>
                    <time class="time-value">
                      {loaders
                        ? "Loading..."
                        : details
                        ? details?.end_time || "..."
                        : initialRenderData?.end_time || "..."}
                    </time>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size={"md"} open={open} onClose={handleClose} className="w-25">
        <Modal.Header>
          <Modal.Title>Emergency Alert</Modal.Title>
          <span className="custom-close" onClick={handleClose}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body style={{ overflow: "hidden" }}>
          <form className="row form-design desk_modals p-4">
            <div className="form-group col-12">
              <div className="dropdown">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{
                    border: "1px solid #DFDFDF",
                    display: "flex",
                    alignItems: "center",
                    height: "56px",
                    color: "#A39FA4",
                    justifyContent: "space-between",
                  }}
                  value={selectedMatch}
                  onChange={(e) => setSelectedMatch(e.target.value)}
                >
                  <option selected>Choose Match</option>
                  {upcomingMatches.map((match) => (
                    <option key={match?._id} value={match?._id}>
                      {match?.sports?.name_en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-12">
              <button
                type={loadersss ? "button" : "submit"}
                className="login-button w-100"
                onClick={() => handleSend(selectedMatch)}
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
                  "Send"
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal
        size={"md"}
        open={showModal}
        onClose={handleClose1}
        className="w-50"
      >
        <Modal.Header>
          <Modal.Title>Filter</Modal.Title>
          <span className="custom-close" onClick={handleClose1}>
            {/* <img src="/resources/imgs/cross.svg" /> */}
          </span>
        </Modal.Header>
        <Modal.Body style={{ overflow: "hidden" }}>
          <form className="row form-design desk_modals p-4">
            <DateRangePicker defaultOpen />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary me-2"
                // data-bs-dismiss="modal"
                style={{
                  border: "none",
                  borderRadius: "30px",
                  backgroundColor: "#EFEFEF",
                  color: "#1A0F1C",
                }}
                onClick={handleClose1}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ borderRadius: "30px", backgroundColor: "#6265E8" }}
              >
                Apply
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default Bookings;
