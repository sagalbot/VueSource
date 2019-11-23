// import docs from '@dynamic/api.js';
import ApiProps from './components/ApiProps';
import ApiEvents from './components/ApiEvents';
import ApiSlots from './components/ApiSlots';

export default ({Vue, options, router, siteData}) => {
  Vue.component('api-props', ApiProps);
  Vue.component('api-slots', ApiSlots);
  Vue.component('api-events', ApiEvents);
}
