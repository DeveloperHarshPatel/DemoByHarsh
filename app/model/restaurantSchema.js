export const RESTAURANT_SCHEMA = 'restaurant';
export const restaurantSchema = {
  name: RESTAURANT_SCHEMA,
  properties: {
    id: {type: 'int', indexed: true},
    title: 'string',
    address: 'string',
    latitude: 'string',
    longitude: 'string',
    rating: 'float',
    total_review: 'int',
    description: 'string',
    mobile: 'string',
    images: 'images[]',
  },
};

export const images = {
  name: 'images',
  properties: {
    url: 'string',
  },
};
