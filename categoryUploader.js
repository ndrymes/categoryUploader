const upload = require("./libs/imageUpload");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const express = require("express");
const Category = require("./model/categories");
const app = express();
const xlsx = require("xlsx");

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

function GetCategoryId() {
    const prefix = "CAT";
    let suffix = uuidv4().toString().toUpperCase().substring(0, 8);

    return prefix.concat(suffix);
}
const func = async (req, res) => {
    // const newfolder = req.files.map(file => {
    //     return { name: file.originalname, url: file.location };
    //   });
    //   console.log(newfolder);
    //   const newfolder = [ { name: 'Tobacco.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592326668348' },
    // { name: 'Cigarette.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592326668352' },
    // { name: 'Cigar.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592326668406' },
    // { name: 'Tobacco-Related Products.png',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592326668417' } ]

    // const newfolder =
    //   [{ name: 'PET SUPPLIES.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592325813190' },
    //     { name: ' Fish Food.jpg',
    //       url:
    //            'https://rekognition-vision-images.s3.amazonaws.com/1592325281006' },
    //     { name: 'Food Cat & Dogs.png',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281008' },
    //     { name: 'Cat & Dogs.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281064' },
    //     { name: 'Litter & Housebreaking.png',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281069' },
    //     { name: 'Aquariums & Fish Bowls.png',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281069' },
    //     { name: 'Collars & Harnesses & Leashes.png',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281076' },
    //     { name: 'Aquarium Pumps & Filters.png',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281079' },
    //     { name: 'Bird Food.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281079' },
    //     { name: 'Birds.png',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281085' },
    //     { name: 'Fish & Aquatic Pets.png',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281090' },
    //     { name: 'Toys.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281093' },
    //     { name: 'Grooming.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281096' },
    //     { name: 'Bed & Furnitures.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281098' },
    //     { name: 'Flea & Tick Control.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281100' },
    //     { name: 'Health & Supplies.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281101' },
    //     { name: 'Carriers & Strollers.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281107' },
    //     { name: 'Automatic Feeders.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281110' },
    //     { name: 'Cages & Accessories.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281117' },
    //     { name: 'Aquarium Water Treatments.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281123' },
    //     { name: 'Aquarium Decor.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281129' },
    //     { name: 'Aquarium Cleaners.jpg',
    //       url:
    //        'https://rekognition-vision-images.s3.amazonaws.com/1592325281132' } ]
    //   const newfolder = [ { name: 'Sports & Fitness.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592319948357' },
    // { name: 'Sports.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592319948371' },
    // { name: 'Fitness.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592319948501' } ]

    //  const newfolder = [ { name: 'ELECTRONICS.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657713' },
    //   { name: 'Televisions & Video.jpg',
    //     url:
    //         'https://rekognition-vision-images.s3.amazonaws.com/1592318657720' },
    //   { name: 'Wearable Technology.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657769' },
    //   { name: 'Security & Surveillance.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657770' },
    //   { name: 'Portable Audio & Video.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657780' },
    //   { name: 'Power Supply.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657781' },
    //   { name: 'image.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657787' },
    //   { name: 'Musical Instruments.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657793' },
    //   { name: 'Office Electronic Equipment.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657811' },
    //   { name: 'GPS & Navigation.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657820' },
    //   { name: 'Headphones.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657820' },
    //   { name: 'Audio.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657913' },
    //   { name: 'Cameras.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657941' },
    //   { name: 'Accessories & Supplies.jpg',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657942' },
    //   { name: 'Radios & Transceivers.png',
    //     url:
    //      'https://rekognition-vision-images.s3.amazonaws.com/1592318657946' } ]
    //   const newfolder = [ { name: 'Aquarium Pumps & Filters.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758024' },
    // { name: 'Cages & Accessories.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758026' },
    // { name: 'Aquarium Decor.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758292' },
    // { name: 'unnamed.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758308' },
    // { name: 'Aquariums & Fish Bowls.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758372' },
    // { name: 'Automatic Feeders.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758387' },
    // { name: 'Bird Food.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758398' },
    // { name: 'Dog bed.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758405' },
    // { name: 'Cat Bed.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758431' },
    // { name: 'Collars & Harnesses & Leashes.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758477' },
    // { name: 'Carriers & Strollers.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758512' },
    // { name: 'Flea & Tick Control.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592308758516' } ]
    //   const newfolder = [ { name: 'Phones & Tablets.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301579988' },
    // { name: 'Tablets.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301579989' },
    // { name: 'Mobile Phones.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301579993' },
    // { name: 'Cell Phones.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301579998' },
    // { name: 'Accessories.png',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301580001' } ]

    //   const newfolder = [ { name: 'HOME & OFFICE.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301488915' },
    // { name: 'Tools & Home Improvement.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301489000' },
    // { name: 'Household Supplies.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301489001' },
    // { name: 'Office Products.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301489004' },
    // { name: 'Home & Kitchen.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301489009' },
    // { name: 'Arts, Crafts & Sewing.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301489010' },
    // { name: 'Home & Furniture.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301489017' },
    // { name: 'Appliances.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301489024' } ]

    //   const newfolder = [ { name: 'GROCERY.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239424' },
    // { name: 'Toiletries.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239425' },
    // { name: 'Salad Dressings.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239429' },
    // { name: 'Paper & Plastic.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239433' },
    // { name: 'House Supplies.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239436' },
    // { name: 'House Cleaning.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239436' },
    // { name: 'Fresh Food.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239446' },
    // { name: 'Food Cupboard.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239451' },
    // { name: 'Dried Beans, Grains & Rice.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239455' },
    // { name: 'Dishwashing.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239460' },
    // { name: 'Deli.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239465' },
    // { name: 'Dairy, Cheese & Eggs.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239466' },
    // { name: 'Condiments.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239473' },
    // { name: 'Candy & Chocolate.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239476' },
    // { name: 'Canned, Jarred & Packaged Foods.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239476' },
    // { name: 'Breakfast Food.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239483' },
    // { name: 'Beverages.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239487' },
    // { name: 'Bakery.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239491' },
    // { name: 'Lighters & Matches.png',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239493' },
    // { name: 'Laundry.png',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239494' },
    // { name: 'Herbs, Spices & Seasonings.png',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239500' },
    // { name: 'Air Freshener.png',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239505' },
    // { name: 'Food & Beverage Gifts.png',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239511' },
    // { name: 'Cooking & Baking.png',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301239517' } ]

    //   const newfolder = [ { name: 'GAMES & CONSOLES.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301148923' },
    // { name: 'Sony PSP.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301148931' },
    // { name: 'Digital Games.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301148940' },
    // { name: 'Other Gaming Systems.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301148944' },
    // { name: 'PC Gaming.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301148957' },
    // { name: 'Accessories.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301148961' },
    // { name: 'Consoles.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301148965' } ]

    //   const newfolder = [ { name: 'COMMERCIAL EQUIPMENT & TOOLS.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301066716' },
    // { name: 'Garden & Outdoors.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301066755' },
    // { name: 'Industrial & Scientific.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301066857' },
    // { name: 'Power Supply.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301066864' },
    // { name: 'Automobile.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592301066871' } ]

    //   const newfolder = [ { name: 'Computers & Accessories.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937241' },
    // { name: 'Monitors.JPG',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937257' },
    // { name: 'Servers.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937433' },
    // { name: 'Printers.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937447' },
    // { name: 'Scanners.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937458' },
    // { name: 'External Components.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937459' },
    // { name: 'Laptop Accessories.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937465' },
    // { name: 'Networking Products.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937465' },
    // { name: 'Computer Components.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937482' },
    // { name: 'Data Storage.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937485' },
    // { name: 'Computers & Tablets.png',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1592299937493' } ]

    //   const newfolder = [ { name: 'Drinks.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171377' },
    // { name: 'Non-Alcoholic.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171449' },
    // { name: 'Syrups & Cordials.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171449' },
    // { name: 'Water.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171677' },
    // { name: 'Milk.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171677' },
    // { name: 'Non-Alcoholic Beers.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171693' },
    // { name: 'Coffee, Tea & Cocoa.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171709' },
    // { name: 'Juices & Other Non Carbonated Drinks.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171715' },
    // { name: 'Malt Drinks.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171719' },
    // { name: 'Bitter and Ale.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171728' },
    // { name: 'Carbonated Drinks.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171731' },
    // { name: 'Alcoholic.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171734' },
    // { name: 'Beverages.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1591786171738' } ]

    //   const newfolder = [ { name: 'Baby Products.jpeg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454383' },
    // { name: 'Safety.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454384' },
    // { name: 'Strollers & Accessories.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454462' },
    // { name: 'Health & Baby Care.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454469' },
    // { name: 'Nursery.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454472' },
    // { name: 'Potty Training.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454476' },
    // { name: 'Gear.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454477' },
    // { name: 'Gifts.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454482' },
    // { name: 'Diapering.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454485' },
    // { name: 'Feeding.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454493' },
    // { name: 'Bathing & Skin Care.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454493' },
    // { name: 'Car Seats & Accessories.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454498' },
    // { name: 'Baby & Toddler Toys.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454505' },
    // { name: 'Baby Stationery.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454508' },
    // { name: 'Apparel & Accessories.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590069454513' } ]

    const newfolder = [
        { name: "Health & Beauty.jpg", url: "https://rekognition-vision-images.s3.amazonaws.com/1589989293939" },
        { name: "Beauty & Personal Care.jpg", url: "https://rekognition-vision-images.s3.amazonaws.com/1589989293949" },
        {
            name: "Vitamins & Dietary Supplements.jpg",
            url: "https://rekognition-vision-images.s3.amazonaws.com/1589989293993",
        },
        { name: "Vision Care.jpg", url: "https://rekognition-vision-images.s3.amazonaws.com/1589989293997" },
        {
            name: "Vitamins & Dietary Supplements (2).jpg",
            url: "https://rekognition-vision-images.s3.amazonaws.com/1589989294000",
        },
        { name: "Sports.jpg", url: "https://rekognition-vision-images.s3.amazonaws.com/1589989294001" },
        { name: "Sports Nutrition.jpg", url: "https://rekognition-vision-images.s3.amazonaws.com/1589989294008" },
        { name: "Sexual Wellness.jpg", url: "https://rekognition-vision-images.s3.amazonaws.com/1589989294009" },
        { name: "Health Care.jpg", url: "https://rekognition-vision-images.s3.amazonaws.com/1589989294018" },
        {
            name: "Medical Supplies & Equipment.jpg",
            url: "https://rekognition-vision-images.s3.amazonaws.com/1589989294022",
        },
        { name: "Baby & Child Care.jpg", url: "https://rekognition-vision-images.s3.amazonaws.com/1589989294026" },
    ];

    //   const newfolder = [ { name: 'Books, Movies and Music.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344836' },
    // { name: 'Stationery.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344844' },
    // { name: 'Science & Technology.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344921' },
    // { name: 'Motivational & Self-Help.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344926' },
    // { name: 'Religion.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344929' },
    // { name: 'Journals & Planners.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344933' },
    // { name: 'Magazines.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344937' },
    // { name: 'Entertainment.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344943' },
    // { name: 'Family & Lifestyle.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344946' },
    // { name: 'Fiction.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344949' },
    // { name: 'DVDs.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344952' },
    // { name: 'Education & Learning.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344956' },
    // { name: 'Bestselling Books.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344958' },
    // { name: 'Biography & Autobiography.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344961' },
    // { name: 'Business & Finance.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344962' },
    // { name: 'Art & Humanities.jpg',
    //   url:
    //    'https://rekognition-vision-images.s3.amazonaws.com/1590151344967' } ]

    const workbook = xlsx.readFile("Health & Beauty category Sheet To Tech 29th June 2020.xlsx");
    const sheet_name_list = workbook.SheetNames;

    // console.log(sheet_name_list);

    const ws = workbook.Sheets[sheet_name_list[0]];
    // console.log(ws);

    const data = xlsx.utils.sheet_to_json(ws);

    //console.log(data);
    let ids = {};
    let dups = [];

    data.forEach((val) => {
        if (ids[val.child]) {
            // we have already found this same id
            dups.push({ child: val.child, parent: val.parent, third: val.third });
        } else {
            ids[val.child] = true;
        }
    });
    const value = JSON.stringify(dups);

    console.log(value);

    for (const category of data) {
        //console.log('this my cat',category);

        if (category.image === "NULL") {
            category.image = null;
        }
        if (category.Alias === "NULL") {
            category.Alias = null;
        }
        if (category.parentId === "NULL") {
            category.parentId = null;
        }
        let firstimage = null;
        let secondimage = null;
        for (const image of newfolder) {
            //console.log(image);
            let splitedImage = image.name.split(".")[0];
            splitedImage = splitedImage.toLowerCase().trim();
            //console.log(splitedImage);
            const cat = category.child.toLowerCase().trim();
            const subcat = category.parent.toLowerCase().trim();
            //console.log('myguy', splitedImage == cat);

            if (splitedImage == cat) {
                //console.log('got here ooo');

                firstimage = image.url;
            }
            if (splitedImage == subcat) {
                //console.log('got here too');

                secondimage = image.url;
            }
        }
        const catId = GetCategoryId();
        let Alias = null;
        if (category.third) {
            Alias = category.third.toLowerCase().trim();
        }
        const B = {
            categoryName: category.parent,
            categoryId: catId,
            image: secondimage,
            parentId: GetCategoryId(),
            status: "ACTIVE",
            Alias: null,
        };
        //console.log(B);

        const A = {
            categoryName: category.child,
            categoryId: GetCategoryId(),
            image: firstimage,
            parentId: catId,
            status: "ACTIVE",
            Alias,
        };
        console.log("this is A", A);
        console.log("this is B", B);

        const Bexist = await Category.findOne({
            where: { categoryName: B.categoryName },
        });
        const Aexist = await Category.findOne({
            where: { categoryName: A.categoryName },
        });
        //console.log('this is bexist',Bexist);

        if (Bexist) {
            A.parentId = Bexist.dataValues.categoryId;
            if (Aexist) {
                continue;
            }
            await Category.create(A);
        } else if (B.categoryName === "null") {
            A.parentId = null;
            if (Aexist) {
                continue;
            }
            await Category.create(A);
        } else {
            if (!Aexist || Bexist) {
                await Category.create(A);
            }
            if (Aexist || !Bexist) {
                await Category.create(B);
            }
            if (!exist || !Bexist) {
                await Category.create(B);
                await Category.create(A);
            }
            continue;
        }
        console.log("This is the second category Name", B.categoryName);
    }
};
func();
app.listen(4000, () => {
    console.log("app is listening 4000");
});
