import React from "react";
import {Liquidity} from "../types";
import {Box} from '@envoysvision/uikit'

interface ResultGroupProps {
    item: Liquidity;
}

const Card: React.FC<ResultGroupProps> = ({ item }) => {
    return (
        <Box>
            {JSON.stringify(item)}
        </Box>
    )
}

export default Card;
