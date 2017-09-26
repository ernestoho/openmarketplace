import SimpleSchema from 'simpl-schema'

/**
 * @summary Define the namespace for OpenMarketplace
 * @namespace OM
 */

const OM = {}

OM.VERSION = '0.0.1'

// Schemas

SimpleSchema.extendOptions([
  'private',
  'editable', // editable: true means the field can be edited by the document's owner
  'hidden', // hidden: true means the field is never shown in a form no matter what
  'form', // form placeholder
  'order', // position in the form
  'group', // form fieldset group
  'onInsert', // field insert callback
  'onEdit', // field edit callback
  'onRemove', // field remove callback
  'viewableBy',
  'insertableBy',
  'editableBy',
  'resolveAs',
  'limit',
  'searchable'
])

export default OM
