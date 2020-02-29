// import docs from '@dynamic/api.js';
import ApiProps from '../client/components/ApiProps';
import ApiEvents from '../client/components/ApiEvents';
import ApiSlots from '../client/components/ApiSlots';

export default ({Vue, options, router, siteData}) => {
  Vue.component('ApiProps', ApiProps);
  Vue.component('ApiSlots', ApiSlots);
  Vue.component('ApiEvents', ApiEvents);
}
