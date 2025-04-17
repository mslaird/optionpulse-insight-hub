
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface VolatilityTableHeaderProps {
  sortColumn: string;
  sortDirection: string;
  onSort: (column: string) => void;
}

const VolatilityTableHeader = ({
  sortColumn,
  sortDirection,
  onSort,
}: VolatilityTableHeaderProps) => {
  const renderSortableHeader = (title: string, column: string) => (
    <TableHead 
      className={`cursor-pointer ${sortColumn === column ? "text-primary" : ""}`}
      onClick={() => onSort(column)}
    >
      {title}
      {sortColumn === column && (
        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
      )}
    </TableHead>
  );

  return (
    <TableHeader>
      <TableRow>
        {renderSortableHeader("Ticker", "ticker")}
        {renderSortableHeader("Strike", "strike")}
        {renderSortableHeader("Expiry", "expiry")}
        {renderSortableHeader("IV", "iv")}
        {renderSortableHeader("IV Percentile", "ivPercentile")}
        <TableHead>Call Price</TableHead>
        <TableHead>Put Price</TableHead>
        {renderSortableHeader("Recent IV Change", "recentChange")}
        <TableHead>Sentiment</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default VolatilityTableHeader;
