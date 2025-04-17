
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import VolatilityTableHeader from "./VolatilityTableHeader";
import VolatilityTableRow from "./VolatilityTableRow";

interface OptionData {
  id: number;
  ticker: string;
  strike: number;
  expiry: string;
  iv: number;
  callPrice: number;
  putPrice: number;
  ivPercentile: number;
  recentChange: number;
  sentiment: string;
}

interface VolatilityTableProps {
  filteredData: OptionData[];
  sortColumn: string;
  sortDirection: string;
  onSort: (column: string) => void;
}

const VolatilityTable = ({ 
  filteredData, 
  sortColumn, 
  sortDirection, 
  onSort 
}: VolatilityTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <VolatilityTableHeader 
          sortColumn={sortColumn} 
          sortDirection={sortDirection} 
          onSort={onSort} 
        />
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                No options found matching your filters
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((option) => (
              <VolatilityTableRow key={option.id} option={option} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VolatilityTable;
