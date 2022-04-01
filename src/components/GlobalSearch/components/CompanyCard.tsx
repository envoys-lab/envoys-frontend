import React from "react";
import {Company} from "../types";
import {Flex, Image, Link, Text} from '@envoysvision/uikit'
import {AutoColumn} from "../../Layout/Column";
import { SearchResultBox, BadgeButton} from './styles';


interface ResultGroupProps {
    item: Company;
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
    const realLogoUrl = item.logoUrl !== 'https://cloud.example/logo' ? item.logoUrl : '/images/company.png';
    const stage = item.stages.find( stage => stage?.status === item.status);
    return (
        <SearchResultBox p={"10px"} background={"white"}>
            <Flex mr={"4px"}>
                <Image src={realLogoUrl} width={20} height={20} mt={"4px"} />
                <Flex mx={"16px"} width={"100%"}>
                    <AutoColumn gap={"sm"}>
                        <Text thin fontSize={"18px"}>{item.name}</Text>
                        {stage && (
                            <Text thin small>{stage?.startDate} - {stage?.endDate}</Text>
                        )}
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
