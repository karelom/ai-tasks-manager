/**
 * An absolute Label hint for save progress.
 *
 * @description Must have a 'relative' attribute on the parent class
 * @param enable true when showing the label
 * @returns
 */
export default function HintSavingLabel({ enable }: { enable: boolean }) {
  return (
    enable && (
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 cursor-wait animate-pulse uppercase tracking-wider">
        Saving...
      </span>
    )
  );
}
