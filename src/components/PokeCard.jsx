import "./PokeCard.css";
import { useEffect, useRef, useState } from 'react';

function PokeCard(props){
    const [bgColor, setBgColor] = useState("#f5f5f5");
    const imgRef = useRef();
    const formattedId = `#${String(props.id).padStart(3, '0')}`;

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        img.crossOrigin = "anonymous";

        const handleLoad = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);

            try {
                const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
                let r = 0, g = 0, b = 0;
                let count = 0;

                for (let i = 0; i < imageData.length; i += 4) {
                const alpha = imageData[i + 3];
                    if (alpha > 200) { // ignore transparent pixels
                        r += imageData[i];
                        g += imageData[i + 1];
                        b += imageData[i + 2];
                        count++;
                    }
                }

                if (count === 0) return;
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
                setBgColor(`rgb(${r}, ${g}, ${b})`);
            } catch (err) {
            console.error("Erreur extraction couleur:", err);
            }
        };

        if (img.complete) {
            handleLoad();
        } else {
            img.onload = handleLoad;
        }
    }, []);

    return(
        <div className="poke-card" id={props.id} style={{
            "--bg-color": bgColor,
          }}>
            <div className="poke-screen" style={{background: bgColor}}>
                <img ref={imgRef} src={props.sprite} alt={props.name} />
                
            </div>
            <p className="poke-id">{formattedId}</p>
            <div className="poke-name">{props.name}</div>
        </div>
    )
}

export default PokeCard;