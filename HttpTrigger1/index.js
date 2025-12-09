const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
  const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);

  const database = client.database("mycv");
  const container = database.container("counter");

  // Read current value
  const { resource } = await container.item("visitorCount", "visitorCount").read();

  // Increment
  resource.count++;
  await container.item(resource.id, resource.partitionKey).replace(resource);

  context.res = {
    status: 200,
    body: { count: resource.count }
  };
};

