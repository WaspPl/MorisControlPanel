import { AnimatePresence, motion } from "framer-motion"
import { useTable } from "../context/TableContext"
import DataWindow from "./DataWindow"

function ContentHolder() {

    const {items} = useTable()

    return (
        <div className="ContentHolder">
            <div className="ListWrapper">
                <div className="ListHolder">
                    <AnimatePresence mode="popLayout">
                        {items.map((item: any) => (
                            <motion.div
                                key={item.id} 
                                layout
                                initial={{ scale: 0}}
                                animate={{ scale: 1}}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ height:'fit-content'}}
                            >
                                <DataWindow data={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default ContentHolder