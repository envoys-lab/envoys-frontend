import React from "react";
import {Token} from "../types";
import {Flex, Image, Text} from '@envoysvision/uikit'
import {AutoColumn} from "../../Layout/Column";
import { SearchResultBox } from './styles';


interface ResultGroupProps {
    item: Token;
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
    return (
        <SearchResultBox p={"10px"} background={"white"}>
            <Flex mr={"16px"}>
                <Image src={item.logoURI} width={20} height={20}/>
                <Flex mx={"16px"} width={"100%"}>
                    <AutoColumn gap={"sm"}>
                        <Flex>
                            <Text thin fontSize={"18px"}>{item.name} ({item.symbol})</Text>
                            {/*<BadgeButton scale={"xs"} variant={"secondary"}>
                                <Text color={"secondary"} small m={"4px"} bold>{item.chainId}</Text>
                            </BadgeButton>*/}
                        </Flex>
                        <Text thin small>{item.address}</Text>
                    </AutoColumn>
                </Flex>
            </Flex>
        </SearchResultBox>
    )
}

export default SearchItemCard;
