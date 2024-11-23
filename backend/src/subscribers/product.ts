import type { IEventBusService } from '@medusajs/types'

type InjectedDependencies = {
  eventBusService: IEventBusService
}

class ProductSubscriber {
  protected readonly eventBus_: IEventBusService

  constructor({ eventBusService }: InjectedDependencies) {
    this.eventBus_ = eventBusService

    // Subscribe to product events
    this.eventBus_.subscribe('product.created', this.handleProductEvent)
    this.eventBus_.subscribe('product.updated', this.handleProductEvent)
    this.eventBus_.subscribe('product.deleted', this.handleProductEvent)
    this.eventBus_.subscribe(
      'product-collection.created',
      this.handleProductCollectionEvent
    )
    this.eventBus_.subscribe(
      'product-collection.updated',
      this.handleProductCollectionEvent
    )
    this.eventBus_.subscribe(
      'product-collection.deleted',
      this.handleProductCollectionEvent
    )
    this.eventBus_.subscribe(
      'product-category.created',
      this.handleProductCategoryEvent
    )
    this.eventBus_.subscribe(
      'product-category.updated',
      this.handleProductCategoryEvent
    )
    this.eventBus_.subscribe(
      'product-category.deleted',
      this.handleProductCategoryEvent
    )
  }

  handleProductEvent = async (data: unknown): Promise<void> => {
    const FRONTEND_URL = process.env.STORE_CORS?.split(',')[0]
    const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

    if (!FRONTEND_URL || !REVALIDATE_SECRET) {
      console.warn(
        'Missing STORE_CORS or REVALIDATE_SECRET environment variables'
      )
      return
    }

    try {
      const response = await fetch(
        `${FRONTEND_URL}/api/revalidate/products?secret=${REVALIDATE_SECRET}`,
        { method: 'POST' }
      )

      console.log('Cache revalidated for products:', response.status)
    } catch (error) {
      console.error('Failed to revalidate cache:', error)
    }
  }

  handleProductCollectionEvent = async (data: unknown): Promise<void> => {
    const FRONTEND_URL = process.env.STORE_CORS?.split(',')[0]
    const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

    if (!FRONTEND_URL || !REVALIDATE_SECRET) {
      console.warn(
        'Missing STORE_CORS or REVALIDATE_SECRET environment variables'
      )
      return
    }

    try {
      const response = await fetch(
        `${FRONTEND_URL}/api/revalidate/collections?secret=${REVALIDATE_SECRET}`,
        { method: 'POST' }
      )

      console.log('Cache revalidated for collections:', response.status)
    } catch (error) {
      console.error('Failed to revalidate cache:', error)
    }
  }

  handleProductCategoryEvent = async (data: unknown): Promise<void> => {
    const FRONTEND_URL = process.env.STORE_CORS?.split(',')[0]
    const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

    if (!FRONTEND_URL || !REVALIDATE_SECRET) {
      console.warn(
        'Missing STORE_CORS or REVALIDATE_SECRET environment variables'
      )
      return
    }

    try {
      const response = await fetch(
        `${FRONTEND_URL}/api/revalidate/categories?secret=${REVALIDATE_SECRET}`,
        { method: 'POST' }
      )

      console.log('Cache revalidated for categories:', response.status)
    } catch (error) {
      console.error('Failed to revalidate cache:', error)
    }
  }
}

export default ProductSubscriber
