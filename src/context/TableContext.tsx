import axios from 'axios';
import Cookies from 'cookies-js';
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
    getItems: (table: TableType) => void;
    setItems: ([]) => void;
    getItemDetailsById: (id: number) => Promise<any>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const [activeTable, setActiveTable] = useState<TableType>('Users');
    const [items, setItems] = useState<any>([])
    
    const getItems = async (table: TableType) => {
        try{
            const response = await axios.get(`http://localhost:8080/${Routes[table]}`,
                {
                    headers: {Authorization: `Bearer ${Cookies.get('token')}`}
                }
            )
            console.log(response.data)
            setItems(response.data)
        } catch (error){
            // add a pop-up with error notification!!
            console.log(error)
        }
    }

    const getItemDetailsById = async (id: number) => {
        try{
            const response = await axios.get(`http://localhost:8080/${Routes[activeTable]}/${id}`,
                {
                    headers: {Authorization: `Bearer ${Cookies.get('token')}`}
                }
            )
            return response.data
        } catch (error){
            // add a pop-up with error notification!!
            console.log(error)
        }
    }


    const valuesToExport = {
        activeTable,
        setActiveTable,
        items,
        setItems,
        getItems,
        getItemDetailsById
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