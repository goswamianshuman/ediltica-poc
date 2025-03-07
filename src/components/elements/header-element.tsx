import useCategoryStore from '@/hooks/globals/category';
import { ModeToggle } from '../ui/dark-mode-toggle'
import Searchable from './searchable'
import { Button } from '../ui/button';
import {Maximize, Minimize} from 'lucide-react'

type Props = {}

const HeaderElement = ({ }: Props) => {
  const { setExpandAll, setCollapseAll } = useCategoryStore();
  return (
    <div className='z-[9999] px-3 py-3 bg-sidebar text-accent-foreground mt-3 rounded-md shadow-xs'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <Searchable />
          <Button onClick={() => setExpandAll(true)} variant="secondary" size={"sm"}>
           <Maximize className='h-5 w-5'/> Expand All
          </Button>
          <Button onClick={() => setCollapseAll(true)} variant="secondary" size={"sm"}> 
            <Minimize className='h-5 w-5' />Collapse All
          </Button>
        </div>
        <ModeToggle />
      </div>
    </div>
  )
}

export default HeaderElement