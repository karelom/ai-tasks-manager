'use client';

import { CalendarIcon } from 'lucide-react';
import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { cn, formatLocaleDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Field, FieldLabel } from '@/components/ui/field';
import HintInvalidLabel from '@/ui/components/shared/HintInvalidLabel';
import HintSavingLabel from '@/ui/components/shared/HintSavingLabel';
import { ReactNode, useEffect, useState } from 'react';
import { ResponseState } from '@/lib/actions';

interface InlineDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  trigger?: (name: Path<T>) => Promise<boolean>;
  customOnSelect?: (
    newVal: Date | null,
    field: ControllerRenderProps<T, Path<T>>
  ) => Promise<ResponseState>;
  renderLabel?: ReactNode;
  shortcut?: string;
}

export function InlineDatePicker<T extends FieldValues>({
  name,
  control,
  trigger,
  customOnSelect,
  renderLabel,
  shortcut,
}: InlineDatePickerProps<T>) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [invalid, setInvalid] = useState<string>('');

  // #region [ Global Key Listener ]

  useEffect(() => {
    const handleGlobalDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || (e.target as HTMLElement).isContentEditable)
        return;

      if (e.key.toLowerCase() === shortcut?.toLowerCase()) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleGlobalDown);
    return () => document.removeEventListener('keydown', handleGlobalDown);
  }, [shortcut]);

  // #endregion

  useEffect(() => {
    if (invalid) {
      const timer = setTimeout(() => setInvalid(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [invalid]);

  const handleOnSelect = async ({
    val,
    field,
  }: {
    val: Date | null;
    field: ControllerRenderProps<T, Path<T>>;
  }) => {
    setOpen(false);
    setInvalid('');

    const oldValue = field.value;
    field.onChange(val);
    const isValid = await trigger?.(name);
    if (!isValid || !customOnSelect) return;

    setIsUpdating(true);

    const result = await customOnSelect?.(val, field);
    if (!result.ok) {
      field.onChange(oldValue);
      setInvalid(result.error ?? 'Failed to save');
    }

    setIsUpdating(false);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = invalid || fieldState.error?.message;

        return (
          <Field
            data-invalid={fieldState.invalid}
            className={cn('relative', { 'opacity-50 pointer-events-none': isUpdating })}
          >
            <FieldLabel htmlFor={field.name}>{renderLabel}</FieldLabel>

            <Popover open={open} onOpenChange={setOpen}>
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
                  onSelect={(val) => handleOnSelect({ val: val ?? null, field })}
                  disabled={(date) => date < new Date('1900-01-01')}
                  className="rounded-lg border"
                  autoFocus
                />

                <div className="px-3 pb-2 border-slate-100 flex items-center justify-between gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-slate-500 hover:text-red-600 h-8 px-2"
                    onClick={() => {
                      handleOnSelect({ val: null, field });
                    }}
                  >
                    Clear
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs h-8 px-2"
                    onClick={() => handleOnSelect({ val: new Date(), field })}
                  >
                    Today
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <HintInvalidLabel data={errorMessage} />
            <HintSavingLabel enable={isUpdating} className="right-0 top-[unset] -bottom-6" />
          </Field>
        );
      }}
    />
  );
}
