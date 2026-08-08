import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "model/user.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const userName = await request.query.username;
  const findOneUserName = await user.findOne({ username: userName });
  response.status(200).json(findOneUserName);
}
