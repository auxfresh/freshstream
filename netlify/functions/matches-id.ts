import { Handler } from "@netlify/functions";
import { storage } from "../../server/storage";

export const handler: Handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    if (event.httpMethod === "GET") {
      const id = event.path.split('/').pop();
      if (!id || isNaN(parseInt(id))) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: "Invalid match ID" }),
        };
      }

      const match = await storage.getMatchWithTeams(parseInt(id));
      if (!match) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: "Match not found" }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(match),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Failed to fetch match" }),
    };
  }
};