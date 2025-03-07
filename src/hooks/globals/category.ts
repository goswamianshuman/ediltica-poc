import { create } from 'zustand';

export interface TreeNode {
    name: string;
    children: TreeNode[];
}

export interface CategoryState {
    tree: TreeNode[];
    filteredTree: TreeNode[];
    activeItem: string;
    expandAll: boolean;
    collapseAll: boolean;
    addFileOrFolder: (path: string, item: string, isFile?: boolean) => void;
    updateFilteredTree: (filteredTree: TreeNode[]) => void;
    setActiveItem: (name: string) => void;
    setExpandAll: (expand: boolean) => void;
    setCollapseAll: (collapse: boolean) => void;
}

let sampleData = [
    {
        name: 'Materiali Edili',
        children: [
            {
                name: 'Cemento',
                children: [
                    {
                        name: 'Sfuso',
                        children: [
                            { name: 'Portland', children: [] }
                        ]
                    }
                ]
            },
            {
                name: 'Calcestruzzi',
                children: [
                    { name: 'Fornitori calcestruzzi', children: [] }
                ]
            },
            {
                name: 'Controtelai interni',
                children: [
                    {
                        name: 'Scorrevoli',
                        children: [
                            { name: 'Generale', children: [] }
                        ]
                    },
                    { name: 'Legno Alluminio', children: [] }
                ]
            }
        ]
    }
];

const useCategoryStore = create<CategoryState>((set) => ({
    tree: sampleData,
    filteredTree: sampleData, 
    activeItem: "",
    expandAll: false,
    collapseAll: false,

    addFileOrFolder: (path, item) =>
        set((state) => {
            const addToTree = (tree: TreeNode[], pathArray: string[]): void => {
                if (pathArray.length === 0) {
                    tree.push({ name: item, children: [] });
                    return;
                }
                
                const [currentDir, ...restPath] = pathArray;
                let dir = tree.find((node) => node.name === currentDir);
                
                if (!dir) {
                    dir = { name: currentDir, children: [] };
                    tree.push(dir);
                }
                
                addToTree(dir.children, restPath);
            };
            
            addToTree(state.tree, path.split("/"));
            return { tree: [...state.tree], filteredTree: [...state.tree] };
        }),
    
    updateFilteredTree: (filteredTree) => set({ filteredTree }),
    setActiveItem: (name) => set({ activeItem: name }),
    setExpandAll: (expand) => set({ expandAll: expand, collapseAll: !expand }),
    setCollapseAll: (collapse) => set({ collapseAll: collapse, expandAll: !collapse }),
}));

export default useCategoryStore;
