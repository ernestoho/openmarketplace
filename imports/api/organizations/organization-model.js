import { Class, Enum } from 'meteor/jagi:astronomy'
import 'jagi:astronomy-timestamp-behavior'

export const OrganizationStatus = Enum.create({
  name: 'OrganizationStatus',
  identifiers: {
    DRAFT: 0,
    ACTIVE: 1,
    INACTIVE: 2
  }
})

export const Organization = Class.create({
  name: 'Organization',
  collection: new Mongo.Collection('organizations'),
  fields: {
    fullName: {
      type: String,
      validators: [{
        type: 'maxLength', param: 50, message: 'organization_full_name_max_length'
      }]
    },
    shortName: {
      type: String,
      validators: [{
        type: 'maxLength', param: 20, message: 'organization_short_name_max_length'
      }]
    },
    description: {
      type: String,
      optional: true,
      validators: [{
        type: 'maxLength', param: 500, message: 'organization_description_max_length'
      }]
    },
    userId: String,
    status: {
      type: OrganizationStatus,
      default: OrganizationStatus.DRAFT
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  },
  indexes: {
    unique_organization_short_name: {
      fields: {
        shortName: 1
      },
      options: {
        unique: true
      }
    }
  }
})
