import React, { useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import Chart from "react-apexcharts";
import {
  getClicks,
  getRevenueGraph,
  getSalesStats,
} from "../../../apiServices/partnerHttpService/partnerLoginHttpService";
import CountUp from "react-countup";
import { Spinner } from "react-bootstrap";
import FadeSpinner from "../../allspinners/FadeSpinner";
import FadeSpinners from "../../allspinners/FadeSpinners";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

function Sales() {
  const [selectedYears, setSelectedYears] = useState("2023 - 2024");
  const [selectedYears1, setSelectedYears1] = useState("2023 - 2024");

  const handleYearChanges = (yearRange) => {
    setSelectedYears(yearRange);
  };
  const handleclickYearChanges = (yearRange) => {
    setSelectedYears1(yearRange);
  };
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [loaderss, setLoaderss] = useState(false);
  const [sales, setSales] = useState("");
  const [revenue, setRevenue] = useState([]);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    handleSalesStats();
  }, []);

  const handleSalesStats = async () => {
    setLoader(true);
    const { data } = await getSalesStats();
    if (!data.error) {
      setSales(data?.results?.stats);
      setLoader(false);
    }
  };

  useEffect(() => {
    handleRevenue();
  }, [selectedYears]);
  useEffect(() => {
    handleClicks();
  }, [selectedYears1]);

  const handleRevenue = async () => {
    setLoaders(true);
    const [startYear, endYear] = selectedYears.split(" - ");

    console.log("[startYear, endYear]", [startYear, endYear]);
    const response = await getRevenueGraph({
      year: [startYear, endYear],
    });

    const { error, results } = response?.data || {};

    if (!error && results?.bookings) {
      const { bookings } = results;
      setRevenue(bookings);
      setLoaders(false);
    } else {
      console.error("Error fetching revenue data");
      setLoaders(false);
    }
  };
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

  const bookingsData = revenue?.flatMap((item) =>
    item.data.map((data) => data.count)
  );
  const categories = revenue?.flatMap((item) =>
    item.data.map((data) => data.date)
  );

  // const series = [
  //   {
  //     name: "2024",
  //     data: [150, 100, 200, 380, 400],
  //   },
  //   {
  //     name: "2023",
  //     data: [50, 80, 150, 500, 200],
  //   },
  // ];

  // const optionsCharts = {
  //   chart: {
  //     type: "area",
  //     height: 444,
  //   },

  //   stroke: {
  //     curve: "smooth",
  //     colors: ["#6265E8", "#E8ECF4"],
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   yaxis: {
  //     min: 0,
  //     max: 500,
  //     tickAmount: 5,
  //   },
  //   xaxis: {
  //     type: "month",
  //     categories: ["jan", "feb", "mar", "april"],
  //   },
  //   tooltip: {
  //     x: {
  //       format: "dd/MM/yy HH:mm",
  //     },
  //   },
  // };

  const series = revenue.map((item) => ({
    name: item.year,
    data: item.data.map((data) => data.count),
  }));

  console.log("series", series);

  const maxSales = Math.max(
    ...revenue.flatMap((item) => item?.data?.map((data) => data?.count))
  );

  const optionsCharts = {
    chart: {
      type: "area",
      height: 444,
    },

    stroke: {
      curve: "smooth",
      colors: ["#6265E8", "#E8ECF4"],
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      min: 0,
      max: maxSales,
      // max: 500,
      tickAmount: 5,
    },
    xaxis: {
      type: "category",
      categories:
        revenue[0]?.data?.length > 0
          ? revenue[0]?.data?.map((data) => data?.date) || []
          : revenue[1]?.data?.map((data) => data?.date) || [],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  // const series2 = [
  //   {
  //     data: [50, 0, 200, 0, 200, 0, 400, 0, 480, 0, 303, 0, 470],
  //   },
  // ];

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
                      <h2 class="marketing-management-title">Sales</h2>
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
                  <div className="col-12">
                    <div className="row ">
                      <section class="traffic-card-sales col-3">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">Total Sales</h3>
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
                                  end={sales?.total_sales || 0}
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
                            <span class="percentage">8.5%</span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                      <section class="traffic-card-sales col-3">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">Total Revenue</h3>
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
                                  end={sales?.total_revenue || 0}
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
                              {sales?.revenue_per || 0} %
                            </span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                      <section class="traffic-card-sales col-3">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">Growth Rate</h3>
                            <p class="traffic-value">€ 2,289</p>
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
                            <span class="percentage">8.5%</span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                      <section class="traffic-card-sales col-3">
                        <header class="traffic-header">
                          <div class="traffic-info">
                            <h3 class="traffic-label">Booking Per Month</h3>
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
                                  end={sales?.booking_per_month || 0}
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
                            <span class="percentage">8.5%</span>
                            <span class="comparison-value">
                              Compared to (€21,340 last year)
                            </span>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className="col-12 ">
                    <div className="row px-0">
                      <div className="col-6 charts_area_sales mt-3 ">
                        <div>
                          <div className="titles_charts">
                            <h1>Revenue</h1>
                            <div class="calendar-badge">
                              <div
                                class="calendar-year"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {selectedYears}
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
                                            handleYearChanges(yearRange)
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
                              />
                            </div>
                          </div>
                          <div id="chart">
                            {loaders ? (
                              <div className="d-flex align-items-center justify-content-center">
                                <FadeSpinners />
                              </div>
                            ) : (
                              <Chart
                                options={optionsCharts}
                                series={series}
                                type="area"
                                height={350}
                              />
                            )}
                          </div>
                          <div id="html-dist"></div>
                        </div>
                      </div>

                      <div className="col-6 charts_area_sales mt-3">
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
                              />
                            </div>
                          </div>
                          <div id="chart">
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

export default Sales;
