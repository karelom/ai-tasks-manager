'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { ResponseState } from '@/lib/actions';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import HintSavingLabel from '@/ui/components/shared/HintSavingLabel';
import HintInvalidLabel from '@/ui/components/shared/HintInvalidLabel';

export interface InlineSelectOption<T> {
  value: T;
  label: string;
}

interface InlineSelectProps<T> {
  data: T;
  options: InlineSelectOption<T>[];
  shortcut?: string;
  placeholder?: string;
  renderTrigger: (selectedOption: T) => ReactNode;
  onSave: (value: T) => Promise<ResponseState>;
}

export function InlineSelect<T extends string | number>({
  data,
  options,
  shortcut,
  placeholder,
  renderTrigger,
  onSave,
}: InlineSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentValue, setCurrentValue] = useState(data);
  const [invalid, setInvalid] = useState<string>('');

  const handleSelect = useCallback(
    async (newValue: T) => {
      setOpen(false);
      if (newValue === currentValue) return;

      setIsUpdating(true);

      setCurrentValue(newValue);
      const result = await onSave(newValue);
      if (!result.ok) {
        setCurrentValue(data);
        setInvalid(result.error || 'Failed to update');
      }

      setIsUpdating(false);
    },
    [data, currentValue, onSave]
  );

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

  useEffect(() => {
    // Only bind number keys when menu is visible
    if (!open) return;

    const handleMenuDown = (e: KeyboardEvent) => {
      if (/^[1-9]$/.test(e.key)) {
        const index = parseInt(e.key) - 1;
        const targetOption = options[index];

        if (targetOption) {
          e.preventDefault();
          handleSelect(targetOption.value);
        }
      }
    };

    document.addEventListener('keydown', handleMenuDown);
    return () => document.removeEventListener('keydown', handleMenuDown);
  }, [open, options, handleSelect]);

  // #endregion

  // #region [ Invalid state methods ]

  useEffect(() => {
    if (invalid) {
      const timer = setTimeout(() => setInvalid(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [invalid]);

  // #endregion

  return (
    <div className={cn('relative mb-2', { 'opacity-50 pointer-events-none': isUpdating })}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>{renderTrigger(currentValue)}</div>
        </PopoverTrigger>

        <PopoverContent className="w-50 p-0 shadow-xl border-slate-200" align="start">
          <Command>
            <CommandInput
              shortcut={shortcut}
              placeholder={placeholder ?? 'Search ...'}
              className="h-9"
            ></CommandInput>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option, idx) => (
                  <CommandItem
                    key={String(option.value)}
                    value={option.label}
                    onSelect={() => {
                      handleSelect(option.value);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        data === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.label}
                    <CommandShortcut>{idx + 1}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <HintInvalidLabel data={invalid} />
      <HintSavingLabel enable={isUpdating} />
    </div>
  );
}
