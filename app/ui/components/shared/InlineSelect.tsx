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

export interface InlineSelectOption<T> {
  value: T;
  label: string;
  shortcut?: string;
}

interface InlineSelectProps<T> {
  data: T;
  options: InlineSelectOption<T>[];
  placeholder?: string;
  renderTrigger: (selectedOption: T) => ReactNode;
  onSave: (value: T) => Promise<ResponseState>;
}

export function InlineSelect<T extends string | number>({
  data,
  options,
  placeholder,
  renderTrigger,
  onSave,
}: InlineSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentValue, setCurrentValue] = useState(data);

  const handleSelect = useCallback(
    async (newValue: T) => {
      setOpen(false);
      if (newValue === currentValue) return;

      setIsUpdating(true);

      setCurrentValue(newValue);
      const result = await onSave(newValue);
      if (result.ok) {
        // toast.success(`${label} updated`);
      } else {
        setCurrentValue(data);
        // toast.error(result.error || 'Failed to update');
      }

      setIsUpdating(false);
    },
    [data, currentValue, onSave]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!open) return;

      // Check if Command (Mac) or Control (Windows) is pressed
      if (e.metaKey || e.ctrlKey) {
        const option = options.find(
          (opt) => opt.shortcut?.slice(-1).toLowerCase() === e.key.toLowerCase()
        );

        if (option) {
          e.preventDefault();
          handleSelect(option.value);
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, options, handleSelect]);

  return (
    <div className={cn('flex flex-col gap-2', { 'opacity-50 pointer-events-none': isUpdating })}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer">{renderTrigger(currentValue)}</div>
        </PopoverTrigger>

        <PopoverContent className="w-50 p-0 shadow-xl border-slate-200" align="start">
          <Command>
            <CommandInput placeholder={placeholder ?? 'Search ...'} className="h-9" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
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
                    <CommandShortcut>{option.shortcut}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
