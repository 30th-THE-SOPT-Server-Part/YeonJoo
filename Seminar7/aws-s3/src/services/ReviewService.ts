import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewInfo } from "../interfaces/review/ReviewInfo";
import { ReviewOptionType } from "../interfaces/review/ReviewOptionType";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import { ReviewsResponseDto } from "../interfaces/review/ReviewsResponseDto";
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

const getReviewsBySearch = async (
    movieId: string,
    search: string,
    option: ReviewOptionType,
    page: number
): Promise<ReviewsResponseDto> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);
    let reviews: ReviewInfo[] = [];
    const perPage: number = 2;

    try {
        const findRegex: RegExp = regex(search);
        if (option === "title") {
            reviews = await Review.find({ title: { $regex: findRegex } })
                .where("movie")
                .equals(movieId) // mongoose에서 where을 사용하는 법.equals(movieId)
                .populate("writer", "name")
                .populate("movie", "title")
                .sort({ createdAt: -1 }) //최신순 정렬
                .skip(perPage * (page - 1))
                .limit(perPage);
        } else if (option == "content") {
            reviews = await Review.find({
                movie: movieId,
                content: { $regex: findRegex },
            })
                .populate("writer", "name")
                .populate("movie", "title")
                .sort({ createdAt: -1 }) //최신순 정렬
                .skip(perPage * (page - 1))
                .limit(perPage);
        } else {
            reviews = await Review.find({
                movie: movieId,
                $or: [
                    { title: { $regex: findRegex } },
                    { content: { $regex: findRegex } },
                ],
            })
                .populate("writer", "name")
                .populate("movie", "title")
                .sort({ createdAt: -1 }) //최신순 정렬
                .skip(perPage * (page - 1))
                .limit(perPage);
        }

        const totalPage: number = await Review.countDocuments({
            movie: movieId,
        });
        const lastPage: number = Math.ceil(totalPage / perPage);
        const data = { reviews, lastPage };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createReview,
    getReviews,
    getReviewsBySearch,
};
