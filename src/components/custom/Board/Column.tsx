import {Car, Circle} from 'lucide-react'
import {Card} from '@/components/ui/card'

export default function Column({ label }: { label: string }) {
  return (
    <div className="flex-1 max-w-[800px] gap-2 flex flex-col h-full bg-card rounded-lg overflow-hidden">
      <div className="flex items-start h-screen flex-col gap-4 px-6 py-6 shrink-0">
        <div className='flex items-center gap-3'>
        <span className="text-xl font-bold text-foreground">{label}</span>
        <Circle/>
        </div>
        <div className='flex items-center gap-3'>
        <Card>Hi</Card>

        </div>
      </div>
    </div>
  );
}