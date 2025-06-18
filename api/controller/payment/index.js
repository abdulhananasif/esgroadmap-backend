import { paddle } from '../../utils/paddleClient.js';
export const products = async (req, res) => {
    try {
        const response = await paddle.get('/products');
        console.log("🚀 ~ products ~ response:", response);
        const prices = await paddle.get('/prices');
        console.log("🚀 ~ products ~ prices:", prices);
        res.status(200).json({ product: response.data, prices: prices.data });
    }
    catch (error) {
        console.error('Error fetching Paddle products:', error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};
