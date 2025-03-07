import { useState, useEffect } from "react";
import { ChevronRight, Ship, Folder, FolderOpen } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub
} from "@/components/ui/sidebar";
import useCategoryStore from "@/hooks/globals/category";

function Tree({ item }: { item: any }) {
    const { activeItem, setActiveItem, expandAll, collapseAll } = useCategoryStore();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (expandAll) {
            setIsOpen(true);
        } else if (collapseAll) {
            setIsOpen(false);
        }
    }, [expandAll, collapseAll]);

    useEffect(() => {
        if (activeItem && isItemInPath(item, activeItem)) {
            setIsOpen(true);
        }
    }, [activeItem, item]);

    if (!item || typeof item !== 'object') {
        return null;
    }

    const { name, children } = item;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setActiveItem(name);
        setIsOpen((prev) => !prev);
    };

    const isItemInPath = (node: any, itemName: string): boolean => {
        if (node.name.toLowerCase().includes(itemName.toLowerCase())) return true;
        return node.children?.some((child: any) => isItemInPath(child, itemName));
    };

    if (!children || children.length === 0) {
        return (
            <SidebarMenuButton
                isActive={activeItem === name}
                className="data-[active=true]:bg-[#318CE7]/10 data-[active=true]:text-[#318CE7]"
                onClick={handleClick}
            >
                <Ship />
                {name}
            </SidebarMenuButton>
        );
    }

    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                open={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                        isActive={activeItem.includes(name)}
                        className="data-[active=true]:bg-[#318CE7]/10 data-[active=true]:text-[#318CE7]"
                        onClick={handleClick}
                    >
                        <ChevronRight className="transition-transform" />
                        {isOpen ? <FolderOpen /> : <Folder />}
                        {name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {children.map((subItem: any, subIndex: number) => (
                            <Tree 
                                key={subIndex} 
                                item={subItem}
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}

export default function TreeWrapper({ items }: { items: any[] }) {
    return (
        <>
            {items.length === 0 ? (
                <div className="text-center text-gray-500 py-4">No item found</div>
            ) : (
                items.map((item, index) => (
                    <Tree 
                        key={index} 
                        item={item}
                    />
                ))
            )}
        </>
    );
}

export { Tree };