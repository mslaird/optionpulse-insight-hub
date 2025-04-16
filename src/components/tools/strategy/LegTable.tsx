
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Move, Trash2, Clock } from "lucide-react";
import { LegTableProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const LegTable: React.FC<LegTableProps> = ({
  legs,
  onLegChange,
  onDeleteLeg,
  onDragStart,
  onDragOver,
  onDragEnd,
  draggedLeg,
  showLeaps = false
}) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: "40px" }}></TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Strike</TableHead>
            <TableHead>
              Premium
              {showLeaps && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="ml-2 bg-purple-500/10 text-purple-400 border-purple-500/30">
                        <Clock size={10} className="mr-1" />Higher
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">
                        LEAPS typically have higher premiums due to their longer duration, 
                        but lower time decay (theta) per day
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead style={{ width: "80px" }}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {legs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No option legs added. Click "Add Leg" to start building your strategy.
                {showLeaps && (
                  <p className="text-sm text-purple-400 mt-2">
                    LEAPS mode is enabled. You can add longer-dated options with different IV characteristics.
                  </p>
                )}
              </TableCell>
            </TableRow>
          ) : (
            legs.map((leg, index) => (
              <TableRow 
                key={leg.id} 
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={(e) => onDragOver(e, index)}
                onDragEnd={onDragEnd}
                className="cursor-move"
              >
                <TableCell className="p-2">
                  <Button variant="ghost" size="icon" className="cursor-move">
                    <Move size={16} />
                  </Button>
                </TableCell>
                <TableCell>
                  <Select
                    value={leg.action}
                    onValueChange={(value) => onLegChange(leg.id, 'action', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={leg.type}
                    onValueChange={(value) => onLegChange(leg.id, 'type', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="put">Put</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={leg.strike}
                    onChange={(e) => onLegChange(leg.id, 'strike', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={leg.premium}
                    onChange={(e) => onLegChange(leg.id, 'premium', parseFloat(e.target.value))}
                    className={`w-full ${showLeaps ? "border-purple-500/30" : ""}`}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="1"
                    value={leg.quantity}
                    onChange={(e) => onLegChange(leg.id, 'quantity', parseInt(e.target.value))}
                    className="w-full"
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDeleteLeg(leg.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LegTable;
