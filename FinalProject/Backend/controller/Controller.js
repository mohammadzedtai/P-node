import { User } from "../model/Model.js";
import { Comment } from "../model/Model.js";
import { Post } from "../model/Model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/// authController

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All feilds are required"
            })
        }
        const existuser = await User.findOne({ email });
        if (existuser) {
            return res.status(400).json({
                status: false,
                message: "user already register"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword

        })

        return res.status(201).json({
            status: true,
            message: "User register successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error in register user ${error.message}`
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "All feilds are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Invalid password"
            })
        }
        const token = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
        return res.status(200).json({
            status: true,
            message: "user login successfully",
            data: token
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error in register user ${error.message}`
        })
    }
}

/// commentController
export const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { comment } = req.body;

        if (!comment) {
            return res.json({
                status: false,
                message: "Payload is required"
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.json({
                status: false,
                message: "post not found"
            });
        }

        const newComment = await Comment.create({
            comment,
            postId,
            userId: req.user.id
        });

        return res.json({
            status: true,
            message: "comment added successfully",
            data: newComment
        });

    } catch (error) {
        return res.json({
            status: false,
            message: `Error in add comment ${error.message}`
        });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ postId })
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        return res.json({
            status: true,
            message: "comments get",
            data: comments
        });

    } catch (error) {
        return res.json({
            status: false,
            message: `Error in get comments ${error.message}`
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.json({
                status: false,
                message: "comment not found"
            });
        }

        if (comment.userId.toString() !== req.user.id) {
            return res.json({
                status: false,
                message: "you can delete only your comment"
            });
        }

        await Comment.findByIdAndDelete(id);

        return res.json({
            status: true,
            message: "comment deleted successfully"
        });

    } catch (error) {
        return res.json({
            status: false,
            message: `Error in delete comment ${error.message}`
        });
    }
};




///postController
export const createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content || !tags) {
            return res.status(400).json({
                message: "All feilds are required"
            })
        }

        const post = await Post.create({
            title, content, tags, autherId: req.user.id
        })

        return res.status(201).json({
            message: "post created",
            data: post
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error in creating post ${error.message}`
        })
    }
}

export const bulkUpload = async (req, res) => {
    try {

        const posts = req.body

        if (!Array.isArray(posts)) {
            return res.status(400).json({
                message: "  posts are not an Array"
            });
        }
        posts.forEach(e => {
            e.autherId = req.user.id
        });
        const result = await Post.insertMany(posts)
        return res.status(200).json({
            message: "bulk posts created",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error in creating bulk post ${error.message}`
        })
    }
}

export const getAllPost = async (req, res) => {
    try {
        let { search, sortBy, order, page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        if (page < 1) page = 1;
        if (limit < 10) limit = 10;
        if (limit > 30) limit = 30;


        let query = {};
        // search 
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } }
                ]
            }
        }


        //  sort
        let sortOption = {};
        if (sortBy) {
            sortOption[sortBy] = order === "desc" ? -1 : 1;
        } else {
            sortOption.createdAt = -1;;
        }


        // pagination

        const skip = (page - 1) * limit

        const posts = await Post.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)

        const total = await Post.countDocuments(query)

        return res.json({
            status: true,
            message: "posts get",
            data: posts,
            pagination: {
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                perPage: limit
            }
        });
    } catch (error) {
        return res.json({
            status: false,
            message: `Error in getAll Posts ${error.message}`,
        });
    }
}

export const getSingleById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({
                message: "post not found"
            })
        }

        const posts = await Post.findById(id)
        return res.status(200).json({
            status: true,
            message: "post fetched successfully",
            data: posts
        })
    } catch (error) {
        return res.json({
            status: false,
            message: `Error in get Posts ${error.message}`,
        });
    }
}


export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: "Payload Missing"
            })
        }

        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({
                message: "Post is not found"
            })
        }

        const updatePosts = await Post.findByIdAndUpdate(id, req.body, {
            new: true
        })

        return res.status(200).json({
            message: "post update successfully",
            data: updatePosts
        })
    } catch (error) {
        return res.json({
            message: `Error in updating Post ${error.message}`
        })
    }
}


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await Post.findById(id);

        if (!posts) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        const delPost = await Post.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Post deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error in deleting post${error.message}`
        })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.json({
                status: false,
                message: "post not found"
            });
        }

        if (post.likes.includes(req.user.id)) {
            post.likes.pull(req.user.id);
        } else {
            post.likes.push(req.user.id);
            post.dislikes.pull(req.user.id);
        }

        await post.save();

        return res.json({
            status: true,
            message: "like updated",
            likes: post.likes.length,
            dislikes: post.dislikes.length
        });

    } catch (error) {
        return res.json({
            status: false,
            message: `Error in like post ${error.message}`
        });
    }
};

export const dislikePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.json({
                status: false,
                message: "post not found"
            });
        }

        if (post.dislikes.includes(req.user.id)) {
            post.dislikes.pull(req.user.id);
        } else {
            post.dislikes.push(req.user.id);
            post.likes.pull(req.user.id);
        }

        await post.save();

        return res.json({
            status: true,
            message: "dislike updated",
            likes: post.likes.length,
            dislikes: post.dislikes.length
        });

    } catch (error) {
        return res.json({
            status: false,
            message: `Error in dislike post ${error.message}`
        });
    }
};