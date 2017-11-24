import { Message } from '/imports/api/messages/message-model'

import { Class, Enum } from 'meteor/jagi:astronomy'
import 'jagi:astronomy-timestamp-behavior'

export const Catalog = Class.create({
  name: 'Catalog',
  collection: new Mongo.Collection('catalogs'),
  fields: {
    title: {
      type: String,
      validators: [{
        type: 'maxLength', param: 30, message: 'message_title_max_length'
      }]
    },
    messages: [Message],
    correlationId: String,
    userId: String
  },
  behaviors: {
    softremove: {
      removedFieldName: 'removed',
      hasRemovedAtField: true,
      removedAtFieldName: 'removedAt'
    },
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  }
})
