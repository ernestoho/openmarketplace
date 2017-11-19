import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

import { Class } from 'meteor/jagi:astronomy'
import { check } from 'meteor/check'

const UserProfile = Class.create({
  name: 'UserProfile',
  fields: {
    name: String,
    first_name: String,
    last_name: String,
    gender: String
  }
})

export const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {
    createdAt: Date,
    emails: {
      type: [Object],
      optional: true
    },
    profile: {
      type: UserProfile,
      default: function() {
        return {}
      }
    },
    status: {
      type: Object,
      optional: true
    },
    roles: {
      type: [Object],
      optional: true
    },
    account: {
      type: Object,
      optional: true
    },
    services: {
      type: Object,
      optional: true
    }
  },
  meteorMethods: {
    addGlobalAdminRole(id) {
      if (Roles.userIsInRole(Meteor.userId(), 'global-admin')) {
        Roles.addUsersToRoles(id, ['global-admin'], Roles.GLOBAL_GROUP)
      }
    },
    addCustomerRole(id) {
      if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'operator')) {
        Roles.addUsersToRoles(id, 'customer')
      }
    },
    addProviderRole(id) {
      if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'operator')) {
        Roles.addUsersToRoles(id, 'provider')
      }
    }
  },
  secured: {
    insert: false,
    update: false
  }
})

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: Object
    }
  })

  Meteor.publish('User.GetConnected', function() {
    return User.find({'_id': this.userId})
  })

  Meteor.publish('User.GetById', function(id, fields) {
    check(id, String)
    check(fields, [Object])

    return User.find({'_id': id}, fields || {})
  })

  Meteor.publish('User.GetByIds', function(ids, fields) {
    check(ids, [String])
    check(fields, [Object])

    return User.find({'_id': {$in: ids}}, fields || {})
  })

  Meteor.publish('User.GetStatus', function(id) {
    check(id, String)

    return User.find({'_id': id}, {
      fields: {'status': true}
    })
  })
}
