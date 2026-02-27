import { NavLink, useNavigate } from "react-router-dom";
import "../../Assets/Styles/Header.css";
import "../../Assets/Styles/Sidebar.css";
import logo from "../../Assets/Images/logo-main.png";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import {
  MdHome,
  MdHealthAndSafety,
  MdPersonAdd,
  MdPeople,
  MdDashboard,
  MdLogout,
  MdClose,
  MdMenu,
} from "react-icons/md";

const OPERATOR_NAV_LINKS = [
  { to: "/home", label: "Home", Icon: MdHome },
  { to: "/yojna", label: "Yojna Details", Icon: MdHealthAndSafety },
  { to: "/addPatient", label: "New Patient", Icon: MdPersonAdd },
  { to: "/opRegistered-patients", label: "Registered Patients", Icon: MdPeople },
  { to: "/dashboard/0", label: "Dashboard", Icon: MdDashboard },
];

const OperatorHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("login", false);
    navigate("/");
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#a4c639",
    }).then((result) => {
      if (result.isConfirmed) handleLogout();
    });
  };

  return (
    <>
      <nav className={`hdr-navbar${scrolled ? " hdr-scrolled" : ""}`}>
        <div className="hdr-inner">

          {/* ── Logo ── */}
          <NavLink to="/home" className="hdr-logo-link" onClick={closeMenu}>
            <img src={logo} alt="MMH Logo" className="hdr-logo" />
            <span className="hdr-brand-name">MMH Portal</span>
          </NavLink>

          {/* ── Desktop Links ── */}
          <ul className="hdr-links">
            {OPERATOR_NAV_LINKS.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    "hdr-link" + (isActive ? " hdr-link--active" : "")
                  }
                >
                  <Icon className="hdr-link-icon" />
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <button className="hdr-logout-btn" onClick={confirmLogout}>
                <MdLogout className="hdr-link-icon" />
                Logout
              </button>
            </li>
          </ul>

          {/* ── Hamburger ── */}
          <button
            className="hdr-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <MdMenu />
          </button>
        </div>
      </nav>

      {/* ── Mobile Sidebar Overlay ── */}
      {menuOpen && (
        <div className="mmh-sb-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* ── Mobile Sidebar ── */}
      <aside
        ref={sidebarRef}
        className={`mmh-sb-drawer${menuOpen ? " mmh-sb-drawer--open" : ""}`}
        aria-label="Navigation menu"
      >
        <div className="mmh-sb-header">
          <img src={logo} alt="MMH Logo" className="mmh-sb-logo" />
          <div className="mmh-sb-brand">
            <span className="mmh-sb-brand-name">MMH Portal</span>
            <span className="mmh-sb-brand-sub">Maharashtra Medical Help</span>
          </div>
          <button className="mmh-sb-close-btn" onClick={closeMenu} aria-label="Close menu">
            <MdClose />
          </button>
        </div>

        <div className="mmh-sb-section-label">Navigation</div>

        <nav className="mmh-sb-nav">
          {OPERATOR_NAV_LINKS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                "mmh-sb-nav-item" + (isActive ? " mmh-sb-nav-item--active" : "")
              }
            >
              <span className="mmh-sb-nav-icon"><Icon /></span>
              <span className="mmh-sb-nav-label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mmh-sb-footer">
          <button className="mmh-sb-logout-btn" onClick={() => { closeMenu(); confirmLogout(); }}>
            <MdLogout />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default OperatorHeader;
