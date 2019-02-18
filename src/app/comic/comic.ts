export class Comic {
  num: number;
  safe_title: string = '';
  title: string = '';
  liked = false;
  alt: string = '';
  link: string = '';
  img: string = '';
  imgRetina: string = '';
  day: number;
  month: number;
  year: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
