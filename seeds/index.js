const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/camp');
}

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const Price = Math.floor(Math.random() * 25) + 15
        const camp = new Campground({
                author: '61ffeb6e15fbdb7d7485cc4b',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                geometry: {
                    type: 'Point',
                    coordinates: [cities[random1000].longitude, cities[random1000].latitude]
                },


                price: Price,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam itaque error laboriosam, voluptas praesentium hic velit eveniet corrupti obcaecati, tempore repellendus facere nam expedita odio asperiores perferendis debitis iste rerum.',
                images: [{
                        url: 'https://res.cloudinary.com/dmrezzzih/image/upload/v1644317074/YelpCamp/uhc7rh6tsmbn4njks6fm.jpg',
                        filename: 'YelpCamp/uhc7rh6tsmbn4njks6fm',

                    },
                    {
                        url: 'https://res.cloudinary.com/dmrezzzih/image/upload/v1644317084/YelpCamp/elzxftdp24tduddrt9mx.jpg',
                        filename: 'YelpCamp/elzxftdp24tduddrt9mx',

                    }
                ]
            })
            // console.log(camp)
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})