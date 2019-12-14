import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HomePage from '@/components/pages/HomePage.vue'

describe('HomePage.vue', () => {
  it('displays an image with an alt tag', () => {
    const imgAlt = 'Painting of the Königsberg Castle courtyard in 1867'
    const wrapper = shallowMount(HomePage, {})
    let foundHomeImage = wrapper.find('[data-test="home-image"]').exists();
    expect(foundHomeImage).to.equal(true)
    expect(wrapper.html()).to.include(imgAlt);
  })
})
