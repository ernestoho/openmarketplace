import { Class, Enum } from 'meteor/jagi:astronomy'
import 'jagi:astronomy-timestamp-behavior'

export const CatalogStatus = Enum.create({
  name: 'CatalogStatus',
  identifiers: {
    DRAFT: 0,
    ACTIVE: 1,
    INACTIVE: 2
  }
})

export const Catalog = Class.create({
  name: 'Catalog',
  collection: new Mongo.Collection('catalogs'),
  fields: {
    title: {
      type: String,
      validators: [{
        type: 'maxLength', param: 30, message: 'catalog_title_max_length'
      }]
    },
    description: {
      type: String,
      optional: true,
      validators: [{
        type: 'maxLength', param: 500, message: 'catalog_description_max_length'
      }]
    },
    organizationId: String,
    userId: String,
    status: {
      type: CatalogStatus,
      default: CatalogStatus.DRAFT
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  }
})
