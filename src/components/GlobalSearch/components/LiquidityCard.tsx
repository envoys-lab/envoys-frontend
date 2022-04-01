import React from "react";
import { Liquidity } from "../types";
import { Flex, Image, Text } from '@envoysvision/uikit'
import { SearchResultBox, BadgeButton } from './styles';
import { AutoRow } from "../../Layout/Row";


interface ResultGroupProps {
    item: Liquidity;
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
    return (
        <SearchResultBox p={"10px"} background={"white"}>
            <Flex mr={"16px"}>
                <Image src={item.logoURI} width={20} height={20}/>
                <Flex mx={"16px"} width={"100%"}>
                    <AutoRow>
                        <Text thin fontSize={"18px"}>{item.token0.symbol}/{item.token1.symbol}</Text>
                        <BadgeButton scale={"xs"} variant={"secondary"}>
                            <Text color={"darkClear"} thin small m={"4px"} bold>???</Text>
                        </BadgeButton>
                    </AutoRow>
                </Flex>
            </Flex>
        </SearchResultBox>
    )
}

export default SearchItemCard;
