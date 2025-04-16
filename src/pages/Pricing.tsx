
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, Lock, BookOpen, Bell, Calculator, LineChart, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/auth";
import { useToast } from "@/hooks/use-toast";

const PricingPage = () => {
  const { user, upgradeToTier, startFreeTrial } = useAuth();
  const { toast } = useToast();

  const handleUpgrade = (tier: 'Free' | 'Lite' | 'Pro') => {
    if (tier === 'Pro') {
      startFreeTrial();
    } else {
      upgradeToTier(tier);
    }
    
    toast({
      title: tier === 'Free' ? "Downgraded to Free" : `Upgraded to ${tier}`,
      description: tier === 'Free' 
        ? "You've been downgraded to the Free tier" 
        : tier === 'Pro' 
          ? "Your 7-day free Pro trial has started" 
          : `You've been upgraded to the ${tier} tier`,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Pricing Plans</h1>
          <p className="text-muted-foreground">
            Choose the plan that best fits your options trading needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <Card className="bg-card/30 backdrop-blur-sm border-border/50 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Free</CardTitle>
              <CardDescription>Basic options trading tools</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Basic options chain</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Educational text content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Strategy trader simulator</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Basic volatility scanner</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Community read access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Basic trade journal</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Advanced options analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Payoff diagrams</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleUpgrade('Free')}
                disabled={!user || user.tier === 'Free'}
              >
                {!user || user.tier === 'Free' ? "Current Plan" : "Downgrade"}
              </Button>
            </CardFooter>
          </Card>

          {/* Lite Plan */}
          <Card className="bg-card/30 backdrop-blur-sm border-border/50 flex flex-col border-optionpulse-blue">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Lite</CardTitle>
                <div className="bg-optionpulse-blue/20 text-optionpulse-blue text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              </div>
              <CardDescription>Enhanced options analytics</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$19.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Full educational content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Payoff diagram generator</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Greeks calculator</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Risk/reward analyzer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Basic alert notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-optionpulse-blue mt-0.5 flex-shrink-0" />
                  <span>Community interaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Advanced options chain</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full text-optionpulse-blue border-optionpulse-blue"
                onClick={() => handleUpgrade('Lite')}
                disabled={!user || user.tier === 'Lite'}
              >
                {!user ? "Select Plan" : user.tier === 'Lite' ? "Current Plan" : user.tier === 'Pro' ? "Downgrade" : "Upgrade"}
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-card/30 backdrop-blur-sm border-border/50 flex flex-col border-yellow-400 bg-gradient-to-b from-card/30 to-card/80">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center">
                  Pro
                  <Sparkles size={16} className="ml-2 text-yellow-400" />
                </CardTitle>
                <div className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                  7-Day Free Trial
                </div>
              </div>
              <CardDescription>Professional trading tools</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$39.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Everything in Lite</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Advanced options chain</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Real-time Greeks analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Custom alert notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Advanced strategy builder</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>LEAPS options support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Pro-level challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-optionpulse-blue to-optionpulse-blue-dark hover:from-optionpulse-blue-light hover:to-optionpulse-blue text-white"
                onClick={() => handleUpgrade('Pro')}
                disabled={!user || user.tier === 'Pro'}
              >
                {!user ? "Start Free Trial" : user.tier === 'Pro' ? "Current Plan" : "Upgrade"}
                <ChevronRight size={16} />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-card/20 backdrop-blur-sm border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <BookOpen size={18} className="mr-2 text-optionpulse-blue" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Basic Text Content</span>
                  <span className="text-optionpulse-green">All Plans</span>
                </li>
                <li className="flex justify-between">
                  <span>Video Lessons</span>
                  <span>Lite & Pro</span>
                </li>
                <li className="flex justify-between">
                  <span>Advanced Strategies</span>
                  <span>Lite & Pro</span>
                </li>
                <li className="flex justify-between">
                  <span>LEAPS Education</span>
                  <span className="text-yellow-400">Pro Only</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/20 backdrop-blur-sm border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Calculator size={18} className="mr-2 text-optionpulse-blue" />
                Analysis Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Basic Options Chain</span>
                  <span className="text-optionpulse-green">All Plans</span>
                </li>
                <li className="flex justify-between">
                  <span>Greeks Calculator</span>
                  <span>Lite & Pro</span>
                </li>
                <li className="flex justify-between">
                  <span>Payoff Diagrams</span>
                  <span>Lite & Pro</span>
                </li>
                <li className="flex justify-between">
                  <span>Advanced Options Chain</span>
                  <span className="text-yellow-400">Pro Only</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/20 backdrop-blur-sm border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Bell size={18} className="mr-2 text-optionpulse-blue" />
                Alerts & Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Basic Alerts</span>
                  <span className="text-optionpulse-green">All Plans</span>
                </li>
                <li className="flex justify-between">
                  <span>Community Posts</span>
                  <span>Lite & Pro</span>
                </li>
                <li className="flex justify-between">
                  <span>Custom Alerts</span>
                  <span className="text-yellow-400">Pro Only</span>
                </li>
                <li className="flex justify-between">
                  <span>LEAPS Alerts</span>
                  <span className="text-yellow-400">Pro Only</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
