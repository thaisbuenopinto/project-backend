import { PostsDatabase } from "../database/PostsDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Comment } from "../models/Comments";
import { LikesDislikes, LikesDislikesDB } from "../models/LikesDislikes";
import { POST_LIKE, Posts } from "../models/Posts";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CreateCommentInputDTO,  CreateCommentOutputDTO } from "../endpoints/coments/createComment.dto";
import { GetCommentsInputDTO, GetCommentsOutputDTO } from "../endpoints/coments/getComments.dto";
import { LikeDislikesInputDTO, LikeDislikestOutputDTO } from "../endpoints/likesDislikes/updateLikeDislike.dto";
import { CreatePostInputDTO,  CreatePostOutputDTO } from "../endpoints/posts/createPost.dto";
import { DeletePostInputDTO,  DeletePostOutputDTO } from "../endpoints/posts/deletePost.dto";
import { EditPostInputDTO,  EditPostOutputDTO } from "../endpoints/posts/editPost.dto";
import { GetPostsInputDTO,  GetPostsOutputDTO } from "../endpoints/posts/getPosts.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

export class PostsBusiness {
  constructor(
    private postsDatabase: PostsDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private userDatabase: UserDatabase
  ) {}

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { token, content } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const id = this.idGenerator.generateId();

    const postDBExists = await this.postsDatabase.findPostById(id);

    if (postDBExists) {
      throw new BadRequestError("'id' já existe");
    }

    const likes = 0;
    const dislikes = 0;

    const date = new Date();
    date.setUTCHours(date.getUTCHours() - 3); 

    const isoDateString = date
      .toISOString()
      .replace("T", " ")
      .replace("Z", " ")
      .substring(0, 19);

    const newPost = new Posts(
      id,
      payload.id,
      content,
      likes,
      dislikes,
      isoDateString,
      isoDateString,
      0
    );

    const newPostDB = newPost.toDBModel();
    await this.postsDatabase.insertPost(newPostDB);

    const output: CreatePostOutputDTO = newPost;

    const like = null;

    const newLikeDislike = new LikesDislikes(id, payload.id, like);

    const newLikeDislikeDB = newLikeDislike.toDBModel();
    await this.postsDatabase.insertLikeDislike(newLikeDislikeDB);

