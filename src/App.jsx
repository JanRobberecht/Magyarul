import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation
} from "react-router-dom";

import Grammar from "./pages/Grammar";
import Vocabulary from "./pages/Vocabulary";
import Cases from "./pages/Cases";
import Verbs from "./pages/Verbs";
import Words from "./pages/Words";
import Expressions from "./pages/Expressions";
import Home from "./pages/Home";

/* ===========================
   Sidebar component
=========================== */
function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const mobileMenu = [
    {
      label: "Grammar",
      path: "/grammar",
      children: [
        { label: "Cases", path: "/grammar/cases" },
        { label: "Verbs", path: "/grammar/verbs" },
      ],
    },
    {
      label: "Vocabulary",
      path: "/vocabulary",
      children: [
        { label: "Words", path: "/vocabulary/words" },
        { label: "Expressions", path: "/vocabulary/expressions" },
      ],
    },
  ];

  const desktopLinks = [];
  if (location.pathname.startsWith("/grammar")) {
    desktopLinks.push({ label: "Cases", path: "/grammar/cases" });
    desktopLinks.push({ label: "Verbs", path: "/grammar/verbs" });
  } else if (location.pathname.startsWith("/vocabulary")) {
    desktopLinks.push({ label: "Words", path: "/vocabulary/words" });
    desktopLinks.push({ label: "Expressions", path: "/vocabulary/expressions" });
  }

  // Close mobile sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, setOpen]);


  return (
    <>
      {/* Mobile Sidebar */}
      <nav className={`sidebar mobile ${open ? "open" : ""}`}>
        <ul>
          {mobileMenu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {item.label}
              </NavLink>
              {item.children && (
                <ul>
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <NavLink
                        to={child.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) => (isActive ? "active-link" : "")}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="sidebar desktop">
        <ul>
          {desktopLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

/* ===========================
   Header component
=========================== */
function Header({ onHamburgerClick }) {
  return (
    <header className="header">
      <button className="hamburger" onClick={onHamburgerClick}>
        ☰
      </button>
      <h1>Magyarul</h1>
      <nav className="top-nav">
        <NavLink to="/grammar" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Grammar
        </NavLink>
        <NavLink to="/vocabulary" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Vocabulary
        </NavLink>
      </nav>
    </header>
  );
}

/* ===========================
   Main App component
=========================== */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);

      
/*  useEffect(() => {
    const body = document.body;
    if (menuOpen) {
      body.style.overflow = "hidden";  // prevent body scroll
    } else {
      body.style.overflow = "";        // restore scroll
    }

    // Clean up on unmount
    return () => {
      body.style.overflow = "";
    };
  }, [menuOpen]);*/

  return (
    <Router>
      <div className="app-container">
        <Header onHamburgerClick={() => setMenuOpen(!menuOpen)} />
        <div className="content-container">
          <Sidebar open={menuOpen} setOpen={setMenuOpen} />
          <main className="main-content">
            <Routes>
              <Route path="/grammar" element={<Grammar />} />
              <Route path="/grammar/cases" element={<Cases />} />
              <Route path="/grammar/verbs" element={<Verbs />} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              <Route path="/vocabulary/words" element={<Words />} />
              <Route path="/vocabulary/expressions" element={<Expressions />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
