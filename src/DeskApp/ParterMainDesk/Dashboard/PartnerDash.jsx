import React, { Suspense, useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import Chart from "react-apexcharts";
import {
  getBookingData,
  getStatsDash,
  getUpcomingBookingData,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import CountUp from "react-countup";
import { Spinner } from "react-bootstrap";
import { Progress } from "rsuite";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

function Dashboard() {
  const [loader, setLoader] = useState(false);
  const [stats, setStats] = useState([]);
  useEffect(() => {
    statsDetail();
    statsBooking();
    statsUpcomingBooking();
  }, []);

  const statsDetail = async () => {
    setLoader(true);
    const { data } = await getStatsDash();
    if (!data.error) {
      setStats(data?.results?.stats);
      setLoader(false);
    }
  };
  const statsBooking = async () => {
    setLoader(true);
    const { data } = await getBookingData({
      year: "2024",
      month: "April",
    });
    if (!data.error) {
      setStats(data?.results?.stats);
      setLoader(false);
    }
  };
  const statsUpcomingBooking = async () => {
    setLoader(true);
    const { data } = await getUpcomingBookingData({
      year: "2024",
      month: "April",
    });
    if (!data.error) {
      setStats(data?.results?.stats);
      setLoader(false);
    }
  };
  const series = [
    {
      name: "2023",
      data: [150, 100, 200, 380, 400],
    },
  ];
  const series2 = [
    {
      data: [100, 0, 500, 0, 300, 0, 200, 0, 448, 0, 363, 0, 470],
    },
    {
      data: [50, 0, 200, 0, 200, 0, 400, 0, 48, 0, 33, 0, 470],
    },
  ];

  const optionsCharts = {
    chart: {
      type: "area",
      height: 444,
    },

    stroke: {
      curve: "smooth",
      colors: ["#6265E8"],
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      min: 0,
      max: 500, // Adjust the max value to set the range
      tickAmount: 5, // Adjust the number of ticks
    },
    xaxis: {
      type: "month",
      categories: ["jan", "feb", "mar", "april"],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  const optionsCharts2 = {
    chart: {
      type: "bar",
      height: 444,
    },
    plotOptions: {
      bar: {
        borderRadius: 1,
        width: 20,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#ECE9F1", "#6265E8"],
    },

    yaxis: {
      min: 0,
      max: 500, // Adjust the max value to set the range
      tickAmount: 5, // Adjust the number of ticks
    },
    xaxis: {
      type: "month",
      categories: [
        "jan",
        "feb",
        "mar",
        "april",
        "may",
        "june",
        "july",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ],
    },
  };

  const style = {
    width: 64,
    display: "inline-block",
    marginRight: 10,
  };

  return (
    <div className="admin_main ">
      <div className="row">
        <div className="col-2">
          <DeskSidebar />
        </div>
        <div className="admin_main_inner col-10 bg-light p-0">
          <DeskHead />
          <Suspense fallback={<div>Losfdfdfddfe</div>}>
            <div className="admin_panel_data height_adjust">
              <div className="row dashboard_part justify-content-center ">
                <div className="col-4">
                  <section class="total-schedule-card">
                    <header class="total-schedule-header">
                      <div class="total-schedule-info">
                        <h3 class="total-schedule-label">Total Schedule</h3>
                        <p class="total-schedule-amount">
                          €{" "}
                          {loader ? (
                            // <Spinner />
                            <SpinnerIcon
                              pulse
                              style={{ fontSize: "0.8em", marginTop: "-6px" }}
                              className="text-white"
                            />
                          ) : (
                            <CountUp
                              end={stats?.totalSchedule || 0}
                              duration={2.75}
                              // suffix=" +"
                              // style={styles}
                            />
                          )}
                        </p>
                      </div>

                      <div style={style}>
                        <Progress.Circle
                          percent={30}
                          strokeColor="#FFFFFF"
                          strokeWidth={10}
                          trailWidth={10}
                          trailColor="#6db7f2"
                        />
                      </div>
                    </header>
                  </section>
                </div>
                <div className="col-4">
                  <section class="total-paid-card">
                    <div class="total-paid-content">
                      <div class="total-paid-text">
                        <p class="total-paid-label">Total Paid</p>
                        <p class="total-paid-amount">
                          €{" "}
                          {loader ? (
                            <SpinnerIcon
                              pulse
                              style={{ fontSize: "0.8em", marginTop: "-6px" }}
                              className="text-white"
                            />
                          ) : (
                            <CountUp
                              end={stats?.totalPaid || 0}
                              duration={2.75}
                              // suffix=" +"
                              // style={styles}
                            />
                          )}
                        </p>
                      </div>
                      <div style={style}>
                        <Progress.Circle
                          percent={30}
                          strokeColor="#FFFFFF"
                          strokeWidth={10}
                          trailWidth={10}
                          trailColor="#9a97f0"
                        />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="col-4">
                  <section class="overdue-card">
                    <div class="overdue-card-content">
                      <div class="overdue-card-text">
                        <h3 class="overdue-card-title">Overdue</h3>
                        <p class="overdue-card-amount">
                          €{" "}
                          {loader ? (
                            <SpinnerIcon
                              pulse
                              style={{ fontSize: "0.8em", marginTop: "-6px" }}
                              className="text-white"
                            />
                          ) : (
                            <CountUp
                              end={stats?.overdue || 0}
                              duration={2.75}
                              // suffix=" +"
                              // style={styles}
                            />
                          )}
                        </p>
                      </div>
                      <div style={style}>
                        <Progress.Circle
                          percent={30}
                          strokeColor="#FFFFFF"
                          strokeWidth={10}
                          trailWidth={10}
                          trailColor="#edafd7"
                        />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="row justify-content-between mt-4 ">
                  <div className="col-6 charts_area">
                    <div>
                      <div className="titles_charts">
                        <h1>Total Bookings</h1>
                        <div class="calendar-badge">
                          <div class="calendar-year">January</div>
                          <img
                            src="/resources/imgs/arrowDown.svg"
                            alt="Calendar icon"
                            class="calendar-icon"
                          />
                        </div>
                      </div>
                      <div id="chart">
                        <Chart
                          options={optionsCharts2}
                          series={series2}
                          type="bar"
                          height={350}
                        />
                      </div>
                      <div id="html-dist"></div>
                    </div>
                  </div>
                  <div className="col-6 charts_area">
                    <div>
                      <div className="titles_charts">
                        <h1>Upcoming Bookings</h1>
                        <div class="calendar-badge">
                          <div class="calendar-year">January</div>
                          <img
                            src="/resources/imgs/arrowDown.svg"
                            alt="Calendar icon"
                            class="calendar-icon"
                          />
                        </div>
                      </div>
                      <div id="chart">
                        <Chart
                          options={optionsCharts}
                          series={series}
                          type="area"
                          height={350}
                        />
                      </div>
                      <div id="html-dist"></div>
                    </div>
                  </div>
                </div>
                <div className=" pb-md-0 pb-2 position-relative">
                  <div className="align-items-start py-lg-4 py-md-3 py-3 flex-md-nowrap mx-0 justify-content-md-between justify-content-end position-relative removed_shadow mt-4">
                    <div className="col-12">
                      <div className="custom-slider d-flex">
                        <div class="court-card">
                          <header class="court-header">
                            <h3 class="court-name">Court 2</h3>
                            <p class="court-number">12</p>
                          </header>
                          <p class="court-next">Next at 14:00</p>
                        </div>
                        <div class="court-card">
                          <header class="court-header">
                            <h3 class="court-name">Court 2</h3>
                            <p class="court-number">12</p>
                          </header>
                          <p class="court-next">Next at 14:00</p>
                        </div>
                        <div class="court-card">
                          <header class="court-header">
                            <h3 class="court-name">Court 2</h3>
                            <p class="court-number">12</p>
                          </header>
                          <p class="court-next">Next at 14:00</p>
                        </div>
                        <div class="court-card">
                          <header class="court-header">
                            <h3 class="court-name">Court 2</h3>
                            <p class="court-number">12</p>
                          </header>
                          <p class="court-next">Next at 14:00</p>
                        </div>
                        <div class="court-card">
                          <header class="court-header">
                            <h3 class="court-name">Court 2</h3>
                            <p class="court-number">12</p>
                          </header>
                          <p class="court-next">Next at 14:00</p>
                        </div>
                        <div class="court-card">
                          <header class="court-header">
                            <h3 class="court-name">Court 2</h3>
                            <p class="court-number">12</p>
                          </header>
                          <p class="court-next">Next at 14:00</p>
                        </div>
                        <div class="court-card">
                          <header class="court-header">
                            <h3 class="court-name">Court 2</h3>
                            <p class="court-number">12</p>
                          </header>
                          <p class="court-next">Next at 14:00</p>
                        </div>
                        <div class="court-card">
                          <header class="court-header">
                            <h3 class="court-name">Court 2</h3>
                            <p class="court-number">12</p>
                          </header>
                          <p class="court-next">Next at 14:00</p>
                        </div>
                        <div class="court-card">
                          <header class="court-header">
                            <h3 class="court-name">Court 2</h3>
                            <p class="court-number">12</p>
                          </header>
                          <p class="court-next">Next at 14:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="row">
                    <div className="col-6 ">
                      <section class="attendance-container">
                        <header class="attendance-header">
                          <div class="attendance-title-container">
                            <h2 class="attendance-title">Attendance</h2>
                            <div class="attendance-filter">
                              <span class="attendance-filter-text">
                                All Activity
                              </span>
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d75839c9884621477f7e8dfd1b3e5013081efb60f9498faec5d20c1a5150a766?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                alt=""
                                class="attendance-filter-icon"
                              />
                            </div>
                          </div>
                        </header>
                        <div class="attendance-list">
                          <div class="attendance-item">
                            <div class="user-info">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d85e617201c3f3df1ea4bb451f1e070b6c1ada133a77a8575d28e6a610c3333c?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                alt="User avatar"
                                class="user-avatar"
                              />
                              <div class="user-details">
                                <p class="user-activity">
                                  <span>Marvin McKinney</span>
                                  <span>just login at</span>
                                  <span>9:15 AM</span>
                                </p>
                                <p class="activity-time">10 mins ago</p>
                              </div>
                            </div>
                            <div class="attendance-status"></div>
                          </div>
                          <div class="attendance-item">
                            <div class="user-info">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ebb3f1a1fcc04e2a74645059f426843394373deefbdc17f17883332a05f667c?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                alt="User avatar"
                                class="user-avatar"
                              />
                              <div class="user-details">
                                <p class="user-activity">
                                  <span>Marvin McKinney</span>
                                  <span>just login at</span>
                                  <span>9:15 AM</span>
                                </p>
                                <p class="activity-time">4 hours ago</p>
                              </div>
                            </div>
                            <div class="attendance-status"></div>
                          </div>
                          <div class="attendance-item">
                            <div class="user-info">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/08b7e658941eaab5241b4f0486f87fd5246951054a0fc5e1e8ce5fab0a8b5ced?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                alt="User avatar"
                                class="user-avatar"
                              />
                              <div class="user-details">
                                <p class="user-activity">
                                  <span>Marvin McKinney</span>
                                  <span>just login at</span>
                                  <span>9:15 AM</span>
                                </p>
                                <p class="activity-time">10 mins ago</p>
                              </div>
                            </div>
                            <div class="attendance-status"></div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="col-6">
                      <section class="notification-container">
                        <header class="notification-header">
                          <h2 class="notification-title">Notification</h2>
                          <div class="notification-icon">
                            <img
                              src="arrow-icon.svg"
                              alt=""
                              class="notification-icon-arrow"
                            />
                          </div>
                        </header>

                        <div class="notification-list">
                          <div class="notification-item">
                            <div class="notification-item-content">
                              <div class="notification-item-date">
                                <div class="notification-item-date-day">
                                  Mon
                                </div>
                                <div class="notification-item-date-number">
                                  10
                                </div>
                              </div>
                              <div class="notification-item-details">
                                <div class="notification-item-name">
                                  Dianna Smiley
                                </div>
                                <div class="notification-item-message">
                                  You have just received new booking #123456
                                </div>
                              </div>
                            </div>
                            <div class="notification-item-avatar">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdd89684b4f45e898295871f0bbca708e76ce84652cfd5414416379d4bde56df?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                alt="Dianna Smiley avatar"
                              />
                            </div>
                          </div>

                          <div class="notification-item">
                            <div class="notification-item-content">
                              <div class="notification-item-date">
                                <div class="notification-item-date-day">
                                  Thu
                                </div>
                                <div class="notification-item-date-number">
                                  09
                                </div>
                              </div>
                              <div class="notification-item-details">
                                <div class="notification-item-name">
                                  Reena Roa
                                </div>
                                <div class="notification-item-message">
                                  You have just received a new booking from
                                  Reena Roa #123456
                                </div>
                              </div>
                            </div>
                            <div class="notification-item-avatar">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdd89684b4f45e898295871f0bbca708e76ce84652cfd5414416379d4bde56df?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                alt="Reena Roa avatar"
                              />
                            </div>
                          </div>

                          <div class="notification-item">
                            <div class="notification-item-content">
                              <div class="notification-item-date">
                                <div class="notification-item-date-day">
                                  Fri
                                </div>
                                <div class="notification-item-date-number">
                                  12
                                </div>
                              </div>
                              <div class="notification-item-details">
                                <div class="notification-item-name">
                                  Damesh Dua
                                </div>
                                <div class="notification-item-message">
                                  Damesh Dua changed their booking date & time
                                  #123456 date.
                                </div>
                              </div>
                            </div>
                            <div class="notification-item-avatar">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdd89684b4f45e898295871f0bbca708e76ce84652cfd5414416379d4bde56df?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                alt="Damesh Dua avatar"
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
