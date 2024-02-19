import { shallowMount } from '@vue/test-utils';
import Payment from './Payment.vue';

describe('Payment.vue', () => {
  it('should fetch and set address details correctly', async () => {
    const mockResponse = {
      logradouro: '123 Main St',
      bairro: 'Example Neighborhood',
      localidade: 'Example City',
      uf: 'EX',
    };

    // Mock the fetch function to return the mockResponse
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const wrapper = shallowMount(Payment);

    // Call the getZipCode function with a mock CEP
    await wrapper.vm.getZipCode('12345-678');

    // Assert that the address details are set correctly
    expect(wrapper.vm.disabledNotCEP).toBe(false);
    expect(wrapper.vm.address).toBe(mockResponse.logradouro);
    expect(wrapper.vm.Neighborhoods).toBe(mockResponse.bairro);
    expect(wrapper.vm.City).toBe(`${mockResponse.localidade} - ${mockResponse.uf}`);
  });

  it('should handle fetch error correctly', async () => {
    // Mock the fetch function to throw an error
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.reject(new Error('Network error'))
    );

    const wrapper = shallowMount(Payment);

    // Call the getZipCode function with a mock CEP
    await expect(wrapper.vm.getZipCode('12345-678')).rejects.toThrow('Network error');
  });
});