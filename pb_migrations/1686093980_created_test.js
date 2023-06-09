migrate((db) => {
  const collection = new Collection({
    "id": "kpk36f2l2fvorii",
    "created": "2023-06-06 23:26:20.470Z",
    "updated": "2023-06-06 23:26:20.470Z",
    "name": "test",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kpk36f2l2fvorii");

  return dao.deleteCollection(collection);
})
