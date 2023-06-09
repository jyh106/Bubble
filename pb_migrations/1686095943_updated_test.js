migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kpk36f2l2fvorii")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f8olzg02",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kpk36f2l2fvorii")

  // remove
  collection.schema.removeField("f8olzg02")

  return dao.saveCollection(collection)
})
