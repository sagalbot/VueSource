const generator = require('./node/generator');

module.exports = async function (page, src) {
  const section = ['props', 'events', 'slots', 'methods'].find(
    section => page.frontmatter['api'] === section,
  );

  if (section) {
    const docs = await generator(src);

    if (typeof docs[section] === 'undefined') {
      return;
    }

    if (typeof page.title === 'undefined') {
      page.title = section.charAt(0).toUpperCase() + section.slice(1);
    }

    if (!page.hasOwnProperty('headers')) {
      page.headers = [];
    }

    const headers = docs[section].map(({name}) => ({
      level: 2,
      slug: name,
      title: name,
    })).sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    page.headers.push(...headers);
  }
};
