export type Tip = {
  id: Number;
  attributes: {
    Slug: string;
    Name: string;
    Description?: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    Author: Author;
    Screenshots: Screenshots;
  }
};

type Author = {
  data: {
    id: Number;
    attributes: {
      firstname: string;
      lastname?: string;
      username?: string;
      preferredLanguage?: string;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}

type Screenshots = {
  data: Screenshot[];
}

type Screenshot = {
  id: Number;
  attributes: {
    formats: {
      thumbnail: ScreentshotVariant;
      large: ScreentshotVariant;
      medium: ScreentshotVariant;
      small: ScreentshotVariant;
    }
    hash: string;
  }
}

type ScreentshotVariant = {
  url: string;
}
