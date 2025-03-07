import useCategoryStore from "@/hooks/globals/category";
import { Input } from "../ui/input";
import { SearchIcon } from 'lucide-react';

const Searchable = () => {
    const { tree, updateFilteredTree, setActiveItem } = useCategoryStore();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        if (query.trim() === "") {
            updateFilteredTree(tree);
            setActiveItem("");
        } else {
            const filterTree = (nodes: any[], searchTerm: string): any[] => {
                return nodes
                    .map((node) => {
                        if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            setActiveItem(node.name);
                            return node;
                        }
                        if (node.children) {
                            const filteredChildren = filterTree(node.children, searchTerm);
                            if (filteredChildren.length > 0) {
                                return { ...node, children: filteredChildren };
                            }
                        }
                        return null;
                    })
                    .filter(Boolean);
            };
            updateFilteredTree(filterTree(tree, query));
        }
    };

    return (
        <div className="flex items-center gap-x-2">
            <div className="flex items-center border border-input px-3 rounded-sm">
                <SearchIcon className="w-5 h-5 text-muted-foreground" />
                <Input type="text" onChange={handleSearch} placeholder="Search category.." className="min-w-[200px] border-none" />
            </div>
        </div>
    );
};

export default Searchable;
