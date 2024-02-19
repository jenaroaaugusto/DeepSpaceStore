import { createServer, Model, Response } from "miragejs"


export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "Bob" })
      server.create("user", { name: "Alice" })
    },

    routes() {
        // this.namespace = "http://api.deepspacestore.com"
        this.passthrough("https://viacep.com.br/**")
        this.urlPrefix = 'http://localhost:5173/'
        this.get('/offerts', (schema, request) => {
            let offerCode = request.queryParams.id
            return { "OFFER_CODE":offerCode,
                
                "list": [
                  {
                    "id": 1,
                    "name": "TV 32 Samsung T4300",
                    "price": 1087,
                    "image": "https://source.unsplash.com/featured/?tv"
                  },
                  {
                    "id": 2,
                    "name": "Smartphone Samsung Galaxy A32",
                    "price": 1399.00,
                    "image": "https://source.unsplash.com/featured/?smartphone"
                  },
                  {
                    "id": 3,
                    "name": "Notebook Acer Aspire 3",
                    "price": 2799.00,
                    "image": "https://source.unsplash.com/featured/?notebook"
                  }
                ]
              }
        }),   
    
        this.post('/offers/:offerId/create_order', (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            let order = {
                "id": 1,
                "offerId": attrs.offerCode,
                "cpf": attrs.cpf,
                "name": attrs.name,
                "email": attrs.email,
                "payMethod": attrs.payMethod,
                "cep": attrs.cep,
                "address":attrs.address

            }
            if(attrs.cpf.length !== 11 || attrs.cpf === '00000000000'){
                // return { success: false, message: 'Invalid CPF', status: 400, order: null }
                return new Response(400, { some: 'header' }, { errors: [ 'name cannot be blank'] });
            }

            return { success: true, order
                }
            })
        
          this.get('/all-offerts', () => {
            return { "OFFER_CODE":19022024 ,
            list: [
                {
                  "id": 1,
                  "name": "Eco-Friendly Water Bottle",
                  "price": 19.99,
                  "imageUrl": "https://example.com/images/products/water-bottle.jpg",
                  "description": "Stay hydrated in style with this reusable water bottle made from sustainable materials. Features a leak-proof design and easy-to-carry handle."
                },
                {
                  "id": 2,
                  "name": "Wireless Noise-Cancelling Headphones",
                  "price": 149.99,
                  "imageUrl": "https://example.com/images/products/headphones.jpg",
                  "description": "Immerse yourself in your music without distraction with these noise-cancelling headphones. Bluetooth connectivity provides wireless freedom, and long battery life keeps you going."
                },
                {
                  "id": 3,
                  "name": "Smartwatch with Fitness Tracker",
                  "price": 99.99,
                  "imageUrl": "https://example.com/images/products/smartwatch.jpg",
                  "description": "Track your activity and stay connected with this stylish smartwatch. Features a heart rate monitor, step counter, and notifications from your phone."
                },
                {
                  "id": 4,
                  "name": "Organic Cotton T-Shirt",
                  "price": 24.99,
                  "imageUrl": "https://example.com/images/products/t-shirt.jpg",
                  "description": "Feel good and look good in this comfortable and eco-friendly t-shirt made from organic cotton."
                },
                {
                  "id": 5,
                  "name": "Portable Charger",
                  "price": 29.99,
                  "imageUrl": "https://example.com/images/products/charger.jpg",
                  "description": "Never run out of power again with this portable charger. Compact and lightweight, it's perfect for keeping your devices charged on the go."
                },
                {
                  "id": 6,
                  "name": "Travel Coffee Mug",
                  "price": 14.99,
                  "imageUrl": "https://example.com/images/products/mug.jpg",
                  "description": "Enjoy your coffee on the go with this insulated travel mug. Keeps your drinks hot or cold for hours, and leak-proof lid prevents spills."
                },
                {
                  "id": 7,
                  "name": "Wireless Charging Pad",
                  "price": 39.99,
                  "imageUrl": "https://example.com/images/products/charging-pad.jpg",
                  "description": "Charge your phone wirelessly with this convenient charging pad. Simply place your phone on the pad and enjoy the power-up."
                },
                {
                  "id": 8,
                  "name": "Portable Bluetooth Speaker",
                  "price": 49.99,
                  "imageUrl": "https://example.com/images/products/speaker.jpg",
                  "description": "Fill any space with rich sound with this portable Bluetooth speaker. Enjoy music, podcasts, and more with powerful sound and long battery life."
                },
                {
                  "id": 9,
                  "name": "Reusable Grocery Bags",
                  "price": 12.99,
                  "imageUrl": "https://example.com/images/products/bags.jpg",
                  "description": "Reduce your plastic waste with these reusable grocery bags. Strong and durable, they're perfect for carrying your groceries home."
                },
                {
                  "id": 10,
                  "name": "Air Purifier for Home",
                  "price": 79.99,
                  "imageUrl": "https://example.com/images/products/air-purifier.jpg",
                  "description": "Breathe clean air at home with this air purifier. Removes dust, allergens, and other pollutants from the air for a healthier environment."
                },
                {
                  "id": 11,
                  "name": "Stainless Steel Water Bottle",
                  "price": 29.99,
                  "imageUrl": "https://example.com/images/products/water-bottle.jpg",
                  "description": "This stainless steel water bottle is insulated to keep your drinks hot or cold for hours. Leak-proof design and stylish look"
              
                },
                {
                  "id": 12,
                  "name": "TV 32 Samsung T4300",
                  "price": 1087,
                  "image": "https://source.unsplash.com/featured/?tv"
                },
                {
                  "id": 13,
                  "name": "Smartphone Samsung Galaxy A32",
                  "price": 1399.00,
                  "image": "https://source.unsplash.com/featured/?smartphone"
                },
                {
                  "id": 14,
                  "name": "Notebook Acer Aspire 3",
                  "price": 2799.00,
                  "image": "https://source.unsplash.com/featured/?notebook"
                }
              ]
            }
        })
      },
  })

  return server
}
