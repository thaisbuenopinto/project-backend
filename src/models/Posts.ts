import { GetPostsFromUser } from "./User";

export interface PostsDB {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
  amount_comments: number;
}


export interface PostsModel {
  id: string;
  creatorId: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  amountComments: number;
}


export interface GetPostsModel {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: GetPostsFromUser;
}

export enum POST_LIKE {
  ALREADY_LIKED = "ALREADY LIKED",
  ALREADY_DISLIKED = "ALREADY DISLIKED",
}

export interface GetcommentModel {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: GetPostsFromUser;
}

export interface PostsDBAmount {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
  amount_comments: number;
}

export class Posts {
  constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private amountComments: number
  ) {}

  public getId(): string {
    return this.id;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }

  public setCreatorId(value: string) {
    this.creatorId = value;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(value: string) {
    this.content = value;
  }

  public getLikes(): number {
    return this.likes;
  }

  public setLikes(value: number) {
    this.likes = value;
  }

  public getDislikes(): number {
    return this.dislikes;
  }

  public setDislikes(value: number) {
    this.dislikes = value;
  }

  public addLike = (): void => {
    this.likes++;
  };

  public removeLike = (): void => {
    this.likes--;
  };

  public addDislike = (): void => {
    this.dislikes++;
  };

  public removeDislike = (): void => {
    this.dislikes--;
  };

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }

  public setUpdatedAt(value: string) {
    this.content = value;
  }

  public getAmmountComments(): number {
    return this.amountComments;
  }

  public setAmmountComments(value: number) {
    this.amountComments = value;
  }

  public toDBModel(): PostsDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      amount_comments: this.amountComments,
    };
  }

  public toBusinessModel(): PostsModel {
    return {
      id: this.id,
      creatorId: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      amountComments: this.amountComments,
    };
  }
}
