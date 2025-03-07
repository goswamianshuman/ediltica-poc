import * as React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarRail } from "@/components/ui/sidebar";
import TreeWrapper from "./tree";
import useCategoryStore from "@/hooks/globals/category";

export function CategorySection({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { filteredTree } = useCategoryStore();

    return (
        <Sidebar collapsible="none" className="w-[400px] min-h-[85vh] mt-4 rounded-md shadow-xs" {...props}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Category</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <TreeWrapper items={filteredTree} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
