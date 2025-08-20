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

  // ===== Arrow logic =====
  // Enkel rotatie op basis van open content
  const isOpen = pronounsOpen || infoOpen;
  const arrowClass = `arrow ${isOpen ? "open" : ""}`;

  // Case knoppen alleen tonen als individuele content open is
  const showControls = (pronounsOpen && hasPronouns) || (infoOpen && hasInfo);

  return (
    <div className={`case-container ${isPronounView ? "pronoun-view" : ""}`}>
      <div className="case-title" onClick={() => toggleCaseAll(titleKey)}>
        <span className={arrowClass}>▶</span>
        <h3>{caseTitle}</h3>
      </div>

      {!isPronounView && showControls && (
        <div className="case-controls">
          {hasPronouns && (
            <button
              className="case-pronouns-btn"
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
              className="case-info-btn"
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

      {/* Pronouns content */}
      {pronounsOpen && hasPronouns && (
        <div className="case-pronouns">
          {caseData.pronounCategories.map((cat) => (
            <div key={cat.key} className={`case-pronoun ${cat.key}`}>
              <strong>{cat.label}:</strong>
              {caseData[cat.key]?.map((pronoun, index) => (
                <span key={index}>{pronoun}</span>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Info content */}
      {infoOpen && hasInfo && (
        <div
          className="case-info"
          dangerouslySetInnerHTML={{ __html: caseData.infoContent }}
        />
      )}

      {/* Pronoun view rendering */}
      {isPronounView && pronounsOpen && caseData.cases && (
        <div className="pronoun-case-list">
          {Object.entries(caseData.cases).map(([caseName, pronouns]) => (
            <div key={caseName} className="pronoun-case">
              <strong>{caseName}:</strong> {pronouns.join(", ")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Case;

