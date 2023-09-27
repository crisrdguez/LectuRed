export class Libro {
    private _id: string | undefined;
    private _title: string | undefined;
    private _authors: string[] | undefined;
    private _thumbnail: string | undefined;
    private _subtitle:string | undefined;
    private _publisher:string | undefined;

    constructor() {

    }

    get id(): string | undefined {
        return this._id;
    }

    set id(id: string | undefined) {
        this._id = id;
    }

    get title(): string | undefined {
      return this._title;
  }

  set title(title: string | undefined) {
      this._title = title;
  }

  get authors(): string[] | undefined {
    return this._authors;
  }

  set authors(authors: string[] | undefined) {
      this._authors = authors;
  }

  get thumbnail(): string | undefined {
    return this._thumbnail;
  }

  set thumbnail(thumbnail: string | undefined) {
    this._thumbnail = thumbnail;
  }

  get subtitle(): string | undefined {
    return this._subtitle;
  }

  set subtitle(subtitle: string | undefined) {
    this._subtitle = subtitle;
  }

  get publisher(): string | undefined {
    return this._publisher;
  }

  set publisher(publisher: string | undefined) {
    this._publisher = publisher;
  }
  




}