import {CommentBlock} from '@babel/types';

export default class Comment {

  /**
   *
   * @param {CommentBlock} dockBlock
   */
  constructor (comment) {
    this.comment = comment;
  }

  get type () {
    return this.comment.type;
  }

  get value () {
    return this.comment.value;
  }

  get start () {
    return this.comment.start;
  }

  get end() {
    return this.comment.end;
  }

  get parsed() {

  }

}