    return output;
  };

  public getPosts = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const postsDB = await this.postsDatabase.findPosts();

    const posts = postsDB.map((postDB) => {
      const post = new Posts(
        postDB.id,
        postDB.creator_id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at,
        postDB.amount_comments
      );

      return post.toBusinessModel();
    });

    const getPostCreatorId = posts.map((post) => post.creatorId);

    const names: any = [];

    for (let i = 0; i < getPostCreatorId.length; i++) {
      const result = await this.userDatabase.returnUserName(
        getPostCreatorId[i]
      );

      names.push(result);
    }

    const getPosts = posts.map((post, index) => {
      const newPost = {
        id: post.id,
        content: post.content,
        likes: post.likes,
        dislikes: post.dislikes,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        creator: {
          id: post.creatorId,
          name: names[index],
        },
        amountComment: post.amountComments,
      };

      return newPost;
    });

    const output: GetPostsOutputDTO = getPosts;

    return output;
  };

  public editPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { token, idToEdit, content } = input;

    const postDB = await this.postsDatabase.findPostById(idToEdit);

    if (!postDB) {
      throw new NotFoundError("Post não encontrado.");
    }

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    // Verifica se o usuário logado é o mesmo que criou o post
    if (payload.id !== postDB.creator_id) {
      throw new BadRequestError(
        "Você não tem permissão para editar este post."
      );
    }

    const date = new Date();
    date.setUTCHours(date.getUTCHours() - 3); 

    const isoDateString = date
      .toISOString()
      .replace("T", " ")
      .replace("Z", " ")
      .substring(0, 19);

    const editPost = new Posts(
      postDB.id,
      postDB.creator_id,
      content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      isoDateString,
      postDB.amount_comments
    );

    const editPostDB = editPost.toDBModel();
    await this.postsDatabase.updatePost(editPostDB, idToEdit);

    const output: EditPostOutputDTO = {
      content,
    };

    return output;
  };

  public LikeDislike = async (
    input: LikeDislikesInputDTO
  ): Promise<LikeDislikestOutputDTO> => {
    const { id, token, like } = input;

    const payLoad = this.tokenManager.getPayload(token);

    if (!payLoad) {
      throw new BadRequestError("Token inválido");
    }

    const postDB = await this.postsDatabase.findPostById(id);

    if (!postDB) {
      throw new NotFoundError("Postagem não encontrada");
    }

    if (payLoad.id === postDB.creator_id) {
      throw new NotFoundError(
        "Você não pode curtir/descurtir seu próprio Post"
      );
    }

    const post = new Posts(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      postDB.amount_comments
    );

    const likeSQlite = like ? 1 : 0;

    const likeDislikeDB: LikesDislikesDB = {
      user_id: payLoad.id,
      post_id: id,
      like: likeSQlite,
    };

    const likeDislikeExists = await this.postsDatabase.findLikeDislike(
      likeDislikeDB
    );

    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postsDatabase.removeLikeDislike(likeDislikeDB);
        post.removeLike();
      } else {
        await this.postsDatabase.updateLikeDislike(likeDislikeDB);
        post.removeLike();
        post.addDislike();
      }
    } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.postsDatabase.removeLikeDislike(likeDislikeDB);
        post.removeDislike();
      } else {
        await this.postsDatabase.updateLikeDislike(likeDislikeDB);
        post.removeDislike();
        post.addLike();
      }
    } else {
      await this.postsDatabase.insertLikeDislike(likeDislikeDB);
      like ? post.addLike() : post.addDislike();
    }

    const updatedPostDB = post.toDBModel();
    await this.postsDatabase.updatePost(updatedPostDB, id);

    const output: LikeDislikestOutputDTO = post;

    return output;
  };

  public deletePost = async (
    input: DeletePostInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { id, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const postDBExists = await this.postsDatabase.findPostById(id);

    if (!postDBExists) {
      throw new NotFoundError("Post não encontrado.");
    }

    if (
      payload.id !== postDBExists.creator_id &&
      payload.role === USER_ROLES.NORMAL
    ) {
      throw new BadRequestError(
        "Você não tem permissão para deletar este post."
      );
    }

    await this.postsDatabase.deletePost(id);

    const output: DeletePostOutputDTO = null;

    return output;
  };

  public createComment = async (
    input: CreateCommentInputDTO
  ): Promise<CreateCommentOutputDTO> => {
    const { content, token, postId } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("token invalido");
    }

    const id = this.idGenerator.generateId();

    const newPost = new Comment(
      id,
      payload.id,
      postId,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newPostToDB = newPost.toDBModel();

    const postsDB = await this.postsDatabase.findPostByIdAmount(postId);
    await this.postsDatabase.insertComment(newPostToDB);

    if (!postsDB) {
      throw new BadRequestError("Post não encontrado");
    }

    await this.postsDatabase.updateAmountComment(
      postId,
      postsDB.amount_comments + 1
    );

    const output: CreateCommentOutputDTO = {
      commentId: id,
    };

    return output;
  };

  public getComments = async (
    input: GetCommentsInputDTO
  ): Promise<GetCommentsOutputDTO> => {
    const { token, postId } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("token inválido");
    }

    const postExist = await this.postsDatabase.findPostById(postId);

    if (!postExist) {
      throw new BadRequestError("Post não encontrado");
    }

    const postsDB = await this.postsDatabase.getComments(postId);

    const getPosts = postsDB.map((postsDB) => {
      const post = new Comment(
        postsDB.id,
        postsDB.creator_id,
        postsDB.post_id,
        postsDB.content,
        postsDB.likes,
        postsDB.dislikes,
        postsDB.created_at,
        postsDB.updated_at
      );
      return post.toBusinessModelComments();
    });

    const getPostCreatorId = getPosts.map((post) => post.creatorId);

    const userName: any = [];

    for (let i = 0; i < getPostCreatorId.length; i++) {
      const result = await this.userDatabase.returnUserName(
        getPostCreatorId[i]
      );

      userName.push(result);
    }

    const post = getPosts.map((post, index) => {
      const postModel = {
        id: post.id,
        content: post.content,
        likes: post.likes,
        dislikes: post.dislike,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        creator: {
          id: post.creatorId,
          name: userName[index],
        },
      };

      return postModel;
    });

    const output: GetCommentsOutputDTO = post;

    return output;
  };
}
