import useCategoryStore from "@/hooks/globals/category";
import { Input } from "../ui/input";
import { SearchIcon } from 'lucide-react';

const Searchable = () => {
    const { tree, updateFilteredTree, setActiveItem, setMatchedItems } = useCategoryStore();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        if (query.trim() === "") {
            updateFilteredTree(tree);
            setActiveItem("");
            setMatchedItems([])
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

            let filteredData = filterTree(tree, query);
            const logMatchingNodes = (nodes: any[], searchTerm: string) => {
              let matchedItems: Map<string, any> = new Map();
              nodes.forEach((node) => {
              if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                matchedItems.set(node.name, node.name);
              }
              if (node.children) {
                const childMatches = logMatchingNodes(node.children, searchTerm);
                childMatches.forEach((value, key) => matchedItems.set(key, value));
              }
              });

              return matchedItems;
            };

            setMatchedItems(Array.from(logMatchingNodes(filteredData, query).values()))
            updateFilteredTree(filteredData);
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
