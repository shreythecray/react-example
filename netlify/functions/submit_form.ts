import { CourierClient } from "@trycourier/courier";
import { Handler, HandlerResponse } from "@netlify/functions";

const courier = CourierClient({
  authorizationToken: "dk_prod_0S8GENGCW740PAJEBZDWZ9X4YA4M",
});

const buildResponse = (statusCode: number, body: object): HandlerResponse => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return buildResponse(405, { error: "Method Not Allowed" });
  }

  let params = { userId: "" };
  try {
    params = JSON.parse(event.body);
  } catch {
    return buildResponse(400, { error: "Bad Request" });
  }

  try {
    const response = await courier.send({
      eventId: "71WXG9JXA447WMGS8EY06TCT6EQ1",
      recipientId: "2d7246cb-4747-4c65-bb95-88cbfb90c734",
      profile: {
        courier: {
          channel: "shreythecray",
        },
      },
      data: {},
      override: {},
    });

    return buildResponse(201, response);
  } catch (error) {
    console.error(error.response.data);

    return buildResponse(500, { error: "Internal Server Error" });
  }
};

export { handler };
