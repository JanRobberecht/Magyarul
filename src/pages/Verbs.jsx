import React, { useState } from "react";
import casesObject from "../data/cases.json";

const pronounCategories = [
  { label: "Pers Pron", key: "person_prn" },
  { label: "Dem Pron", key: "demons_prn" },
  { label: "Int Pron", key: "interr_prn" },
  { label: "Refl Pron", key: "reflex_prn" },
];

function Cases({ cases = casesObject }) { 

  const [expanded, setExpanded] = useState({});

  const toggleCase = (caseName) => {
    setExpanded((prev) => ({ ...prev, [caseName]: !prev[caseName] }));
  };

  const toggleAllCases = () => {
    const allOpen = Object.keys(cases).every((caseName) => expanded[caseName]);
    // als alles open is -> sluit alles, anders open alles
    const newExpanded = {};
    Object.keys(cases).forEach((caseName) => {
      newExpanded[caseName] = !allOpen;
    });
    setExpanded(newExpanded);
  };

  return (
    <>
      <button id="expand-cases" onClick={toggleAllCases}>
        {Object.keys(cases).every((caseName) => expanded[caseName])
          ? "Collapse All"
          : "Expand All"}
      </button>

      <div>
        {Object.entries(cases).map(([caseName, caseData]) => (
          <div key={caseName} className="case-container">
            <div
              className="case-header"
              onClick={() => toggleCase(caseName)}
              style={{ cursor: "pointer" }}
            >
              <div className={`arrow ${expanded[caseName] ? "down" : "right"}`}>▶</div>
              <h3> {caseName}</h3>
              <div> {caseData.suffix}</div>
            </div>

            {expanded[caseName] && (
              <div className="case-body">
                {pronounCategories.map((category) => (
                  <div key={category.key} className={`${category.key} case-data`}>
                    <strong>{category.label}</strong>
                    {caseData[category.key]?.map((pronoun, index) => (
                      <span key={index}>{pronoun}</span>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Cases;
