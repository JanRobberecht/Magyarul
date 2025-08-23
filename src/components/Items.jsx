import React, { useState, useEffect } from "react";
import { usePreparedCharts } from "../hooks/usePreparedCharts";

function Items({ source, items }) {
  const preparedItems = usePreparedCharts(source, items);

  const renderData = (data, Wrapper = "div", className = "") => {
    if (Array.isArray(data)) {
      return data.map((item, idx) => (
        <Wrapper
          key={idx}
          className={className}
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ));
    }
    return (
      <Wrapper className={className} dangerouslySetInnerHTML={{ __html: data }} />
    );
  };

  // Track which items are collapsed
  const [collapsedItems, setCollapsedItems] = useState({});
  const [allCollapsed, setAllCollapsed] = useState(true);

  // Initialize collapsed state whenever items change
  useEffect(() => {
    const initialState = {};
    preparedItems.forEach((item) => {
      initialState[item.name] = true; // collapsed by default
    });
    setCollapsedItems(initialState);
    setAllCollapsed(true);
  }, [preparedItems]);

  // Keep `allCollapsed` in sync when user toggles items manually
  useEffect(() => {
    if (Object.keys(collapsedItems).length > 0) {
      const allAreCollapsed = Object.values(collapsedItems).every((v) => v);
      const noneAreCollapsed = Object.values(collapsedItems).every((v) => !v);

      if (allAreCollapsed) {
        setAllCollapsed(true);
      } else if (noneAreCollapsed) {
        setAllCollapsed(false);
      } else {
        // Mixed state → leave it as-is
      }
    }
  }, [collapsedItems]);

  const toggleCollapse = (itemName) => {
    setCollapsedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const toggleAll = () => {
    const newAllCollapsed = !allCollapsed;
    const newState = {};
    preparedItems.forEach((item) => {
      newState[item.name] = newAllCollapsed;
    });
    setCollapsedItems(newState);
    setAllCollapsed(newAllCollapsed);
  };

  return (
    <>
      <h2>{source}</h2>
      <button onClick={toggleAll}>
        {allCollapsed ? "Show All" : "Hide All"}
      </button>
      {source === "Cases" && <button>View</button>}

      {preparedItems.map((item) => {
        const isCollapsed = collapsedItems[item.name];
        return (
          <div key={item.name} className="item-container">
            {/* Clickable title with arrow */}
            <h2
              className="item-title"
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              onClick={() => toggleCollapse(item.name)}
            >
              <span className={`arrow ${isCollapsed ? "" : "down"}`}>▶</span>
              {item.name} {source === "Cases" && item.suffix ? item.suffix : ""}
            </h2>

            {/* Collapsible content */}
            {!isCollapsed && (
              <>
                {item.charts.map((chartWrapper, idx) => (
                  <div key={idx} className="item-wrapper">
                    {chartWrapper.prelude &&
                      renderData(chartWrapper.prelude, "div", "chart-prelude")}

                    <div className="item-charts">
                      {chartWrapper.subCharts.map((sub) => (
                        <div key={sub.key} className="item-chart">
                          <div className="item-chart-key">{sub.key}</div>

                          {source === "Cases"
                            ? renderData(sub.data)
                            : sub.data.map(([subKey, values]) => (
                                <div key={subKey} className="item-subchart">
                                  <div className="item-subchart-key">{subKey}</div>
                                  {renderData(values)}
                                </div>
                              ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {item.info && renderData(item.info, "div", "item-info")}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default Items;
