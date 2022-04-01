import React from "react";
import {Pool} from "../types";
import {Box} from '@envoysvision/uikit'

interface ResultGroupProps {
    item: Pool;
}

const Card: React.FC<ResultGroupProps> = ({ item }) => {
    return (
        <Box>
            {JSON.stringify(item)}
        </Box>
    )
}

export default Card;
