import mongoose, {Schema} from 'mongoose'

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Fashion', 'Travel', 'Food', 'Technology', 'Business', 'Health', 'Gaming', 'Sports', 'Humor', 'Inspirational', 'Informative', 'Storytelling', 'Case Study', 'Podcast', 'Self Improvement', 'Motivational', 'Entertainment', 'Educational', 'Art', 'Music', 'Relationship', 'Science', 'Lifestyle', 'Pets', 'Hobbie', 'Law', 'Do It Yourself', 'Parenting', 'Other'],
    },
    thumbnail: {
        type: String, //cloudinary url
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    authorName: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    }, 
    likedByUser: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "User",
    },
    commentsByUser: {
        type: [{
          comment: {
            type: String,
            required: true,
            trim: true
          },
          userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
          }
        }],
        default: []
      }

},{timestamps: true})

export const Blog = mongoose.model("Blog", blogSchema)