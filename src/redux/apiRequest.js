import axios from "axios"
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice"
import { getUserFaliled, getUserStart, getUserSuccess } from "./userSlice"

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("/auth/signin", user)
        if (res.data.isAdmin) {
            dispatch(loginSuccess(res.data))
            navigate("/")
        }
    } catch (err) {
        dispatch(loginFailed)
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post("/auth/signup", user)
        dispatch(registerSuccess())
        navigate("/")
    } catch (err) {
        dispatch(registerFailed())
    }
}

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUserStart())
    try {
        const res = await axios.get("/users", { headers: { token: `Bearer ${accessToken}` } })
        dispatch(getUserSuccess(res.data))
    } catch (err) {
        dispatch(getUserFaliled())
    }
}

// export const getAllHotels = async (dispatch) => {
//     dispatch(getHotelStart())
//     try {
//         const res = await axios.get("/hotels")
//         dispatch(getHotelSuccess(res.data))
//     } catch (err) {
//         dispatch(getHotelFaliled())
//     }
// }

// export const getAllRooms = async (dispatch) => {
//     dispatch(getRoomStart())
//     try {
//         const res = await axios.get("/rooms")
//         dispatch(getRoomSuccess(res.data))
//     } catch (err) {
//         dispatch(getRoomFaliled())
//     }
// }