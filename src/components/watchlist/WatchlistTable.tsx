
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";

export type WatchlistItemType = "stock" | "option";

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  type: WatchlistItemType;
  price: number;
  priceChange: number;
  optionType?: "call" | "put";
  strikePrice?: number;
  expiryDate?: string;
}

interface WatchlistTableProps {
  items: WatchlistItem[];
  removeFromWatchlist: (id: string) => void;
}

const WatchlistTable = ({ items, removeFromWatchlist }: WatchlistTableProps) => {
  return (
    <>
      {items.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{item.symbol}</div>
                      <div className="text-xs text-muted-foreground">{item.name}</div>
                      {item.type === "option" && (
                        <div className="text-xs mt-1">
                          ${item.strikePrice} {item.optionType} · {item.expiryDate}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.type === "stock" 
                        ? "bg-optionpulse-blue/20 text-optionpulse-blue" 
                        : "bg-accent/20 text-accent"
                    }`}>
                      {item.type === "stock" ? "Stock" : "Option"}
                    </span>
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className={`flex items-center ${
                      item.priceChange >= 0 
                        ? "text-accent text-glow-green" 
                        : "text-destructive text-glow-red"
                    }`}>
                      {item.priceChange >= 0 ? (
                        <ArrowUpRight size={16} className="mr-1" />
                      ) : (
                        <ArrowDownRight size={16} className="mr-1" />
                      )}
                      {Math.abs(item.priceChange).toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeFromWatchlist(item.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>No items in watchlist. Add some symbols to track.</p>
        </div>
      )}
    </>
  );
};

export default WatchlistTable;
