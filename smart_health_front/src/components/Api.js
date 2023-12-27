import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/api',
});

const apiJWT = axios.create({
    baseURL: 'http://localhost:8082/api',
  });

export const login = (userLoginDto) => {
    return api.post('/users/login', userLoginDto);
};


    export const addPatient = ( patientDto) => {
        return api.post('/users/patient', patientDto);
        };    




apiJWT.interceptors.request.use(
    (config) => {
        let loginUser= JSON.parse(localStorage.getItem('user'))
      const token = loginUser.accessToken;
  
      // Ajoutez le token d'authentification à l'en-tête de la requête
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      // Gérez les erreurs de requête ici (si nécessaire)
      return Promise.reject(error);
    }
  );
  /*
apiJWT.interceptors.request.use(request=>{
    if(loginUser!=null){
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",loginUser.accessToken);
        request.headers.Authorization='Bearer '+loginUser.accessToken;
    }
    return request;
})
*/


    //Patient api
    

    export const getPatients = () => {
    return apiJWT.get('/users/patient');
    };

    export const getPatient = (patientId) =>{
        return apiJWT.get(`/users/patient/${patientId}`);
    };
    
    export const getPatientsInactives = () =>{
        return apiJWT.get('/users/patient/inactiveAccounts');
    };
    
    export const editPatient = (patientId, patient) => {
        return apiJWT.put(`/users/patient/${patientId}`, patient);
    }
    
    export const deletePatient = (patientId) => {
        return apiJWT.delete(`/users/patient/${patientId}`);
    }

    //Compte api

    export const activeAccount = (accountId) =>{
        return apiJWT.put('/users/activate', accountId);
    };

    //Doctor api

    export const getDoctors = () =>{
        return apiJWT.get('/users/medecin');
    };

    export const addDoctor = ( doctorDto) => {
        return apiJWT.post('/users/medecin', doctorDto);
    };

    export const getDoctor = (doctorId) =>{
        return apiJWT.get(`/users/medecin/${doctorId}`);
    };
    
    export const editDoctor = (doctorId, doctor) => {
        return apiJWT.put(`/users/medecin/${doctorId}`, doctor);
    }
    
    export const deleteDoctor = (doctorId) => {
        return apiJWT.delete(`/users/medecin/${doctorId}`);
    }

    //Assistant api

    export const getAssistants = () =>{
        return apiJWT.get('/users/assistant');
    };
    
    export const addAssistant = ( assistantDto) => {
        return apiJWT.post('/users/assistant', assistantDto);
    };
    
    export const getAssistant = (assistantId) =>{
        return apiJWT.get(`/users/assistant/${assistantId}`);
    };
        
    export const editAssistant = (assistantId, assistant) => {
        return apiJWT.put(`/users/assistant/${assistantId}`, assistant);
    }
    
    export const deleteAssistant = (assistantId) => {
      return apiJWT.delete(`/users/assistant/${assistantId}`);
    }

    //Service api

    export const getServices = () =>{
        return apiJWT.get('/service');
    };
    
    export const addService = ( serviceDto) => {
        return apiJWT.post('/service', serviceDto);
    };
    
    export const getService = (serviceId) =>{
        return apiJWT.get(`/service/${serviceId}`);
    };
        
    export const editService = (serviceId, serviceDto) => {
        return apiJWT.put(`/service/${serviceId}`, serviceDto);
    }
        
    export const deleteService = (serviceId) => {
        return apiJWT.delete(`/service/${serviceId}`);
    }    
    //Consultation api

    export const getConsultations = () =>{
        return apiJWT.get('/consultation');
      };

    export const getConsultationsDetails = () =>{
        return apiJWT.get('/consultation/consultations');
    };
    export const addConsultation = ( consultationDto) => {
        return apiJWT.post('/consultation', consultationDto);
    };
      
    export const getConsultation = (consultationId) =>{
        return apiJWT.get(`/consultation/${consultationId}`);
    };
        
    export const editConsultation = (consultationId, consultationDto) => {
        return apiJWT.put(`/consultation/${consultationId}`, consultationDto);
    }
        
    export const deleteConsultation = (consultationId) => {
        return apiJWT.delete(`/consultation/${consultationId}`);
    } 

    export const addDocumentsToConsultation = (consultationId, files) => {
        const formData = new FormData();
        formData.append("files", files);
    
        return apiJWT.post(`/consultation/${consultationId}/documents`, formData);
    };

    //RDVs api

    export const getRDVs = () =>{
        return apiJWT.get('/RDV');
      };

    export const getRDVsDetails = () =>{
        return apiJWT.get('/RDV/rdvs');
    };
    export const addRDV = ( rdvDto) => {
        return apiJWT.post('/RDV', rdvDto);
    };
      
    export const getRDV = (rdvId) =>{
        return apiJWT.get(`/RDV/${rdvId}`);
    };
        
    export const editRDV = (rdvId, rdvDto) => {
        return apiJWT.put(`/RDV/${rdvId}`, rdvDto);
    }
        
    export const deleteRDV = (rdvId) => {
        return apiJWT.delete(`/RDV/${rdvId}`);
    } 
       




