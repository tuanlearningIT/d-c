
import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}
const getAllCodeServices = (inputData) => {
    return axios.get(`/allcode?type=${inputData}`)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctorsService = () => {
    return axios.get('/api/get-all-doctors')
}
const saveDetailDoctorsService = (data) => {
    return axios.post('/api/save-info-doctors', data)
}
const getDetailInfoDoctor = (inputid) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputid}`)
}

const bulkCreateScheduleService = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraDoctorInfoById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientProfileDoctorbyId = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}
const postVerifyBookingappointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}
const getAllspecialty = () => {
    return axios.get('/api/get-specialty')
}
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}
const getAllClinic = () => {
    return axios.get('/api/get-clinic')
}
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}
const getListDoctorForSpecialty = (data) => {
    return axios.get(`/api/get-list-doctor-for-specialty?doctorId=${data.doctorId}`)
}
const createNewHandBook = (data) => {
    return axios.post('/api/create-new-handbook', data)
}
const getAllHandBook = () => {
    return axios.get('/api/get-handbook')
}
const getAllDetailHandBookById = (data) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`)
}
export {
    handleLoginApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeServices,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorsService,
    getDetailInfoDoctor,
    bulkCreateScheduleService,
    getScheduleDoctorByDate,
    getExtraDoctorInfoById,
    getProfileDoctorById,
    postPatientProfileDoctorbyId,
    postVerifyBookingappointment,
    createNewSpecialty,
    getAllspecialty,
    getAllDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getAllDetailClinicById,
    getListPatientForDoctor,
    postSendRemedy,
    getListDoctorForSpecialty,
    createNewHandBook,
    getAllHandBook,
    getAllDetailHandBookById
}