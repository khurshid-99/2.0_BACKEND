import ImageKit, { toFile } from "@imagekit/nodejs";
import config from "../configs/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadImages({ buffer, fileName, folder = "snitch" }) {
  try {
    const result = await client.files.upload({
      file: await toFile(buffer),
      fileName,
      folder,
    });

    return result;
  } catch (error) {
    console.log("Image Upload faild!");
    throw error;
  }
}
