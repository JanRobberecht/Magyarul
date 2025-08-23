import { useMemo } from "react";

export function usePreparedCharts(source, items) {
  return useMemo(() => {
    if (!items) return [];

    return Object.entries(items).map(([itemName, itemData]) => {
      // Prepare charts depending on source type
      let charts = [];

      if (Array.isArray(itemData.charts)) {
        charts = itemData.charts
          .map((chart) => {
            if (source === "Cases") return prepareCaseCharts(chart);
            if (source === "Verbs") return prepareVerbCharts(chart);
            return null;
          })
          .filter(Boolean); // remove null/empty charts
      }

      return {
        name: itemName,
        suffix: itemData.suffix,
        info: itemData.info,
        charts,
      };
    });
  }, [source, items]);
}

// --- helpers for Cases
function prepareCaseCharts(chart) {
  const subCharts = Object.entries(chart)
    .filter(([key, data]) => key !== "prelude" && hasData(data))
    .map(([key, data]) => ({ key, data }));

  if (!subCharts.length) return null; // skip empty charts

  return {
    prelude: chart.prelude || null,
    subCharts,
  };
}

// --- helpers for Verbs
function prepareVerbCharts(chart) {
  const subCharts = ["indefinite", "definite"]
    .filter((key) => chart[key] && hasData(chart[key]))
    .map((key) => ({
      key,
      data: Object.entries(chart[key]).filter(([_, values]) => hasData(values)),
    }));

  if (!subCharts.length) return null; // skip empty charts

  return {
    prelude: chart.prelude || null,
    subCharts,
  };
}

// --- util: check if there's any data
function hasData(data) {
  if (!data) return false;
  if (Array.isArray(data)) return data.length > 0;
  if (typeof data === "object") return Object.keys(data).length > 0;
  return true;
}
