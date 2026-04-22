import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Props = {
  input: string;
  setInput: (v: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
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
        disabled={isLoading}
        className={cn('px-4 py-2 bg-black text-white rounded-lg cursor-pointer')}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Plan'
        )}
      </Button>
    </div>
  );
}
