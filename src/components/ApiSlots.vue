<template>
  <div>
    <ul>
      <li v-for="slot in slots">
        <h2 :id="slot.name">
          <a :href="`#${slot.name}`" aria-hidden="true" class="header-anchor">#</a>
          {{ slot.name }}
        </h2>
        <ul v-if="slot.bindings">
          <li>
            <h4>Bindings</h4>
          </li>
          <li v-for="(key, value) in slot.bindings">
            <code>{{value}}: {{key}}</code>
          </li>
        </ul>
        <pre><code v-html="slot.rendered"></code></pre>
        <Content :slot-key="slot.name"></Content>
      </li>
    </ul>
  </div>
</template>

<script>
import docs from "@dynamic/api";
import markdown from "../utils/markdown";
import highlight from "../utils/highlight";

export default {
  name: "ApiSlots",
  methods: {
    markdown
  },
  computed: {
    slots() {
      return docs.slots
        .map(slot => ({
          ...slot,
          rendered: highlight(slot.content, "html"),
        }))
        .sort((a, b) => a.name > b.name);
    }
  }
};
</script>

<style scoped src="../assets/listing.css"></style>
