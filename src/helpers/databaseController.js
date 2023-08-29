const fs = require("fs").promises;

class databaseController {
  constructor(filename) {
    this.path = filename;

    // read The database
    this.readDatabase = async () => {
      try {
        const data = await fs.readFile(this.path, "utf-8");
        const database = JSON.parse(data);
        return database;
      } catch (e) {
        return "Can not read the database";
      }
    };

    // find if there are any duplicate
    this.findDuplicate = async (array, uuid) => {
      const filtered = await array.filter((each) => {
        return each.uuid === uuid;
      });
      if (filtered.length === 0) {
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          message: "duplicate item detected",
          payload: filtered,
        };
      }
    };

    // get items
    this.items = async () => {
      const database = await this.readDatabase();
      return database.items;
    };

    // get single item
    this.singleItem = async (uuid) => {
      const database = await this.readDatabase();
      const findResult = await this.findDuplicate(database.items, uuid);
      if (findResult.success === true) {
        database.items_popularity = [...database.items_popularity, uuid];
        const saveResult = await this.saveDatabase(database);
        return {
          success: true,
          item: findResult.payload[0],
        };
      } else {
        return {
          success: false,
          message: "no item found with uuid " + uuid,
        };
      }
    };

    // get deletedItems
    this.deletedItems = async () => {
      const database = await this.readDatabase();
      return database.deletedItems;
    };

    // get single deletedItem
    this.singleDeletedItem = async (uuid) => {
      const database = await this.readDatabase();

      const findResult = await this.findDuplicate(database.deletedItems, uuid);
      if (findResult.success === true) {
        database.items_popularity = [...database.items_popularity, uuid];
        const saveResult = await this.saveDatabase(database);
        return {
          success: true,
          item: findResult.payload[0],
        };
      } else {
        return {
          success: false,
          message: "no item found with uuid " + uuid,
        };
      }
    };

    // update The database
    this.saveDatabase = async (database) => {
      try {
        const saveDatabase = await fs.writeFile(
          this.path,
          JSON.stringify(database),
        );
        return {
          success: true,
          message: "item successfully saved",
        };
      } catch (e) {
        return {
          success: false,
          message: "can't save the item",
        };
      }
    };

    // set the date when the database has updated
    this.setLastUpdate = async () => {
      const database = await this.readDatabase();
      database.lastUpdated = new Date().toLocaleString();
      const updateResult = await this.saveDatabase(database);
      return updateResult;
    };

    // remove specific item than return the array without that
    this.filterItem = async (uuid) => {
      const database = await this.readDatabase();
      const data = await database.items;
      const filtered = data.filter((item) => {
        return item.uuid !== uuid;
      });
      if (filtered.length !== 0) {
        return {
          success: true,
          payload: filtered,
        };
      } else {
        return {
          success: false,
          message: "No item found",
          payload: [],
        };
      }
    };

    // add a item in database
    this.addItem = async (item) => {
      const database = await this.readDatabase();
      const data = await database.items;
      const findResult = await this.findDuplicate(data, item.uuid);
      if (findResult.success === false) {
        const database = await this.readDatabase();
        database.items = [...database.items, item];
        const saveResult = await this.saveDatabase(database);
        if (saveResult.success === true) {
          return {
            success: true,
            message: saveResult.message,
          };
        } else {
          return {
            success: false,
            message: saveResult.message,
          };
        }
      } else {
        return {
          success: false,
          message: findResult.message,
          payload: findResult.payload,
        };
      }
    };

    // delete a item from database
    this.deleteItem = async (uuid) => {
      const database = await this.readDatabase();
      const findResult = await this.findDuplicate(database.items, uuid);
      if (findResult.success === true) {
        const filterResult = await this.filterItem(uuid);
        database.items = filterResult.payload;
        database.deletedItems = [
          ...database.deletedItems,
          ...findResult.payload,
        ];
        const saveResult = await this.saveDatabase(database);
        return {
          success: saveResult.success,
          message: "item deleted successfully",
        };
      } else {
        return {
          success: false,
          message: `Item with uuid ${uuid} doesn't exist`,
        };
      }
    };

    // update a item
    this.updateItem = async (item) => {
      const database = await this.readDatabase();
      const findResult = await this.findDuplicate(database.items, item.uuid);
      if (findResult.success === true) {
        const newItems = database.items.map((each) => {
          if (each.uuid === item.uuid) {
            const time = new Date().toLocaleString();
            each.change_history = [];
            item.change_history.push({ time, todo: each });
            return { ...each, ...item };
          } else {
            return each;
          }
        });

        database.items = newItems;
        const saveResult = await this.saveDatabase(database);
        return {
          success: saveResult.success,
          message: "item updated",
        };
      } else {
        return {
          success: false,
          message: `no item found with this uuid ${item.uuid}`,
        };
      }
    };

    // delete deleted item
    this.deleteDeletedItem = async (uuid) => {
      const database = await this.readDatabase();
      const findResult = await this.findDuplicate(database.deletedItems, uuid);
      if (findResult.success === true) {
        const filterResult = await this.filterItem(uuid);
        database.deletedItems = filterResult.payload || [];
        const saveResult = await this.saveDatabase(database);
        return {
          success: saveResult.success,
          message: "item permanently deleted successfully",
        };
      } else {
        return {
          success: false,
          message: `Item with uuid ${uuid} doesn't exist`,
        };
      }
    };

    // recover deleted item
    this.recoverDeletedItem = async (uuid) => {
      const database = await this.readDatabase();
      const findResult = await this.findDuplicate(database.deletedItems, uuid);
      if (findResult.success === true) {
        const filterResult = await this.filterItem(uuid);
        database.deletedItems = filterResult.payload || [];
        database.items = [...database.items, ...findResult.payload];
        const saveResult = await this.saveDatabase(database);
        return {
          success: saveResult.success,
          message: "item recovered successfully",
        };
      } else {
        return {
          success: false,
          message: `Item with uuid ${uuid} doesn't exist`,
        };
      }
    };
  }
}

module.exports = databaseController;
