<template>
  <div>
    <h1>Vue Select Events</h1>

    <div class="search-box">
      <input id="props-search" type="search" v-model="query" placeholder="Search for events...">
    </div>

    <ul>
      <li v-for="event in filtered">
        <h2 :id="event.name">
          <a :href="`#${event.name}`" aria-hidden="true" class="header-anchor">#</a>
          {{ event.name }}
          <template v-if="event.since && event.since.hasOwnProperty('version')">
            <a :href="event.since.link">
              <Badge :text="`+${event.since.version}`" />
            </a>
          </template>
        </h2>
        <div v-html="markdown(event.description)"></div>
        <ul v-if="event.see">
          <li v-for="see in event.see"><a :href="see">{{ see }}</a></li>
        </ul>
        <pre><code v-html="event.rendered"></code></pre>
        <Content :slot-key="event.name"></Content>
      </li>
    </ul>
  </div>
</template>

<script>
import documentation from '@dynamic/api'
import formatTag from '../utils/formatTag';
import getSince from '../utils/getSince';
import getSee from '../utils/getSee';
import markdown from '../utils/markdown';
import highlight from '../utils/highlight';

export default {
  name: "ApiEvents",
  data () {
    return {
      query: ''
    }
  },
  methods: {
    highlight,
    markdown,
    getRenderedEvent (event) {
      let rendered = '';
      event.tags = event.tags || [];
      event.properties = event.properties || [];

      if (event.tags.length) {
        rendered += '/* \n';
        event.tags.forEach(tag => rendered += ` * ${formatTag(tag)} \n`);
        rendered += ' */ \n';
      }

      rendered += `$emit('${event.name}'`;

      if (event.properties.length) {
        rendered += ', ';
        rendered += event.properties.map(({name}) => name).join(', ');
      }

      rendered += ');';

      return this.highlight(rendered);
    },
  },
  computed: {
    filtered () {
      return this.events.filter(
        event => this.query.length ? event.name.includes(this.query) : true);
    },
    events () {
      return documentation.events.map(event => ({
        ...event,
        rendered: this.getRenderedEvent(event),
        since: getSince(event.tags || []),
        see: getSee(event.tags || []),
      })).sort((a, b) => a.name > b.name);
    },
  },
}
</script>

<style scoped src="../assets/listing.css"></style>
