// GET https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=NG&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
import type { NextApiRequest, NextApiResponse } from "next"
import { youtube } from "../../lib/prisma"

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | any>) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not Allowed" })
  }

  try {
    const params = {
      part: ["snippet"],
      regionCode: "NG",
    }

    const videoCategories = await youtube.videoCategories.list(params)
    return res.status(200).json(videoCategories.data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "something went wrong" })
  }
}
// https://youtube.googleapis.com/youtube/v3/activities?key=[YOUR_API_KEY]
