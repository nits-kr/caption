import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getVenue } from "../../apiServices/partnerHttpService/partnerLoginHttpService";

const DeskSidebar = () => {
  const [loader, setLoader] = useState(false);
  const [venue, setVenue] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(
    localStorage.getItem("venueId") || ""
  );

  const modules = localStorage?.getItem("modules");
  const loginType = localStorage?.getItem("login_type");

  const isAccessAllowed = (accessItem) => {
    return modules?.includes(accessItem);
  };

  useEffect(() => {
    venu();
  }, []);

  const venu = async () => {
    setLoader(true);
    const { data } = await getVenue();
    if (!data.error) {
      setVenue(data?.results?.venues);

      if (!localStorage.getItem("venueId")) {
        localStorage.setItem("venueId", data?.results?.venues?.[0]?._id);
      }
      setLoader(false);
    }
  };

  const handleVenueSelection = (venueId) => {
    localStorage.removeItem("venueId");
    localStorage.setItem("venueId", venueId);
    setSelectedVenueId(venueId);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  let navigate = useNavigate();
  function Logo() {
    return (
      <div className="logo-container mb-2">
        {" "}
        <img
          loading="lazy"
          src="/resources/imgs/logo2.svg"
          alt="Company Logo"
          className="logo"
        />{" "}
      </div>
    );
  }
  function MenuItem({ icon, label, count }) {
    return (
      <div
        className={
          window.location.href.includes(label?.replace(/\s/g, ""))
            ? "menu-item active"
            : "menu-item "
        }
        onClick={() => {
          navigate(`/app/partner/${label?.replace(/\s/g, "")}`);
        }}
      >
        {" "}
        <img
          loading="lazy"
          src={icon}
          alt={`${label} icon`}
          className={
            window.location.href.includes(label?.replace(/\s/g, ""))
              ? "menu-icon-active"
              : "menu-icon"
          }
        />{" "}
        <div className="menu-label">{label}</div>{" "}
        {/* {count && (
          <div className="notification-badge">
            {" "}
            <div className="notification-count">{count}</div>{" "}
          </div>
        )}{" "} */}
      </div>
    );
  }
  function ProfileCard() {
    return (
      <div className="profile-card">
        {" "}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/207fe47b3fc2b225b415d9b779f98b72b3a8cfef7a6f488c41ef54f6943f9af4?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
          alt="Profile avatar"
          className="avatar"
        />{" "}
        <div className="profile-info">
          {" "}
          <div className="profile-header">
            {" "}
            {/* <div className="profile-name">
              {venue.find((v) => v?._id === selectedVenueId)?.name_en ||
                venue[0]?.name_en}{" "}
            </div>{" "} */}
            {venue.find((v) => v?._id === selectedVenueId)?.name_en ||
              venue[0]?.name_en}
            <div class="dropdown">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fb2206bdade6ae17b7f2147f280325cbbc8e76fd6e754082c64b2a0f8eb33f8?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                alt="Settings icon"
                className="settings-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />{" "}
              <ul class="dropdown-menu">
                {venue?.map((ite, ind) => {
                  return (
                    <li key={ind}>
                      <Link
                        class="dropdown-item"
                        to="#"
                        onClick={() => handleVenueSelection(ite._id)}
                      >
                        {ite?.name_en}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>{" "}
          {/* <div className="profile-title">Manager</div>{" "} */}
        </div>{" "}
      </div>
    );
  }

  function Sidebar() {
    const menuItems = [
      {
        icon: "/resources/imgs/dashIcon.svg",
        label: "Dashboard",
      },
      {
        icon: "/resources/imgs/scheduleIcon.svg",
        label: "Schedule",
        count: "12",
      },
      {
        icon: "/resources/imgs/bookingIcon.svg",
        label: "Booking",
      },
      {
        icon: "/resources/imgs/courtsIcon.svg",
        label: "Courts",
      },
      {
        icon: "/resources/imgs/customersIcon.svg",
        label: "Customers",
      },
      {
        icon: "/resources/imgs/eventsIcon.svg",
        label: "Events",
      },
      {
        icon: "/resources/imgs/marketIcon.svg",
        label: "Marketing",
      },
      {
        icon: "/resources/imgs/salesIcon.svg",
        label: "Sales",
      },
      {
        icon: "/resources/imgs/billIcon.svg",
        label: "Billings",
      },
      {
        icon: "/resources/imgs/staffIcon.svg",
        label: "Staff",
      },
      {
        icon: "/resources/imgs/venue.svg",
        label: "Venue Profile",
      },
    ];

    const filteredMenuItems =
      loginType === "Admin"
        ? menuItems
        : menuItems.filter((item) => isAccessAllowed(item.label));

    return (
      <div className="sidebar">
        <Logo />

        {/* {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            count={item.count}
            onClick={item.onClick}
          />
        ))} */}
        {filteredMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            count={item.count}
            onClick={item.onClick}
          />
        ))}

        <ProfileCard />
      </div>
    );
  }

  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default DeskSidebar;
