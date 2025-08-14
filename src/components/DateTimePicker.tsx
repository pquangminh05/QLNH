import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  return (
    <div className=" w-36 flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {value ? format(value, "dd/MM/yyyy") : <span>Chọn ngày</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Input
        type="time"
        className="min-w-24"
        value={value ? format(value, "HH:mm") : ""}
        onChange={(e) => {
          if (!value) return;
          const [h, m] = e.target.value.split(":");
          const newDate = new Date(value);
          newDate.setHours(Number(h));
          newDate.setMinutes(Number(m));
          onChange(newDate);
        }}
      />
    </div>
  );
}
