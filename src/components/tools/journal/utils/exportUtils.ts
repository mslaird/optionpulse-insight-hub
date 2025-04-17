
import { Trade } from "../types";

export const exportTradesCsv = (trades: Trade[]) => {
  // Define CSV headers
  const headers = [
    "Date",
    "Ticker",
    "Strategy",
    "Action",
    "Quantity",
    "Strike",
    "Premium",
    "Expiry Date",
    "Result",
    "Profit/Loss",
    "Notes"
  ].join(",");
  
  // Map trades to CSV rows
  const rows = trades.map(trade => {
    return [
      trade.date,
      trade.ticker,
      trade.strategy,
      trade.action,
      trade.quantity,
      trade.strike,
      trade.premium,
      trade.expiryDate,
      trade.result,
      trade.profitLoss,
      `"${trade.notes.replace(/"/g, '""')}"`  // Escape quotes in notes
    ].join(",");
  });
  
  // Combine headers and rows
  const csvContent = [headers, ...rows].join("\n");
  
  // Create a blob and download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  // Create download link and trigger click
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `trades_export_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.display = "none";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
