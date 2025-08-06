import {
  createServer,
  Model,
} from "https://cdn.jsdelivr.net/npm/miragejs@0.1.48/+esm";

export default function inventoryAPIs() {
  // Create a Mirage server

  createServer({
    models: {
      item: Model,
    },

    seeds(server) {
      server.create("item", {
        id: 1,
        name: "Wireless Mouse",
        category: "electronics",
        stock: 8,
      });
      server.create("item", {
        id: 2,
        name: "Bluetooth Speaker",
        category: "electronics",
        stock: 4,
      });
      server.create("item", {
        id: 3,
        name: "LED Desk Lamp",
        category: "home",
        stock: 7,
      });
      server.create("item", {
        id: 4,
        name: "Stainless Steel Cookware Set",
        category: "kitchen",
        stock: 10,
      });
      server.create("item", {
        id: 5,
        name: "High-Speed Blender",
        category: "kitchen",
        stock: 0,
      });
    },

    routes() {
      this.namespace = "/api";

      // List items with optional filtering & sorting
      this.get("/items", (schema, request) => {
        let items = schema.items.all().models;

        // Filtering
        const { filter } = request.queryParams;
        console.log("server", filter);
        if (filter === "out") {
          items = items.filter((i) => i.stock === 0);
        } else if (filter === "low") {
          items = items.filter((i) => i.stock > 0 && i.stock < 5);
        }

        // Sorting
        const { sortBy, sortDir } = request.queryParams;
        if (sortBy === "stock") {
          items = items.sort((a, b) =>
            sortDir === "desc" ? b.stock - a.stock : a.stock - b.stock
          );
        } else if (sortBy === "name") {
          items = items.sort((a, b) =>
            sortDir === "desc"
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name)
          );
        }

        return { items };
      });

      // Get a single item
      this.get("/items/:id", (schema, request) => {
        return schema.items.find(request.params.id);
      });

      // Create a new item
      this.post("/items", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.items.create(attrs);
      });

      // Update an existing item
      this.put("/items/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        return schema.items.find(id).update(attrs);
      });

      // Delete an item
      this.delete("/items/:id", (schema, request) => {
        return schema.items.find(request.params.id).destroy();
      });
    },
  });
}
