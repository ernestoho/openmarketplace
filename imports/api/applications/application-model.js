import { Class, Enum } from 'meteor/jagi:astronomy'
import 'jagi:astronomy-timestamp-behavior'

export const ApplicationStatus = Enum.create({
  name: 'ApplicationStatus',
  identifiers: {
    DRAFT: 0,
    ACTIVE: 1,
    INACTIVE: 2
  }
})

export const Application = Class.create({
  name: 'Application',
  collection: new Mongo.Collection('applications'),
  fields: {
    name: {
      type: String,
      validators: [{
        type: 'maxLength', param: 50, message: 'application_name_max_length'
      }]
    },
    description: {
      type: String,
      optional: true,
      validators: [{
        type: 'maxLength', param: 500, message: 'application_description_max_length'
      }]
    },
    userId: String,
    status: {
      type: ApplicationStatus,
      default: ApplicationStatus.DRAFT
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
    unique_application_name: {
      fields: {
        name: 1
      },
      options: {
        unique: true
      }
    }
  }
})
