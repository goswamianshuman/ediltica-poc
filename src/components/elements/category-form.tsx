import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useCategoryStore from '@/hooks/globals/category';
import { Label } from '@radix-ui/react-dropdown-menu';

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
        <Card className="bg-sidebar shadow-xs border-none">
            <CardHeader>
                <CardTitle className='text-xl font-normal'>Manage Categories</CardTitle>
            </CardHeader>
            <CardContent className='h-full min-h-[170px] flex items-start flex-col min-w-[400px] justify-between'>
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
                <Button onClick={handleAdd} className=''>Add Item</Button>
            </CardContent>
        </Card>
    );
}
