import { useState, useEffect } from "react";

function useDevice(): { isMobile: boolean } {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (!window || typeof window === 'undefined') return;

        setIsMobile(window.innerWidth < 992);

        window.addEventListener('resize', function () {
            setIsMobile(window.innerWidth < 992);
        });
    }, []);

    return {
        isMobile
    };
}

export default useDevice;
