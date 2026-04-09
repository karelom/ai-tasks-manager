/**
 * An absolute Label hint for invalid field.
 *
 * @description Must have a 'relative' attribute on the parent class
 * @param data text for showing the label
 * @returns
 */
export default function HintInvalidLabel({ data }: { data: string }) {
  return (
    data && (
      <div className="absolute -bottom-5 left-0 text-xs font-medium text-red-500 animate-in slide-in-from-top-1 duration-200">
        {data}
      </div>
    )
  );
}
