/* jshint esversion: 8 
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const  cors = require('cors');
const app = express();
const port = 3050;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

const inventory_data = JSON.parse(fs.readFileSync("/data/car_records.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'});

const Inventory = require('./inventory');

try {
    Inventory.deleteMany({}).then(()=>{
        Inventory.insertMany(inventory_data.cars);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }

  // Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API karen");
});
  
app.get('/cars/:dealer_id', async (req, res) => {
    try {
      const documents = await Inventory.find({dealer_id: req.params.dealer_id});
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching documents' });
    }
  });


  app.get('/carsbymake/:dealer_id/:make', async (req, res) => {
  
    const id = req.params.dealer_id;
    const makeP = req.params.make;
    const documents = await Inventory.find({dealer_id: id });
    let jsonVar = [];
    
    for (var i = 0; i < documents.length; i++) 
    {
        if (documents[i].make == makeP)
           { 
            let nuevaData =
                {
                "model" : documents[i].model,
                "dealer_id" : documents[i].dealer_id,
                "make" : documents[i].make,
                "bodyType" : documents[i].bodyType,
                "year" : documents[i].year,
                "mileage" : documents[i].mileage,
                "price" : documents[i].price,
                };
                jsonVar.push(nuevaData) ; 
            }    
    }    
    res.json(jsonVar);
  });

  app.get('/carsbymodel/:dealer_id/:model', async (req, res) => {
  
    const id = req.params.dealer_id;
    const modelP = req.params.model;
    const documents = await Inventory.find({dealer_id: id });
    let jsonVar = [];
    
    for (var i = 0; i < documents.length; i++) 
    {
        if (documents[i].model == modelP)
           { 
            let nuevaData =
                {
                "model" : documents[i].model,
                "dealer_id" : documents[i].dealer_id,
                "make" : documents[i].make,
                "bodyType" : documents[i].bodyType,
                "year" : documents[i].year,
                "mileage" : documents[i].mileage,
                "price" : documents[i].price,
                };
                jsonVar.push(nuevaData) ; 
            }    
    }    
    res.json(jsonVar);
  });

  app.get('/carsbymaxmileage/:dealer_id/:mileage', async (req, res) => {
  
    const id = req.params.dealer_id;
    const mileagep = req.params.mileage;
    const documents = await Inventory.find({dealer_id: id });
    let jsonVar = [];
    
    for (var i = 0; i < documents.length; i++) 
    {
        if (documents[i].mileage == mileagep)
           { 
            let nuevaData =
                {
                "model" : documents[i].model,
                "dealer_id" : documents[i].dealer_id,
                "make" : documents[i].make,
                "bodyType" : documents[i].bodyType,
                "year" : documents[i].year,
                "mileage" : documents[i].mileage,
                "price" : documents[i].price,
                };
                jsonVar.push(nuevaData) ; 
            }    
    }    
    res.json(jsonVar);
  });

  app.get('/carsbyprice/:dealer_id/:price', async (req, res) => {
  
    const id = req.params.dealer_id;
    const pricep = req.params.price;
    const documents = await Inventory.find({dealer_id: id });
    let jsonVar = [];
    
    for (var i = 0; i < documents.length; i++) 
    {
        if (documents[i].price == pricep)
           { 
            let nuevaData =
                {
                "model" : documents[i].model,
                "dealer_id" : documents[i].dealer_id,
                "make" : documents[i].make,
                "bodyType" : documents[i].bodyType,
                "year" : documents[i].year,
                "mileage" : documents[i].mileage,
                "price" : documents[i].price,
                };
                jsonVar.push(nuevaData) ; 
            }    
    }    
    res.json(jsonVar);
  });

  app.get('/carsbyyear/:dealer_id/:year', async (req, res) => {
  
    const id = req.params.dealer_id;
    const yearp = req.params.year;
    const documents = await Inventory.find({dealer_id: id });
    let jsonVar = [];
    
    for (var i = 0; i < documents.length; i++) 
    {
        if (documents[i].year == yearp)
           { 
            let nuevaData =
                {
                "model" : documents[i].model,
                "dealer_id" : documents[i].dealer_id,
                "make" : documents[i].make,
                "bodyType" : documents[i].bodyType,
                "year" : documents[i].year,
                "mileage" : documents[i].mileage,
                "price" : documents[i].price,
                };
                jsonVar.push(nuevaData) ; 
            }    
    }    
    res.json(jsonVar);
  });



  // Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  */

 
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3050;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

const carsData = JSON.parse(fs.readFileSync('car_records.json', 'utf8'));

mongoose.connect('mongodb://mongo_db:27017/', { dbName: 'dealershipsDB' });


const Cars = require('./inventory');

try {

  Cars.deleteMany({}).then(() => {
    Cars.insertMany(carsData.cars);
  });
} catch (error) {
  console.error(error);
  // Handle errors properly here
}

app.get('/', async (req, res) => {
  res.send('Welcome to the Mongoose API');
});



app.get('/cars/:id', async (req, res) => {
  try {
    const documents = await Cars.find({dealer_id: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

app.get('/carsbymake/:id/:make', async (req, res) => {
  try {
    const documents = await Cars.find({dealer_id: req.params.id, make: req.params.make});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews by car make and model' });
  }
});

app.get('/carsbymodel/:id/:model', async (req, res) => {
  try {
    const documents = await Cars.find({ dealer_id: req.params.id, model: req.params.model });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers by ID' });
  }
});

app.get('/carsbymaxmileage/:id/:mileage', async (req, res) => {
  try {
    let mileage = parseInt(req.params.mileage)
    let condition = {}
    if(mileage === 50000) {
      condition = { $lte : mileage}
    } else if (mileage === 100000){
      condition = { $lte : mileage, $gt : 50000}
    } else if (mileage === 150000){
      condition = { $lte : mileage, $gt : 100000}
    } else if (mileage === 200000){
      condition = { $lte : mileage, $gt : 150000}
    } else {
      condition = { $gt : 200000}
    }
    const documents = await Cars.find({ dealer_id: req.params.id, mileage : condition });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers by ID' });
  }
});


app.get('/carsbyprice/:id/:price', async (req, res) => {
    try {
        let price = parseInt(req.params.price)
        let condition = {}
        if(price === 20000) {
          condition = { $lte : price}
        } else if (price=== 40000){
          console.log("\n \n \n "+ price)  
          condition = { $lte : price, $gt : 20000}
        } else if (price === 60000){
          condition = { $lte : price, $gt : 40000}
        } else if (price === 80000){
          condition = { $lte : price, $gt : 60000}
        } else {
          condition = { $gt : 80000}
        }
        const documents = await Cars.find({ dealer_id: req.params.id, price : condition });
        res.json(documents);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching dealers by ID' });
      }
});



app.get('/carsbyyear/:id/:year', async (req, res) => {
  try {
    const documents = await Cars.find({ dealer_id: req.params.id, year : { $gte :req.params.year }});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers by ID' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
   