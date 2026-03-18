import { useTable } from "../context/TableContext"
import DataWindow from "./DataWindow"

function ContentHolder() {

    const {items} = useTable()

    return (
        <div className="ContentHolder">
            <div className="ListWrapper">
                <div className="ListHolder">
                    { items.map((item: any) => (<DataWindow data={item}/>))}

                </div>
            </div>
        </div>
    )
}

export default ContentHolder