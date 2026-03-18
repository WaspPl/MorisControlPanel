import type { ComponentType, SVGProps } from "react"

type Props = {
    name: string;
    description: string;
    content: ComponentType<SVGProps<SVGSVGElement>>;
    onClick: ( name: string) => void;
    onHover: (name: string, description: string ) => void;
}

function SidebarButton({name, description, content: Icon, onClick, onHover}: Props) {

    const handleClick =(): void => {
        onClick(name)
    }

    const handleHover = (): void => {
        onHover(name, description)
    }
    
    return (
        <div className="SidebarButtonWrapper">
            <button className="SidebarButton" onClick={handleClick} onMouseOver={handleHover}>
                <Icon width={48} height={48}/>
            </button>
        </div>
    )
    }

export default SidebarButton