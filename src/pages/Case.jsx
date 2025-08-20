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

  // Arrow rotatie enkel op basis van open content
  const isOpen = pronounsOpen || infoOpen;
  const arrowClass = `arrow ${isOpen ? "open" : ""}`;

  const showControls = (pronounsOpen && hasPronouns) || (infoOpen && hasInfo);

  return (
    <div className={`item-container ${isPronounView ? "category-view" : ""}`}>
      <div className="item-title" onClick={() => toggleCaseAll(titleKey)}>
        <span className={arrowClass}>▶</span>
        <h3>{caseTitle}</h3>
      </div>

      {!isPronounView && showControls && (
        <div className="item-controls">
          {hasPronouns && (
            <button
              className="item-subitem1-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleCasePronouns(caseTitle);
              }}
            >
              {pronounsOpen ? "Collapse Pronouns" : "Expand Pronouns"}
            </button>
          )}

          {hasInfo && (
            <button
              className="item-subitem2-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleCaseInfo(caseTitle);
              }}
            >
              {infoOpen ? "Collapse Info" : "Expand Info"}
            </button>
          )}
        </div>
      )}

      {pronounsOpen && hasPronouns && (
        <div className="item-subitem1-list">
          {caseData.pronounCategories.map((cat) => (
            <div key={cat.key} className={`item-subitem1-entry ${cat.key}`}>
              <strong>{cat.label}:</strong>
              {caseData[cat.key]?.map((pronoun, index) => (
                <div key={index}>{pronoun}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {infoOpen && hasInfo && (
        <div
          className="item-subitem2"
          dangerouslySetInnerHTML={{ __html: caseData.infoContent }}
        />
      )}

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
