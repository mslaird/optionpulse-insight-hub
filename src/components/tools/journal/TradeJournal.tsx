
import React from "react";
import { useTradeJournal } from "./useTradeJournal";
import JournalFilters from "./JournalFilters";
import PerformanceMetrics from "./PerformanceMetrics";
import TradeDistribution from "./TradeDistribution";
import AlertSuggestions from "./alerts/AlertSuggestions";
import AddTradeForm from "./AddTradeForm";
import TradesTable from "./TradesTable";
import { NewTradeFormData } from "./types";

const TradeJournal = () => {
  const {
    filteredTrades,
    filters,
    newTrade,
    showAddForm,
    showStats,
    expandedTrade,
    statistics,
    actions
  } = useTradeJournal();

  const handleCreateTradeFromAlert = (tradeData: NewTradeFormData) => {
    actions.setNewTrade(tradeData);
    actions.setShowAddForm(true);
  };

  return (
    <div className="flex flex-col space-y-6">
      <JournalFilters
        filters={filters}
        showStats={showStats}
        onFilterChange={actions.updateFilters}
        onToggleStats={() => actions.setShowStats(!showStats)}
        onAddTrade={() => actions.setShowAddForm(true)}
      />
      
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PerformanceMetrics
            totalProfitLoss={statistics.totalProfitLoss}
            winRate={statistics.winRate}
            totalTrades={statistics.totalTrades}
            openTrades={statistics.totalTrades - statistics.closedTrades}
            tradeHistoryData={statistics.tradeHistoryData}
          />
          
          <TradeDistribution
            tradesByStrategy={statistics.tradesByStrategy}
            profitByTicker={statistics.profitByTicker}
          />
        </div>
      )}
      
      <AlertSuggestions onCreateTradeFromAlert={handleCreateTradeFromAlert} />
      
      {showAddForm && (
        <AddTradeForm
          newTrade={newTrade}
          onTradeChange={actions.setNewTrade}
          onSubmit={actions.handleAddTrade}
          onCancel={() => actions.setShowAddForm(false)}
        />
      )}
      
      <TradesTable
        trades={filteredTrades}
        expandedTrade={expandedTrade}
        onToggleDetails={actions.handleToggleDetails}
        onDeleteTrade={actions.handleDeleteTrade}
      />
    </div>
  );
};

export default TradeJournal;
