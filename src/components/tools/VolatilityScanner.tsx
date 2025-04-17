
import React from "react";
import VolatilityFilters from "./volatility/VolatilityFilters";
import VolatilityTable from "./volatility/VolatilityTable";
import { useVolatilityScanner } from "./volatility/useVolatilityScanner";

const VolatilityScanner = () => {
  const {
    filteredData,
    tickerFilter,
    setTickerFilter,
    expiryFilter,
    setExpiryFilter,
    minIVFilter,
    setMinIVFilter,
    sortColumn,
    sortDirection,
    uniqueExpiryDates,
    handleSort,
    handleRefresh
  } = useVolatilityScanner();

  return (
    <div className="flex flex-col space-y-6">
      <VolatilityFilters
        tickerFilter={tickerFilter}
        setTickerFilter={setTickerFilter}
        expiryFilter={expiryFilter}
        setExpiryFilter={setExpiryFilter}
        minIVFilter={minIVFilter}
        setMinIVFilter={setMinIVFilter}
        uniqueExpiryDates={uniqueExpiryDates}
        onRefresh={handleRefresh}
      />
      
      <VolatilityTable
        filteredData={filteredData}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
};

export default VolatilityScanner;
