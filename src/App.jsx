import { useState, useEffect } from 'react'
import './styles.css'
import Header from './components/Header'
import FrontMessage from './components/FrontMessage'
import InnerMessage from './components/InnerMessage'

export default function App() {
  /* Challenge

	Kullanıcı kartın kapağına tıkladığında kart açılır ve kapanır, ancak kart şirketi daha sofistike bir kontrol yöntemi istiyor. Kullanıcının mouse ile parmağını kaydırmasını taklit eden bir yöntem. Göreviniz aşağıdaki gibi bir tane ayarlamaktır:
		
		1. "open" class'ı, 34. satırdaki className'i "cover" olan div'e yalnızca aşağıdaki koşulların tümü karşılandığında uygulanmalıdır: 
		   	
			   - Kullanıcı mouse butonunu "cover" div'inin içinde bir yerde basılı tutuyorsa.
			   
    		   - Mouse butonunu basılı tutmaya devam ederken, imleci basılı tutmaya başladığı yerin 50 piksel soluna hareket ettirir. 
		
		2. Kullanıcı daha sonra mouse'unu "cover" div'i açıkken aşağı doğru hareket ettirirse, "open" 
		   class'ı kaldırılmalı ve böylece kart kapatılmalıdır. 
		   
	Not: cardOpen state'ini, 33. satırdaki onClick olay işleyicisini ve 34. satırdaki "open" class'ının şu anda uygulanma şeklini değiştirmeniz veya düzenlemeniz gerekecektir. 
*/

  const [cardOpen, setCardOpen] = useState(false)
  const [mouseDown, setMouseDown] = useState(false)
  const [startX, setStartX] = useState(null)
  const [startY, setStartY] = useState(null)

  const handleMouseDown = (e) => {
    setMouseDown(true)
    setStartX(e.clientX)
    setStartY(e.clientY)
  } // Mouse down olayını işleme

  // Mouse hareketi takip eden fonksiyon
  const handleMouseMove = (e) => {
    if (mouseDown) {
      const currentX = e.clientX
      const currentY = e.clientY

      // İmleç 50 piksel sola hareket ettirilirse kart açılır
      if (!cardOpen && startX - currentX > 50) {
        setCardOpen(true)
      }

      // Kart açıkken ve imleç aşağı hareket ettirilirse kart kapanır
      if (cardOpen && currentY - startY > 50) {
        setCardOpen(false)
      }
    }
  }

  // Mouse up olayını işleme
  const handleMouseUp = () => {
    setMouseDown(false)
  }

  // useEffect ile mouse hareket ve basma olaylarını dinle
  useEffect(() => {
    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      // Temizlik: Mouse olaylarını kaldır
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDown, cardOpen])

  return (
    <div className="wrapper">
      <Header />
      <div className="card">
        <InnerMessage />

        <div
          className={`cover ${cardOpen && 'open'}`}
          onMouseDown={handleMouseDown}
        >
          <FrontMessage />
          <img src="./images/forLoop.png" />
        </div>
      </div>
    </div>
  )
}
