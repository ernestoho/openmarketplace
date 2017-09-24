// OpenMarketplace utils

import marked from 'marked'
import urlObject from 'url'
import moment from 'moment'
import sanitizeHtml from 'sanitize-html'
import getSlug from 'speakingurl'
import { getSetting } from './settings.js'

/**
 * @summary Define the namespace for OpenMarketplace utils
 * @namespace OM.utils
 */
export const Utils = {}

Utils.camelToDash = function (str) {
  return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
}

Utils.camelToSpaces = function (str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase() })
}

Utils.underscoreToDash = function (str) {
  return str.replace('_', '-')
}

Utils.dashToCamel = function (str) {
  return str.replace(/(\\-[a-z])/g, function ($1) { return $1.toUpperCase().replace('-', '') })
}

Utils.camelCaseify = function (str) {
  str = this.dashToCamel(str.replace(' ', '-'))
  str = str.slice(0, 1).toLowerCase() + str.slice(1)
  return str
}

Utils.trimWords = function (s, numWords) {
  if (!s) { return s }

  var expString = s.split(/\s+/, numWords)
  if (expString.length >= numWords) { return expString.join(' ') + '…' }
  return s
}

Utils.trimHTML = function (html, numWords) {
  var text = Utils.stripHTML(html)
  return Utils.trimWords(text, numWords)
}

Utils.capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

Utils.getDateRange = function (pageNumber) {
  var now = moment(new Date())
  var dayToDisplay = now.subtract(pageNumber - 1, 'days')
  var range = {}
  range.start = dayToDisplay.startOf('day').valueOf()
  range.end = dayToDisplay.endOf('day').valueOf()
  return range
}

Utils.getSiteUrl = function () {
  return getSetting('siteUrl', Meteor.absoluteUrl())
}

Utils.getOutgoingUrl = function (url) {
  return Utils.getSiteUrl() + 'out?url=' + encodeURIComponent(url)
}

Utils.slugify = function (s) {
  var slug = getSlug(s, {
    truncate: 60
  })

  if (slug === 'edit') {
    slug = 'edit-1'
  }

  return slug
}

Utils.getUnusedSlug = function (collection, slug) {
  let suffix = ''
  let index = 0

  while (collection.findOne({slug: slug + suffix})) {
    index++
    suffix = '-' + index
  }

  return slug + suffix
}

Utils.getShortUrl = function (post) {
  return post.shortUrl || post.url
}

Utils.getDomain = function (url) {
  try {
    return urlObject.parse(url).hostname.replace('www.', '')
  } catch (error) {
    return null
  }
}

Utils.invitesEnabled = function () {
  return getSetting('requireViewInvite') || getSetting('requirePostInvite')
}

Utils.addHttp = function (url) {
  try {
    if (url.substring(0, 5) !== 'http:' && url.substring(0, 6) !== 'https:') {
      url = 'http:' + url
    }
    return url
  } catch (error) {
    return null
  }
}

Utils.cleanUp = function (s) {
  return this.stripHTML(s)
}

Utils.sanitize = function (s) {
  if (Meteor.isServer) {
    s = sanitizeHtml(s, {
      allowedTags: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul',
        'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike',
        'code', 'hr', 'br', 'div', 'table', 'thead', 'caption',
        'tbody', 'tr', 'th', 'td', 'pre', 'img'
      ]
    })
  }
  return s
}

Utils.stripHTML = function (s) {
  return s.replace(/<(?:.|\n)*?>/gm, '')
}

Utils.stripMarkdown = function (s) {
  var htmlBody = marked(s)
  return Utils.stripHTML(htmlBody)
}

Utils.checkNested = function (obj /*, level1, level2, ... levelN */) {
  var args = Array.prototype.slice.call(arguments)
  obj = args.shift()

  for (var i = 0; i < args.length; i++) {
    if (!obj.hasOwnProperty(args[i])) {
      return false
    }
    obj = obj[args[i]]
  }
  return true
}

Utils.log = function (s) {
  if (getSetting('debug', false) || process.env.NODE_ENV === 'development') {
    console.log(s)
  }
}

Utils.getNestedProperty = function (obj, desc) {
  var arr = desc.split('.')
  while (arr.length && (obj = obj[arr.shift()]));
  return obj
}

Utils.getFieldLabel = (fieldName, collection) => {
  const label = collection.simpleSchema()._schema[fieldName].label
  const nameWithSpaces = Utils.camelToSpaces(fieldName)
  return label || nameWithSpaces
}

Utils.getLogoUrl = () => {
  const logoUrl = getSetting('logoUrl')
  if (logoUrl) {
    const prefix = Utils.getSiteUrl().slice(0, -1)
    return logoUrl.indexOf('://') > -1 ? logoUrl : prefix + logoUrl
  }
}

Utils.findIndex = (array, predicate) => {
  let index = -1
  let continueLoop = true
  array.forEach((item, currentIndex) => {
    if (continueLoop && predicate(item)) {
      index = currentIndex
      continueLoop = false
    }
  })
  return index
}

