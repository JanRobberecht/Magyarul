import React from "react";

function Case({
  caseTitle,
  caseData,
  hasPronouns,
  hasInfo,
  pronounsOpen,
  infoOpen,
  toggleCasePronouns,
  toggleCaseInfo,
  toggleCaseAll,
  isPronounView = false,
}) {
  const titleKey = isPronounView ? caseData.pronounCategory?.key : caseTitle;

  // Case is open als pronouns of info open zijn
  const isOpen = pronounsOpen || infoOpen;
  const arrowClass = `arrow ${isOpen ? "open" : ""}`;

  return (
    <div className={`item-container ${isPronounView ? "category-view" : ""}`}>
      {/* Case title */}
      <div className="item-title" onClick={() => toggleCaseAll(titleKey)}>
        <span className={arrowClass}>▶</span>
        <h3>{caseTitle}</h3>
      </div>

      {/* Pronouns knop boven de lijst, alleen tonen als case open is */}
      {!isPronounView && hasPronouns && isOpen && (
        <div className="item-controls">
          <button
            className="item-subitem1-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleCasePronouns(caseTitle);
            }}
          >
            {pronounsOpen ? "Collapse Pronouns" : "Expand Pronouns"}
          </button>
        </div>
      )}

      {/* Pronouns lijst */}
      {pronounsOpen && hasPronouns && (
        <div className="item-subitem1-list">
          {caseData.pronounCategories?.map((cat) => (
            <div key={cat.key} className={`item-subitem1-entry ${cat.key}`}>
              <strong>{cat.label}:</strong>
              {caseData[cat.key]?.map((pronoun, index) => (
                <div key={index}>{pronoun}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Info knop onder pronouns lijst en boven info content */}
      {!isPronounView && hasInfo && isOpen && (
        <div className="item-controls">
          <button
            className="item-subitem2-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleCaseInfo(caseTitle);
            }}
          >
            {infoOpen ? "Collapse Info" : "Expand Info"}
          </button>
        </div>
      )}

      {/* Info content */}
      {infoOpen && hasInfo && (
        <div
          className="item-subitem2"
          dangerouslySetInnerHTML={{ __html: caseData.infoContent }}
        />
      )}

      {/* Pronouns view (alleen tonen als open) */}
      {isPronounView && pronounsOpen && caseData.cases && (
        <div className="item-subitem1-list">
          {Object.entries(caseData.cases).map(([caseName, pronouns]) => (
            <div key={caseName} className="item-subitem1-entry">
              <strong>{caseName}</strong>
              <div className="pronouns-list">
                {pronouns.map((p, idx) => (
                  <div key={idx} className="pronoun-item">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Case;

