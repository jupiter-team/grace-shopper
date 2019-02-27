'use strict'

const db = require('../server/db')
const {Product, User, Order, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'T. Lover',
      email: 'tlover@email.com',
      address: '6 Hanover Sq, New York, NY 10004',
      password: 'ilovetea123',
      dob: new Date('December 17, 1995')
    }),
    User.create({
      name: 'Samantha Jones',
      email: 'sjones@email.com',
      address: 'Brooklyn, NY 10004',
      password: 'teaforlife456',
      dob: new Date('August 17, 1974')
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Mint Green Tea',
      price: 8.5,
      description:
        'In Morocco and many other Arab countries, serving mint tea has come to represent a certain lifestyle and the most refined expression of hospitality. Green tea is always used, usually Gunpowder, which is known for its refreshing and thirst quenching qualities. Chinese green tea (Gunpowder) rolled into pearls and flavored with dried mint leaves. Astringent, fresh and thirst quenching.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/1/815-42140-idd04ibnlv.jpg',
      status: 'available'
    }),
    Product.create({
      name: 'Thé du Hammam',
      price: 8.5,
      description:
        'One of our most popular teas, this fruity blend is inspired by a Turkish recipe using green teas that evokes the characteristic fragrances used to perfume a hammam (steam bath): roses, green dates, berries and orange flower water. Sprinkled with flower petals in the pure Eastern tradition, its extraordinary fragrance comes from a subtle combination of Chinese green tea and rich, fruity aromas.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/6/861-42158-rh8x3mmwnv.jpg',
      status: 'sold out'
    }),
    Product.create({
      name: 'Blue of London',
      price: 8.5,
      description:
        'An exceptional Earl Grey. Black teas from Yunnan (China) are some of the best black teas in the world. Blue of London is a subtle combination of Yunnan black tea with fresh and delicate bergamot from Calabria (South of Italy), giving a particularly fine and well balanced blend. About Earl Grey teas: Earl Grey is one of the best-loved English teas. It was first created when Charles Grey, 2nd Earl of Falloden and Foreign Secretary of Britain, received an old recipe from a Mandarin Chinese that called for flavoring tea with bergamot.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/0/803-34780-59f7h8ab9y.jpg',
      status: 'available'
    }),
    Product.create({
      name: 'Pretoria Cherry Roobios',
      price: 8.5,
      description:
        'Inspired by the Northern city of South Africa, Pretoria is a delicious blend of Rooibos and wild cherry. Did you know? Literally, Rooibos means “red tea” in South African. Contrarily to general belief and its nickname, Rooibos is not a tea, is it a bush. Its plant has the appearance of a small bush and in the spring it is covered with small yellow flowers. Rooibos gives a completely naturally caffeine-free infusion, which is why it is so great for the evening! Drunk as an infusion by the people of South Africa for the last 300 years, Rooibos has been cultivated and marketed since the 1930’s. Today it is the national drink of South Africa.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/9/1/918-36013-w4516dmwwb.jpg',
      status: 'available'
    }),
    Product.create({
      name: 'Chai Imperial Black Tea',
      price: 8.5,
      description:
        'Loved by our customers, the Chai n°25 recipes becomes a permanent reference! Inspired by the Indian tradition of spiced tea, Chai Impérial is a delicate black tea pepped up with a generous blend of green cardamom, pink peppercorns, cinnamon, ginger, and orange zest. Full of precious spices, Chai Imperial is a delicious and warm blend which can be prepared nature or with milk like in the Indian tradition.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/7/7/771-34801-v9p8uywm6p.jpg',
      status: 'available'
    }),
    Product.create({
      name: 'Japanese Superfood for Relaxation',
      price: 8.5,
      description:
        'Japanese Superfood is a delicious recipe combining the detox benefits of Sencha green tea, spirulina, and buckwheat with soothing notes of nashi pear. This perfect choice for a relaxing break can be enjoyed both hot and iced. In Japanese culture, it is important to take time for oneself, to re-centre one’s thoughts and protect oneself against the daily turmoil and stress, which are considered toxic. In Japan, purifying the body means seeking relaxation.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/4/6/462-51842-2pg6anm2im.jpg',
      status: 'sold out'
    }),
    Product.create({
      name: 'Thé des Sources',
      price: 8.5,
      description:
        'Thé des Sources is a highly refreshing blend made of Chinese green tea, bergamot and mint leaves. Perfect as a thirst-quenching drink.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/5/857-42194-crcj7y9ko9.jpg',
      status: 'available'
    }),
    Product.create({
      name: 'Théophile Green Tea',
      price: 8.5,
      description:
        'Palais des Thés celebrates Asian traditions with a deliciously exotic creation. This green tea, with fruity accents of lychee and mango spiced up with lotus flowers, can be enjoyed both hot and iced. Try it today!',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/8/887-42218-gpaci7mu1a.jpg',
      status: 'available'
    }),
    Product.create({
      name: 'Thé des Concubines',
      price: 8.5,
      description:
        'Recreate the unique, welcoming atmosphere of a Chinese tea house. This rare tea is a refined, delicate blend of green and black teas from China with rich, fruity notes of cherry, mango and vanilla. Contains rose petals and fruit pieces.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/8/6/864_1.jpg',
      status: 'available'
    }),
    Product.create({
      name: 'Pear Green Tea',
      price: 8.5,
      description:
        'Rediscover the classic fragrances of tea with our pear tea!\nA green tea from China\nWith sweet scents of pear\nAll-natural extracts\nDiscover a tea flavored with a unique fragrance taken directly from nature: pear. This tea marries the freshness of fine green teas, Mao Feng, harvested in China, with the sweet scents and caramelised nuances of pear. Sweet and delicious!\nEach box is decorated with delicate watercolour-like touches of crunchy green. Contains 3.5oz / 100g of tea. Delightful with milk chocolate!',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/7/2/723_1.jpg',
      status: 'available'
    }),
    Product.create({
      name: 'Organic Japanese Detox For Relaxation',
      price: 8.5,
      description:
        'Japanese DETOX is a delicious recipe combining the detox benefits of Sencha green tea, spirulina, and buckwheat with soothing notes of nashi pear. This perfect choice for a relaxing break can be enjoyed both hot and iced. In Japanese culture, it is important to take time for oneself, to re-centre one’s thoughts and protect oneself against the daily turmoil and stress, which are considered toxic. In Japan, purifying the body means seeking relaxation.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/4/6/462-51842-2pg6anm2im.jpg',
      status: 'available'
    }),
    Product.create({
      name: 'Matcha Imperial',
      price: 9.5,
      description:
        'Matcha Impérial is a round tea, mellow in the mouth, which develops delicious vegetal notes complemented by a particularly powerful umami flavour.\nIt is made with the greatest care using tencha leaves, a prestigious shade-grown tea: three weeks before harvest, the tea plants are deprived of most of the light, causing their leaves to develop unrivalled flavours.\nThe tencha leaves are then carefully ground in a stone mill until they have the fine texture of flour. This tea is not infused, but is whisked into water. This means the tea leaves are consumed, which explains the delicious flavour of Matcha Impérial as well as its many benefits. Matcha Impérial is a super-food with many qualities.\nRich in caffeine, with energising properties, and in theanine, which aids relaxation and concentration, one bowl of Matcha contains up to three times more catechin (a molecule with strong anti-oxidant properties) than any other green tea.',
      imageUrl:
        'https://us.palaisdesthes.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/c/2/c237_c238-45342-bc4d3dhe0e.jpg',
      status: 'available'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      memberId: '1',
      status: 'fulfilled'
    }),
    Order.create({
      memberId: '2',
      status: 'processing'
    }),
    Order.create({
      memberId: '1',
      status: 'open'
    })
  ])

  const orderItems = await Promise.all([
    OrderItem.create({
      orderId: 1,
      productId: 1,
      quantity: 3
    }),
    OrderItem.create({
      orderId: 1,
      productId: 5,
      quantity: 1
    }),
    OrderItem.create({
      orderId: 1,
      productId: 1,
      quantity: 3
    }),
    OrderItem.create({
      orderId: 2,
      productId: 7,
      quantity: 3
    }),
    OrderItem.create({
      orderId: 2,
      productId: 4,
      quantity: 1
    }),
    OrderItem.create({
      orderId: 3,
      productId: 10,
      quantity: 1
    }),
    OrderItem.create({
      orderId: 3,
      productId: 2,
      quantity: 2
    }),
    OrderItem.create({
      orderId: 3,
      productId: 9,
      quantity: 1
    }),
    OrderItem.create({
      orderId: 3,
      productId: 11,
      quantity: 2
    })
  ])

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
