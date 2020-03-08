import { NextApiRequest, NextApiResponse } from "next";
import { isNonEmptyString } from "../../server/helpers/types";
import { getSuggestions } from "../../server/suggestions";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { q: query } = req.query;
  const suggestions = isNonEmptyString(query)
    ? await getSuggestions(query)
    : [];

  res.status(200).json(suggestions);
};
