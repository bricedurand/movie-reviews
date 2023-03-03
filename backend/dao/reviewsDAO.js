import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) { return }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
        } catch (e) {
            console.error('unable to establish connection handle in reviewDAO: ${e}')
        }
    }

    static async addReview(movieId, user, review, date) {
        try  {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId)
            }
            return await reviews.insertOne(movieId)
        } catch (e) {
            console.error('unable to post review: ${e}')
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: ObjectId(reviewId), user_id: userId }, 
                { 
                    $set: {
                        date: date,
                        review: review
                    }
                })               
            return updateResponse
        } catch (e) {
            console.error('unable to update review: ${e}')
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne(
                { _id: ObjectId(reviewId), user_id: userId }
            )     
            return deleteResponse
        } catch (e) {
            console.error('unable to update review: ${e}')
            return { error: e }
        }
    }
}