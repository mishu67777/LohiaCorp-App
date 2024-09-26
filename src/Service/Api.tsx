import axios from 'axios';
import Config from '../Utils/Config';
import AsyncStorage from '@react-native-async-storage/async-storage'




export const getApi = async (url: string, header: any = null) => {
  try {
  
    const token = await AsyncStorage.getItem('mean-token');
    
    
    console.log('Token:', token);

   
    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

   
    if (token) {
      defaultHeaders['Authorization'] = `JWT ${token}`; 
    }


    const headers = header ? { ...defaultHeaders, ...header } : defaultHeaders;

    
    const response = await axios({
      method: 'GET', 
      url: url,
      headers: headers,
    });

    
    console.log('Response Data:', response.data);

    
    return response.data;

  } catch (error) {
   
    if (error.response) {
      
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      
      console.error('No response received:', error.request);
    } else {
     
      console.error('Request setup error:', error.message);
    }
    
    return handleErrors(error); 
  }
};

export const aboutUsAndBenefits = async (url: string, data: any, header: any = null) => {
  try {
    
    const token = await AsyncStorage.getItem('mean-token');
    console.log('Token:', token);

    
    let formData = new FormData();
    formData.append('content', data);

    
    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data', // Changed to multipart/form-data for FormData
    };

    
    if (token) {
      defaultHeaders['Authorization'] = `JWT ${token}`;
    }

    
    const headers = header ? { ...defaultHeaders, ...header } : defaultHeaders;

 
    const response = await axios.post(url, formData, { headers });
 
   
    console.log('Response Data:', response.data);

    return response.data;

  } catch (error) {
    // Handle errors
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return handleErrors(error); 
  }
};


export const newprojectCalculation = async (url,applicationid, rangeid,header: any = null) => {
  try {
    
    const token = await AsyncStorage.getItem('mean-token');
    console.log('Token:', token);

    
    let formData = new FormData();
    formData.append("application_id", applicationid);
    formData.append("range_id", rangeid);

    
    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data', // Changed to multipart/form-data for FormData
    };

    
    if (token) {
      defaultHeaders['Authorization'] = `JWT ${token}`;
    }

    
    const headers = header ? { ...defaultHeaders, ...header } : defaultHeaders;

 
    const response = await axios.post(url, formData, { headers });
 
   
    console.log('Response Data:', response.data);

    return response.data;

  } catch (error) {
    // Handle errors
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return handleErrors(error); 
  }
};


export const updateProfileapi=async(url: string, data: any, header: any = null)=> {
  // console.logdata

 
  try {
    
    const token = await AsyncStorage.getItem('mean-token');
    console.log('Token:', token);
    console.log("data of params",data)
    // return false
    let countrycode = 1;
    let form = new FormData();
    form.append("name", data.name);
    form.append("email", data.email);
    form.append("mobile_no", data.mobile);
    form.append("company", data.company);
    form.append("location", data.location);
    form.append("country_code", "+91")
    form.append("nature_of_business", data.businessNature );
    form.append("business_name", data.businessNature === 'raffia' ? '' : "other" );
    form.append("city", data.city);
    form.append("state", "8");
    form.append("image", data.image);
    console.log(form)
    console.log("updateProfileapi");
    console.log(data)

    
    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data', // Changed to multipart/form-data for FormData
    };

    
    if (token) {
      defaultHeaders['Authorization'] = `JWT ${token}`;
    }

    
    const headers = header ? { ...defaultHeaders, ...header } : defaultHeaders;

 
    const response = await axios.post(url, form, { headers });
 
   
    console.log('Response Data:', response.data);

    return response.data;

  } catch (error) {
    // Handle errors
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return handleErrors(error); 
  }

}



