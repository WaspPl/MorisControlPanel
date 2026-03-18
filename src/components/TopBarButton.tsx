import type { ComponentType, SVGProps } from "react";

type Props = {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
}

function TopBarButton({icon: Icon, text, onClick, disabled}: Props) {
  return (
    <div className={`TopBarButton ${!disabled && 'enabled'}`}>
        {!disabled && <p>{text}</p>}
        <button onClick={onClick} disabled={disabled}>
            <Icon width={24} height={24}/>
        </button>
    </div>
  )
}

export default TopBarButton