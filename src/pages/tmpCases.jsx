import React, { useState, useMemo } from "react";
import Case from "./Case";
import casesObject from "../data/cases.json";
import casesInfo from "../data/cases.js";

// Pronoun categories
const pronounCategories = [
  { label: "Pers Pron", key: "person_prn" },
  { label: "Dem Pron", key: "demons_prn" },
  { label: "Int Pron", key: "interr_prn" },
  { label: "Refl Pron", key: "reflex_prn" },
];

// Helper to toggle state
const toggleState = (state, keys, value = null) => {
  const next = { ...state };
  keys.forEach((k) => {
    next[k] = value !== null ? value : !state[k];
  });
  return next;
};

function Cases({ cases = casesObject }) {
  const [pronouns, setPronouns] = useState({});
  const [info, setInfo] = useState({});
  const [view, setView] = useState("cases"); // "cases" or "pronouns"
  const [lastToggle, setLastToggle] = useState("all"); // "all", "pronouns", "info"

  const allCases = useMemo(() => Object.keys(cases), [cases]);

  const casesWithPronouns = useMemo(
    () =>
      allCases.filter((t) =>
        pronounCategories.some((cat) => cases[t][cat.key]?.length > 0)
      ),
    [allCases, cases]
  );

  const casesWithInfo = useMemo(
    () => allCases.filter((t) => Boolean(casesInfo[t])),
    [allCases]
  );

  // ===== Mass actions =====
  const expandAll = () => {
    setLastToggle("all");
    if (view === "cases") {
      setPronouns(toggleState(pronouns, casesWithPronouns, true));
      setInfo(toggleState(info, casesWithInfo, true));
    } else if (view === "pronouns") {
      const pronounKeys = pronounCategories.map((cat) => cat.key);
      setPronouns(toggleState(pronouns, pronounKeys, true));
    }
  };

  const collapseAll = () => {
    setLastToggle("all");
    setPronouns({});
    setInfo({});
  };

  const toggleAllPronouns = () => {
    setLastToggle("pronouns");
    setPronouns(
      toggleState(
        pronouns,
        casesWithPronouns,
        !casesWithPronouns.every((t) => !!pronouns[t])
      )
    );
  };

  const toggleAllInfo = () => {
    setLastToggle("info");
    setInfo(
      toggleState(
        info,
        casesWithInfo,
        !casesWithInfo.every((t) => !!info[t])
      )
    );
  };

  // ===== Status checks =====
  const anyPronounsOpen =
    view === "cases"
      ? casesWithPronouns.some((t) => !!pronouns[t])
      : pronounCategories.some((cat) => !!pronouns[cat.key]);

  const anyInfoOpen = casesWithInfo.some((t) => !!info[t]);
  const anyOpen = anyPronounsOpen || anyInfoOpen;

  const allPronounsOpen =
    view === "cases"
      ? casesWithPronouns.length > 0 &&
        casesWithPronouns.every((t) => !!pronouns[t])
      : pronounCategories.length > 0 &&
        pronounCategories.every((cat) => !!pronouns[cat.key]);

  const allInfoOpen =
    casesWithInfo.length > 0 && casesWithInfo.every((t) => !!info[t]);

  // ===== Render =====
  return (
    <>
      <div className="view-toggle">
        <button
          className={`view-btn ${view === "cases" ? "active" : ""}`}
          onClick={() => setView("cases")}
        >
          Cases View
        </button>
        <button
          className={`view-btn ${view === "pronouns" ? "active" : ""}`}
          onClick={() => setView("pronouns")}
        >
          Pronouns View
        </button>
      </div>

      {view === "cases" && (
        <div className="controls">
          {!anyOpen && (
            <button className="expand-all-btn" onClick={expandAll}>
              Expand All
            </button>
          )}
          {anyOpen && (
            <button className="collapse-all-btn" onClick={collapseAll}>
              Collapse All
            </button>
          )}

          {casesWithPronouns.length > 0 && (
            <button className="toggle-pronouns-btn" onClick={toggleAllPronouns}>
              {allPronounsOpen ? "Collapse Pronouns" : "Expand Pronouns"}
            </button>
          )}

          {casesWithInfo.length > 0 && (
            <button className="toggle-info-btn" onClick={toggleAllInfo}>
              {allInfoOpen ? "Collapse Info" : "Expand Info"}
            </button>
          )}
        </div>
      )}

      <div className={`cases-list ${view}-view`}>
        {view === "cases" &&
          allCases.map((caseTitle) => (
            <Case
              key={caseTitle}
              caseTitle={caseTitle}
              caseData={{
                ...cases[caseTitle],
                pronounCategories,
                infoContent: casesInfo[caseTitle] || "",
              }}
              hasPronouns={casesWithPronouns.includes(caseTitle)}
              hasInfo={casesWithInfo.includes(caseTitle)}
              pronounsOpen={pronouns[caseTitle]}
              infoOpen={info[caseTitle]}
              toggleCasePronouns={(t) =>
                setPronouns((prev) => ({ ...prev, [t]: !prev[t] }))
              }
              toggleCaseInfo={(t) =>
                setInfo((prev) => ({ ...prev, [t]: !prev[t] }))
              }
              toggleCaseAll={(t) => {
                const isOpen = pronouns[t] || info[t];
                if (isOpen) {
                  setPronouns((prev) => ({ ...prev, [t]: false }));
                  setInfo((prev) => ({ ...prev, [t]: false }));
                } else {
                  if (casesWithPronouns.includes(t)) {
                    setPronouns((prev) => ({ ...prev, [t]: true }));
                  }
                  if (casesWithInfo.includes(t)) {
                    setInfo((prev) => ({ ...prev, [t]: true }));
                  }
                }
              }}
              lastToggle={lastToggle} // <-- meegeven aan Case
            />
          ))}

        {view === "pronouns" &&
          pronounCategories.map((cat) => (
            <Case
              key={cat.key}
              caseTitle={cat.label}
              caseData={{
                pronounCategory: cat,
                cases: casesWithPronouns.reduce((acc, t) => {
                  const pronounsList = cases[t][cat.key];
                  if (pronounsList?.length > 0) acc[t] = pronounsList;
                  return acc;
                }, {}),
              }}
              pronounsOpen={pronouns[cat.key]}
              toggleCaseAll={(t) =>
                setPronouns((prev) => ({ ...prev, [t]: !prev[t] }))
              }
              isPronounView
              lastToggle={lastToggle} // <-- meegeven aan Case
            />
          ))}
      </div>
    </>
  );
}

export default Cases;
