'use client';

import { CalendarIcon } from 'lucide-react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { cn, formatLocaleDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Field, FieldLabel } from '@/components/ui/field';
import HintInvalidLabel from '@/ui/components/shared/HintInvalidLabel';

interface InlineDarePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function InlineDatePicker<T extends FieldValues>({
  name,
  control,
}: InlineDarePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="relative">
          <FieldLabel htmlFor={field.name}>
            <div className="text-sm font-medium text-slate-700">Due Date</div>
          </FieldLabel>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={field.name}
                variant="outline"
                className={cn(
                  'w-full p-5 font-normal border rounded-lg bg-white border-slate-200 cursor-pointer transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  !field.value && 'text-muted-foreground'
                )}
                aria-invalid={fieldState.invalid}
              >
                {field.value ? formatLocaleDate(field.value) : <span>Select a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ?? undefined}
                onSelect={(val) => {
                  field.onChange(val);
                }}
                disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                className="rounded-lg border"
                autoFocus
              />

              <div className="px-3 pb-2 border-slate-100 flex items-center justify-between gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-500 hover:text-red-600 h-8 px-2"
                  onClick={() => {
                    field.onChange(null);
                  }}
                >
                  Clear
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs h-8 px-2"
                  onClick={() => field.onChange(new Date())}
                >
                  Today
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {fieldState.invalid && <HintInvalidLabel data={fieldState.error?.message} />}
        </Field>
      )}
    />
  );
}
