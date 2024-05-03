import React, { useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import {
  getCustomer,
  getCustomerDetails,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import { Spinner } from "react-bootstrap";
import { Paginate } from "../pagination/Paginate";

function Customers() {
  const [mapper, setMapper] = useState([]);
  const [details, setDetails] = useState("");
  const [customerPage, setcustomerPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  console.log("details", details);

  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [venue, setVenue] = useState([]);
  useEffect(() => {
    customerDetail();
  }, [currentPage]);

  const customerDetail = async () => {
    setLoader(true);
    const { data } = await getCustomer({
      level: 0,
      postion: "",
      dominant_hand: "",
      start_date: "",
      end_date: "",
      page: currentPage,
      pageSize: 10,
    });
    if (!data.error) {
      setMapper(data?.results?.customers);
      setcustomerPage(data?.results);
      setLoader(false);
    }
  };

  const totalPages = mapper?.results?.totalPages || 1;
  const users = mapper?.results?.users?.data;
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // handleCourts();
  };

  const initialRenderData = mapper?.[1];

  console.log("initialRenderData", initialRenderData);

  const [customerid, setcustomerid] = useState("");

  const customerDetailId = async (ite) => {
    const formData = {
      level: 0,
      postion: "",
      dominant_hand: "",
      start_date: "",
      end_date: "",
    };
    setLoaders(true);
    const { data } = await getCustomerDetails({
      formData,
      id: ite?._id,
    });
    if (!data.error) {
      setDetails(data?.results?.customer);
      setLoaders(false);
    }
  };

  const getLevelLabel = (level) => {
    if (level === undefined || level === null) {
      return "..."; // Default label when level is undefined or null
    } else if (level <= 2) {
      return "Beginner";
    } else if (level <= 4) {
      return "Intermediate";
    } else if (level === 5) {
      return "Advanced";
    } else if (level >= 6) {
      return "Professional";
    } else {
      return "..."; // Default label for any other unexpected value
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
              <div className="col-9 ">
                <section class="bookings-container mb-3">
                  <h2 class="bookings-title">Customers</h2>
                  <div class="emergency-alert-container">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/596d3320f6cbeadf3af157c57f9a764d36f64ebe91d7e03138c3ec8cc9d51602?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                      alt=""
                      class="emergency-alert-icon"
                    />
                  </div>
                </section>
                <div class=" row">
                  <article class="padel-card ">
                    <div class="padel-card-content">
                      <header class="padel-card-header">
                        <h3 class="padel-card-title">Football</h3>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e62b7be967d6927228e80d0d62a3e499ebeda95e56cf68e0b8cf1dd063cb9d2f?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Padel icon"
                          class="padel-card-icon"
                        />
                      </header>
                    </div>
                  </article>
                  <article class="padel-card ">
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
                  <article class="padel-card ">
                    <div class="padel-card-content">
                      <header class="padel-card-header">
                        <h3 class="padel-card-title">$ 2000</h3>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e62b7be967d6927228e80d0d62a3e499ebeda95e56cf68e0b8cf1dd063cb9d2f?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Padel icon"
                          class="padel-card-icon"
                        />
                      </header>
                    </div>
                  </article>

                  <article class="padel-card ">
                    <div class="padel-card-content">
                      <header class="padel-card-header">
                        <h3 class="padel-card-title">2 Hours</h3>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e62b7be967d6927228e80d0d62a3e499ebeda95e56cf68e0b8cf1dd063cb9d2f?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                          alt="Padel icon"
                          class="padel-card-icon"
                        />
                      </header>
                    </div>
                  </article>

                  <article class="padel-card bg-secondary">
                    <div class="padel-card-content">
                      <header class="padel-card-header">
                        <h3 class="padel-card-title">Clear</h3>
                      </header>
                    </div>
                  </article>
                </div>
                <div className="col-12 comman_table_design px-0 ">
                  <div className="">
                    <div className="row table_head">
                      <div className="col-2 head-container ">
                        <span class="duration-text">Name</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Phone Number</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Level</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Positions</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Dominant Hand</span>
                        <img
                          src="/resources/imgs/drop.svg"
                          alt="Duration icon"
                          class="duration-icon"
                        />
                      </div>
                      <div className="col-2 head-container ">
                        <span class="duration-text">Status</span>
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
                      mapper?.map((ite, ind) => (
                        <div
                          className="row table_rows"
                          key={ind}
                          onClick={() => {
                            customerDetailId(ite);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="col-2">
                            <div class="row-container">
                              <span class="td_data d-flex">
                                <div class="profile_table">
                                  {ite?.userName
                                    ?.substring(0, 2)
                                    ?.toUpperCase()}
                                </div>
                                {ite?.userName || "..."}
                              </span>
                            </div>
                          </div>
                          <div className="col-2">
                            <div class="row-container">
                              <span class="td_data">
                                {ite?.country_code || ""}{" "}
                                {ite?.phone_number || "..."}{" "}
                              </span>
                            </div>
                          </div>
                          <div className="col-2">
                            <div class="row-container">
                              <span
                                style={{
                                  position: "relative",
                                  left: "12px",
                                }}
                                class="td_data"
                              >
                                {getLevelLabel(ite?.level) || "..."}
                              </span>
                            </div>
                          </div>

                          <div className="col-2">
                            <div class="row-container">
                              <span
                                style={{
                                  position: "relative",
                                  left: "28px",
                                }}
                                class="td_data"
                              >
                                {ite?.position || "..."}
                              </span>
                            </div>
                          </div>

                          <div className="col-2">
                            <div class="row-container">
                              <span
                                style={{
                                  position: "relative",
                                  left: "33px",
                                }}
                                class="td_data"
                              >
                                {ite?.dominantHand || "..."}
                              </span>
                            </div>
                          </div>
                          <div className="col-2">
                            <div class="row-container">
                              <span
                                style={{
                                  position: "relative",
                                  left: "50px",
                                }}
                                class="td_data"
                              >
                                {ite?.status === true ? (
                                  <img
                                    src="/resources/imgs/netGreen.png"
                                    alt=""
                                    width={30}
                                  />
                                ) : (
                                  "..."
                                )}
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

                    <div
                      className={`d-${
                        loader ? "none" : "flex"
                      } align-items-center justify-content-xl-between flex-wrap justify-content-center mt-5 p-3 bg-white`}
                      style={{
                        borderRadius: "2px",
                        width: "99%",
                        left: "-14px",
                        position: "relative",
                      }}
                    >
                      <Paginate
                        currentPage={currentPage}
                        totalPages={customerPage?.totalPages || 1}
                        handlePageChange={handlePageChange}
                        hotel={mapper?.length}
                        hotalList={customerPage?.total}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-3 bg-white sideBar_book ">
                <div className="customer-profile">
                  <div class="name">
                    {details?.userName?.substring(0, 2)?.toUpperCase()}
                  </div>
                  <h1>
                    {loaders
                      ? "Loading..."
                      : details
                      ? details?.userName || "..."
                      : initialRenderData?.userName || "..."}
                  </h1>
                  <p>
                    {details
                      ? details?.email || "..."
                      : initialRenderData?.email || "..."}
                  </p>
                  <div class="chat_btn">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/de61a35e88676a530a7ac4ce83f287ba652582c110899ea81bcc54a65b087280?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                      class="imd"
                      alt=""
                    />
                    <div class="div-4">Chat</div>
                  </div>
                </div>
                <div className="card-side-customer ">
                  <h1 class="">Athlete Statistics</h1>
                  <div class="data-table">
                    <div class="data-container">
                      <div class="itm-1">Level</div>
                      <div class="itm-2">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.level || "..."
                          : initialRenderData?.level || "..."}
                      </div>
                    </div>
                    <div class="div-5"></div>
                    <div class="data-container">
                      <div class="itm-1">Dominant hand</div>
                      <div class="itm-2">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.dominantHand || "..."
                          : initialRenderData?.dominantHand || "..."}
                      </div>
                    </div>
                    <div class="div-5"></div>
                    <div class="data-container">
                      <div class="itm-1">Position</div>
                      <div class="itm-2">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.position || "..."
                          : initialRenderData?.position || "..."}
                      </div>
                    </div>
                    <div class="div-5"></div>
                    <div class="data-container">
                      <div class="itm-1">Ratings</div>
                      <div class="itm-2">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.rating || "..."
                          : initialRenderData?.rating || "..."}
                      </div>
                    </div>
                    <div class="div-5"></div>
                    <div class="data-container">
                      <div class="itm-1">Preferred Courts</div>
                      <div class="itm-2">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.preferredCourts || "..."
                          : initialRenderData?.preferredCourts || "..."}
                      </div>
                    </div>
                    <div class="div-5"></div>
                    <div class="data-container">
                      <div class="itm-1">Court Type</div>
                      <div class="itm-2">
                        {" "}
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.courtType || "..."
                          : initialRenderData?.courtType || "..."}
                      </div>
                    </div>
                    <div class="div-5"></div>
                    <div class="data-container">
                      <div class="itm-1">Activity Consistency</div>
                      <div class="itm-2">1 in Week</div>
                    </div>
                    <div class="div-5"></div>

                    <div class="data-container">
                      <div class="itm-1">Booking Consistency</div>
                      <div class="itm-2">1 in Week</div>
                    </div>
                    <div class="div-5"></div>
                    <div class="data-container">
                      <div class="itm-1">Preferred</div>
                      <div class="itm-2">Weekday, After 5:00 PM</div>
                    </div>
                    <div class="div-5"></div>
                    <div class="data-container">
                      <div class="itm-1">Availabilty</div>
                      <div class="itm-2 d-flex">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.availble_weekday || "..."
                          : initialRenderData?.availble_weekday || "..."}
                        <div class="plus-icon">
                          <img
                            loading="lazy"
                            alt=""
                            src="/resources/imgs/plus.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="w-100 px-3">
                  <h1 class="header_sideCustomer">Booking History</h1>
                </span>

                <div class="card-side-customer2 mb-4">
                  <div class="custom_card">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6ea5b7021315397d578ca81ec43f66028bdee2ad023587a66c5e2de6a56c024?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                      class="cutomer_img"
                    />
                    <div class="div-customer">
                      <div class="div-customer-num">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.bookingHistory?.totalBookings || 0
                          : initialRenderData?.bookingHistory?.totalBookings ||
                            0}
                      </div>
                      <div class="div-customer-head">Total bookings</div>
                    </div>
                  </div>
                  <div class="div-customer2">
                    <div class="div-custom-card">
                      <span className="num">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.bookingHistory?.totalMatches || 0
                          : initialRenderData?.bookingHistory?.totalMatches ||
                            0}
                      </span>
                      <span>matches</span>
                    </div>
                    <div class="div-custom-card">
                      <span className="num">5</span>
                      <span>matches</span>
                    </div>
                  </div>

                  <div class="div-customer2 mt-3">
                    <div class="div-custom-card">
                      <span className="num">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.bookingHistory?.totalTournaments || 0
                          : initialRenderData?.bookingHistory
                              ?.totalTournaments || 0}
                      </span>
                      <span>Tournaments</span>
                    </div>
                  </div>
                </div>

                <div class="card-side-customer2">
                  <div className="custom_card">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/02333b08723e0e4b421616ccf54add1a83c3bcb044ab2e7277e79a874130228f?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                      class="cutomer_img"
                    />
                    <div class="div-customer">
                      <div class="div-customer-num">
                        {loaders
                          ? "Loading..."
                          : details
                          ? details?.bookingHistory?.bookingCancelled || 0
                          : initialRenderData?.bookingHistory
                              ?.bookingCancelled || 0}
                      </div>
                      <div class="div-customer-head">Total Cancellation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
