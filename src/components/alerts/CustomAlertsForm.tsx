
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BellRing, CheckCircle, Percent } from "lucide-react";

// Define form schema with Zod for validation
const formSchema = z.object({
  ticker: z.string().min(1, "Ticker is required"),
  strategy: z.string().min(1, "Strategy is required"),
  strikePrice: z.coerce
    .number()
    .min(100, "Strike price must be at least $100")
    .max(1000, "Strike price must be at most $1000"),
  expiryDate: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const currentDate = new Date();
      return selectedDate > currentDate;
    },
    { message: "Expiry date must be in the future" }
  ),
  itmProbability: z.number().min(50).max(90),
  sentimentDirection: z.enum(["bullish", "bearish", "neutral"]),
  sentimentScore: z.number().min(60).max(90),
});

type FormValues = z.infer<typeof formSchema>;

interface CustomAlert extends FormValues {
  id: string;
  timestamp: string;
}

interface CustomAlertsFormProps {
  onAddAlert: (alert: CustomAlert) => void;
}

const CustomAlertsForm = ({ onAddAlert }: CustomAlertsFormProps) => {
  const [itmValue, setItmValue] = useState<number>(70);
  const [sentimentValue, setSentimentValue] = useState<number>(75);

  // Get current date for the datepicker min value
  const today = new Date().toISOString().split('T')[0];
  const maxDate = "2027-12-31";

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: "AAPL",
      strategy: "call",
      strikePrice: 200,
      expiryDate: "2026-01-15",
      itmProbability: 70,
      sentimentDirection: "bullish",
      sentimentScore: 75,
    },
  });

  const onSubmit = (data: FormValues) => {
    // Create a custom alert with an ID and timestamp
    const newAlert: CustomAlert = {
      ...data,
      id: `alert-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
    };

    onAddAlert(newAlert);
    form.reset(form.getValues()); // Reset with current values for easy creation of similar alerts
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-card/30 backdrop-blur-sm border border-border/50 p-6 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="ticker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticker Symbol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticker" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AAPL">AAPL</SelectItem>
                    <SelectItem value="SPY">SPY</SelectItem>
                    <SelectItem value="QQQ">QQQ</SelectItem>
                    <SelectItem value="NVDA">NVDA</SelectItem>
                    <SelectItem value="TSLA">TSLA</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="strategy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strategy</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="put">Put</SelectItem>
                    <SelectItem value="credit_spread">Credit Spread</SelectItem>
                    <SelectItem value="iron_condor">Iron Condor</SelectItem>
                    <SelectItem value="straddle">Straddle</SelectItem>
                    <SelectItem value="strangle">Strangle</SelectItem>
                    <SelectItem value="leaps_call">LEAPS Call</SelectItem>
                    <SelectItem value="leaps_put">LEAPS Put</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="strikePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strike Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={100}
                    max={1000}
                    step={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input type="date" min={today} max={maxDate} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itmProbability"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>
                  ITM Probability Threshold{" "}
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({itmValue}%)
                  </span>
                </FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    max={90}
                    min={50}
                    step={1}
                    onValueChange={(value) => {
                      setItmValue(value[0]);
                      field.onChange(value[0]);
                    }}
                    className="w-full"
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>50%</span>
                  <span>70%</span>
                  <span>90%</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="sentimentDirection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sentiment Direction</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bullish">Bullish</SelectItem>
                      <SelectItem value="bearish">Bearish</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sentimentScore"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>
                    Sentiment Score{" "}
                    <span className="ml-1 text-sm text-muted-foreground">
                      ({sentimentValue}%)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      max={90}
                      min={60}
                      step={1}
                      onValueChange={(value) => {
                        setSentimentValue(value[0]);
                        field.onChange(value[0]);
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>60%</span>
                    <span>75%</span>
                    <span>90%</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          <BellRing className="mr-2 h-4 w-4" />
          Create Custom Alert
        </Button>
      </form>
    </Form>
  );
};

export default CustomAlertsForm;
