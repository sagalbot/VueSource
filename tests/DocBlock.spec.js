import Comment from '../src/node/Comment';
import { parse } from '@babel/parser';

describe('CommentBlock', () => {

  const parsed = parse(`
    /*
     * Here's a thing that does a different thing.
     * @param {Object} name
     * @return {String}
     */
     function hello(name) {
        return 'world';
      }
  `);

  const CommentBlock = parsed.comments[0];

  it('accepts a comment object', () => {
    const {comment} = new Comment(CommentBlock);
    expect(comment).toBe(CommentBlock);
  });

  it('it has getters for CommentBlock properties', () => {
    const docblock = new Comment(CommentBlock);
    expect(docblock.type).toBe(CommentBlock.type);
    expect(docblock.value).toBe(CommentBlock.value);
    expect(docblock.start).toBe(CommentBlock.start);
    expect(docblock.end).toBe(CommentBlock.end);
  });

  it('can parse the comment and return the tags', () => {
    const docblock = new Comment(CommentBlock);

  });
});
