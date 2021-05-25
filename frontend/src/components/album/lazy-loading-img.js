import { useEffect, useState } from "react";
import placeholder from "../../assets/img/placeholder.jpg";

function LazyImage({ className = "", style = {}, src = null, ...props }) {
    const [_src, setSrc] = useState(null);

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.src = src;
            img.onload = () => setSrc(src);
        }
    }, [src]);

    return (
        <>
            <div
                {...props}
                className={`${className} bg-img`}
                style={{ ...style, background: `url(${_src || placeholder})` }}
            ></div>
        </>
    );
}

export default LazyImage;
