import { Class, Enum } from 'meteor/jagi:astronomy'
import { check } from 'meteor/check'

export const OwnershipStatus = Enum.create({
  name: 'OwnershipStatus',
  identifiers: {
    DRAFT: 0,
    ACTIVE: 1,
    INACTIVE: 2
  }
})

export const Ownership = Class.create({
  name: 'Ownership',
  collection: new Mongo.Collection('ownerships'),
  fields: {
    type: {
      type: String,
      validators: [{
        type: 'maxLength', param: 20, message: 'ownership_type_max_length'
      }]
    },
    title: {
      type: String,
      validators: [{
        type: 'maxLength', param: 50, message: 'ownership_title_max_length'
      }]
    },
    description: {
      type: String,
      optional: true,
      validators: [{
        type: 'maxLength', param: 500, message: 'ownership_description_max_length'
      }]
    },
    userId: String,
    createdAt: Date,
    status: {
      type: OwnershipStatus,
      default: OwnershipStatus.DRAFT
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
    unique_ownership_title: {
      fields: {
        slug: 1,
        title: 1
      },
      options: {
        unique: true
      }
    }
  },
  meteorMethods: {
    addBooking(id, user, data) {
      check(id, String)
      check(user, Object)
      check(data, Object)

      // TODO: implements...
    },
    removeBooking() {
      // TODO: implements...
    },
    confirmBooking() {
      // TODO: implements...
    },
    cancelBooking() {
      // TODO: implements...
    },
    addRental() {
      // TODO: implements...
    },
    removeRental() {
      // TODO: implements...
    },
    confirmRental() {
      // TODO: implements...
    },
    cancelRental() {
      // TODO: implements...
    },
    addSelling() {
      // TODO: implements...
    },
    removeSelling() {
      // TODO: implements...
    },
    confirmSelling() {
      // TODO: implements...
    },
    cancelSelling() {
      // TODO: implements...
    }
  }
})
