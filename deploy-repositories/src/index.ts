import { createClient, commandOptions } from "redis";
import { downloadS3Folder } from "./aws";

const subscriber = createClient();
subscriber.connect();

async function main() {
  while (1) {
    const res = await subscriber.brPop(
      commandOptions({ isolated: true }),
      "build-queue",
      0
    );
    console.log(res);
    //@ts-ignore
    await downloadS3Folder(`/output/${response.element}`);
  }
}
main();