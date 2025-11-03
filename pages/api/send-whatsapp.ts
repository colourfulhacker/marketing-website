import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { base64Data } = req.body;

    // TODO: Integrate with your WhatsApp system here.
    // You will need to decode base64Data and then send it via your WhatsApp API.
    // For now, we'll just log it and send a success message.
    console.log('Received base64Data for WhatsApp:', base64Data);

    res.status(200).json({ message: 'Application data sent to WhatsApp system successfully!' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}