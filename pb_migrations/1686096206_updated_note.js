migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kpk36f2l2fvorii")

  collection.name = "notes"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kpk36f2l2fvorii")

  collection.name = "note"

  return dao.saveCollection(collection)
})