export const postApi = async (Url, Data, Header = null) => {
  let token = await AsyncStorage.getItem('token')
  var authOptions = {
    method: 'POST',
    url: Url,
    data:Data,
    headers: Header ? Header : token ? {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization : "Bearer " + token
    } :{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  console.log('authOptions postApi data:-', authOptions)       
  return axios(authOptions)
    .then(async res => {
      //await AsyncStorage.setItem('NoInternet', 'No')
      console.log("response postApi", res)
      if(res.data.data=="booking cretaed"){
         return res;
      }else if(res.data.data=="subscription cretaed"){
        return res;
      }else if (res && res.data && (res.data.totalPoint || res.data.outOfStock)) {
        return res.data;
      }
      else if (res && res.data && (res.data.data || res.data.data == '')) {

        return res.data.data;
      }
      else {
        return res.data
      }
    })
    .catch((error) => {
      console.log("check_post_error_response",error,error.response, error.response.data)
      if(error && error.response){
      console.log('code :- ' , error , ' response :- ', error.response)
    }
    if(error.response && error.response.data && error.response.data.data && error.response.data.data=='Invalid Coupon Code')
    {
      return error.response.data
    }
    else{
      if(error.response.data.status == "error"){
          if(error.response.data.msg=="Please choose at least one date for subsciption."){
            return alert("Please choose at least one date for subscription.")
          }else{
            return alert(error.response.data.msg)
          }
          
      }else if(error.response.data.message=="errror"){
        return alert('You can not add'+error.response.data.data)
      }else {
        return handleErrors(error)
      }
        
   

      
    }
    });
}



export const callLoginApi = async (Mobile) => {
  var Data = {
    "contactNumber": Mobile
  }
  var authOptions = {
    method: 'POST',
    url: Config.Login,
    data: Data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  console.log('check_mobile_api', authOptions)
  return axios(authOptions)
    .then(async response => {
      await AsyncStorage.setItem('NoInternet', 'No')
      return response.data;
    })
    .catch((error) => {
      return handleErrors(error);
    });
}


export const googleLogin = (data) =>{

    console.log('--------------data from google login api---------');
    console.log(data);
    var authOptions = {
        method: 'POST',
        url: Config.Login,
        data: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };
   

    return axios(authOptions)
    .then(async response => {
      return response.data;
    })
    .catch((error) => {
      return handleErrors(error);
    });

  }





export const callEditUserProfile = async (contactNumber, email, name, user_id,Header = null,) => {
  let token = await AsyncStorage.getItem('token')
  var Data = {
    "contactNumber": contactNumber,
    "name": name,
    "email": email
  }
  var authOptions = {
    method: 'POST',
    url: Config.EditUserProfile,
    data: Data,
    headers: Header ? Header : token ? {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization : "Bearer " + token
    } :{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  console.log('edit_user_profile', authOptions)
  return axios(authOptions)
    .then(async response => {
      await AsyncStorage.setItem('NoInternet', 'No')
      return response.data;
    })
    .catch((error) => {
      return handleErrors(error);
    });
}

async function handleErrors(error) {
  console.log('Error :- ', error.response)
  if (error && error.message && error.message.includes('Network')) {
    var check = await AsyncStorage.getItem('NoInternet')
    console.log("It is yes",check)
    if(check && check=='Yes'){
    // alert('Please check your network connection.')
  }
  else{
    await AsyncStorage.setItem('NoInternet', 'Yes')
    alert('Please check your network connection.')
  }
  }
  else {
    const code = error.response && error.response.status ? error.response.status : error.response
    const response = error && error.response && error.response.data ? error.response.data : error && error.response ? error.response:error
    console.log('errror:-' + error + 'code :- ' + code + ' response :- ', response)
    if (error.response && error.response.status === 400) {
      if (response && response.message && response.message === 'error') {
        return response.data
      }
      else if (response && response.status && response.status == 'error' && response.result[0].user_id == 'user_id not found') {
        alert('Server error occurred. Please reopen the app again.')
      }
      else {
      }
    }
    else {
      if (response && response.message && response.message === 'error') {
        alert(response.data)
        return response.data
      }
      else if(response && response.message)
      {
        return response.message
      }
      else {
        alert('Oops server error occurred')
      }
    }
  }
}