import { useState } from 'react';

const useWithDialogWrapper = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
    }
};

export default useWithDialogWrapper;

