import { cn } from '@/lib/utils';
import LoadingIcon from '@/ui/components/shared/icons/LoadingIcon';

/**
 * An absolute Label hint for save progress.
 *
 * @description Must have a 'relative' attribute on the parent class
 * @param enable true when showing the label
 * @returns
 */
export default function HintSavingLabel({
  enable,
  className,
}: {
  enable?: boolean;
  className?: string;
}) {
  return (
    enable && (
      <span
        className={cn(
          'absolute right-4 top-1/2 max-w-min max-h-min -translate-y-1/2 text-xs text-slate-400 cursor-wait animate-pulse uppercase tracking-wider',
          className
        )}
      >
        <LoadingIcon />
      </span>
    )
  );
}
