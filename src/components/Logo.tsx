import { useState } from "react"
import logoAnimation from '../img/logoAnimation.gif'
import logoStatic from '../img/logoStatic.png'

type Props = {}

function Logo({}: Props) {

    const [isHovered, setIsHovered] = useState(false)
  return (
    <div className="Logo">
      <img
        src={isHovered ? logoAnimation : logoStatic}
        alt="Logo"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  )
}

export default Logo