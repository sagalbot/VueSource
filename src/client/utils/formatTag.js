/**
 * @param tag
 * @return {String}
 */
export default function (tag) {
  let rendered = `@${tag.title}`;

  if (tag.hasOwnProperty('type')) {
    if (tag.type.name === 'union') {
      rendered += ` {${tag.type.elements.map(({name}) => name).join('|')}}`;
    } else {
      rendered += ' {' + tag.type.name + '}';
    }

  }
  if (tag.hasOwnProperty('name')) {
    rendered += ` ${tag.name}`;
  }
  if (tag.hasOwnProperty('description')) {
    rendered += ` ${tag.description}`;
  }

  return rendered;
};
