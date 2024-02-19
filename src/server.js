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
            console.log(attrs)
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
        },
  })

  return server
}

// http.get('/offerts',({request}  ) => {

//     const url = new URL(request.url)
//     const OFFER_CODE = url.searchParams.get('id')

//     return HttpResponse.json(
//         {
//         "OFFER_CODE":OFFER_CODE,
//         "list": [
//           {
//             "id": 1,
//             "name": "TV 32 Samsung T4300",
//             "price": 1087,
//             "image": "https://source.unsplash.com/featured/?tv"
//           },
//           {
//             "id": 2,
//             "name": "Smartphone Samsung Galaxy A32",
//             "price": 1399.00,
//             "image": "https://source.unsplash.com/featured/?smartphone"
//           },
//           {
//             "id": 3,
//             "name": "Notebook Acer Aspire 3",
//             "price": 2799.00,
//             "image": "https://source.unsplash.com/featured/?notebook"
//           }
//         ]
//       }
//       )}),

// http.post('/offers/:offerId/create_order',  async({ request, params }, req) => {
//     // Extrai o ID da oferta da URL
//     const offerId = params.offerId;
//     const clonedRequest = request.clone();
//     const formData = await clonedRequest.formData();
//     console.log(formData)

//     // Valida se o ID da oferta é um número
//     if (!/^\d+$/.test(offerId)) {
//       return new HttpResponse(null, {
//         status: 404,
//         statusText: 'Offer not found',
//       })
//     } 

//     // const cpf = params.cpf;
//     // console.log(cpf)
//     // console.log(params)
//     // if(!/^0{11}$/.test(cpf)){
//     //   return new HttpResponse(null, {
//     //     status: 400,
//     //     statusText: 'Invalid CPF',
//     //   })
//     // }


    
//     // Retorna uma resposta mockada
//     return HttpResponse.json({ success: true , 
//       message: 'Order created successfully',
//       order: {
//         id: 1,
//         offerId,
//         cpf: params.cpf,
//         name: params.name,
//         email: params.email,
//         payMethod: params.payMethod}});
//   }),