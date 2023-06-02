import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'User One',
      email: 'userone@mail.com',
      password: bcrypt.hashSync('user1'),
      isAdmin: 'false',
    },
    {
      name: 'Admin One',
      email: 'adminone@mail.com',
      password: bcrypt.hashSync('admin1'),
      isAdmin: 'true',
    },
  ],
  products: [
    {
      //_id: '1',
      name: 'Camry 2.5 V HEV',
      slug: 'toyota-sedan',
      image: '/images/CAMRY_2.5_V_HEV.png',
      category: 'Sedan',
      description: `Overall Dimension: 4,885 x 1,840 x 1,445,
        Seating Capacity: 5,
        Engine Type: 16-Valve DOHC, 4-Cylinder, In-line, VVT-iE (Intake), VVT-I (Exhaust),
        Fuel Capacity: 50L
        `,
      brand: 'Toyota',
      price: 2417000,
      countInStock: 10,
      rating: 4.8,
      numReviews: 10,
      isActive: true,
    },
    {
      //_id: '2',
      name: 'GR Yaris 1.6L Turbo MT',
      slug: 'toyota-hatchback',
      image: '/images/GR_YARIS_1.6L_Turbo_MT.png',
      category: 'Hatchback',
      description: `Overall Dimension: 3,995 x 1,805 x 1,455,
        Seating Capacity: 4,
        Engine Type: 3-Cylinder, In-line, DOHC 4-Valve Roller-rocker,
        Fuel Capacity: 50L
        `,
      brand: 'Toyota',
      price: 2740000,
      countInStock: 10,
      rating: 4.4,
      numReviews: 8,
      isActive: true,
    },
    {
      //_id: '3',
      name: 'Land Cruiser ZX',
      slug: 'toyota-suv',
      image: '/images/LAND_CRUISER_ZX.png',
      category: 'SUV',
      description: `Overall Dimension: 5,130 x 1,980 x 1,945,
        Seating Capacity: 7,
        Engine Type: V6 Direct Injection, 24-Valve DOHC, Twin Turbo Engine,
        `,
      brand: 'Toyota',
      price: 5747000,
      countInStock: 10,
      rating: 4.9,
      numReviews: 10,
      isActive: false,
    },
  ],
};

export default data;
