import menuConfig from 'components/Menu/config/config'
import { getActiveMenuItem, getActiveSubMenuItem } from 'components/Menu/utils'

const mockT = (key) => key

describe('getActiveMenuItem', () => {
  it('should return an active item', () => {
    // Given
    const pathname = '/swap'

    // When
    const result = getActiveMenuItem({ pathname, menuConfig: menuConfig(mockT) })

    // Then
    expect(result).toEqual(menuConfig(mockT)[0])
  })

  it('should return undefined if item is not found', () => {
    // Given
    const pathname = '/corgi'

    // When
    const result = getActiveMenuItem({ pathname, menuConfig: menuConfig(mockT) })

    // Then
    expect(result).toEqual(undefined)
  })
})

describe('getActiveSubMenuItem', () => {
  it('should return undefined', () => {
    // Given
    const pathname = '/'

    // When
    const result = getActiveSubMenuItem({ pathname, menuItem: menuConfig(mockT)[1] })

    // Then
    expect(result).toEqual(undefined)
  })

  it('should return an active sub item', () => {
    // Given
    const pathname = '/pools'

    // When
    const result = getActiveSubMenuItem({ pathname, menuItem: menuConfig(mockT)[1] })

    // Then
    expect(result).toEqual(menuConfig(mockT)[1].items[1])
  })

  it('should return undefined if item is not found', () => {
    // Given
    const pathname = '/corgi'

    // When
    const result = getActiveSubMenuItem({ pathname, menuItem: menuConfig(mockT)[1] })

    // Then
    expect(result).toEqual(undefined)
  })
})
