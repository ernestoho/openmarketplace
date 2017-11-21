import { Class, Enum } from 'meteor/jagi:astronomy'

export const ServiceStatus = Enum.create({
  name: 'ServiceStatus',
  identifiers: {
    DRAFT: 0,
    ACTIVE: 1,
    INACTIVE: 2
  }
})

export const Service = Class.create({
  name: 'Service',
  collection: new Mongo.Collection('services'),
  fields: {
    title: {
      type: String,
      validators: [{
        type: 'maxLength', param: 50, message: 'service_title_max_length'
      }]
    },
    description: {
      type: String,
      optional: true,
      validators: [{
        type: 'maxLength', param: 500, message: 'service_description_max_length'
      }]
    },
    status: {
      type: ServiceStatus,
      default: ServiceStatus.DRAFT
    }
  },
  behaviors: {
    slug: {
      fieldName: 'title',
      slugFieldName: 'slug',
      canUpdate: false,
      unique: true,
      separator: '-'
    }
  },
  indexes: {
    unique_service_title: {
      fields: {
        slug: 1,
        title: 1
      },
      options: {
        unique: true
      }
    }
  }
})
