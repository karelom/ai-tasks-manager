import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LoadingIcon from '@/ui/components/shared/icons/LoadingIcon';

type Props = {
  input: string;
  setInput: (v: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
};

export default function AIPromptInput({ input, setInput, onGenerate, isLoading }: Props) {
  return (
    <div className="space-y-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. Learn English"
        className="w-full border p-2 rounded"
      />

      <Button
        onClick={onGenerate}
        disabled={isLoading || !input}
        className={cn('px-4 py-2 bg-black text-white rounded-lg cursor-pointer')}
      >
        {isLoading ? (
          <>
            <LoadingIcon />
            Generating...
          </>
        ) : (
          'Generate Plan'
        )}
      </Button>
    </div>
  );
}
