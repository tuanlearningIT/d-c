import actionTypes from './actionTypes';
import { ToastContainer, toast } from 'react-toastify';
import {
    getAllCodeServices, createNewUserService, getAllUser, deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctorsService, saveDetailDoctorsService,
    getAllspecialty,
    getAllClinic
} from '../../services/userService'
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeServices("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {

            dispatch(fetchGenderFailed());

        }
    }
}
export const fetchPositionStart = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_SUCCESS })
            let res = await getAllCodeServices("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
        }
    }
}
export const fetchRoleStart = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_SUCCESS })
            let res = await getAllCodeServices("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
        }
    }
}
export const fetchAllUserStart = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllUser("ALL");

            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            dispatch(fetchAllUserFailed());
        }
    }
}
export const createNewUser = (data) => {
    return async (dispatch, getSate) => {
        try {

            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {

                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("Wow so easy !")
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error("Wow so error !")
            dispatch(saveUserFailed());
        }
    }
}
export const deleleUser = (userId) => {
    return async (dispatch, getSate) => {
        try {

            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {

                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("Wow delete easy !")
            } else {
                toast.error("Wow delete easy !")
                dispatch(deleteUserFailed());

            }
        } catch (e) {
            toast.error("Wow delete error !")
            dispatch(deleteUserFailed());
        }
    }
}
export const editUser = (data) => {
    return async (dispatch, getSate) => {
        try {

            let res = await editUserService(data);
            if (res && res.errCode === 0) {

                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("Wow edit easy !")
            } else {
                toast.error("Wow edit easy !")
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Wow edit error !")
            dispatch(editUserFailed());
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const saveUserSuccess = (roleData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: roleData
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    userId: data
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    data: data
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const fetchTopDoctor = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getTopDoctorHomeService('11');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
            console.log(e)
        }
    }
}
export const fetchGetAllDoctor = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.errCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_GET_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_GET_ALL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_GET_ALL_DOCTOR_FAILED
            })
            console.log(e)
        }
    }
}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getSate) => {
        try {

            let res = await saveDetailDoctorsService(data);
            if (res && res.errCode === 0) {
                toast.success("Wow so easy !")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
                console.log(res)
            } else {
                console.log(res)
                toast.error("Wow so error !")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
            toast.error("Wow so FAILED !")
            console.log(e)

        }
    }
}
export const fetchGetAllScheduleTime = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCodeServices('TIME');
            if (res && res.errCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCH_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH__ALLCODE_SCH_TIME_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH__ALLCODE_SCH_TIME_FAILED
            })

            console.log(e)
        }
    }
}
export const getAllRequiredDoctorInfo = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START })
            let resPrice = await getAllCodeServices("PRICE");
            let resPayment = await getAllCodeServices("PAYMENT");
            let resPronvince = await getAllCodeServices("PROVINCE");
            let resSpecialty = await getAllspecialty()
            let resClinic = await getAllClinic()
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resPronvince && resPronvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resPronvince: resPronvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(getAllRequiredDoctorInfoSuccess(data))
            } else {
                dispatch(getAllRequiredDoctorInfoFailed());
            }
        } catch (e) {

            dispatch(getAllRequiredDoctorInfoFailed());

        }
    }
}
export const getAllRequiredDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: data

})
export const getAllRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})
