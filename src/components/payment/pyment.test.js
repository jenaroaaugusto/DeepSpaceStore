
import { expect, test, describe,it } from "vitest";

import Payment from './Payment.vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'

describe("The paymanet", () => {
    const store = createStore   
    ({
        state() {
            return {
                cart: [],
                productList:  [
                    {
                        id: 1,
                        name: 'TV 32 Samsung T4300',
                        price: 1087,
                        image: "tvImage"
                    },
                    {
                        id: 2,
                        name: 'Smartphone Samsung Galaxy A32',
                        price: 1399.00,
                        image: "smartphoneImage"
                    },
                    {
                        id: 3,
                        name: 'Notebook Acer Aspire 3',
                        price: 2799.00,
                        image: "notebookImage"
                    }
                ],
            }
        },
        getters: {
            getOfferCode: () => "144554"
        }
    })
    it("renders a payment form", () => {
  
        const wrapper = mount(Payment, {
            global: {
                plugins: [store]
            }
        })

        expect(wrapper.html()).toContain("v-expansion-panel")
        // expect(wrapper.html()).toContain("v-text-field")
    }
    )

});