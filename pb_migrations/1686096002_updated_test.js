migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kpk36f2l2fvorii")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7eysgw0f",
    "name": "content",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7eysgw0f",
    "name": "message",
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
})
