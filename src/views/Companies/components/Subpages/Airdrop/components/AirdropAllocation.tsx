import { Box, Grid, Text } from '@envoysvision/uikit'
import { EnvoysAirdrop } from 'config/abi/types'
import { useEffect, useState } from 'react'
import { useTranslation } from '../../../../../../contexts/Localization'

const AirdropAllocation = ({ airdrop }: { airdrop: EnvoysAirdrop }) => {
  const { t } = useTranslation()
  const [alloctaion, setAllocation] = useState<string[]>([])
  const [alloctaionLen, setAllocationLen] = useState(0)

  const loadList = async () => {
    const len = (await airdrop.allocationLen()).toNumber()
    setAllocationLen(len)
    const addrs: string[] = []
    for (let i = 0; i < len; i++) {
      const addr = await airdrop.allocation(i)
      addrs.push(addr)
    }
    setAllocation(addrs)
  }

  useEffect(() => {
    loadList()
  }, [airdrop.address])

  return (
    <Box style={{ marginTop: 8 }}>
      <Text fontSize={'14px'} color={'mainDark'}>
        Allocation ({alloctaionLen})
      </Text>
      <Grid justifyContent={'center'} alignContent={'center'} paddingTop="30px">
        <Text fontSize={'14px'} color={'mainDark'}>
          {alloctaion.length == 0 ? (
            <>{t('No data')}</>
          ) : (
            <>
              {alloctaion.map((el) => {
                return <>{el}</>
              })}
            </>
          )}
        </Text>
      </Grid>
    </Box>
  )
}

export default AirdropAllocation
