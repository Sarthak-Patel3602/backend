import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnClodinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, fullName, avatar, coverImage, password } = req.body
    console.log("email", email);

    if ([fullName, email, userName, avatar, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields are required!")
    }
    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username is already exists");
    }


    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar file is required')
    }
    // console.log('req.files', req.files);

    const avatarImg = await uploadOnClodinary(avatarLocalPath);
    const coverImg = await uploadOnClodinary(coverImageLocalPath);

    const user = await User.create({
        fullName,
        avatar: avatarImg.url,
        coverImage: coverImg?.url || "",
        email,
        password,
        userName: userName.toLowerCase(),

    })


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw ApiError(500, "Something Went Wrong while registring the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully!")
    )
})

export { registerUser };