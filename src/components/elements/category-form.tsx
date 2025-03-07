import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useCategoryStore from '@/hooks/globals/category';
import { Label } from '@radix-ui/react-dropdown-menu';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react';

export default function CategoryForm() {
    const { addFileOrFolder } = useCategoryStore();
    const [path, setPath] = useState('');
    const [itemName, setItemName] = useState('');

    const handleAdd = () => {
        if (path && itemName) {
            addFileOrFolder(path, itemName);
            setPath('');
            setItemName('');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex items-center gap-x-1 cursor-pointer text-[#318CE7]'>
                    <Plus className='h-4 w-4' />
                    <p className='text-sm font-medium'>Add new</p>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Categories</DialogTitle>
                    <DialogDescription>
                        You can add new category | item by filling the below form.
                    </DialogDescription>
                </DialogHeader>
                <div className='w-full'>
                    <div className="space-y-2">
                        <Label className='text-lg'>Enter path</Label>
                        <Input
                            placeholder="Path (e.g., Materiali Edili/Cemento)"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                            className='bg-background dark:bg-background/50'
                        />
                    </div>
                    <div className='space-y-2 mt-4'>
                        <Label className='text-lg'>Enter Item</Label>
                        <Input
                            placeholder="Item Name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className='bg-background dark:bg-background/50'
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={itemName.length === 0 || path.length === 0} onClick={handleAdd} className='disabled:cursor-not-allowed'>Add Item</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

