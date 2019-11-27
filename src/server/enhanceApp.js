// import docs from '@dynamic/api.js';
import ApiProps from '../client/components/ApiProps';
import ApiEvents from '../client/components/ApiEvents';
import ApiSlots from '../client/components/ApiSlots';

export default ({Vue, options, router, siteData}) => {
  Vue.component('api-props', ApiProps);
  Vue.component('api-slots', ApiSlots);
  Vue.component('api-events', ApiEvents);
}
