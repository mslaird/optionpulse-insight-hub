
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PayoffDiagramGenerator from "@/components/tools/PayoffDiagramGenerator";
import GreeksCalculator from "@/components/tools/GreeksCalculator";
import RiskRewardAnalyzer from "@/components/tools/RiskRewardAnalyzer";
import VolatilityScanner from "@/components/tools/VolatilityScanner";
import StrategyBuilder from "@/components/tools/StrategyBuilder";
import TradeJournal from "@/components/tools/TradeJournal";
import { Calculator, LineChart, BarChart3, TrendingUp, Maximize2, BookMarked } from "lucide-react";

const Tools = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Options Tools</h1>
          <p className="text-muted-foreground">
            Advanced calculators and tools for options analysis and strategy building
          </p>
        </div>

        <Tabs defaultValue="payoff" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
            <TabsTrigger value="payoff" className="flex items-center gap-2">
              <LineChart size={16} />
              <span className="hidden md:inline">Payoff Diagram</span>
              <span className="md:hidden">Payoff</span>
            </TabsTrigger>
            <TabsTrigger value="greeks" className="flex items-center gap-2">
              <Calculator size={16} />
              <span>Greeks</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span className="hidden md:inline">Risk/Reward</span>
              <span className="md:hidden">Risk</span>
            </TabsTrigger>
            <TabsTrigger value="volatility" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span className="hidden md:inline">Volatility Scanner</span>
              <span className="md:hidden">Volatility</span>
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <Maximize2 size={16} />
              <span className="hidden md:inline">Strategy Builder</span>
              <span className="md:hidden">Strategy</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <BookMarked size={16} />
              <span className="hidden md:inline">Trade Journal</span>
              <span className="md:hidden">Journal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payoff" className="space-y-4">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Payoff Diagram Generator</CardTitle>
                <CardDescription>
                  Create visual representations of potential profits and losses for option strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PayoffDiagramGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="greeks" className="space-y-4">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Greeks Calculator</CardTitle>
                <CardDescription>
                  Calculate option Greeks (Delta, Gamma, Theta, Vega) for any option contract
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GreeksCalculator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Risk/Reward Analyzer</CardTitle>
                <CardDescription>
                  Analyze the potential risk and reward for your option strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RiskRewardAnalyzer />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volatility" className="space-y-4">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Volatility Scanner</CardTitle>
                <CardDescription>
                  Find options with high implied volatility across different tickers and expirations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VolatilityScanner />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-4">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Strategy Builder</CardTitle>
                <CardDescription>
                  Build custom option strategies and see the potential outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StrategyBuilder />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journal" className="space-y-4">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Trade Journal</CardTitle>
                <CardDescription>
                  Log and track your options trades to improve your strategies over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TradeJournal />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tools;
