import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import Movie from "../models/Movie";

const createMovie = async (
  movieCreateDto: MovieCreateDto
): Promise<PostBaseResponseDto> => {
  try {
    const movie = new Movie(movieCreateDto);

    await movie.save();

    const data = {
      _id: movie._id,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createMovieComment = async (
  movieId: string,
  movieCommentCreateDto: MovieCommentCreateDto
): Promise<MovieInfo | null> => {
  try {
    const movie = await Movie.findById(movieId);
    console.log(movie);
    if (!movie) {
      return null;
    }
    // 구조 분해 할당으로 새 comment 배열 만들기 (기존 배열아이템들, 새로운 댓글)
    const newComments: MovieCommentInfo[] = [
      ...movie.comments,
      movieCommentCreateDto,
    ];

    console.log(newComments);
    const updateMovie = await Movie.findOneAndUpdate(
      { _id: movieId },
      { comments: newComments },
      { new: true }
    );

    return updateMovie;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getMovie = async (movieId: string): Promise<MovieResponseDto | null> => {
  try {
    const movie = await Movie.findById(movieId).populate(
      "comments.writer",
      "name"
    );
    /**
     * populate의 2번째 인자인 select 에
     * email 이 올 수도 있음. 또한 여러 필드를 가져오고 싶다면 "name email" 이런식으로 뒤에 붙여주면 됨.
     * comments.writer가 mongoose.Types.ObjectId형이기 때문에 UserScheme안의 필드가 올 수 있는 것 같다.
     */

    if (!movie) {
      return null;
    }
    return movie;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateMovieComment = async (
  movieId: string,
  commentId: string,
  userId: string,
  commentUpdateDto: MovieCommentUpdateDto
): Promise<MovieInfo | null> => {
  try {
    const movie = Movie.findById(movieId);
    if (!movie) {
      return null;
    }

    const data = await Movie.findOneAndUpdate(
      {
        _id: movieId,
        comments: { $elemMatch: { _id: commentId, writer: userId } }, // $elemMatch : 배열에서 filter에 맞는 원소를 찾아줌, document의 배열 탐색 연산자
      },
      {
        // 특정 field의 값을 수정할 땐 $set 연산자를 사용
        $set: {
          "comments.$.writer": userId,
          "comments.$.comment": commentUpdateDto.comment,
        },
      },
      { new: true } // 이 옵션이 활성화 되면, 업데이트 된 후의 document를 반환해줌
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createMovie,
  createMovieComment,
  getMovie,
  updateMovieComment,
};
