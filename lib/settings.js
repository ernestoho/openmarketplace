// OpenMarketplace wrapper for easy and careful access to Meteor settings

export const getSetting = (setting, defaultValue) => {
  if (Meteor.isServer) {
    const rootSetting = Meteor.settings && Meteor.settings[setting]
    const privateSetting = Meteor.settings && Meteor.settings.private && Meteor.settings.private[setting]
    const publicSetting = Meteor.settings && Meteor.settings.public && Meteor.settings.public[setting]

    if (typeof rootSetting === 'object' || typeof privateSetting === 'object' || typeof publicSetting === 'object') {
      return {
        ...rootSetting,
        ...privateSetting,
        ...publicSetting,
        ...defaultValue
      }
    } else {
      return rootSetting || privateSetting || publicSetting || defaultValue
    }
  } else {
    const publicSetting = Meteor.settings && Meteor.settings.public && Meteor.settings.public[setting]
    return publicSetting || defaultValue
  }
}
