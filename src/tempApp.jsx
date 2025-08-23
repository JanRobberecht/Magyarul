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
import Cases from "./pages/Items";
import Verbs from "./pages/Verbs";
import Words from "./pages/Words";
import Expressions from "./pages/Expressions";
import Home from "./pages/Home";

/* ===========================
   Sidebar component
=========================== */
function Sidebar({ open, setOpen }) {
  const menu = [
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

  const [expanded, setExpanded] = useState({}); // track welke menu’s open zijn

  const toggle = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isMobile = window.innerWidth < 768;

  // Close mobile sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, setOpen]);

  return (
    <nav className={`sidebar ${open ? "open" : ""}`}>
      <ul className="menu">
        {menu.map((item) => (
          <li key={item.path}>
            <div
              className="menu-label"
              onClick={() => item.children && toggle(item.label)}
            >
              {item.children && (
                <span className={`arrow ${expanded[item.label] ? "down" : "right"}`}>
                  ▶
                </span>
              )}
              {item.label}
            </div>
            {item.children && expanded[item.label] && (
              <ul className="submenu">
                {item.children.map((child) => (
                  <li key={child.path}>
                    <NavLink
                      to={child.path}
                      onClick={() => isMobile && setOpen(false)}
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
    </header>
  );
}


/* ===========================
   Main App component
=========================== */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);

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