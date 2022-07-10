import { Box, Grid, Text } from '@envoysvision/uikit'
import { useTranslation } from '../../../../../../contexts/Localization'

const AirdropAllocation = ({ allocations = [] }: { allocations: any[] }) => {
  const { t } = useTranslation()
  return (
    <Box style={{ marginTop: 8 }}>
      <Text fontSize={'14px'} color={'mainDark'}>
        Allocation ({allocations.length})
      </Text>
      <Grid justifyContent={'center'} alignContent={'center'} paddingTop="30px">
        <Text fontSize={'14px'} color={'mainDark'}>
          {t('No data')}
        </Text>
      </Grid>
    </Box>
  )
}

export default AirdropAllocation
