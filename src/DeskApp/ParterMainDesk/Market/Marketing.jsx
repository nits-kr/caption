import React, { useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import Chart from "react-apexcharts";
import {
  getClicks,
  getMarketing,
  getPreferredCourts,
  getTrainers,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import CountUp from "react-countup";
import { Spinner } from "react-bootstrap";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";
import FadeSpinners from "../../allspinners/FadeSpinners";
import { Progress } from "rsuite";
import { useNavigate } from "react-router-dom";

function Marketing() {
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [loaderss, setLoaderss] = useState(false);
  const [loadersss, setLoadersss] = useState(false);
  const [clicks, setClicks] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [preffered, setPreffered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("preffered", preffered);

  const [visibleTrainers, setVisibleTrainers] = useState(5);

  const [market, setMarket] = useState("");
  const [selectedYears1, setSelectedYears1] = useState("2023 - 2024");

  const navigate = useNavigate();

  const handleShowMore = () => {
    setIsLoading(true);

    setTimeout(() => {
      setVisibleTrainers((prevVisible) => prevVisible + 3);
      setIsLoading(false);
    }, 1000);
  };

  const handleclickYearChanges = (yearRange) => {
    setSelectedYears1(yearRange);
  };

  useEffect(() => {
    handleClicks();
  }, [selectedYears1]);

  const handleClicks = async () => {
    setLoaderss(true);
    const [startYear, endYear] = selectedYears1.split(" - ");

    const response = await getClicks({
      year: [startYear, endYear],
    });

    const { error, results } = response?.data || {};

    if (!error && results?.bookings) {
      const { bookings } = results;
      setClicks(bookings);
      setLoaderss(false);
    } else {
      console.error("Error fetching clicks data");
      setLoaderss(false);
    }
  };

  useEffect(() => {
    handleMarketStats();
    handlePrefferedCourt();
    handlegetTrainers();
  }, []);

  const handleMarketStats = async () => {
    setLoader(true);
    const { data } = await getMarketing();
    if (!data.error) {
      setMarket(data?.results?.stats);
      setLoader(false);
    }
  };
  const handlePrefferedCourt = async () => {
    setLoadersss(true);
    const { data } = await getPreferredCourts();
    if (!data.error) {
      setPreffered(data?.results?.courts);
      setLoadersss(false);
    }
  };
  const handlegetTrainers = async () => {
    setLoaders(true);
    const { data } = await getTrainers();
    if (!data.error) {
      setTrainers(data?.results?.trainers);
      setLoaders(false);
    }
  };
  const series = [
    {
      name: "2023",
      data: [150, 100, 200, 380, 400],
    },
    {
      name: "2024",
      data: [0, 100, 500, 260, 300],
    },
  ];

  const options = {
    chart: {
      height: 444,
      type: "area",
      toolbar: {
        show: false,
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
      categories: ["jan", "feb", "mar", "april"],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const series2 = clicks.map((item) => ({
    // name: item.year,
    data: item.data.map((data) => data.count),
  }));

  const optionsCharts2 = {
    chart: {
      type: "bar",
      height: 444,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
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
      max: 500,
      tickAmount: 5,
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
    // marginRight: 10,
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
              <div className="col-12 ">
                <div className="row">
                  <div className="col-12">
                    <section class="marketing-management px-0">
                      <h2 class="marketing-management-title">
                        Marketing Management
                      </h2>
                      <div className="d-flex mx-3">
                        <div class="sort-by-container mx-2">
                          <div class="sort-by-label">Sort by: This Year</div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cde2fca800e0954068335a0ae152ea562523283257860e5099968b5f63549d13?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                            alt="Sort by icon"
                            class="sort-by-icon"
                          />
                        </div>
                        <div class="circle-icon d-flex justify-content-center ">
                          <img
                            src="/resources/imgs/import.svg"
                            alt="Marketing Management Icon"
                            class=""
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className="col-9">
                    <div className="row ">
                      <section class="traffic-card col-4">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">Total Traffic</h3>
                            <p class="traffic-value">
                              €{" "}
                              {loader ? (
                                <SpinnerIcon
                                  pulse
                                  style={{
                                    fontSize: "0.8em",
                                    marginTop: "-6px",
                                  }}
                                  className="text-dark"
                                />
                              ) : (
                                <CountUp
                                  end={market?.totalTraffic || 0}
                                  duration={2.75}
                                />
                              )}
                            </p>
                          </div>
                          <img
                            src="/resources/imgs/mark.svg"
                            alt=""
                            class="traffic-icon"
                          />
                        </header>
                        <div class="traffic-comparison">
                          <img
                            src="/resources/imgs/compareIcon.svg"
                            alt=""
                            class="comparison-icon"
                          />
                          <div class="comparison-text">
                            <span class="percentage">
                              {market?.trafficPer || 0} %
                            </span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                      <section class="traffic-card col-4">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">Total Bookings</h3>
                            <p class="traffic-value">
                              €{" "}
                              {loader ? (
                                <SpinnerIcon
                                  pulse
                                  style={{
                                    fontSize: "0.8em",
                                    marginTop: "-6px",
                                  }}
                                  className="text-dark"
                                />
                              ) : (
                                <CountUp
                                  end={market?.totalBookings || 0}
                                  duration={2.75}
                                />
                              )}
                            </p>
                          </div>
                          <img
                            src="/resources/imgs/mark2.svg"
                            alt=""
                            class="traffic-icon"
                          />
                        </header>
                        <div class="traffic-comparison">
                          <img
                            src="/resources/imgs/compareIcon.svg"
                            alt=""
                            class="comparison-icon"
                          />
                          <div class="comparison-text">
                            <span class="percentage">
                              {market?.bookingPer || 0} %
                            </span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                      <section class="traffic-card col-4">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">Registrations</h3>
                            <p class="traffic-value">
                              €{" "}
                              {loader ? (
                                <SpinnerIcon
                                  pulse
                                  style={{
                                    fontSize: "0.8em",
                                    marginTop: "-6px",
                                  }}
                                  className="text-dark"
                                />
                              ) : (
                                <CountUp
                                  end={market?.totalBookings || 0}
                                  duration={2.75}
                                />
                              )}
                            </p>
                          </div>
                          <img
                            src="/resources/imgs/mark3.svg"
                            alt=""
                            class="traffic-icon"
                          />
                        </header>
                        <div class="traffic-comparison">
                          <img
                            src="/resources/imgs/compareIcon.svg"
                            alt=""
                            class="comparison-icon"
                          />
                          <div class="comparison-text">
                            <span class="percentage">
                              {market?.bookingPer || 0} %
                            </span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                      <section class="traffic-card col-4">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">Total Training</h3>
                            <p class="traffic-value">
                              {loader ? (
                                <SpinnerIcon
                                  pulse
                                  style={{
                                    fontSize: "0.8em",
                                    marginTop: "-6px",
                                  }}
                                  className="text-dark"
                                />
                              ) : (
                                <CountUp
                                  end={market?.totalTraining || 0}
                                  duration={2.75}
                                />
                              )}
                              /Month
                            </p>
                          </div>
                          <img
                            src="/resources/imgs/mark4.svg"
                            alt=""
                            class="traffic-icon"
                          />
                        </header>
                        <div class="traffic-comparison">
                          <img
                            src="/resources/imgs/compareIcon.svg"
                            alt=""
                            class="comparison-icon"
                          />
                          <div class="comparison-text">
                            <span class="percentage">
                              {market?.trainingPer || 0} %
                            </span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                      <section class="traffic-card col-4">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">Engagement</h3>
                            <p class="traffic-value">
                              Total{" "}
                              {loader ? (
                                <SpinnerIcon
                                  pulse
                                  style={{
                                    fontSize: "0.8em",
                                    marginTop: "-6px",
                                  }}
                                  className="text-dark"
                                />
                              ) : (
                                <CountUp
                                  end={market?.engagement || 0}
                                  duration={2.75}
                                />
                              )}
                            </p>
                          </div>
                          <img
                            src="/resources/imgs/mark5.svg"
                            alt=""
                            class="traffic-icon"
                          />
                        </header>
                        <div class="traffic-comparison">
                          <img
                            src="/resources/imgs/compareIcon.svg"
                            alt=""
                            class="comparison-icon"
                          />
                          <div class="comparison-text">
                            <span class="percentage">
                              {market?.engagementPer || 0} %
                            </span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                      <section class="traffic-card col-4">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">My Rating & Review</h3>
                            <p class="traffic-value">
                              {loader ? (
                                <SpinnerIcon
                                  pulse
                                  style={{
                                    fontSize: "0.8em",
                                    marginTop: "-6px",
                                  }}
                                  className="text-dark"
                                />
                              ) : (
                                <CountUp
                                  end={market?.rating || 0}
                                  duration={2.75}
                                />
                              )}
                              {/* (5456) */}
                            </p>
                          </div>
                          <img
                            src="/resources/imgs/mark6.svg"
                            alt=""
                            class="traffic-icon"
                          />
                        </header>
                        <div class="traffic-comparison">
                          <img
                            src="/resources/imgs/compareIcon.svg"
                            alt=""
                            class="comparison-icon"
                          />
                          <div class="comparison-text">
                            <span class="percentage">
                              {market?.reviewPer || 0} %
                            </span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                  <div className="col-3">
                    <article class="marketSide_card">
                      <h3 class="">Preffered Courts</h3>
                      <div className="row">
                        {preffered?.slice(0, 3)?.map((ite, ind) => {
                          return (
                            <div className="col-12 d-flex justify-content-between mt-3">
                              <label>{ite?.name || "..."} </label>
                              <div className="d-flex">
                                <div class="avatar-container mx-1 bg-white">
                                  <div style={style}>
                                    <Progress.Circle
                                      percent={ite?.per}
                                      strokeColor="#6265E8"
                                      strokeWidth={15}
                                      trailWidth={15}
                                      trailColor="#e0eee7"
                                      showInfo={false}
                                    />
                                  </div>
                                </div>
                                <small>{ite?.per?.toFixed(2)} %</small>
                              </div>
                            </div>
                          );
                        })}

                        <div
                          className="col-12 mt-4"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="show-more-container">
                            <div className="show-more-divider"></div>
                            <div
                              className="show-more-content"
                              onClick={() => navigate("/app/partner/Courts")}
                            >
                              <div className="show-more-text">
                                {isLoading ? "Loading..." : "Show more"}
                              </div>
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3d5c8532585a05ba08505f10e32c62fcd43377345a6e6ff81cdcf2ba5c86ae6?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                alt="Show more icon"
                                className="show-more-icon"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-12 mb-3 mt-0">
                          <section class="favorite-court">
                            <span class="court-label">Favorite court</span>
                            <span class="court-name">
                              {preffered?.[0]?.name}{" "}
                            </span>
                          </section>
                        </div>
                      </div>
                    </article>
                  </div>
                  <div className="col-12 px-3">
                    <div className=" row ">
                      <div className="col-9 charts_area_market mt-3">
                        <div>
                          <div className="titles_charts">
                            <h1>Total clicks</h1>
                            <div class="calendar-badge">
                              <div
                                class="calendar-year"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {selectedYears1}
                                <ul className="dropdown-menu">
                                  {[...Array(5).keys()].map((index) => {
                                    const startYear = 2023 + index;
                                    const endYear = startYear + 1;
                                    const yearRange = `${startYear} - ${endYear}`;
                                    return (
                                      <li key={index}>
                                        <button
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleclickYearChanges(yearRange)
                                          }
                                        >
                                          {yearRange}
                                        </button>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                              <img
                                src="/resources/imgs/arrowDown.svg"
                                alt="Calendar icon"
                                class="calendar-icon"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              />
                            </div>
                          </div>
                          <div id="chart">
                            {/* <Chart
                              options={options}
                              series={series}
                              type="area"
                              height={350}
                            /> */}
                            {loaderss ? (
                              <div className="d-flex align-items-center justify-content-center">
                                <FadeSpinners />
                              </div>
                            ) : (
                              <Chart
                                options={optionsCharts2}
                                series={series2}
                                type="bar"
                                height={350}
                              />
                            )}
                          </div>
                          <div id="html-dist"></div>
                        </div>
                      </div>

                      <div className="col-3 mt-3 ">
                        <article class="marketSide_card2">
                          <div className="d-flex justify-content-between">
                            <h3 class="">Trainer</h3>
                            <div class="calendar-badge">
                              <div class="calendar-year">Weekly</div>
                              <img
                                src="/resources/imgs/arrowDown.svg"
                                alt="Calendar icon"
                                class="calendar-icon"
                              />
                            </div>
                          </div>
                          <div className="row">
                            {/* {trainers?.map((ite, ind) => {
                              return (
                                <div className="col-12 mt-3" key={ind}>
                                  <article class="trainer-card">
                                    <img
                                      src="/resources/imgs/dummy.svg"
                                      alt="Trainer avatar"
                                      class="trainer-avatar"
                                    />
                                    <div class="trainer-info">
                                      <h3 class="trainer-name">
                                        Arjun Singhania
                                      </h3>
                                      <p class="trainer-count">10 Trainings</p>
                                    </div>
                                  </article>
                                </div>
                              );
                            })}

                            <div className="col-12 mt-4">
                              <div class="show-more-container">
                                <div class="show-more-divider"></div>
                                <div class="show-more-content">
                                  <div class="show-more-text">show more</div>
                                  <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3d5c8532585a05ba08505f10e32c62fcd43377345a6e6ff81cdcf2ba5c86ae6?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                    alt="Show more icon"
                                    class="show-more-icon"
                                  />
                                </div>
                              </div>
                            </div> */}
                            {loaders ? (
                              <div className="d-flex align-items-center justify-content-center">
                                <FadeSpinners />
                              </div>
                            ) : (
                              trainers
                                .slice(0, visibleTrainers)
                                .map((trainer, index) => (
                                  <div className="col-12 mt-3" key={index}>
                                    <article className="trainer-card">
                                      <img
                                        src="/resources/imgs/dummy.svg"
                                        alt="Trainer avatar"
                                        className="trainer-avatar"
                                      />
                                      <div className="trainer-info">
                                        <h3 className="trainer-name">
                                          {trainer.name}
                                        </h3>
                                        <p className="trainer-count">
                                          {trainer.trainings} Trainings
                                        </p>
                                      </div>
                                    </article>
                                  </div>
                                ))
                            )}
                            {trainers.length > visibleTrainers && (
                              <div className="col-12 mt-4">
                                <div className="show-more-container">
                                  <div className="show-more-divider"></div>
                                  <div
                                    className="show-more-content"
                                    onClick={handleShowMore}
                                  >
                                    <div className="show-more-text">
                                      {isLoading ? "Loading..." : "Show more"}
                                    </div>
                                    <img
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3d5c8532585a05ba08505f10e32c62fcd43377345a6e6ff81cdcf2ba5c86ae6?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                                      alt="Show more icon"
                                      className="show-more-icon"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </article>
                      </div>
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

export default Marketing;
