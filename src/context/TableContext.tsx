import { createContext, useContext, useState, type ReactNode} from 'react';

type TableType = 'Users' | 'Roles' | 'Commands' | 'Sprites';
const Routes = {
    'Users': 'users',
    'Roles': 'roles',
    'Commands': 'commands',
    'Sprites': 'sprites'
}


interface TableContextType {
    activeTable: TableType;
    setActiveTable: (table: TableType) => void;
    items: any[];
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const [activeTable, setActiveTable] = useState<TableType>('Users');
    const [items, setItems] = useState<any>([{"name": "test2"},{"name": "test2"},{"name": "test3"},{"name": "test4"}])
    
    const getItems = () => {
        
    }


    const valuesToExport = {
        activeTable,
        setActiveTable,
        items
    }
    return (
        <TableContext.Provider value={valuesToExport}>
            {children}
        </TableContext.Provider>
    );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error("useTable must be used within TableProvider");
  return context;
};