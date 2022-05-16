import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import Review from "../models/Review";

const createReview = async (
  movieId: string,
  reviewCreateDto: ReviewCreateDto
): Promise<PostBaseResponseDto> => {
  try {
    const review = new Review({
      title: reviewCreateDto.title,
      content: reviewCreateDto.content,
      writer: reviewCreateDto.writer,
      movie: movieId,
    });

    await review.save();

    const data = {
      _id: review._id,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getReviews = async (movieId: String): Promise<ReviewResponseDto[]> => {
  try {
    const reviews = await Review.find({
      movie: movieId,
    })
      .populate("writer", "name")
      .populate("movie");

    // Promise.all() : 배열을 가지고 가공을 해서 새로운 배열을 만드는 것
    const data = await Promise.all(
      reviews.map((review: any) => {
        const result = {
          writer: review.writer.name,
          movie: review.movie,
          title: review.title,
          content: review.content,
        };
        return result;
      })
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createReview,
  getReviews,
};
