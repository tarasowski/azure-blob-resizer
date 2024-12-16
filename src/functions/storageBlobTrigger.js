const { app } = require('@azure/functions');
const { Jimp } = require('jimp');
const { BlockBlobClient } = require("@azure/storage-blob");

const containerName = "resizebucket"

app.storageBlob('storageBlobTrigger', {
  path: `${containerName}/input/{name}`,
  connection: '',
  handler: async (blob, context) => {
    const widthInPixels = 100
    const connectionString = process.env.AzureWebJobsStorage;
    const fileName = context.triggerMetadata.name
    try {
      let image = await Jimp.read(blob)
      image.resize({ w: widthInPixels });
      const buffer = await image.getBuffer("image/jpeg")
      const blobClient = new BlockBlobClient(
        connectionString, containerName, `output/${fileName}`)
      await blobClient.uploadData(buffer, { blobHTTPHeaders: { blobContentType: "image/jpeg" }})
    } catch(e) {
      console.error(e)
    }
  }
});
