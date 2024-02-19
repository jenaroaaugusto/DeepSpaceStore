import { http, HttpResponse } from 'msw'
// import { rest } from 'msw';
 
export const handlers = [
  http.get('/offerts',({request}  ) => {

    const url = new URL(request.url)
    const OFFER_CODE = url.searchParams.get('id')

    return HttpResponse.json({
        "OFFER_CODE":OFFER_CODE,
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
      })}),
      
    http.post('/offers/:offerId/create_order',  async({ request, params }) => {
      // Extrai o ID da oferta da URL
      const offerId = params.offerId;
      const clonedRequest = request.clone();
      const formData = await clonedRequest.formData();
      console.log(formData)

      // Valida se o ID da oferta é um número
      if (!/^\d+$/.test(offerId)) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'Offer not found',
        })
      } 

      // const cpf = params.cpf;
      // console.log(cpf)
      // console.log(params)
      // if(!/^0{11}$/.test(cpf)){
      //   return new HttpResponse(null, {
      //     status: 400,
      //     statusText: 'Invalid CPF',
      //   })
      // }


      
      // Retorna uma resposta mockada
      return HttpResponse.json({ success: true , 
        message: 'Order created successfully',
        order: {
          id: 1,
          offerId,
          cpf: params.cpf,
          name: params.name,
          email: params.email,
          payMethod: params.payMethod}});
    }),
]



export default handlers;