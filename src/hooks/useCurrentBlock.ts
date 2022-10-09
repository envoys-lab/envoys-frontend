import { Block } from "@ethersproject/providers";
import React from "react";
import useActiveWeb3React from "./useActiveWeb3React";

const useCurrentBlock = () => {
    const [block, setBlock] = React.useState<Block | undefined>();
    const { library } = useActiveWeb3React();


    React.useEffect(() => {
        const update = () => {
            library.getBlock("latest").then(b => {
                if(block === undefined || block.number !== b.number) {
                    setBlock(b);
                }
            });
        }

        update();
        const interval = setInterval(() => update(), 3000);
        return () => clearInterval(interval);
    }, []);


    return block;
}

export default useCurrentBlock;