Utils.unflatten = function (array, options, parent, level = 0, tree) {
  const {
    idProperty = '_id',
    parentIdProperty = 'parentId',
    childrenProperty = 'childrenResults'
  } = options

  level++

  tree = typeof tree !== 'undefined' ? tree : []

  let children = []

  if (typeof parent === 'undefined') {
    children = _.filter(array, node => !node[parentIdProperty])
  } else {
    children = _.filter(array, node => node[parentIdProperty] === parent[idProperty])
  }

  if (children.length) {
    if (typeof parent === 'undefined') {
      tree = children
    } else {
      parent[childrenProperty] = children
    }

    children.forEach(child => {
      child.level = level
      Utils.unflatten(array, options, child, level)
    })
  }

  return tree
}

Utils.stripTelescopeNamespace = (schema) => {
  const schemaKeys = Object.keys(schema)

  const filteredSchemaKeys = schemaKeys.filter(key => key.slice(0, 9) !== 'telescope')

  return filteredSchemaKeys.reduce((sch, key) => ({...sch, [key]: schema[key]}), {})
}

Utils.arrayToFields = (fieldsArray) => {
  return _.object(fieldsArray, _.map(fieldsArray, function () { return true }))
}

Utils.getComponentDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

Utils.convertDates = (collection, listOrDocument) => {
  if (!listOrDocument || !listOrDocument.length) return listOrDocument

  const list = Array.isArray(listOrDocument) ? listOrDocument : [listOrDocument]
  const schema = collection.simpleSchema()._schema
  const dateFields = _.filter(_.keys(schema), fieldName => schema[fieldName].type === Date)
  const convertedList = list.map(result => {
    dateFields.forEach(fieldName => {
      if (result[fieldName] && typeof result[fieldName] === 'string') {
        result[fieldName] = new Date(result[fieldName])
      }
    })
    return result
  })

  return Array.isArray(listOrDocument) ? convertedList : convertedList[0]
}

Utils.encodeIntlError = error => typeof error !== 'object' ? error : JSON.stringify(error)

Utils.decodeIntlError = (error, options = {stripped: false}) => {
  try {
    let strippedError = typeof error === 'string' ? error : error.message

    if (!options.stripped) {
      const graphqlPrefixIsPresent = strippedError.match(/GraphQL error: (.*)/)
      if (graphqlPrefixIsPresent) {
        strippedError = graphqlPrefixIsPresent[1]
      }

      const errorCodeIsPresent = strippedError.match(/(.*)\[(.*)\]/)
      if (errorCodeIsPresent) {
        strippedError = errorCodeIsPresent[1]
      }
    }

    const parsedError = JSON.parse(strippedError)

    if (!parsedError.id) {
      console.error('[Undecodable error]', error); // eslint-disable-line
      return {id: 'app.something_bad_happened', value: '[undecodable error]'}
    }

    return parsedError
  } catch (__) {
    return error
  }
}

Utils.findWhere = (array, criteria) => array.find(item => Object.keys(criteria).every(key => item[key] === criteria[key]))

Utils.findByIds = async function (collection, ids, context) {
  // get documents
  const documents = await collection.find({ _id: { $in: ids } }).fetch()

  // order documents in the same order as the ids passed as argument
  const orderedDocuments = ids.map(id => _.findWhere(documents, {_id: id}))

  return orderedDocuments
}

Utils.defineName = (o, name) => {
  Object.defineProperty(o, 'name', { value: name })
  return o
}

Utils.performCheck = (operation, user, checkedObject, context, documentId) => {
  if (!checkedObject) {
    throw new Error(Utils.encodeIntlError({id: `app.document_not_found`, value: documentId}))
  }

  if (!operation(user, checkedObject, context)) {
    throw new Error(Utils.encodeIntlError({id: `app.operation_not_allowed`, value: operation.name}))
  }
}

Utils.getIcon = function (iconName, iconClass) {
  var icons = Utils.icons
  var iconCode = icons[iconName] ? icons[iconName] : iconName
  iconClass = (typeof iconClass === 'string') ? ' ' + iconClass : ''
  return '<i class="icon fa fa-fw fa-' + iconCode + ' icon-' + iconName + iconClass + '" aria-hidden="true"></i>'
}

Utils.icons = {
  expand: 'angle-right',
  collapse: 'angle-down',
  next: 'angle-right',
  close: 'times',
  upvote: 'chevron-up',
  voted: 'check',
  downvote: 'chevron-down',
  facebook: 'facebook-square',
  twitter: 'twitter',
  googleplus: 'google-plus',
  linkedin: 'linkedin-square',
  comment: 'comment-o',
  share: 'share-square-o',
  more: 'ellipsis-h',
  menu: 'bars',
  subscribe: 'envelope-o',
  delete: 'trash-o',
  edit: 'pencil',
  popularity: 'fire',
  time: 'clock-o',
  best: 'star',
  search: 'search',
  approve: 'check-circle-o',
  reject: 'times-circle-o',
  views: 'eye',
  clicks: 'mouse-pointer',
  score: 'line-chart',
  reply: 'reply',
  spinner: 'spinner',
  new: 'plus',
  user: 'user',
  like: 'heart',
  image: 'picture-o'
}
