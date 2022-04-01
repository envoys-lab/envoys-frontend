import React from "react";
import {Company} from "../types";
import {Flex, Image, Link, Text} from '@envoysvision/uikit'
import {AutoColumn} from "../../Layout/Column";
import { SearchResultBox, BadgeButton} from './styles';


interface ResultGroupProps {
    item: Company;
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
    return (
        <SearchResultBox p={"10px"} background={"white"}>
            <Flex mr={"16px"}>
                <Image src={item.logoUrl} width={20} height={20}/>
                <Flex mx={"16px"} width={"100%"}>
                    <AutoColumn gap={"sm"}>
                        <Text thin fontSize={"18px"}>{item.name}</Text>
                        <Text thin small>Mar 1, 2022 - Apr 30, 2022</Text>
                        <Link external href={item.homePageUrl}>
                            <Text thin small>{item.homePageUrl}</Text>
                        </Link>
                    </AutoColumn>
                </Flex>
                <BadgeButton scale={"xs"} variant={"secondary"}>
                    <Text color={"success"} small m={"4px"} bold>{item.status}</Text>
                </BadgeButton>
            </Flex>
        </SearchResultBox>
    )
}

export default SearchItemCard;
